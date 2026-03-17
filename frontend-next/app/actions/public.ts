'use server';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function getHeroProducts() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_produk ORDER BY id_produk DESC LIMIT 5');
    return rows;
  } catch {
    return [];
  }
}

export async function getBestSellers(limit: number = 6) {
  try {
    // Mengambil produk secara acak sebagai best seller tiruan (seperti di PHP Anda)
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM tb_produk ORDER BY RAND() LIMIT ${limit}`);
    return rows;
  } catch {
    return [];
  }
}

// Untuk mengambil Price List Kemitraan (Catatan: Pastikan tabel tb_harga_kemitraan ada)
export async function getPricelistData() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_harga_kemitraan ORDER BY id_harga ASC');
    return rows;
  } catch {
    return [];
  }
}

// Mengambil kategori lalu mengelompokkannya (Fungsi logika kompleks di PHP)
export async function getGroupedCategories() {
  try {
    const main_menus: Record<string, string> = {
      'Dupa': 'dupa', 
      'Bukhur': 'bukhur', 
      'Parfum': 'parfum', 
      'Perlengkapan': 'alat', 
      'Paket Hemat': 'paket'
    };
    
    const [categories] = await pool.query<RowDataPacket[]>('SELECT * FROM tb_kategori ORDER BY nama_kategori ASC');
    
    // FIX: Mengganti 'any[]' menjadi 'RowDataPacket[]' agar tipe data konsisten dengan hasil query MySQL
    const grouped_data: Record<string, RowDataPacket[]> = {};
    
    for (const [menuLabel, keyword] of Object.entries(main_menus)) {
      grouped_data[menuLabel] = [];
      for (const cat of categories) {
        let match = false;
        const catName = cat.nama_kategori.toLowerCase();
        
        if (menuLabel === 'Perlengkapan') {
          if (catName.includes('aksesoris') || catName.includes('alat') || catName.includes('arang') || catName.includes('prapen')) {
            match = true;
          }
        } else {
          if (catName.includes(keyword)) match = true;
        }
        
        if (match) grouped_data[menuLabel].push(cat);
      }
    }
    
    return { main_menus, grouped_data };
  } catch {
    return { main_menus: {}, grouped_data: {} };
  }
}