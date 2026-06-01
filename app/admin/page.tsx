import React from 'react';
import { Inter } from 'next/font/google';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import Link from 'next/link';
import RealtimeHeader from './RealtimeHeader';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

interface ProdukPopuler {
  nama_produk: string;
  views: number;
  harga: number;
  foto_produk: string;
}

interface ProspekTerbaru {
  nama_prospek: string;
  waktu_klik: string;
  status_lead: string;
}

const getImageUrl = (foto: string | null | undefined) => {
  if (!foto) return 'https://placehold.co/100x100?text=No+Image';
  if (foto.startsWith('data:image') || foto.startsWith('http')) return foto;
  return `/uploads/produk/${foto}`;
};

// Fungsi format waktu (Server-side aman)
const formatWaktuSingkat = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ' - ' + 
         date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

export default async function AdminDashboard() {
  let totalProduk = 0;
  let totalMitra = 0;
  let totalViews = 0;
  let totalProspek = 0; 
  
  let produkTerpopuler: ProdukPopuler[] = [];
  let prospekTerbaru: ProspekTerbaru[] = [];

  try {
    const [prodRes] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_produk');
    totalProduk = Number(prodRes[0]?.total || 0);

    const [mitraRes] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_mitra');
    totalMitra = Number(mitraRes[0]?.total || 0);

    const [prospekRes] = await pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM tb_leads_prospek');
    totalProspek = Number(prospekRes[0]?.total || 0);

    // MENGGUNAKAN KOLOM VIEWS SESUAI DATABASE TERBARU
    const [viewsRes] = await pool.query<RowDataPacket[]>('SELECT SUM(views) as total FROM tb_produk');
    totalViews = Number(viewsRes[0]?.total || 0); 
    
    const [topProdRes] = await pool.query<RowDataPacket[]>('SELECT nama_produk, views, harga, foto_produk FROM tb_produk ORDER BY views DESC LIMIT 4');
    produkTerpopuler = topProdRes as ProdukPopuler[];

    // MENGAMBIL DATA PROSPEK TERBARU UNTUK WIDGET
    const [recentLeadsRes] = await pool.query<RowDataPacket[]>('SELECT nama_prospek, waktu_klik, status_lead FROM tb_leads_prospek ORDER BY waktu_klik DESC LIMIT 4');
    prospekTerbaru = recentLeadsRes as ProspekTerbaru[];

  } catch (error) {
    console.error("Gagal memuat statistik:", error);
  }

  return (
    <div className="animate-fade-in-up pb-4">
      
      {/* HEADER REAL-TIME */}
      <RealtimeHeader />

      {/* BENTO GRID UTAMA
        Dibagi menjadi 4 kolom pada desktop besar.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        {/* METRIK 1 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4">
            <i className="fa-solid fa-box-open"></i>
          </div>
          <p className={`${inter.className} text-gray-500 font-medium text-sm mb-1`}>Total Produk</p>
          <h2 className="text-3xl font-black text-gray-900">{totalProduk} <span className="text-sm text-blue-500 font-bold tracking-widest uppercase">+Item</span></h2>
        </div>

        {/* METRIK 2 */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-4">
            <i className="fa-solid fa-store"></i>
          </div>
          <p className={`${inter.className} text-gray-500 font-medium text-sm mb-1`}>Jaringan Mitra</p>
          <h2 className="text-3xl font-black text-gray-900">{totalMitra} <span className="text-sm text-emerald-500 font-bold tracking-widest uppercase">+Lokasi</span></h2>
        </div>

        {/* METRIK 3 (Aksen Gelap) */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full z-0"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gray-800 text-brand-gold border border-gray-700 rounded-2xl flex items-center justify-center text-xl mb-4">
              <i className="fa-solid fa-eye"></i>
            </div>
            <p className={`${inter.className} text-gray-400 font-medium text-sm mb-1`}>Popularitas Produk</p>
            <h2 className="text-3xl font-black text-white">{(totalViews).toLocaleString('id-ID')} <span className="text-sm text-brand-gold font-bold tracking-widest uppercase">+Views</span></h2>
          </div>
        </div>

        {/* METRIK 4 (Aksen Brand) */}
        <div className="bg-linear-to-br from-brand-gold to-amber-500 rounded-3xl p-6 border border-amber-400 shadow-xl shadow-amber-500/20 relative overflow-hidden group">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/20 rounded-full z-0"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 text-amber-900 border border-white/30 rounded-2xl flex items-center justify-center text-xl mb-4 backdrop-blur-sm">
              <i className="fa-solid fa-users-viewfinder"></i>
            </div>
            <p className={`${inter.className} text-amber-900 font-bold text-sm mb-1`}>Prospek Masuk</p>
            <h2 className="text-3xl font-black text-gray-900">{totalProspek} <span className="text-sm text-amber-800 font-bold tracking-widest uppercase">+Leads</span></h2>
          </div>
        </div>

      </div>

      {/* BENTO GRID BAWAH
        Membagi layar menjadi area Produk (lebar), Leads (sedang), Aksi (kecil)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* WIDGET 1: TOP PRODUK (Lebar 2 Kolom) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-900">Etalase Terpopuler</h3>
            <Link href="/admin/produk" className="text-sm font-bold text-brand-gold hover:text-amber-600 transition-colors bg-amber-50 px-3 py-1.5 rounded-lg">
              Detail &rarr;
            </Link>
          </div>

          <div className="space-y-5 flex-1">
            {produkTerpopuler.length === 0 ? (
              <p className="text-sm text-gray-400 font-medium italic text-center py-8">Belum ada data produk.</p>
            ) : (
              produkTerpopuler.map((prod, index) => {
                const maxViews = produkTerpopuler[0]?.views || 1;
                const currentViews = Number(prod.views) || 0;
                const percentage = Math.round((currentViews / maxViews) * 100) || 0;
                
                return (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-6 font-black text-gray-300 text-lg text-right group-hover:text-brand-gold transition-colors">0{index + 1}</div>
                    <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getImageUrl(prod.foto_produk)} alt={prod.nama_produk} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-end mb-1">
                        <p className="font-bold text-gray-900 text-sm truncate max-w-37.5">{prod.nama_produk}</p>
                        <p className={`${inter.className} font-bold text-gray-500 text-xs`}>
                          {currentViews.toLocaleString('id-ID')} views
                        </p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${index === 0 ? 'bg-brand-gold' : 'bg-gray-400'}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* WIDGET 2: CRM LEADS TERBARU (Lebar 1 Kolom) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-900">Prospek Terbaru</h3>
            <Link href="/admin/prospek" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-brand-gold transition-colors">
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          <div className="space-y-4 flex-1">
            {prospekTerbaru.length === 0 ? (
               <p className="text-sm text-gray-400 font-medium italic text-center py-8">Belum ada prospek masuk.</p>
            ) : (
              prospekTerbaru.map((lead, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-gray-900 truncate pr-2">{lead.nama_prospek}</p>
                    {/* Indikator Titik Merah jika belum dibalas */}
                    {lead.status_lead === 'Belum Dibalas' && (
                      <span className="flex h-2.5 w-2.5 relative mt-1 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <i className="fa-regular fa-clock mr-1"></i> {formatWaktuSingkat(lead.waktu_klik)}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${lead.status_lead === 'Belum Dibalas' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                      {lead.status_lead}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* WIDGET 3: NAVIGASI CEPAT (Lebar 1 Kolom) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
          <h3 className="text-lg font-black text-gray-900 mb-6">Aksi Cepat</h3>
          
          <div className="space-y-3">
            <Link href="/admin/produk" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-brand-gold/10 border border-transparent hover:border-brand-gold transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 group-hover:text-brand-gold transition-colors"><i className="fa-solid fa-plus text-xs"></i></div>
                <span className={`${inter.className} text-sm font-bold text-gray-700`}>Tambah Produk</span>
              </div>
            </Link>
            
            <Link href="/admin/mitra" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 group-hover:text-emerald-500 transition-colors"><i className="fa-solid fa-map-location-dot text-xs"></i></div>
                <span className={`${inter.className} text-sm font-bold text-gray-700`}>Pin Lokasi Mitra</span>
              </div>
            </Link>

            <Link href="/admin/kategori" className="flex items-center justify-between p-4 rounded-2xl bg-gray-900 hover:bg-gray-800 border border-transparent transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 shadow-sm flex items-center justify-center text-brand-gold transition-colors"><i className="fa-solid fa-tags text-xs"></i></div>
                <span className={`${inter.className} text-sm font-bold text-white`}>Master Kategori</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}