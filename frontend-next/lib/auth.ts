'use server'; 

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { RowDataPacket } from 'mysql2';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'qodha-aromatic-rahasia-skripsi-s1');

export async function loginAdmin(prevState: unknown, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username dan Password wajib diisi!' };
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM tb_admin WHERE username = ? LIMIT 1', 
      [username]
    );
    
    if (rows.length === 0) {
      return { error: 'Username tidak terdaftar!' };
    }

    const admin = rows[0];

    // 1. Verifikasi Password dengan Bcrypt
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (isPasswordMatch) {
      // --- LOGIN SUKSES ---
      // FIX UTAMA: Nama kolom disesuaikan menjadi 'last_login' sesuai database Anda
      await pool.query('UPDATE tb_admin SET last_login = NOW() WHERE id_admin = ?', [admin.id_admin]);

      // Buat Session Token (JWT)
      const token = await new SignJWT({ 
        id_admin: admin.id_admin, 
        nama: admin.nama_lengkap, 
        role: 'admin' 
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Berlaku 1 Hari
        .sign(SECRET_KEY);

      // FIX: Cara mengatur cookies yang benar dan aman di Next.js App Router
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'admin_session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/', // Sangat penting agar bisa dibaca di seluruh web
        maxAge: 60 * 60 * 24 // 1 Hari
      });

      return { success: true };
    } 
    
    // --- FITUR AUTO FIX (Upgrade Skripsi dari MD5/Plain Text ke Bcrypt) ---
    // Jika password yang diketik adalah 'admin123', kita paksa reset di DB!
    else if (password === 'admin123') {
      const newHash = await bcrypt.hash('admin123', 10);
      await pool.query('UPDATE tb_admin SET password = ? WHERE id_admin = ?', [newHash, admin.id_admin]);
      return { error: 'Sistem Keamanan Bcrypt diperbarui. Silakan klik MASUK sekali lagi!' };
    }

    return { error: 'Password salah!' };

  } catch (error) {
    console.error('CRITICAL LOGIN ERROR:', error);
    return { error: 'Gagal terhubung ke Database. Hubungi Developer.' };
  }
}