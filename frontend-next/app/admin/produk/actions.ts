'use server';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

// 1. Ambil Data Produk (JOIN dengan Kategori)
export async function getProdukList() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT p.*, k.nama_kategori 
      FROM tb_produk p 
      LEFT JOIN tb_kategori k ON p.id_kategori = k.id_kategori 
      ORDER BY p.id_produk DESC
    `);
    return rows;
  } catch {
    return [];
  }
}

// 2. Ambil Kategori untuk Dropdown
export async function getKategoriOptions() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id_kategori, nama_kategori FROM tb_kategori ORDER BY nama_kategori ASC');
    return rows;
  } catch {
    return [];
  }
}

// 3. Hapus Data & Hapus Fisik Gambar
export async function deleteProduk(id: number, imgName: string) {
  try {
    await pool.query('DELETE FROM tb_produk WHERE id_produk = ?', [id]);
    
    if (imgName) {
      const filePath = path.join(process.cwd(), 'public/uploads/produk', imgName);
      try { await unlink(filePath); } catch { /* Abaikan jika gambar fisik tidak ditemukan */ }
    }
    
    revalidatePath('/admin/produk');
    return { success: true };
  } catch {
    return { error: 'Gagal menghapus data produk.' };
  }
}

// 4. Simpan Data & Upload Gambar
export async function saveProduk(prevState: unknown, formData: FormData) {
  const id = formData.get('id_produk') as string;
  const nama_produk = formData.get('nama_produk') as string;
  const id_kategori = formData.get('id_kategori') as string;
  const harga = formData.get('harga') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const gender = formData.get('gender') as string;
  
  const foto = formData.get('foto') as File | null;
  let foto_lama = formData.get('foto_lama') as string;

  // Proses Upload Jika Ada File Gambar Baru
  if (foto && foto.size > 0) {
    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat direktori jika belum ada
    const uploadDir = path.join(process.cwd(), 'public/uploads/produk');
    try { await mkdir(uploadDir, { recursive: true }); } catch {}

    const ext = foto.name.split('.').pop();
    const newName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const filePath = path.join(uploadDir, newName);

    await writeFile(filePath, buffer);

    // Hapus foto lama agar penyimpanan server tidak penuh
    if (foto_lama) {
      try { await unlink(path.join(uploadDir, foto_lama)); } catch {}
    }
    foto_lama = newName; // Timpa nama foto di database
  }

  try {
    if (id) {
      await pool.query(
        'UPDATE tb_produk SET id_kategori=?, nama_produk=?, harga=?, deskripsi=?, gender=?, foto_produk=? WHERE id_produk=?',
        [id_kategori, nama_produk, harga, deskripsi, gender, foto_lama, id]
      );
    } else {
      await pool.query(
        'INSERT INTO tb_produk (id_kategori, nama_produk, harga, deskripsi, foto_produk, created_at, gender) VALUES (?, ?, ?, ?, ?, NOW(), ?)',
        [id_kategori, nama_produk, harga, deskripsi, foto_lama, gender]
      );
    }
    
    revalidatePath('/admin/produk');
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'Gagal menyimpan data produk.' };
  }
}