'use server';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// ==============================================================
// FUNGSI BANTU: Keamanan Sesi (JWT)
// ==============================================================
async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    const { payload } = await jwtVerify(token, secret);
    return payload; // Berisi { id_admin, nama, role }
  } catch {
    return null;
  }
}

// 1. Tampilkan Kategori (Bisa diakses publik untuk dropdown produk)
export async function getKategoriList() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_kategori ORDER BY id_kategori DESC');
    return rows;
  } catch {
    return [];
  }
}

// 2. Hapus Kategori (DILINDUNGI KHUSUS SUPER ADMIN)
export async function deleteKategori(id: number) {
  // GEMBOK KEAMANAN & RBAC
  const session = await getAdminSession();
  if (!session) return { error: 'Akses ditolak: Sesi tidak valid.' };
  if (session.role !== 'Super Admin') return { error: 'Akses ditolak: Hanya Super Admin yang dapat menghapus kategori.' };

  try {
    await pool.query('DELETE FROM tb_kategori WHERE id_kategori = ?', [id]);
    revalidatePath('/admin/kategori');
    return { success: true };
  } catch {
    // Error biasanya terjadi karena Foreign Key constraint (kategori masih dipakai produk)
    return { error: 'Gagal menghapus data kategori. Pastikan tidak ada produk yang menggunakan kategori ini.' };
  }
}

// 3. Simpan / Edit Kategori (DILINDUNGI ADMIN)
export async function saveKategori(prevState: unknown, formData: FormData) {
  // GEMBOK KEAMANAN UTAMA
  const session = await getAdminSession();
  if (!session) return { error: 'Akses ditolak: Sesi tidak valid.' };

  const id = formData.get('id_kategori') as string;
  const nama_kategori = formData.get('nama_kategori') as string;

  try {
    if (id) {
      await pool.query(
        'UPDATE tb_kategori SET nama_kategori=? WHERE id_kategori=?',
        [nama_kategori, id]
      );
    } else {
      await pool.query(
        'INSERT INTO tb_kategori (nama_kategori) VALUES (?)',
        [nama_kategori]
      );
    }
    
    revalidatePath('/admin/kategori');
    return { success: true };
  } catch (err) {
    console.error("Save Kategori Error:", err);
    return { error: 'Gagal menyimpan data kategori.' };
  }
}