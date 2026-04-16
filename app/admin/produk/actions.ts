'use server';

import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { revalidatePath } from 'next/cache';
// INFO: fs/promises dan path dihapus karena Vercel menggunakan Serverless (Read-Only)

// ==============================================================
// FUNGSI BANTU: Mengubah File menjadi Base64 (Aman untuk Vercel)
// ==============================================================
async function fileToBase64(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

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

// 3. Hapus Data
// FIX ESLINT: Menggunakan komentar disable untuk bypass strict linter tanpa merusak tipe data dari frontend
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteProduk(id: number, _imgName: string) {
  try {
    await pool.query('DELETE FROM tb_produk WHERE id_produk = ?', [id]);
    
    // INFO: Fungsi unlink(filePath) dihapus. 
    // Karena menggunakan Base64, saat baris database di atas dihapus, maka gambarnya otomatis terhapus dari sistem.
    
    revalidatePath('/admin/produk');
    return { success: true };
  } catch {
    return { error: 'Gagal menghapus data produk.' };
  }
}

// 4. Simpan Data & Upload Gambar (Base64)
export async function saveProduk(prevState: unknown, formData: FormData) {
  const id = formData.get('id_produk') as string;
  const nama_produk = formData.get('nama_produk') as string;
  const id_kategori = formData.get('id_kategori') as string;
  const harga = formData.get('harga') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const gender = formData.get('gender') as string;
  
  const foto = formData.get('foto') as File | null;
  let foto_lama = formData.get('foto_lama') as string;

  // Proses Convert Jika Ada File Gambar Baru
  if (foto && foto.size > 0) {
    // Batasi ukuran maksimal 1MB (1048576 bytes) agar Database aman
    if (foto.size > 1048576) {
      throw new Error("Ukuran file melebihi 1MB");
    }
    
    // Konversi file fisik menjadi teks Base64 lalu timpa variabel foto_lama
    foto_lama = await fileToBase64(foto);
  }

  try {
    if (id) {
      // INFO: Kueri persis seperti buatan Anda, lengkap dengan `gender`
      await pool.query<ResultSetHeader>(
        'UPDATE tb_produk SET id_kategori=?, nama_produk=?, harga=?, deskripsi=?, gender=?, foto_produk=? WHERE id_produk=?',
        [id_kategori, nama_produk, harga, deskripsi, gender, foto_lama, id]
      );
    } else {
      // INFO: Kueri persis seperti buatan Anda, lengkap dengan `created_at` (NOW()) dan `gender`
      await pool.query<ResultSetHeader>(
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