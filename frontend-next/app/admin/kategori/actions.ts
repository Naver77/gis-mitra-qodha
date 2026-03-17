'use server';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';

export async function getKategoriList() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_kategori ORDER BY id_kategori DESC');
    return rows;
  } catch {
    return [];
  }
}

export async function deleteKategori(id: number) {
  try {
    await pool.query('DELETE FROM tb_kategori WHERE id_kategori = ?', [id]);
    revalidatePath('/admin/kategori');
    return { success: true };
  } catch {
    return { error: 'Gagal menghapus data kategori. Pastikan tidak ada produk yang menggunakan kategori ini.' };
  }
}

export async function saveKategori(prevState: unknown, formData: FormData) {
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
    console.error(err);
    return { error: 'Gagal menyimpan data kategori.' };
  }
}