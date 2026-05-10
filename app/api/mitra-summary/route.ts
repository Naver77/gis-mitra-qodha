import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// LEVEL 2: Caching Next.js (ISR)
// Menyimpan hasil perhitungan ke memori Vercel selama 1 Jam (3600 detik).
// Artinya, database Hostinger hanya akan bekerja 1x dalam 1 jam, sisanya instan dari memori!
export const revalidate = 3600; 

export async function GET() {
  try {
    // LEVEL 1: Agregasi di Level Database (MySQL berhitung sangat cepat)
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT kota, COUNT(id_mitra) as total_mitra 
      FROM tb_mitra 
      WHERE kota IS NOT NULL AND kota != ''
      GROUP BY kota
    `);
    
    // Membentuk data menjadi Object (Key-Value) agar dibaca Frontend dalam O(1) Millisecond
    // Format Jadinya: { "bogor": 15, "depok": 8, "jakarta selatan": 4 }
    const summary: Record<string, number> = {};
    
    rows.forEach(row => {
      // Membersihkan nama kota untuk berjaga-jaga
      const cleanCity = row.kota.toLowerCase().replace(/^(kota|kabupaten|kab\.|adm\.)\s+/g, '').trim();
      summary[cleanCity] = (summary[cleanCity] || 0) + Number(row.total_mitra);
    });

    return NextResponse.json(summary);
    
  } catch (error) {
    console.error("API Rekap Mitra Error:", error);
    return NextResponse.json({}, { status: 500 });
  }
}