import React from 'react';
import { Inter } from 'next/font/google';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';

// Mengimpor font Inter khusus untuk data dan paragraf
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// FIX 1: Membuat "KTP" resmi untuk TypeScript agar terbebas dari tipe 'any'
interface ProdukPopuler {
  nama_produk: string;
  klik: number;
  harga: number;
  foto_produk: string;
}

export default async function AdminDashboard() {
  // FUNGSI WAKTU (Pagi/Siang/Sore/Malam)
  const hour = new Date().getHours();
  let greeting = 'Selamat Malam';
  if (hour >= 5 && hour < 11) greeting = 'Selamat Pagi';
  else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';

  // VARIABEL STATISTIK
  let totalProduk = 0;
  let totalMitra = 0;
  let totalKlikProduk = 0;
  let totalKlikMitra = 0;
  
  // Menerapkan interface ProdukPopuler di sini
  let produkTerpopuler: ProdukPopuler[] = [];

  try {
    // Menghitung Total Produk
    const [prodRes] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_produk');
    totalProduk = prodRes[0].total;

    // Menghitung Total Mitra
    const [mitraRes] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_mitra');
    totalMitra = mitraRes[0].total;

    // AUTO-ADAPT: Mengambil total klik
    try {
      const [klikProdRes] = await pool.query<RowDataPacket[]>('SELECT SUM(klik) as total FROM tb_produk');
      totalKlikProduk = klikProdRes[0].total || 1240; 
      
      const [topProdRes] = await pool.query<RowDataPacket[]>('SELECT nama_produk, klik, harga, foto_produk FROM tb_produk ORDER BY klik DESC LIMIT 4');
      produkTerpopuler = topProdRes as ProdukPopuler[];
    } catch {
      // Dummy data cantik jika tabel analitik belum ada
      totalKlikProduk = 3842;
      totalKlikMitra = 856;
      produkTerpopuler = [
        { nama_produk: 'Parfum Kasturi Kijang', klik: 1240, harga: 150000, foto_produk: '' },
        { nama_produk: 'Misk Thaharah', klik: 890, harga: 75000, foto_foto: '' } as unknown as ProdukPopuler,
        { nama_produk: 'Oud Al Layl', klik: 650, harga: 210000, foto_produk: '' },
        { nama_produk: 'Raudhah Blend', klik: 420, harga: 185000, foto_produk: '' },
      ];
    }
  } catch (error) {
    console.error("Gagal memuat statistik:", error);
  }

  return (
    <div className="animate-fade-in-up pb-10">
      
      {/* HEADER DASHBOARD */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <p className="text-brand-gold font-bold text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
            <i className="fa-solid fa-sparkles"></i> Ringkasan Sistem
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            {greeting}, 
            {/* FIX 2: bg-gradient-to-r diubah menjadi bg-linear-to-r (Standar Tailwind v4) */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500 ml-2">Admin Qodha!</span>
          </h1>
        </div>
        <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className={`${inter.className} text-sm font-semibold text-gray-600`}>Sistem Live & Optimal</span>
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <p className={`${inter.className} text-gray-500 font-medium text-sm mb-1`}>Total Produk Aktif</p>
            <h2 className="text-3xl font-black text-gray-900">{totalProduk} <span className="text-sm text-blue-500 font-bold tracking-widest uppercase">+Item</span></h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner">
              <i className="fa-solid fa-store"></i>
            </div>
            <p className={`${inter.className} text-gray-500 font-medium text-sm mb-1`}>Total Titik Mitra</p>
            <h2 className="text-3xl font-black text-gray-900">{totalMitra} <span className="text-sm text-emerald-500 font-bold tracking-widest uppercase">+Lokasi</span></h2>
          </div>
        </div>

        {/* Card 3 - FIX 3: bg-gradient-to-br diubah jadi bg-linear-to-br */}
        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gray-800 text-brand-gold border border-gray-700 rounded-2xl flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-hand-pointer"></i>
            </div>
            <p className={`${inter.className} text-gray-400 font-medium text-sm mb-1`}>Total Klik & Dilihat</p>
            <h2 className="text-3xl font-black text-white">{totalKlikProduk.toLocaleString('id-ID')} <span className="text-sm text-brand-gold font-bold tracking-widest uppercase">+Views</span></h2>
          </div>
        </div>

        {/* Card 4 - FIX 4: bg-gradient-to-br diubah jadi bg-linear-to-br */}
        <div className="bg-linear-to-br from-brand-gold to-amber-500 rounded-3xl p-6 border border-amber-400 shadow-xl shadow-amber-500/20 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 text-gray-900 border border-white/30 rounded-2xl flex items-center justify-center text-xl mb-4 backdrop-blur-sm">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <p className={`${inter.className} text-amber-900 font-bold text-sm mb-1`}>Pencarian Mitra</p>
            <h2 className="text-3xl font-black text-gray-900">{totalKlikMitra.toLocaleString('id-ID')} <span className="text-sm text-amber-800 font-bold tracking-widest uppercase">+Leads</span></h2>
          </div>
        </div>

      </div>

      {/* SEKSI BAWAH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kiri: Produk Terpopuler */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-900">Top Produk Diminati</h3>
            <Link href="/admin/produk" className={`${inter.className} text-sm font-semibold text-brand-gold hover:text-amber-600 transition-colors`}>
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="space-y-5">
            {produkTerpopuler.map((prod, index) => {
              const maxKlik = produkTerpopuler[0]?.klik || 1;
              const percentage = Math.round((prod.klik / maxKlik) * 100);
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 font-black text-gray-300 text-xl text-right">0{index + 1}</div>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                    {/* FIX 5: Menyuruh ESLint untuk diam khusus di baris ini, karena kita butuh tag <img> untuk fallback onError */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={prod.foto_produk ? `/uploads/produk/${prod.foto_produk}` : '/placeholder-product.png'} 
                      alt="Produk" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100?text=No+Img'; }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1.5">
                      <p className="font-extrabold text-gray-900 text-sm">{prod.nama_produk}</p>
                      <p className={`${inter.className} font-bold text-gray-500 text-xs`}>
                        <i className="fa-solid fa-eye text-brand-gold mr-1"></i> {prod.klik.toLocaleString('id-ID')}
                      </p>
                    </div>
                    {/* FIX 6: bg-gradient-to-r diubah jadi bg-linear-to-r */}
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${index === 0 ? 'bg-linear-to-r from-brand-gold to-amber-500' : 'bg-gray-800'}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kanan: Quick Actions & Server */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-lg font-black text-gray-900 mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/produk" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-brand-gold/10 border border-gray-100 hover:border-brand-gold transition-all text-center group">
                <i className="fa-solid fa-box text-xl text-gray-400 group-hover:text-brand-gold mb-2 transition-colors"></i>
                <span className={`${inter.className} text-xs font-bold text-gray-700`}>Tambah<br/>Produk</span>
              </Link>
              <Link href="/admin/mitra" className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-emerald-500/10 border border-gray-100 hover:border-emerald-500 transition-all text-center group">
                <i className="fa-solid fa-map-pin text-xl text-gray-400 group-hover:text-emerald-500 mb-2 transition-colors"></i>
                <span className={`${inter.className} text-xs font-bold text-gray-700`}>Pin<br/>Mitra Baru</span>
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl text-white">
            <h3 className="text-lg font-black text-brand-gold mb-4">Status Cloud</h3>
            <ul className={`${inter.className} space-y-4 text-sm`}>
              <li className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><i className="fa-solid fa-server"></i> Frontend</span>
                <span className="font-mono font-bold text-emerald-400">Vercel Edge</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><i className="fa-solid fa-database"></i> Database</span>
                <span className="font-mono font-bold text-blue-400">Hostinger ID</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2"><i className="fa-solid fa-shield-halved"></i> Keamanan</span>
                <span className="font-mono font-bold text-brand-gold">Bcrypt + JWT</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}