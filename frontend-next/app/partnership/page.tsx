"use client";
import React from 'react';
import Link from 'next/link';

export default function PartnershipPage() {
  const waNumber = "6281717302223";

  const handleJoinClick = (packageType: string) => {
    const text = `Halo Tim Kemitraan Qodha!%0A%0ASaya tertarik untuk bergabung menjadi mitra sebagai *${packageType}*.%0A%0AMohon informasi lebih lanjut mengenai syarat, ketentuan, dan katalog harga mitra.%0A%0ATerima kasih!`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-green rounded-full filter blur-[120px] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-4 block animate-fade-in-up">
            Peluang Usaha Berkah
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Tumbuh Bersama <span className="text-brand-gold">Qodha Aromatic</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Bergabunglah dengan ratusan mitra kami di seluruh Indonesia. Dapatkan margin profit tinggi, bimbingan marketing, dan produk wewangian Sunnah berkualitas premium yang mudah dijual.
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button 
              onClick={() => handleJoinClick('Calon Mitra')}
              className="bg-brand-gold text-gray-900 hover:bg-yellow-500 px-8 py-4 rounded-xl font-extrabold transition shadow-[0_10px_25px_rgba(245,158,11,0.3)] flex items-center gap-2 mx-auto hover:-translate-y-1"
            >
              <i className="fa-brands fa-whatsapp text-xl text-green-700"></i> Konsultasi Kemitraan
            </button>
          </div>
        </div>
      </section>

      {/* 2. KENAPA HARUS BERGABUNG */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Keuntungan Menjadi Mitra</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Kami tidak hanya memberikan produk, tapi juga ekosistem bisnis yang mendukung Anda untuk terus berkembang.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'fa-tags', title: 'Margin Besar', desc: 'Dapatkan harga khusus mitra dengan margin keuntungan ritel hingga 40% per produk.' },
              { icon: 'fa-bullhorn', title: 'Support Marketing', desc: 'Akses gratis ke ratusan konten foto, video, dan copywriting siap *posting* setiap hari.' },
              { icon: 'fa-medal', title: 'Produk Premium', desc: 'Kualitas produk terjamin, *repeat order* tinggi, dan sudah mengantongi izin resmi.' },
              { icon: 'fa-users', title: 'Komunitas Positif', desc: 'Tergabung dalam grup eksklusif mitra untuk sharing ilmu jualan dan silaturahmi.' },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:border-brand-gold transition-all duration-300 group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <i className={`fa-solid ${benefit.icon} text-2xl text-brand-gold`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-gold transition-colors">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PAKET KEMITRAAN */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-2 block">Pilih Paket Anda</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Level Kemitraan Qodha</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Reseller */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Reseller</h3>
                <p className="text-gray-500 text-sm">Cocok untuk pemula yang baru mulai usaha.</p>
              </div>
              <div className="text-center mb-8 pb-8 border-b border-gray-100">
                <span className="text-4xl font-black text-brand-green">± Rp 1 Jt</span>
                <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">Pembelian Awal (1 Karton)</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-gray-600 font-medium">
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Bebas Mix Aroma</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Harga Reseller Resmi</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Masuk Grup Bimbingan</li>
                <li className="flex gap-3 items-start text-gray-400"><i className="fa-regular fa-circle text-gray-300 mt-1"></i>Repeat Order Min. Lusinan</li>
              </ul>
              <button onClick={() => handleJoinClick('Reseller')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition">
                Pilih Reseller
              </button>
            </div>

            {/* Agen (Rekomendasi) */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border border-gray-800 hover:-translate-y-2 transition-all duration-300 flex flex-col relative overflow-hidden transform md:scale-105 z-10">
              <div className="absolute top-6 right-6 bg-brand-gold text-gray-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Rekomendasi
              </div>
              <div className="mb-6 text-center mt-4">
                <h3 className="text-2xl font-bold text-white mb-2">Agen</h3>
                <p className="text-gray-400 text-sm">Pilihan tepat untuk mendominasi kota Anda.</p>
              </div>
              <div className="text-center mb-8 pb-8 border-b border-gray-800">
                <span className="text-4xl font-black text-brand-gold">± Rp 3 Jt</span>
                <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-wider">Pembelian Awal (3 Karton)</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-gray-300 font-medium">
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Bebas Mix Aroma</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Harga Agen Khusus</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Free Akrilik Display (Khusus Parfum)</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Didaftarkan di Web Peta Mitra</li>
              </ul>
              <button onClick={() => handleJoinClick('Agen')} className="w-full bg-brand-gold hover:bg-yellow-500 text-gray-900 font-extrabold py-4 rounded-xl transition shadow-[0_5px_15px_rgba(245,158,11,0.3)]">
                Pilih Agen
              </button>
            </div>

            {/* Distributor */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Distributor</h3>
                <p className="text-gray-500 text-sm">Untuk skala besar dan suplai ke agen-agen.</p>
              </div>
              <div className="text-center mb-8 pb-8 border-b border-gray-100">
                <span className="text-4xl font-black text-brand-green">± Rp 6 Jt</span>
                <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">Pembelian Awal (6 Karton)</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1 text-sm text-gray-600 font-medium">
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Bebas Mix Aroma</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Harga Termurah / Tangan Pertama</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Spanduk Resmi Kemitraan</li>
                <li className="flex gap-3 items-start"><i className="fa-solid fa-circle-check text-brand-gold mt-1"></i>Prioritas Area (Terbatas)</li>
              </ul>
              <button onClick={() => handleJoinClick('Distributor')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition">
                Pilih Distributor
              </button>
            </div>

          </div>
          
          <p className="text-center text-xs text-gray-400 mt-10 font-medium">
            *Semua mitra wajib melakukan *repeat order* minimal 1x setiap bulan agar status kemitraan tetap aktif.
          </p>
        </div>
      </section>

      {/* 4. CARA BERGABUNG */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Cara Mudah Bergabung</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative">
            {/* Garis konektor (hanya tampil di desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm w-full md:w-1/3 relative">
              <div className="w-10 h-10 bg-brand-gold text-white font-black rounded-full flex items-center justify-center absolute -top-5 left-1/2 transform -translate-x-1/2 border-4 border-white">1</div>
              <i className="fa-solid fa-mobile-screen text-3xl text-gray-400 mb-4 mt-2"></i>
              <h4 className="font-bold text-gray-900 mb-2">Hubungi CS</h4>
              <p className="text-xs text-gray-500">Klik tombol WhatsApp dan pilih paket yang Anda inginkan.</p>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm w-full md:w-1/3 relative">
              <div className="w-10 h-10 bg-brand-gold text-white font-black rounded-full flex items-center justify-center absolute -top-5 left-1/2 transform -translate-x-1/2 border-4 border-white">2</div>
              <i className="fa-solid fa-list-check text-3xl text-gray-400 mb-4 mt-2"></i>
              <h4 className="font-bold text-gray-900 mb-2">Pilih Aroma</h4>
              <p className="text-xs text-gray-500">Pilih varian aroma bebas sesuai selera pasar di kota Anda.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm w-full md:w-1/3 relative">
              <div className="w-10 h-10 bg-brand-gold text-white font-black rounded-full flex items-center justify-center absolute -top-5 left-1/2 transform -translate-x-1/2 border-4 border-white">3</div>
              <i className="fa-solid fa-truck-fast text-3xl text-gray-400 mb-4 mt-2"></i>
              <h4 className="font-bold text-gray-900 mb-2">Barang Dikirim</h4>
              <p className="text-xs text-gray-500">Lakukan pembayaran dan pesanan segera meluncur ke lokasi Anda.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}