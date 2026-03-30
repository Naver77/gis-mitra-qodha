"use client";
import React from 'react';
import Link from 'next/link';

// === HELPER FUNCTION ===
const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

export default function PartnershipPage() {
  
  // === DATA DUMMY (MENGGANTIKAN DATABASE PHP) ===
  const benefits = [
    { name: 'Mendapatkan harga termurah di kategori kemitraan', r: 'yes', a: 'yes', d: 'vip' },
    { name: 'Mendapatkan Banner 3 x 1 m (Free Desain & Cetak)', r: 'no', a: 'yes', d: 'yes' },
    { name: 'Jaminan Kemudahan Bermitra', r: 'no', a: 'no', d: 'vip' },
    { name: 'Mendapatkan Soft & Hard Copy Katalog', r: 'yes', a: 'yes', d: 'yes' },
    { name: 'Free Konsultasi Ads, Content Marketing & Sosmed', r: 'yes', a: 'yes', d: 'vip' },
    { name: 'Free Produk Tester & Sample Terbaru', r: 'no', a: 'yes', d: 'yes' },
    { name: 'Program Promo Kemitraan Khusus', r: 'yes', a: 'yes', d: 'vip' },
    { name: 'Akrilik display parfum eksklusif', r: 'no', a: 'no', d: 'yes' },
    { name: 'Full Support (Katalog Drive, Cek Stok, Info Terbaru)', r: 'yes', a: 'yes', d: 'vip' },
  ];

  const pricelist = [
    { nama_produk: "Parfum Kasturi Kijang Premium", qty: 1, satuan: "Karton", harga_reseller: 900000, harga_agen: 800000, harga_distributor: 700000 },
    { nama_produk: "Misk Thaharah 3ml", qty: 1, satuan: "Lusin", harga_reseller: 150000, harga_agen: 130000, harga_distributor: 110000 },
    { nama_produk: "Dupa Kerucut Keraton", qty: 1, satuan: "Karton", harga_reseller: 450000, harga_agen: 400000, harga_distributor: 350000 },
    { nama_produk: "Bukhur Maghribi", qty: 1, satuan: "Lusin", harga_reseller: 250000, harga_agen: 220000, harga_distributor: 190000 },
  ];

  const groupedHet = [
    {
      kategori: "PARFUM SPRAY",
      items: [
        { nama_produk: "Oud Al Layl 35ml", isi: "35 ml", qty2: "1 Pcs", harga_het: 85000 },
        { nama_produk: "Raudhah Blend 35ml", isi: "35 ml", qty2: "1 Pcs", harga_het: 85000 },
      ]
    },
    {
      kategori: "WEWANGIAN BAKAR",
      items: [
        { nama_produk: "Bukhur Maghribi", isi: "50 gr", qty2: "1 Pcs", harga_het: 35000 },
        { nama_produk: "Dupa Kerucut", isi: "50 pcs", qty2: "1 Pcs", harga_het: 25000 },
      ]
    }
  ];

  // Helper Render Icon untuk Tabel Benefit
  const renderIcon = (status: string) => {
    if (status === 'yes') return <i className="fa-solid fa-circle-check text-green-500 text-lg"></i>;
    if (status === 'vip') return <i className="fa-solid fa-crown text-brand-gold text-xl drop-shadow-md animate-pulse"></i>;
    return <i className="fa-solid fa-minus text-gray-300"></i>;
  };

  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* ====================================================
          1. HERO SECTION (Minimalis nan Elegan)
      ==================================================== */}
      <section className="relative bg-gray-900 py-20 overflow-hidden z-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-20 z-0"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block py-1.5 px-5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-black tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            <i className="fa-solid fa-fire mr-2"></i> Peluang Bisnis 2026
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Struktur Harga & <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-yellow-200">Keuntungan</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Transparansi harga modal untuk setiap level mitra. Bandingkan dan pilih paket cuan terbaik untuk masa depan bisnis Anda bersama Qodha Aromatic.
          </p>
        </div>
      </section>

      {/* ====================================================
          2. PAKET SYARAT & KETENTUAN (Tiers)
      ==================================================== */}
      <section id="paket" className="py-20 bg-gray-50 border-b border-gray-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Pilih Level Kemitraan Anda</h2>
            <p className="text-gray-500 text-lg font-medium">Mulai bisnis Anda dengan modal yang terjangkau dan menguntungkan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* RESELLER */}
            <div className="bg-white rounded-4xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow relative">
              <div className="text-center pb-8 border-b border-gray-100">
                <h3 className="text-lg font-black text-gray-500 uppercase tracking-widest mb-4">Reseller</h3>
                <div>
                  <span className="text-4xl font-black text-gray-900 tracking-tight">1 Juta</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-2">Min. Belanja Awal</span>
                </div>
                <div className="mt-4 text-xs font-bold text-gray-500 bg-gray-100 py-2 px-4 rounded-xl inline-block border border-gray-200">
                  Atau Pembelanjaan 1 Karton
                </div>
              </div>
              <div className="pt-8 text-center">
                <a href="https://wa.me/6281717302223?text=Halo Admin, saya mau daftar RESELLER" target="_blank" rel="noreferrer" className="block w-full py-4 border-2 border-gray-200 text-gray-600 font-bold text-center rounded-xl hover:border-gray-800 hover:text-gray-900 hover:bg-gray-50 transition duration-300">
                  Daftar Reseller
                </a>
              </div>
            </div>

            {/* AGEN (Highlight) */}
            <div className="bg-white rounded-4xl p-8 border-2 border-brand-green shadow-xl relative transform md:-translate-y-4 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-md tracking-widest uppercase">
                Paling Diminati
              </div>
              <div className="text-center pb-8 border-b border-gray-100">
                <h3 className="text-lg font-black text-brand-green uppercase tracking-widest mb-4">Agen</h3>
                <div>
                  <span className="text-5xl font-black text-gray-900 tracking-tight">3 Juta</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-2">Min. Belanja Awal</span>
                </div>
                <div className="mt-4 text-xs font-bold text-green-700 bg-green-50 py-2 px-4 rounded-xl inline-block border border-green-100">
                  Atau Pembelanjaan 3 Karton
                </div>
              </div>
              <div className="pt-8 text-center">
                <a href="https://wa.me/6281717302223?text=Halo Admin, saya mau daftar AGEN" target="_blank" rel="noreferrer" className="block w-full py-4 bg-brand-green text-white font-bold text-center rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-green-200 transform hover:-translate-y-0.5">
                  Daftar Agen
                </a>
              </div>
            </div>

            {/* DISTRIBUTOR (VIP) */}
            <div className="bg-gray-900 rounded-4xl p-8 border border-gray-700 shadow-2xl relative text-white group hover:border-brand-gold/50 transition">
              <div className="absolute top-0 right-0 bg-brand-gold text-gray-900 text-[10px] font-black px-4 py-2 rounded-bl-2xl rounded-tr-4xl shadow-sm uppercase tracking-widest">
                VIP TIER
              </div>
              <div className="text-center pb-8 border-b border-gray-700">
                <h3 className="text-lg font-black text-brand-gold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                  <i className="fa-solid fa-crown"></i> Distributor
                </h3>
                <div>
                  <span className="text-4xl font-black text-white tracking-tight">6 Juta</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-2">Min. Belanja Awal</span>
                </div>
                <div className="mt-4 text-xs font-bold text-yellow-900 bg-brand-gold/90 py-2 px-4 rounded-xl inline-block shadow-sm">
                  Atau Pembelanjaan 6 Karton
                </div>
              </div>
              <div className="pt-8 text-center">
                <a href="https://wa.me/6281717302223?text=Halo Admin, saya mau daftar DISTRIBUTOR" target="_blank" rel="noreferrer" className="block w-full py-4 bg-brand-gold text-gray-900 font-bold text-center rounded-xl hover:bg-white transition shadow-lg shadow-brand-gold/20 transform hover:-translate-y-0.5">
                  Daftar Distributor
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          3. KEUNTUNGAN (Benefits Table)
      ==================================================== */}
      <section id="keuntungan" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Fasilitas & <span className="text-brand-gold">Keuntungan</span>
            </h2>
            <p className="text-gray-500 font-medium">Detail lengkap fasilitas dukungan yang Anda dapatkan di setiap level.</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-x-auto hide-scrollbar">
            <table className="w-full text-sm border-collapse min-w-200">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-5 text-center w-16 font-black tracking-widest uppercase text-xs border-r border-gray-700">No</th>
                  <th className="px-6 py-5 text-left w-1/2 font-black tracking-widest uppercase text-xs border-r border-gray-700">Fasilitas Pusat</th>
                  <th className="px-6 py-5 text-center w-1/6 font-black tracking-widest uppercase text-xs border-r border-gray-700 text-gray-400">Reseller</th>
                  <th className="px-6 py-5 text-center w-1/6 font-black tracking-widest uppercase text-xs border-r border-gray-700 text-brand-green">Agen</th>
                  <th className="px-6 py-5 text-center w-1/6 bg-brand-gold text-gray-900 font-black tracking-widest uppercase text-xs rounded-tr-3xl">Distributor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {benefits.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-center text-gray-400 border-r border-gray-100">{index + 1}</td>
                    <td className="px-6 py-4 text-left text-gray-800 border-r border-gray-100 font-bold">{row.name}</td>
                    <td className="px-6 py-4 text-center border-r border-gray-100">{renderIcon(row.r)}</td>
                    <td className="px-6 py-4 text-center border-r border-gray-100 bg-green-50/20">{renderIcon(row.a)}</td>
                    <td className="px-6 py-4 text-center bg-yellow-50/40 border-l border-yellow-100">{renderIcon(row.d)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. ANALISA MODAL (Tier Pricing Comparison)
      ==================================================== */}
      <section id="analisa" className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-brand-green font-black tracking-widest text-xs uppercase bg-green-50 px-4 py-2 rounded-full border border-green-200 shadow-sm">
              <i className="fa-solid fa-chart-pie mr-1"></i> Analisa Modal
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-5 mb-3">Perbandingan Harga Kemitraan</h2>
            <p className="text-gray-500 font-medium">Lihat selisih harga modal fantastis yang didapatkan setiap tingkatan mitra.</p>
          </div>

          <div className="overflow-x-auto w-full md:w-fit mx-auto rounded-3xl border border-gray-200 shadow-2xl bg-white hide-scrollbar">
            <table className="w-full text-sm text-left border-collapse min-w-225">
              <thead className="bg-gray-900 text-white uppercase font-black tracking-widest text-xs">
                <tr>
                  <th className="px-4 py-4 text-center border-r border-gray-700 w-12">No</th>
                  {/* Sticky Column untuk Nama Produk */}
                  <th className="px-6 py-4 sticky left-0 bg-gray-900 z-20 border-r border-gray-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]">Produk</th>
                  <th className="px-6 py-4 text-center bg-gray-800 border-r border-gray-700">Reseller <span className="block text-[9px] font-bold text-gray-400 mt-1">Tier 3</span></th>
                  <th className="px-6 py-4 text-center bg-gray-800 border-r border-gray-700">Agen <span className="block text-[9px] font-bold text-gray-400 mt-1">Tier 2</span></th>
                  <th className="px-6 py-4 text-center bg-brand-gold text-gray-900">Distributor <span className="block text-[9px] font-bold text-yellow-900 mt-1">VIP TIER</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700 text-sm">
                {pricelist.map((row, index) => {
                  const hemat = (row.harga_reseller - row.harga_distributor);
                  return (
                    <tr key={index} className="hover:bg-blue-50/20 transition duration-150 group">
                      <td className="px-4 py-4 text-center font-bold text-gray-400 border-r border-gray-100">{index + 1}</td>
                      <td className="px-6 py-4 font-black text-gray-900 sticky left-0 bg-white group-hover:bg-blue-50/50 z-10 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-colors">
                        <div className="leading-tight">{row.nama_produk}</div>
                        <div className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-1.5">{row.qty} {row.satuan}</div>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-100 align-middle">
                        <div className="font-bold text-gray-700 text-base">{formatRupiah(row.harga_reseller)}</div>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-100 bg-green-50/20 align-middle">
                        <div className="font-bold text-brand-green text-base">{formatRupiah(row.harga_agen)}</div>
                      </td>
                      <td className="px-6 py-4 text-center bg-yellow-50/40 relative group-hover:bg-yellow-100/40 transition align-middle">
                        <div className="font-black text-gray-900 text-lg">{formatRupiah(row.harga_distributor)}</div>
                        {hemat > 0 && (
                          <div className="mt-2 inline-block bg-brand-green text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                            Hemat {formatRupiah(hemat)}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. HARGA ECERAN TERTINGGI (HET)
      ==================================================== */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 flex items-center justify-center gap-3 mb-3">
              <i className="fa-solid fa-tags text-blue-500"></i> Harga Eceran (HET)
            </h2>
            <p className="text-gray-500 font-medium">Panduan harga jual standar kepada konsumen akhir (End User).</p>
          </div>
          
          <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-200">
            <table className="w-full text-sm text-left border-collapse min-w-150">
              <thead className="bg-gray-800 text-white uppercase font-black text-xs tracking-widest">
                <tr>
                  <th className="px-6 py-5 text-center w-16 border-r border-gray-700">No</th>
                  <th className="px-6 py-5 border-r border-gray-700">Kategori & Nama Produk</th>
                  <th className="px-6 py-5 text-center w-24 border-r border-gray-700">Isi</th>
                  <th className="px-6 py-5 text-right bg-blue-600">Harga Jual Satuan</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {groupedHet.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {/* Header Kategori */}
                    <tr className="bg-blue-50/80">
                      <td colSpan={4} className="px-6 py-3 font-black text-blue-800 uppercase tracking-widest text-xs border-y border-blue-100">
                        <i className="fa-solid fa-layer-group mr-2 opacity-50"></i> {group.kategori}
                      </td>
                    </tr>
                    {/* Item Produk */}
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
                        <td className="px-6 py-4 text-center font-bold text-gray-400 border-r border-gray-100">{iIdx + 1}</td>
                        <td className="px-6 py-4 font-bold text-gray-800 border-r border-gray-100">{item.nama_produk}</td>
                        <td className="px-6 py-4 text-center font-bold text-gray-500 border-r border-gray-100 bg-gray-50">{item.isi}</td>
                        <td className="px-6 py-4 text-right font-black text-blue-600 text-base">{formatRupiah(item.harga_het)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium bg-gray-50 px-6 py-3 rounded-full border border-gray-200 w-fit mx-auto shadow-sm">
            <i className="fa-solid fa-circle-info text-blue-500"></i>
            <span>Harga di atas adalah Harga Eceran Standar (Satuan/Pcs).</span>
          </div>
        </div>
      </section>

      {/* ====================================================
          6. CTA PETA WEBGIS
      ==================================================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
            
            <i className="fa-solid fa-map absolute -right-20 -bottom-20 text-[250px] text-white/5 rotate-12 pointer-events-none"></i>

            <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-brand-gold text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-sm">
                Sistem WebGIS Eksklusif
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Cek Kekosongan Wilayah Anda</h2>
              <p className="text-gray-400 text-lg font-medium max-w-md mx-auto md:mx-0">
                Jangan sampai keduluan! Gunakan Peta Pintar kami untuk melihat persebaran mitra dan amankan hak eksklusif di kota Anda hari ini.
              </p>
              <div className="pt-4">
                <Link href="/map" className="inline-flex px-8 py-4 bg-white text-gray-900 font-black rounded-xl hover:bg-brand-gold transition-colors shadow-lg shadow-white/10 items-center justify-center gap-3 group">
                  <i className="fa-solid fa-map-location-dot group-hover:animate-bounce text-xl"></i> Buka Peta Kemitraan
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md relative z-10">
              <div className="relative rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-700/50 transform md:rotate-3 hover:rotate-0 transition duration-500 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://placehold.co/800x600/1f2937/fff?text=GIS+Map+Preview" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                  alt="Peta Lokasi"
                />
                <div className="absolute inset-0 border-4 border-brand-gold/20 rounded-4xl pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}