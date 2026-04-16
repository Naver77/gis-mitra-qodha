import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_mitra');

    const features = rows.map((row) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        // Pastikan urutannya [Longitude, Latitude] untuk format GeoJSON standar
        coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)]
      },
      properties: {
        id: row.id_mitra,
        nama: row.nama_toko,
        pemilik: row.pemilik,
        alamat: row.alamat,
        hp: row.no_hp,
        jenis: row.jenis_mitra,
        // Fallback gambar jika kosong
        foto: row.foto_toko || 'default_store.png' 
      }
    }));

    // Mengembalikan response dengan header application/json secara otomatis
    return NextResponse.json({ 
      type: 'FeatureCollection', 
      features 
    });

  } catch (error) {
    console.error('Error fetching map data:', error);
    // Jika error, kembalikan data kosong agar peta tidak crash
    return NextResponse.json({ type: 'FeatureCollection', features: [] }, { status: 500 });
  }
}