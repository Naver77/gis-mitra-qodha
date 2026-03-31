import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// 1. READ (MENGAMBIL DATA UNTUK PETA & ADMIN)
export async function GET() {
  try {
    // FIX: Menggunakan id_mitra sebagai acuan urutan
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_mitra ORDER BY id_mitra DESC');
    
    // Format data agar sesuai standar frontend
    const formattedData = rows.map(row => ({
      ...row,
      id: row.id_mitra, // FIX: Frontend butuh variabel 'id', jadi kita mapping id_mitra ke id
      lat: Number(row.lat || row.latitude || 0), // Support jika di db pakai lat atau latitude
      lng: Number(row.lng || row.longitude || 0),
      level: row.level || row.jenis_mitra // Support level / jenis_mitra
    }));
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("GET Mitra Error:", error);
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
    console.error("POST Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}

// 3. UPDATE (MENGEDIT DATA MITRA DARI ADMIN)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng } = body;

    // FIX: WHERE harus menggunakan id_mitra
    await pool.query<ResultSetHeader>(
      'UPDATE tb_mitra SET nama_toko=?, pemilik=?, level=?, provinsi=?, kota=?, kecamatan=?, alamat_lengkap=?, lat=?, lng=? WHERE id_mitra=?',
      [nama_toko, pemilik, level, provinsi, kota, kecamatan, alamat_lengkap, lat, lng, id]
    );

    return NextResponse.json({ message: 'Berhasil diupdate' });
  } catch (error) {
    console.error("PUT Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal update data' }, { status: 500 });
  }
}

// 4. DELETE (MENGHAPUS DATA MITRA DARI ADMIN)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });

    // FIX: WHERE harus menggunakan id_mitra
    await pool.query<ResultSetHeader>('DELETE FROM tb_mitra WHERE id_mitra=?', [id]);
    
    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    console.error("DELETE Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal hapus data' }, { status: 500 });
  }
}