import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const dynamic = 'force-dynamic';
export const revalidate = 0; 

// FIX: JANGAN hapus kota/kabupaten, tapi SERAGAMKAN.
const normalizeCityName = (name: string) => {
  if (!name) return '';
  let clean = name.toLowerCase().trim();
  
  // Standarisasi: "Kab." jadi "Kabupaten", "Kota Adm." jadi "Kota"
  clean = clean.replace(/^(kota\s+administrasi|adm\.|administrasi)\s+/gi, 'kota ');
  clean = clean.replace(/^(kabupaten\s+administrasi|kab\.)\s+/gi, 'kabupaten ');
  clean = clean.replace(/^dki\s+/gi, '');
  
  return clean.replace(/\s+/g, ' ').trim();
};

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT kota, COUNT(id_mitra) as total_mitra 
      FROM tb_mitra 
      WHERE kota IS NOT NULL 
        AND kota != ''
        AND latitude IS NOT NULL 
        AND longitude IS NOT NULL 
        AND latitude != '0' 
        AND longitude != '0'
      GROUP BY kota
    `);
    
    const summary: Record<string, number> = {};
    
    rows.forEach(row => {
      const cleanCity = normalizeCityName(row.kota);
      summary[cleanCity] = (summary[cleanCity] || 0) + Number(row.total_mitra);
    });

    return NextResponse.json(summary);
    
  } catch (error) {
    console.error("API Rekap Mitra Error:", error);
    return NextResponse.json({}, { status: 500 });
  }
}