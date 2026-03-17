import React from 'react';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';

// Fungsi Fetch Data Langsung di Komponen Server!
async function getDashboardStats() {
  try {
    const [produk] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_produk');
    const [kategori] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_kategori');
    const [mitra] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_mitra');

    return {
      produk: produk[0]?.total || 0,
      kategori: kategori[0]?.total || 0,
      mitra: mitra[0]?.total || 0,
    };
  } catch { 
    // FIX: Menghapus parameter error secara total
    console.warn("Beberapa tabel belum dibuat, menggunakan fallback nilai 0.");
    return { produk: 0, kategori: 0, mitra: 0 };
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* HEADER DASHBOARD */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1 font-medium">Ringkasan aktivitas dan data sistem kemitraan Qodha.</p>
      </div>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        
        {/* BENTO ITEM 1: Banner Utama (Span 4 kolom di desktop) */}
        <div className="md:col-span-4 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-10 text-white shadow-xl shadow-gray-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black mb-3">Selamat Datang di Panel Admin! 🚀</h2>
            <p className="opacity-80 text-sm md:text-base max-w-2xl leading-relaxed">
              Sistem WebGIS ini siap digunakan untuk memetakan penyebaran mitra Qodha Aromatic di seluruh Indonesia secara Real-Time.
            </p>
          </div>
        </div>

        {/* BENTO ITEM 2: Stat Card (Mitra) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-store"></i>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Mitra</p>
            <h3 className="text-4xl font-black text-gray-900">{stats.mitra}</h3>
          </div>
        </div>

        {/* BENTO ITEM 3: Stat Card (Produk) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-box-open"></i>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Katalog Produk</p>
            <h3 className="text-4xl font-black text-gray-900">{stats.produk}</h3>
          </div>
        </div>

        {/* BENTO ITEM 4: Stat Card (Kategori) */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-tags"></i>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Kategori</p>
            <h3 className="text-4xl font-black text-gray-900">{stats.kategori}</h3>
          </div>
        </div>

        {/* BENTO ITEM 5: System Status */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-blend-soft-light">
          <div className="w-12 h-12 bg-gray-50 text-gray-700 rounded-2xl flex items-center justify-center text-xl mb-4">
            <i className="fa-solid fa-server"></i>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Status Database</p>
            <div className="flex items-center gap-2 text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 relative"></span>
              Online & Stabil
            </div>
          </div>
        </div>

        {/* BENTO ITEM 6: Quick Actions (Span 2 kolom) */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100">
          <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-bolt text-brand-gold"></i> Aksi Cepat
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/mitra" className="flex flex-col items-center justify-center py-6 bg-gray-50 hover:bg-brand-gold/10 hover:border-brand-gold/30 border border-gray-100 rounded-2xl font-bold text-gray-700 hover:text-brand-gold transition-all group text-sm text-center">
              <i className="fa-solid fa-map-pin text-2xl mb-2 text-gray-400 group-hover:text-brand-gold transition-colors"></i> 
              Tambah Mitra
            </Link>
            <Link href="/admin/produk" className="flex flex-col items-center justify-center py-6 bg-gray-50 hover:bg-gray-900 border border-gray-100 rounded-2xl font-bold text-gray-700 hover:text-white transition-all group text-sm text-center">
              <i className="fa-solid fa-plus text-2xl mb-2 text-gray-400 group-hover:text-white transition-colors"></i> 
              Kelola Produk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}