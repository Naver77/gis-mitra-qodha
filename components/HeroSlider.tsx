"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface SlideProduct {
  id: string | number;
  name: string;
  desc: string;
  price: string;
  image: string;
  color: string;
}

export default function HeroSlider({ products }: { products: SlideProduct[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = useCallback(() => {
    if (isAnimating || products.length <= 1) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, products.length]);

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

  if (!products || products.length === 0) return null;

  return (
    <section className="relative w-full bg-white overflow-hidden pt-24 md:pt-36 pb-12 lg:pb-24">
      <div className={`absolute top-0 right-0 w-full md:w-1/2 h-full bg-linear-to-bl ${products[currentSlide]?.color || 'from-gray-200 to-transparent'} opacity-50 transition-colors duration-1000 md:rounded-bl-[100px] -z-10`}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12">
          
          {/* Teks Kiri */}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0 text-center lg:text-left z-10">
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <span className="text-brand-gold font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 sm:mb-3 block">
                Produk Terlaris Bulan Ini 🔥
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">
                {products[currentSlide]?.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {products[currentSlide]?.desc}
              </p>
              <div className="text-2xl sm:text-3xl font-black text-brand-green mb-6 sm:mb-8">
                {products[currentSlide]?.price}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/products" className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition shadow-xl flex items-center justify-center gap-2 group text-sm sm:text-base">
                  Eksplor Katalog <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link href="/partnership" className="bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm sm:text-base">
                  <i className="fa-solid fa-handshake text-brand-gold"></i> Info Kemitraan
                </Link>
              </div>
            </div>

            {/* Indikator Titik */}
            <div className="flex gap-2 sm:gap-3 mt-8 sm:mt-12 justify-center lg:justify-start">
              {products.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 sm:w-8 bg-brand-gold' : 'w-2 sm:w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Gambar Kanan */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-56 h-56 sm:w-100 sm:h-100 bg-gray-50 rounded-full"></div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={products[currentSlide]?.image} 
              alt={products[currentSlide]?.name} 
              className={`w-52 h-52 sm:w-95 sm:h-95 object-cover rounded-3xl sm:rounded-4xl shadow-2xl transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100 hover:scale-105 hover:-rotate-2'}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}