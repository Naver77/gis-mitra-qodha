import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

// API Khusus Analitik Publik (Menghitung Views Produk)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id_produk } = body;

    // 1. Validasi Input
    if (!id_produk || isNaN(Number(id_produk))) {
      return NextResponse.json({ error: 'ID Produk tidak valid' }, { status: 400 });
    }

    // 2. Operasi Atomic Update: Sangat ringan dan cepat!
    // Alih-alih membuat baris baru, kita cukup tambahkan +1 ke kolom 'views'
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE tb_produk SET views = views + 1 WHERE id_produk = ?',
      [Number(id_produk)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'View recorded' });

  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}