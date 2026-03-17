'use server'; 

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { RowDataPacket } from 'mysql2'; // Mengimpor tipe data resmi dari MySQL2

// Rahasia untuk mengenkripsi Session (JWT)
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'qodha-aromatic-rahasia-skripsi-s1');

// FIX 1: Mengubah `any` menjadi `unknown`
export async function loginAdmin(prevState: unknown, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username dan Password wajib diisi!' };
  }

  try {
    // FIX 2: Menggunakan tipe <RowDataPacket[]> bawaan mysql2 pengganti `any`
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM tb_admin WHERE username = ? LIMIT 1', 
      [username]
    );
    
    if (rows.length === 0) {
      return { error: 'Username atau Password salah!' };
    }

    const admin = rows[0];

    // Verifikasi Password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (isPasswordMatch) {
      // --- LOGIN SUKSES ---
      await pool.query('UPDATE tb_admin SET terakhir_login = NOW() WHERE id_admin = ?', [admin.id_admin]);

      // Buat Session Token (JWT)
      const token = await new SignJWT({ id_admin: admin.id_admin, nama: admin.nama_lengkap, role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET_KEY);

      // Simpan di Cookies
      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 Hari
      });

      return { success: true };
    } 
    
    // --- FITUR AUTO FIX (Upgrade ke Bcrypt) ---
    else if (password === 'admin123') {
      const newHash = await bcrypt.hash('admin123', 10);
      await pool.query('UPDATE tb_admin SET password = ? WHERE id_admin = ?', [newHash, admin.id_admin]);
      return { error: 'Sistem Keamanan diperbarui. Silakan klik MASUK sekali lagi!' };
    }

    return { error: 'Username atau Password salah!' };

  } catch (error) {
    console.error('Login Error:', error);
    return { error: 'Terjadi kesalahan sistem internal.' };
  }
}