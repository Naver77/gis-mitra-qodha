import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// 1. READ (MENGAMBIL DATA UNTUK PETA & ADMIN)
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_mitra ORDER BY id DESC');
    
    // Pastikan data lat & lng adalah angka (number) agar peta Leaflet tidak error
    const formattedData = rows.map(row => ({
      ...row,
      lat: Number(row.lat),
      lng: Number(row.lng)
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// 2. CREATE (MENAMBAH MITRA BARU DARI ADMIN)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng } = body;

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO tb_mitra (nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng]
    );

    return NextResponse.json({ message: 'Berhasil ditambah', id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}

// 3. UPDATE (MENGEDIT DATA MITRA DARI ADMIN)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng } = body;

    await pool.query<ResultSetHeader>(
      'UPDATE tb_mitra SET nama_toko=?, pemilik=?, level=?, provinsi=?, kota=?, kecamatan=?, alamat_lengkap=?, lat=?, lng=? WHERE id=?',
      [nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng, id]
    );

    return NextResponse.json({ message: 'Berhasil diupdate' });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: 'Gagal update data' }, { status: 500 });
  }
}

// 4. DELETE (MENGHAPUS DATA MITRA DARI ADMIN)
export async function DELETE(req: Request) {
  try {
    // Mengambil ID dari URL parameter, misal: /api/mitra?id=5
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });

    await pool.query<ResultSetHeader>('DELETE FROM tb_mitra WHERE id=?', [id]);
    
    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: 'Gagal hapus data' }, { status: 500 });
  }
}