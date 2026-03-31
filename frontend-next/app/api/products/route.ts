import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// 1. READ (GET) - Mengambil Data Produk beserta nama kategorinya
export async function GET() {
  try {
    // MENGGUNAKAN POOL (Sangat aman untuk Production & Mencegah DB Crash)
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT 
        p.*, 
        k.nama_kategori 
      FROM tb_produk p
      LEFT JOIN tb_kategori k ON p.id_kategori = k.id_kategori
      ORDER BY p.id_produk DESC
    `);

    // Format data agar sesuai standar frontend
    const formattedData = rows.map((row) => ({
      ...row,
      harga: Number(row.harga),
      // Dummy data (Rating & Terjual) khusus untuk tampilan Katalog B2C jika dipanggil dari public
      rating: 5.0,
      terjual: Math.floor(Math.random() * 500) + 50,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('API GET Products Error:', error);
    return NextResponse.json({ error: 'Gagal terhubung ke database' }, { status: 500 });
  }
}

// 2. CREATE & UPDATE & DELETE
// Catatan Skripsi: Untuk operasi insert/update/delete form dengan FOTO (multipart/form-data), 
// Next.js App Router merekomendasikan penggunaan Route Handler atau Server Actions spesifik.
// Karena kita memakai REST API di halaman ini, kita pastikan frontend mengirim JSON untuk data dasar
// atau mengandalkan file actions.ts milik Anda untuk upload foto fisik.

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });

    // Hapus data dari database
    await pool.query<ResultSetHeader>('DELETE FROM tb_produk WHERE id_produk=?', [id]);
    
    // (Opsional) Logika untuk menghapus file fisik foto_produk dari folder public/uploads bisa ditambahkan di sini

    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: 'Gagal hapus data' }, { status: 500 });
  }
}