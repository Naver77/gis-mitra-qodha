"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { valuePropositions, homeCategories, formatRupiah } from '@/lib/constants';
import { getHeroProducts } from '@/app/actions/public';

// Memuat komponen peta secara dinamis agar aman dari error SSR
const MapPublic = dynamic(() => import('@/components/MapPublic'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-125 bg-gray-100 rounded-3xl animate-pulse flex flex-col items-center justify-center border border-gray-200">
      <i className="fa-solid fa-map-location-dot text-4xl text-gray-300 mb-4"></i>
      <p className="font-bold text-gray-400">Memuat Peta Interaktif...</p>
    </div>
  ),
});

// Tipe Data untuk Slider
interface HeroProduct {
  id_produk: string;
  nama_produk: string;
  deskripsi: string;
  harga: string;
  foto_produk: string;
  colorBg?: string; // Warna background dinamis
}

// Warna gradient rotasi untuk slider
const bgColors = [
  "from-brand-gold/20 to-transparent",
  "from-blue-500/20 to-transparent",
  "from-purple-500/20 to-transparent",
  "from-emerald-500/20 to-transparent",
  "from-rose-500/20 to-transparent"
];

export default function Home() {
  const [heroProducts, setHeroProducts] = useState<HeroProduct[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil Data Slider dari Database
  useEffect(() => {
    getHeroProducts().then((data) => {
      if (data && data.length > 0) {
        // Gabungkan data DB dengan rotasi warna
        const mappedData = (data as unknown as HeroProduct[]).map((item, index) => ({
          ...item,
          colorBg: bgColors[index % bgColors.length]
        }));
        setHeroProducts(mappedData);
      } else {
        // Fallback jika database kosong
        setHeroProducts([{
          id_produk: '0',
          nama_produk: "Katalog Qodha Aromatic",
          deskripsi: "Wewangian khas dengan ketahanan aroma hingga 12 jam. Cocok untuk relaksasi dan majelis.",
          harga: "0",
          foto_produk: "",
          colorBg: "from-brand-gold/20 to-transparent"
        }]);
      }
      setIsLoading(false);
    });
  }, []);

  // 2. Logic Slider Animasi
  const handleNextSlide = useCallback(() => {
    if (isAnimating || heroProducts.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, heroProducts.length]);

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (heroProducts.length > 1) {
      const timer = setInterval(() => handleNextSlide(), 5000);
      return () => clearInterval(timer);
    }
  }, [handleNextSlide, heroProducts.length]);

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center"><i className="fa-solid fa-circle-notch fa-spin text-3xl text-brand-gold"></i></div>;

  const currentItem = heroProducts[currentSlide];

  return (
    <div className="w-full flex flex-col items-center font-sans overflow-x-hidden">
      
      {/* ====================================================
          1. HERO SECTION (Dynamic Slider dari Database)
      ==================================================== */}
      <section className="relative w-full bg-white overflow-hidden pt-10 pb-16 lg:pb-24">
        {/* Background Dinamis Tailwind v4 Canonical */}
        <div className={`absolute top-0 right-0 w-full md:w-1/2 h-full bg-linear-to-bl ${currentItem.colorBg} opacity-60 transition-colors duration-1000 rounded-bl-[100px] -z-10`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            
            {/* Teks Kiri */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left z-10">
              <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3 block">
                  Produk Terlaris Bulan Ini 🔥
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                  {currentItem.nama_produk}
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed line-clamp-3">
                  {currentItem.deskripsi || "Kualitas premium untuk menemani aktivitas harian Anda."}
                </p>
                <div className="text-3xl font-black text-emerald-600 mb-8">
                  {Number(currentItem.harga) > 0 ? formatRupiah(currentItem.harga) : 'Segera Hadir'}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/products" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition shadow-xl flex items-center justify-center gap-2 group">
                    Eksplor Katalog <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                  <a href="#webgis-section" className="bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-900 px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
                    <i className="fa-solid fa-map-location-dot text-brand-gold"></i> Cari Mitra Terdekat
                  </a>
                </div>
              </div>

              {/* Indikator Titik (Dots) */}
              {heroProducts.length > 1 && (
                <div className="flex gap-3 mt-12 justify-center lg:justify-start">
                  {heroProducts.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-brand-gold' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Gambar Kanan */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-72 h-72 sm:w-96 sm:h-96 bg-gray-50 rounded-full"></div>
              </div>
              <div className={`w-72 h-72 sm:w-96 sm:h-96 rounded-4xl shadow-2xl overflow-hidden transition-all duration-500 bg-white border-4 border-white ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100 hover:scale-105 hover:-rotate-2'}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={currentItem.foto_produk ? `/uploads/produk/${currentItem.foto_produk}` : 'https://placehold.co/600x600/f3f4f6/9ca3af?text=Qodha+Aromatic'} 
                  alt={currentItem.nama_produk} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          2. WEBGIS MAP SECTION (Fitur Baru Skripsi Anda!)
      ==================================================== */}
      <section id="webgis-section" className="w-full py-20 bg-gray-900 border-t border-gray-800 relative overflow-hidden">
        {/* Ornamen Latar */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-[150px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-black tracking-widest text-xs uppercase mb-3 block">Sistem Informasi Geografis</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Temukan Mitra Resmi Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Cari agen, reseller, dan distributor Qodha Aromatic terdekat dari lokasi Anda untuk menghemat ongkos kirim.</p>
          </div>

          {/* Frame Peta */}
          <div className="w-full h-125 lg:h-162.5 bg-white rounded-4xl p-2 shadow-2xl shadow-brand-gold/10 overflow-hidden">
            <div className="w-full h-full rounded-3xl overflow-hidden relative border border-gray-100">
               <MapPublic />
               {/* Label Peta */}
               <div className="absolute bottom-6 left-6 z-400 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2 pointer-events-none">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Peta Live
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. MENGAPA MEMILIH QODHA (Dari Data Konstanta)
      ==================================================== */}
      <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">Mengapa Memilih <span className="text-brand-gold">Qodha Aromatic</span>?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.slice(0, 4).map((prop, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 hover:border-brand-gold/30 transition-all duration-300">
                <div className="w-16 h-16 bg-yellow-50 text-brand-gold rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                  <i className={`fa-solid ${prop.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{prop.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          4. KATEGORI PRODUK UTAMA
      ==================================================== */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Kategori Produk</h2>
              <p className="text-gray-500">Temukan wangi khas yang menggambarkan kepribadian Anda.</p>
            </div>
            <Link href="/products" className="text-brand-gold font-bold hover:underline flex items-center gap-2">
              Lihat Semua <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeCategories.map((cat, idx) => (
              <Link href="/products" key={idx} className="group bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl hover:border-brand-gold transition-all duration-300">
                <div className={`w-14 h-14 rounded-full ${cat.bg} ${cat.col} flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-gold transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Eksplor Varian &rarr;</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          5. CTA (Call To Action) BANNER
      ==================================================== */}
      <section className="w-full py-16 px-4 mb-10">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold rounded-full filter blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600 rounded-full filter blur-[80px] opacity-30"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Siap Menjadi Bagian dari Kami?</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Jadilah agen atau distributor resmi Qodha Aromatic di kota Anda. Nikmati keuntungan finansial tinggi sekaligus menebar wangi Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admin/login" className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-extrabold transition shadow-lg shadow-brand-gold/30">
                <i className="fa-solid fa-shield-halved mr-2"></i> Masuk Panel Admin
              </Link>
              <a href="https://wa.me/6281717302223" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 backdrop-blur-sm">
                <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i> Hubungi CS
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}