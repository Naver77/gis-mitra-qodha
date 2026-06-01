import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';
export const revalidate = 0; 

const normalizeCityName = (name: string) => {
  if (!name) return 'tidak diketahui';
  let clean = name.toLowerCase().trim();
  
  // FIX KHUSUS: TANGKAP DAN LEBUR SEMUA PECAHAN JAKARTA JADI 1 KESATUAN!
  if (clean.includes('jakarta') || clean === 'dki') {
    return 'dki jakarta';
  }
  
  // Standarisasi wilayah di luar Jakarta
  clean = clean.replace(/^(kabupaten\s+administrasi|kabupaten|kab\.|kab)\s*/gi, 'kabupaten ');
  clean = clean.replace(/^(kota\s+administrasi|kota\s+adm\.|kota\s+adm|kota\.|kota)\s*/gi, 'kota ');
  
  return clean.replace(/\s+/g, ' ').trim();
};

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT 
        COALESCE(NULLIF(TRIM(kota), ''), 'Tidak Diketahui') AS wilayah_kota,
        COUNT(id_mitra) as total_mitra 
      FROM tb_mitra 
      WHERE 
        latitude IS NOT NULL 
        AND longitude IS NOT NULL 
        AND latitude != ''
        AND longitude != ''
        AND latitude != '0' 
        AND longitude != '0'
      GROUP BY wilayah_kota
    `);
    
    const summary: Record<string, number> = {};
    
    rows.forEach(row => {
      const cleanCity = normalizeCityName(row.wilayah_kota);
      // Jika ada beberapa mitra di Jaksel & Jaktim, angkanya akan diakumulasi ke 'dki jakarta'
      summary[cleanCity] = (summary[cleanCity] || 0) + Number(row.total_mitra);
    });

    return NextResponse.json(summary);
    
  } catch (error) {
    console.error("API Rekap Mitra Error:", error);
    return NextResponse.json({}, { status: 500 });
  }
}