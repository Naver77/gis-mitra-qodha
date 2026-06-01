'use server';

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { RowDataPacket } from 'mysql2';

// PERBAIKAN: Hapus hardcode string. Wajibkan keberadaan variabel environment.
const jwtSecretString = process.env.JWT_SECRET;
if (!jwtSecretString) {
  throw new Error('FATAL ERROR: JWT_SECRET environment variable is not defined.');
}
const SECRET_KEY = new TextEncoder().encode(jwtSecretString);

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

    // PERBAIKAN: Gunakan pesan error yang sama untuk menghindari User Enumeration
    if (rows.length === 0) {
      return { error: 'Username atau Password salah!' };
    }

    const admin = rows[0];

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (isPasswordMatch) {
      await pool.query('UPDATE tb_admin SET last_login = NOW() WHERE id_admin = ?', [admin.id_admin]);

      // Di dalam lib/auth.ts, ubah bagian pembuatan token ini:
      const token = await new SignJWT({
        id_admin: admin.id_admin,
        nama: admin.nama_lengkap,
        role: admin.role // <-- MENGAMBIL DARI DATABASE ('Super Admin' atau 'Admin')
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('3d') // <-- Ubah menjadi 3d (3 days)
        .sign(SECRET_KEY);

      const cookieStore = await cookies();
      cookieStore.set({
        name: 'admin_session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 3 // <-- 3 Hari (Detik * Menit * Jam * Hari)
      });

      return { success: true };
    }

    // PERBAIKAN: Fitur "Auto Fix" dihapus karena merupakan celah pembajakan akun.
    // Tetap kembalikan pesan error generic.
    return { error: 'Username atau Password salah!' };

  } catch (error) {
    // Log error di server saja, jangan ekspos detail query gagal ke user
    console.error('[AUTH_ERROR] Gagal melakukan autentikasi:', error);
    return { error: 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.' };
  }
}