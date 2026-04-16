'use server';

import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function getTopProduk() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT p.nama_produk, COUNT(l.id_log) as total_klik 
      FROM tb_log_aktivitas l
      JOIN tb_produk p ON l.id_ref = p.id_produk
      WHERE l.tipe_log = 'klik_produk'
      GROUP BY l.id_ref
      ORDER BY total_klik DESC LIMIT 5
    `);
    return rows;
  } catch {
    return [];
  }
}

export async function getTopMitra() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT m.nama_toko, m.alamat, COUNT(l.id_log) as total_klik 
      FROM tb_log_aktivitas l
      JOIN tb_mitra m ON l.id_ref = m.id_mitra
      WHERE l.tipe_log = 'klik_mitra'
      GROUP BY l.id_ref
      ORDER BY total_klik DESC LIMIT 5
    `);
    return rows;
  } catch {
    return [];
  }
}