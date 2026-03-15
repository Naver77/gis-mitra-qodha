import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface ProductRow {
  id_produk: number | string;
  nama_produk: string;
  harga: number | string;
  gender: string;
  nama_kategori: string;
}

export async function GET() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',   
      port: 3308,          
      user: 'root',
      password: '',        
      database: 'db_qodha_gis' 
    });

    const [rows] = await connection.execute(`
      SELECT 
        p.id_produk, 
        p.nama_produk, 
        p.harga, 
        p.gender,
        k.nama_kategori 
      FROM tb_produk p
      JOIN tb_kategori k ON p.id_kategori = k.id_kategori
      ORDER BY k.nama_kategori ASC, p.nama_produk ASC
    `);

    await connection.end();

    const formattedData = (rows as ProductRow[]).map((row) => {
      // LOGIKA CERDAS: Deteksi apakah produk ini tergolong Parfum
      const isParfum = row.nama_kategori.toLowerCase().includes('parfum') || 
                       row.nama_kategori.toLowerCase().includes('kasturi');

      return {
        id_produk: row.id_produk,
        nama_produk: row.nama_produk,
        nama_kategori: row.nama_kategori,
        harga: Number(row.harga),
        gambar: null,
        rating: 5.0,
        terjual: Math.floor(Math.random() * 500) + 50,
        
        // JIKA bukan parfum, data gender akan diubah menjadi NULL (dibuang)
        gender: isParfum ? row.gender : null, 
      };
    });

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error('Database API Error:', error);
    return NextResponse.json(
      { error: 'Gagal terhubung ke database. Cek port dan status MySQL.' },
      { status: 500 }
    );
  }
}