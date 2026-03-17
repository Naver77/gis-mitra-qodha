import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Membaca payload (body) yang dikirim dari Frontend (Fetch API)
    const body = await request.json();
    const { type, id } = body;

    if (!type || !id) {
      return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
    }

    // Insert ke tabel tb_log_aktivitas
    await pool.query(
      'INSERT INTO tb_log_aktivitas (tipe_log, id_ref, created_at) VALUES (?, ?, NOW())',
      [type, id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error saving log:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}