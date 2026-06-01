import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// FITUR KEAMANAN: Fungsi helper untuk memvalidasi JWT di dalam API
async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    await jwtVerify(token, secret);
    return true; 
  } catch {
    return false; 
  }
}

// 1. READ (MENGAMBIL DATA UNTUK PETA)
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_mitra ORDER BY id_mitra DESC');

    const formattedData = rows.map(row => ({
      ...row,
      id: row.id_mitra,
      lat: Number(row.latitude || row.lat || 0), 
      lng: Number(row.longitude || row.lng || 0), 
      level: row.level || row.jenis_mitra
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("GET Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// 2. CREATE (MENAMBAH MITRA BARU) -> DILINDUNGI
export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Akses Ditolak: Sesi tidak valid' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { nama_toko, pemilik, level, provinsi, kota, alamat_lengkap, latitude, longitude, lat, lng } = body;
    
    const finalLat = latitude !== undefined ? latitude : lat;
    const finalLng = longitude !== undefined ? longitude : lng;

    // FIX SQL: Ubah 'alamat_lengkap' menjadi 'alamat' di kueri INSERT
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO tb_mitra (nama_toko, pemilik, jenis_mitra, provinsi, kota, alamat, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nama_toko, pemilik, level, provinsi, kota, alamat_lengkap, finalLat, finalLng]
    );

    return NextResponse.json({ message: 'Berhasil ditambah', id: result.insertId }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("POST Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal menambah data', message: error.message }, { status: 500 });
  }
}

// 3. UPDATE (MENGEDIT DATA MITRA) -> DILINDUNGI
export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Akses Ditolak: Sesi tidak valid' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, nama_toko, pemilik, level, provinsi, kota, alamat_lengkap, latitude, longitude, lat, lng } = body;

    const finalLat = latitude !== undefined ? latitude : lat;
    const finalLng = longitude !== undefined ? longitude : lng;

    // FIX SQL: Ubah 'alamat_lengkap' menjadi 'alamat' di kueri UPDATE
    await pool.query<ResultSetHeader>(
      'UPDATE tb_mitra SET nama_toko=?, pemilik=?, jenis_mitra=?, provinsi=?, kota=?, alamat=?, latitude=?, longitude=? WHERE id_mitra=?',
      [nama_toko, pemilik, level, provinsi, kota, alamat_lengkap, finalLat, finalLng, id]
    );

    return NextResponse.json({ message: 'Berhasil diupdate' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("PUT Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal update data', message: error.message }, { status: 500 });
  }
}

// 4. DELETE (MENGHAPUS DATA MITRA) -> DILINDUNGI
async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    const { payload } = await jwtVerify(token, secret);
    return payload; 
  } catch {
    return null;
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();

  if (!session) return NextResponse.json({ error: 'Akses Ditolak' }, { status: 401 });

  if (session.role !== 'Super Admin') {
    return NextResponse.json({ error: 'Hanya Super Admin yang boleh menghapus data' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID tidak ditemukan' }, { status: 400 });

    await pool.query<ResultSetHeader>('DELETE FROM tb_mitra WHERE id_mitra=?', [id]);

    return NextResponse.json({ message: 'Berhasil dihapus' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("DELETE Mitra Error:", error);
    return NextResponse.json({ error: 'Gagal hapus data', message: error.message }, { status: 500 });
  }
}