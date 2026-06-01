'use server';

import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
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

// ==============================================================
// FUNGSI BANTU: Mengubah File menjadi Base64
// ==============================================================
async function fileToBase64(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

// 1. Ambil Data Produk (Aman untuk Publik)
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

// 2. Ambil Kategori untuk Dropdown (Aman untuk Publik)
export async function getKategoriOptions() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id_kategori, nama_kategori FROM tb_kategori ORDER BY nama_kategori ASC');
    return rows;
  } catch {
    return [];
  }
}

// 3. Hapus Data (DILINDUNGI KHUSUS SUPER ADMIN)
export async function deleteProduk(id: number) {
  // GEMBOK KEAMANAN & RBAC
  const session = await getAdminSession();
  if (!session) return { error: 'Akses ditolak: Sesi tidak valid.' };
  if (session.role !== 'Super Admin') return { error: 'Akses ditolak: Hanya Super Admin yang dapat menghapus produk.' };

  try {
    await pool.query('DELETE FROM tb_produk WHERE id_produk = ?', [id]);
    revalidatePath('/admin/produk');
    return { success: true };
  } catch {
    return { error: 'Gagal menghapus data produk.' };
  }
}

// 4. Simpan Data & Upload Gambar (DILINDUNGI ADMIN)
export async function saveProduk(prevState: unknown, formData: FormData) {
  // GEMBOK KEAMANAN UTAMA
  const session = await getAdminSession();
  if (!session) return { error: 'Akses ditolak: Sesi tidak valid.' };

  const id = formData.get('id_produk') as string;
  const nama_produk = formData.get('nama_produk') as string;
  const id_kategori = formData.get('id_kategori') as string;
  const harga = formData.get('harga') as string;
  const deskripsi = formData.get('deskripsi') as string;
  const gender = formData.get('gender') as string;
  
  const foto = formData.get('foto') as File | null;
  let foto_lama = formData.get('foto_lama') as string;

  // PROSES KEAMANAN & UPLOAD FILE
  if (foto && foto.size > 0) {
    // 1. Validasi Ukuran (Maks 1MB)
    if (foto.size > 1048576) {
      throw new Error("Ukuran file melebihi batas 1MB");
    }
    
    // 2. Validasi MIME Type (Cegah Injeksi Script!)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(foto.type)) {
      throw new Error("Tipe file tidak diizinkan. Gunakan JPG, PNG, atau WEBP.");
    }
    
    // Konversi aman
    foto_lama = await fileToBase64(foto);
  }

  try {
    if (id) {
      await pool.query<ResultSetHeader>(
        'UPDATE tb_produk SET id_kategori=?, nama_produk=?, harga=?, deskripsi=?, gender=?, foto_produk=? WHERE id_produk=?',
        [id_kategori, nama_produk, harga, deskripsi, gender, foto_lama, id]
      );
    } else {
      await pool.query<ResultSetHeader>(
        'INSERT INTO tb_produk (id_kategori, nama_produk, harga, deskripsi, foto_produk, created_at, gender) VALUES (?, ?, ?, ?, ?, NOW(), ?)',
        [id_kategori, nama_produk, harga, deskripsi, foto_lama, gender]
      );
    }
    
    revalidatePath('/admin/produk');
    return { success: true };
  } catch (err) {
    console.error("Save Produk Error:", err);
    return { error: 'Gagal menyimpan data produk.' };
  }
}