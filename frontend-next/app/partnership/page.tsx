"use client";
import React from 'react';
import Link from 'next/link';
import { valuePropositions } from '@/lib/constants';

export default function PartnershipPage() {
  const packages = [
    {
      id: "reseller",
      name: "Reseller",
      icon: "fa-rocket",
      desc: "Cocok untuk pemula yang ingin mulai berbisnis tanpa modal besar.",
      discount: "Diskon up to 15%",
      minOrder: "Minimal order Rp 500.000",
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      textDark: "text-blue-700",
      features: [
        "Akses ke seluruh katalog produk",
        "Materi promosi dasar (Foto/Video)",
        "Grup bimbingan WhatsApp",
        "Tanpa target penjualan bulanan"
      ]
    },
    {
      id: "agen",
      name: "Agen Resmi",
      icon: "fa-store",
      desc: "Untuk pebisnis yang sudah memiliki basis pelanggan atau toko offline.",
      discount: "Diskon up to 25%",
      minOrder: "Minimal order Rp 2.500.000",
      color: "from-brand-gold to-yellow-500",
      bgLight: "bg-yellow-50",
      textDark: "text-yellow-700",
      isPopular: true,
      features: [
        "Titik lokasi masuk ke WebGIS Pusat",
        "Materi promosi lengkap & eksklusif",
        "Bimbingan bisnis & marketing rutin",
        "Prioritas pengiriman barang",
        "Sertifikat Agen Resmi Qodha"
      ]
    },
    {
      id: "distributor",
      name: "Distributor",
      icon: "fa-crown",
      desc: "Peluang memegang hak eksklusif penjualan untuk skala Kota/Kabupaten.",
      discount: "Diskon up to 40%",
      minOrder: "Hubungi Manajemen",
      color: "from-purple-600 to-indigo-600",
      bgLight: "bg-purple-50",
      textDark: "text-purple-700",
      features: [
        "Hak wilayah eksklusif (1 Kota 1 Distributor)",
        "Semua calon agen di kota Anda akan diarahkan ke Anda",
        "Support marketing khusus (Ads/Endorse)",
        "Spanduk dan X-Banner Gratis",
        "Akses VIP ke Manajemen Pusat"
      ]
    }
  ];

  const handleWA = (paketName: string) => {
    const text = `Halo Manajemen Qodha Aromatic, saya tertarik mendaftar untuk paket kemitraan *${paketName}*. Boleh minta informasi lebih lanjut?`;
    window.open(`https://wa.me/6281717302223?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* HERO SECTION */}
      <section className="bg-gray-900 text-white pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-up">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-4 block">Peluang Usaha Menguntungkan</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Sukses Bersama <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-yellow-300">Qodha Aromatic</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Jadilah bagian dari jaringan bisnis produk wewangian Sunnah terbesar di Indonesia. Margin tinggi, produk mudah dijual, dan dukungan sistem pemetaan (WebGIS) modern.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#paket-kemitraan" className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-brand-gold/30 flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-down"></i> Lihat Paket Kemitraan
            </a>
            <Link href="/" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 backdrop-blur-md">
              <i className="fa-solid fa-house"></i> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION (BENEFIT) */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Mengapa Harus Bergabung?</h2>
            <p className="text-gray-500">Beragam keuntungan yang hanya Anda dapatkan di Qodha Aromatic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((vp, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-5">
                  <i className={`fa-solid ${vp.icon}`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{vp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING / PAKET KEMITRAAN */}
      <section id="paket-kemitraan" className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Pilih Jalur Kesuksesan Anda</h2>
            <p className="text-gray-500">Tersedia berbagai pilihan paket yang bisa disesuaikan dengan modal dan target pasar Anda.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`relative bg-white rounded-4xl border transition-all duration-300 flex flex-col h-full ${pkg.isPopular ? 'border-brand-gold shadow-2xl scale-100 lg:scale-105 z-10' : 'border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300'}`}>
                
                {pkg.isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-gray-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                    Paling Diminati
                  </div>
                )}

                <div className={`p-8 rounded-t-4xl border-b border-gray-100 ${pkg.bgLight}`}>
                  <div className={`w-14 h-14 bg-linear-to-br ${pkg.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                    <i className={`fa-solid ${pkg.icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mb-6 h-10">{pkg.desc}</p>
                  
                  <div className="bg-white p-4 rounded-xl border border-white shadow-sm text-center">
                    <p className={`text-xl font-black ${pkg.textDark}`}>{pkg.discount}</p>
                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{pkg.minOrder}</p>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fasilitas yang didapat:</p>
                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <i className="fa-solid fa-circle-check text-emerald-500 mt-0.5"></i>
                        <span className="text-sm text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleWA(pkg.name)}
                    className={`w-full py-4 rounded-xl font-black transition-all duration-300 flex items-center justify-center gap-2 ${
                      pkg.isPopular 
                        ? 'bg-brand-gold hover:bg-yellow-500 text-gray-900 shadow-[0_10px_20px_rgba(245,158,11,0.2)]' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white shadow-md'
                    }`}
                  >
                    <i className="fa-brands fa-whatsapp text-lg"></i> Daftar Sekarang
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEBGIS INFO SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-12">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none"></div>
          
          <div className="w-full md:w-1/2 relative z-10 text-center md:text-left">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-3xl mx-auto md:mx-0 mb-6">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Integrasi WebGIS Canggih</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bagi mitra level <span className="text-brand-gold font-bold">Agen</span> dan <span className="text-brand-gold font-bold">Distributor</span>, lokasi toko Anda akan dipetakan secara digital di website pusat kami. 
              Ini memudahkan calon pembeli di sekitar wilayah Anda untuk menemukan dan membeli langsung dari toko Anda tanpa ongkos kirim yang mahal.
            </p>
            <Link href="/#webgis-section" className="text-brand-gold font-bold hover:underline flex items-center justify-center md:justify-start gap-2">
              Lihat Demo Peta <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="w-full md:w-1/2 relative z-10 flex justify-center">
            {/* Ilustrasi Peta Abstrak */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-gray-800 border-4 border-gray-700 rounded-full shadow-2xl overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-20 bg-cover bg-center"></div>
              
              {/* Pin Animasi */}
              <div className="absolute top-1/3 left-1/3 animate-bounce">
                <i className="fa-solid fa-location-dot text-4xl text-brand-gold filter drop-shadow-lg"></i>
              </div>
              <div className="absolute bottom-1/3 right-1/3 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <i className="fa-solid fa-location-dot text-3xl text-emerald-500 filter drop-shadow-lg"></i>
              </div>
              <div className="absolute top-1/2 right-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
                <i className="fa-solid fa-location-dot text-2xl text-blue-500 filter drop-shadow-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}