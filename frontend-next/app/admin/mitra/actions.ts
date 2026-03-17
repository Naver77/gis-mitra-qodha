'use server';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';

export async function getMitraList() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_mitra ORDER BY id_mitra DESC');
    return rows.map(row => ({
      ...row,
      created_at: row.created_at ? new Date(row.created_at).toISOString() : null
    }));
  } catch {
    return [];
  }
}

export async function deleteMitra(id: number) {
  try {
    await pool.query('DELETE FROM tb_mitra WHERE id_mitra = ?', [id]);
    revalidatePath('/admin/mitra');
    return { success: true };
  } catch { 
    // FIX: Menghapus variabel error tak terpakai
    return { error: 'Gagal menghapus data' };
  }
}

export async function saveMitra(prevState: unknown, formData: FormData) {
  const id = formData.get('id_mitra') as string;
  const nama_toko = formData.get('nama_toko') as string;
  const pemilik = formData.get('pemilik') as string;
  const jenis_mitra = formData.get('jenis_mitra') as string;
  const alamat = formData.get('alamat') as string;
  const latitude = formData.get('latitude') as string;
  const longitude = formData.get('longitude') as string;
  let no_hp = formData.get('no_hp') as string;

  no_hp = no_hp.replace(/[^0-9]/g, '');
  if (no_hp.startsWith('0')) {
    no_hp = '62' + no_hp.substring(1);
  }

  try {
    if (id) {
      await pool.query(
        'UPDATE tb_mitra SET nama_toko=?, pemilik=?, no_hp=?, alamat=?, latitude=?, longitude=?, jenis_mitra=? WHERE id_mitra=?',
        [nama_toko, pemilik, no_hp, alamat, latitude, longitude, jenis_mitra, id]
      );
    } else {
      await pool.query(
        'INSERT INTO tb_mitra (nama_toko, pemilik, no_hp, alamat, latitude, longitude, jenis_mitra, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
        [nama_toko, pemilik, no_hp, alamat, latitude, longitude, jenis_mitra]
      );
    }
    
    revalidatePath('/admin/mitra');
    revalidatePath('/map'); 
    
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'Gagal menyimpan data.' };
  }
}