import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// FITUR KEAMANAN: Fungsi Helper untuk mengecek Sesi Admin
async function isAdmin() {
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

// 1. GET (DILINDUNGI): TAMPILKAN DATA KE ADMIN
export async function GET() {
  // GEMBOK KEAMANAN
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Akses Ditolak: Sesi Tidak Valid' }, { status: 401 });
  }

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

// 2. POST (TERBUKA): SIMPAN DARI FORM PUBLIK
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama_prospek, no_whatsapp, sumber_halaman, id_mitra_target, konteks_pesan } = body;

    // FAKTA KEAMANAN: Sanitasi Dasar (Anti-XSS & Anti-Truncate)
    // Cegah injeksi HTML/Script dengan membuang kurung siku < dan >
    const safeNama = (nama_prospek || 'Anonim').toString().replace(/[<>]/g, '');
    const safeKonteks = (konteks_pesan || '').toString().replace(/[<>]/g, '').substring(0, 500); // Batasi maksimal 500 karakter

    // Bersihkan nomor WA
    let cleanWa = (no_whatsapp || '').toString().replace(/\D/g, '');
    if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.substring(1); 

    await pool.query<ResultSetHeader>(
      `INSERT INTO tb_leads_prospek 
        (nama_prospek, no_whatsapp, sumber_halaman, id_mitra_target, konteks_pesan, waktu_klik, status_lead) 
       VALUES (?, ?, ?, ?, ?, NOW(), 'Belum Dibalas')`, // FIX: Ingat ENUM Anda sudah diganti jadi 'Belum Dibalas'!
      [safeNama, cleanWa, sumber_halaman, id_mitra_target || null, safeKonteks]
    );

    return NextResponse.json({ message: 'Prospek berhasil dicatat' }, { status: 201 });
  } catch (error) {
    console.error("POST Leads Error:", error);
    return NextResponse.json({ error: 'Gagal merekam data prospek' }, { status: 500 });
  }
}

// 3. PUT (DILINDUNGI): UPDATE STATUS OLEH ADMIN
export async function PUT(req: Request) {
  // GEMBOK KEAMANAN
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Akses Ditolak: Sesi Tidak Valid' }, { status: 401 });
  }

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