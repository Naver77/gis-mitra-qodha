"use client";
import React from 'react';
import Link from 'next/link';

export default function PartnershipPage() {
  
  // 1. DATA STATISTIK (Adaptasi dari PHP)
  const stats = [
    { count: "50", label: "Kota Terjangkau", icon: "fa-map-location-dot", highlight: false },
    { count: "500", label: "Mitra Aktif", icon: "fa-users", highlight: true },
    { count: "40", label: "Varian Produk", icon: "fa-bottle-droplet", highlight: false },
    { count: "100", label: "% Support Pusat", icon: "fa-headset", highlight: true },
  ];

  // 2. DATA KEUNGGULAN (Value Propositions)
  const valuePropositions = [
    { title: "Margin Profit Besar", desc: "Nikmati keuntungan maksimal dengan harga khusus mitra yang sangat kompetitif di pasaran.", icon: "fa-sack-dollar" },
    { title: "Sistem WebGIS", desc: "Titik toko Anda akan dipin di Peta Pencarian Pusat. Pelanggan otomatis diarahkan ke Anda.", icon: "fa-map-pin" },
    { title: "Marketing Kit Gratis", desc: "Tidak perlu pusing desain. Kami sediakan foto, video, dan copywriting siap posting.", icon: "fa-bullhorn" },
    { title: "Produk Mudah Dijual", desc: "Wewangian sunnah adalah kebutuhan ibadah harian. Repeat order sangat tinggi.", icon: "fa-box-open" }
  ];

  // 3. DATA PAKET (Dari React Lama Anda - Lebih Detail)
  const packages = [
    {
      id: "reseller",
      name: "Reseller",
      icon: "fa-rocket",
      desc: "Cocok untuk pemula yang ingin mulai berbisnis tanpa modal besar.",
      discount: "Diskon s/d 15%",
      minOrder: "Modal Rp 300.000",
      theme: "blue",
      isPopular: false,
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
      desc: "Kuasai pasar Kecamatan. Untuk pebisnis dengan basis pelanggan atau toko offline.",
      discount: "Diskon s/d 30%",
      minOrder: "Modal Rp 2.500.000",
      theme: "emerald",
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
      desc: "Hak eksklusif penjualan untuk skala Kota/Kabupaten. Suplai seluruh agen di wilayah Anda.",
      discount: "Diskon s/d 50%",
      minOrder: "Modal Rp 15.000.000",
      theme: "yellow",
      isPopular: false,
      features: [
        "Hak wilayah eksklusif (1 Kota 1 Mitra)",
        "Semua calon agen di kota diarahkan ke Anda",
        "Support marketing khusus (Ads/Endorse)",
        "Spanduk dan X-Banner Gratis",
        "Akses VIP ke Manajemen Pusat"
      ]
    }
  ];

  // 4. FUNGSI LOGIKA (Dari React Lama)
  const handleWA = (paketName: string) => {
    const text = `Halo Manajemen Qodha Aromatic, saya tertarik mendaftar untuk paket kemitraan *${paketName}*. Boleh minta informasi lebih lanjut?`;
    window.open(`https://wa.me/6281717302223?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    // PERHATIKAN: Tidak ada pt-20 di div utama ini! Biarkan LayoutWrapper yang bekerja.
    <div className="w-full flex flex-col bg-white">
      
      {/* ====================================================
          1. HERO SECTION (Dark Premium)
      ==================================================== */}
      <section className="relative w-full bg-gray-900 flex items-center overflow-hidden py-16 lg:py-24 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse z-0" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full animate-fade-in-up">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Teks Hero */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span className="text-xs font-bold text-brand-gold tracking-wide uppercase">Peluang Usaha Berkah</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                Sukses Bersama <br/>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-yellow-200">Qodha Aromatic</span>
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Jadilah bagian dari jaringan bisnis produk wewangian Sunnah terbesar di Indonesia. Margin tinggi, produk mudah dijual, dan dukungan sistem pemetaan (WebGIS) modern.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                <a href="#paket-kemitraan" className="px-8 py-4 bg-brand-gold text-gray-900 font-black rounded-xl hover:bg-white transition shadow-lg shadow-brand-gold/20 transform hover:-translate-y-1 flex items-center gap-2">
                  <i className="fa-solid fa-arrow-down"></i> Lihat Paket Kemitraan
                </a>
                <Link href="/" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition flex items-center gap-2 backdrop-blur-sm">
                  <i className="fa-solid fa-house"></i> Ke Beranda
                </Link>
              </div>
            </div>

            {/* Visual Hero Modern */}
            <div className="justify-center lg:justify-end w-full relative hidden md:flex">
              <div className="relative w-full max-w-md bg-white/5 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/10 transform rotate-2 hover:rotate-0 transition duration-500">
                <div className="relative h-80 rounded-2xl overflow-hidden group bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://placehold.co/600x800/1f2937/fff?text=Peluang+Usaha" 
                    alt="Peluang Usaha Qodha" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent"></div>
                  
                  {/* Floating Badge (SaaS Style) */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg shrink-0">
                        <i className="fa-solid fa-chart-line"></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Potensi Omset</p>
                        <p className="text-sm font-black text-gray-900">Rp 5 - 50 Juta / Bulan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          2. STATISTIK KEMITRAAN
      ==================================================== */}
      <section className="bg-gray-800 py-10 border-b border-gray-700 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-700/50">
            {stats.map((st, idx) => (
              <div key={idx} className="p-2 flex flex-col items-center justify-center group">
                <div className={`text-4xl md:text-5xl font-black mb-2 transition duration-300 transform group-hover:scale-110 ${st.highlight ? 'text-brand-gold' : 'text-white'}`}>
                  {st.count}<span className="text-lg align-top opacity-50">+</span>
                </div>
                <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 mt-1">
                  <i className={`fa-solid ${st.icon} ${st.highlight ? 'text-brand-gold' : 'text-gray-500'}`}></i>
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          3. KEUNGGULAN (VALUE PROPOSITION)
      ==================================================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">Mengapa Harus Bergabung?</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Beragam Keuntungan Kemitraan</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((vp, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-5">
                  <i className={`fa-solid ${vp.icon}`}></i>
                </div>
                <h3 className="font-extrabold text-gray-900 mb-2">{vp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          4. PAKET PRICING (SaaS TIERING UI)
      ==================================================== */}
      <section id="paket-kemitraan" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Pilih Jalur Kesuksesan Anda</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">Tersedia berbagai pilihan paket yang bisa disesuaikan dengan modal dan target pasar Anda.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => {
              // Pewarnaan Dinamis Modern
              const themeStyle = {
                blue: { bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-500 text-white', border: 'border-blue-200' },
                emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-500 text-white', border: 'border-emerald-200' },
                yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', iconBg: 'bg-brand-gold text-gray-900', border: 'border-yellow-200' }
              }[pkg.theme as 'blue' | 'emerald' | 'yellow'];

              return (
                <div key={pkg.id} className={`relative bg-white rounded-4xl border transition-all duration-300 flex flex-col h-full ${
                  pkg.isPopular ? 'border-brand-gold shadow-2xl lg:scale-105 z-10' : 'border-gray-200 shadow-md hover:shadow-xl'
                }`}>
                  
                  {pkg.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-gray-900 px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
                      Paling Diminati
                    </div>
                  )}

                  {/* Header Card */}
                  <div className={`p-8 rounded-t-4xl border-b border-gray-100 ${themeStyle.bg}`}>
                    <div className={`w-14 h-14 ${themeStyle.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg`}>
                      <i className={`fa-solid ${pkg.icon}`}></i>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-sm text-gray-600 mb-6 font-medium min-h-10">{pkg.desc}</p>
                    
                    <div className="bg-white p-4 rounded-2xl border border-white shadow-sm text-center">
                      <p className={`text-xl font-black ${themeStyle.text}`}>{pkg.discount}</p>
                      <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">{pkg.minOrder}</p>
                    </div>
                  </div>

                  {/* Body Card */}
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fasilitas yang didapat:</p>
                    <ul className="space-y-4 mb-8 flex-1">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <i className={`fa-solid fa-circle-check mt-1 ${themeStyle.text} text-sm`}></i>
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tombol dengan Logika WhatsApp */}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. CTA WEBGIS PETA
      ==================================================== */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
            
            <i className="fa-solid fa-map absolute -right-20 -bottom-20 text-[250px] text-white/5 rotate-12 pointer-events-none"></i>

            <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-brand-gold text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-sm">
                Sistem WebGIS Terintegrasi
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Titik Toko Anda di Peta Digital</h2>
              <p className="text-gray-400 text-lg font-medium max-w-md mx-auto md:mx-0">
                Bagi mitra <span className="text-brand-gold">Agen</span> dan <span className="text-brand-gold">Distributor</span>, lokasi toko Anda akan dipetakan secara digital. Pembeli di kota Anda akan otomatis diarahkan ke Anda!
              </p>
              <div className="pt-2">
                <Link href="/map" className="px-8 py-4 bg-white text-gray-900 font-black rounded-xl hover:bg-brand-gold transition-colors shadow-lg flex items-center justify-center gap-2 group">
                  <i className="fa-solid fa-map-location-dot group-hover:animate-bounce"></i> Cek Kekosongan Wilayah
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md relative z-10 hidden md:block">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-700/50 transform rotate-3 hover:rotate-0 transition duration-500 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://placehold.co/800x600/1f2937/fff?text=GIS+Map+Preview" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                  alt="Peta Lokasi"
                />
                <div className="absolute inset-0 border-4 border-brand-gold/20 rounded-3xl pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}