"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function Home() {
  // 1. DATA SLIDER HERO
  const heroProducts = [
    {
      id: 1,
      name: "Bukhur Maghribi Premium",
      desc: "Wewangian khas Timur Tengah dengan ketahanan aroma hingga 12 jam. Cocok untuk relaksasi dan majelis.",
      price: "Rp 25.000",
      image: "https://placehold.co/600x600/1f2937/fff?text=Bukhur+Maghribi",
      color: "from-brand-gold/20 to-transparent"
    },
    {
      id: 2,
      name: "Parfum Kasturi Kijang",
      desc: "Parfum Sunnah non-alkohol dengan aroma lembut yang menenangkan jiwa.",
      price: "Rp 35.000",
      image: "https://placehold.co/600x600/1f2937/fff?text=Kasturi+Kijang",
      color: "from-blue-500/20 to-transparent"
    },
    {
      id: 3,
      name: "Dupa Kerucut Keraton",
      desc: "Menghadirkan suasana keraton yang magis dan sakral ke dalam ruangan Anda.",
      price: "Rp 15.000",
      image: "https://placehold.co/600x600/1f2937/fff?text=Dupa+Keraton",
      color: "from-purple-500/20 to-transparent"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = useCallback(() => {
    if (isAnimating) return;
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
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNextSlide]);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ====================================================
          1. HERO SECTION (Dynamic Slider)
      ==================================================== */}
      {/* FIX: pt-4 diubah menjadi pt-28 md:pt-36 agar teks tidak tertabrak Navbar */}
      <section className="relative w-full bg-white overflow-hidden pt-28 md:pt-36 pb-16 lg:pb-24">
        
        <div className={`absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl ${heroProducts[currentSlide].color} opacity-50 transition-colors duration-1000 rounded-bl-[100px] -z-10`}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            
            {/* Teks Kiri */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left z-10">
              <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3 block">
                  Produk Terlaris Bulan Ini 🔥
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                  {heroProducts[currentSlide].name}
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {heroProducts[currentSlide].desc}
                </p>
                <div className="text-3xl font-black text-brand-green mb-8">
                  {heroProducts[currentSlide].price}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/products" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition shadow-xl flex items-center justify-center gap-2 group">
                    Eksplor Katalog <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                  <Link href="/partnership" className="bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-900 px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
                    <i className="fa-solid fa-handshake text-brand-gold"></i> Info Kemitraan
                  </Link>
                </div>
              </div>

              {/* Indikator Titik (Dots) */}
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
            </div>

            {/* Gambar Kanan */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-75 h-75 sm:w-100 sm:h-100 bg-gray-50 rounded-full"></div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={heroProducts[currentSlide].image} 
                alt={heroProducts[currentSlide].name} 
                className={`w-70 h-70 sm:w-95 sm:h-95 object-cover rounded-4xl shadow-2xl transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100 hover:scale-105 hover:-rotate-2'}`}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          2. KENAPA MEMILIH QODHA
      ==================================================== */}
      <section className="w-full py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Mengapa Memilih <span className="text-brand-gold">Qodha Aromatic</span>?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-yellow-50 text-brand-gold rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Bahan Premium</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Diramu dari serbuk kayu pilihan, minyak wangi konsentrat tinggi tanpa bahan kimia berbahaya.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fa-solid fa-certificate"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aman & Nyaman</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Menghasilkan asap yang tidak perih di mata, sangat aman digunakan untuk ibadah sehari-hari.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-50 text-brand-green rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fa-solid fa-sack-dollar"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Peluang Usaha</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Bergabunglah dengan ratusan mitra kami. Margin profit tinggi dan dukungan marketing penuh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          3. KATEGORI PRODUK UTAMA
      ==================================================== */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Kategori Produk</h2>
              <p className="text-gray-500">Temukan wangi khas yang menggambarkan kepribadian Anda.</p>
            </div>
            <Link href="/products" className="text-brand-gold font-bold hover:underline flex items-center gap-2">
              Lihat Semua <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bukhur", count: "35+ Varian", icon: "fa-fire", color: "bg-red-50 text-red-500" },
              { name: "Dupa Kerucut", count: "15+ Varian", icon: "fa-mountain", color: "bg-orange-50 text-orange-500" },
              { name: "Parfum Roll On", count: "40+ Varian", icon: "fa-bottle-droplet", color: "bg-blue-50 text-blue-500" },
              { name: "Mabkhara", count: "10+ Model", icon: "fa-chess-rook", color: "bg-gray-100 text-gray-700" }
            ].map((cat, idx) => (
              <Link href="/products" key={idx} className="group bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl hover:border-brand-gold transition-all duration-300">
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-gold transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          4. CTA BANNER
      ==================================================== */}
      <section className="w-full py-16 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold rounded-full filter blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-green rounded-full filter blur-[80px] opacity-30"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Siap Menjadi Bagian dari Kami?</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
              Jadilah agen/distributor resmi Qodha Aromatic di kota Anda dan nikmati keuntungan finansial sekaligus menebar wangi Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partnership" className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-extrabold transition shadow-lg shadow-brand-gold/30">
                Pelajari Kemitraan
              </Link>
              <a href="https://wa.me/6281717302223" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 backdrop-blur-sm">
                <i className="fa-brands fa-whatsapp text-green-400 text-lg"></i> Hubungi CS
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}