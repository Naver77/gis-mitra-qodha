import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// 1. GET: TAMPILKAN DATA KE ADMIN (Dengan Join ke tb_mitra jika ada target mitra)
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT 
        l.*, 
        m.nama_toko AS nama_mitra_target
      FROM tb_leads_prospek l
      LEFT JOIN tb_mitra m ON l.id_mitra_target = m.id_mitra
      ORDER BY l.waktu_klik DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Leads Error:", error);
    return NextResponse.json({ error: 'Gagal mengambil data prospek' }, { status: 500 });
  }
}

// 2. POST: SIMPAN DARI FORM PUBLIK
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama_prospek, no_whatsapp, sumber_halaman, id_mitra_target, konteks_pesan } = body;

    // Bersihkan nomor WA (hapus +, spasi, strip)
    let cleanWa = no_whatsapp.replace(/\D/g, '');
    if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.substring(1); 

    await pool.query<ResultSetHeader>(
      `INSERT INTO tb_leads_prospek 
        (nama_prospek, no_whatsapp, sumber_halaman, id_mitra_target, konteks_pesan, waktu_klik, status_lead) 
       VALUES (?, ?, ?, ?, ?, NOW(), 'Baru')`,
      [nama_prospek, cleanWa, sumber_halaman, id_mitra_target || null, konteks_pesan]
    );

    return NextResponse.json({ message: 'Prospek berhasil dicatat' }, { status: 201 });
  } catch (error) {
    console.error("POST Leads Error:", error);
    return NextResponse.json({ error: 'Gagal merekam data prospek' }, { status: 500 });
  }
}

// 3. PUT: UPDATE STATUS OLEH ADMIN
export async function PUT(req: Request) {
  try {
    const { id_lead, status_lead } = await req.json();
    await pool.query<ResultSetHeader>(
      'UPDATE tb_leads_prospek SET status_lead=? WHERE id_lead=?',
      [status_lead, id_lead]
    );
    return NextResponse.json({ message: 'Status berhasil diubah' });
  } catch (error) {
    console.error("PUT Leads Error:", error);
    return NextResponse.json({ error: 'Gagal update status' }, { status: 500 });
  }
}