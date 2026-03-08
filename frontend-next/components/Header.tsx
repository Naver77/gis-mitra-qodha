/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // --- EFEK SHAPE CASUAL MODERN ---
  // Ditambahkan padding (px-4 py-2) dan rounded-full untuk efek kapsul/pil
  const navClass = (path: string) => {
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    return `px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1 ${
      isActive 
      ? 'bg-brand-orange/10 text-brand-orange' // Efek saat menu aktif (Sedang di halaman tersebut)
      : 'text-gray-600 hover:bg-brand-orange/10 hover:text-brand-orange' // Efek saat kursor mendekat (Hover)
    }`;
  };

  const baseNavClass = "fixed z-50 transition-all duration-300";
  const hiddenClass = isHidden ? "-translate-y-full" : "translate-y-0";
  
  const mobileFloatingClass = isScrolled 
    ? "lg:w-full lg:top-0 lg:rounded-none lg:border-none lg:left-0 w-[90%] left-[5%] top-4 rounded-2xl border border-gray-200" 
    : "w-full top-0 left-0 rounded-none border-none";
  
  const bgClass = "bg-white/95 backdrop-blur-md border-b-2 border-brand-orange"; // Border bawah mengikuti warna oranye
  const shadowClass = isScrolled ? "shadow-md" : "";

  return (
    <>
      <nav className={`${baseNavClass} ${hiddenClass} ${mobileFloatingClass} ${bgClass} ${shadowClass} h-[85px]`}>
        <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-full w-full">
            
            {/* KIRI: Logo Utama Qodha */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="flex items-center gap-2 group">
                <img 
                  src="/assets/img/qodhablack.png" 
                  alt="Qodha Aromatic" 
                  className="h-10 md:h-12 w-auto object-contain transition transform group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/200x60/fff/000?text=Qodha+Aromatic"; }}
                />
              </Link>
            </div>

            {/* TENGAH: Menu Navigasi (Bersih & Elegan) */}
            <div className="hidden lg:flex justify-center items-center space-x-1 xl:space-x-2">
              <Link href="/" className={navClass('/')}>
                Beranda
              </Link>

              {/* Dropdown Produk */}
              <div className="relative group h-full flex items-center py-6">
                <button className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1 ${pathname.startsWith('/product') ? 'bg-brand-orange/10 text-brand-orange' : 'text-gray-600 hover:bg-brand-orange/10 hover:text-brand-orange'}`}>
                  Produk <i className="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
                </button>
                <div className="absolute top-[75px] left-1/2 transform -translate-x-1/2 w-64 pt-2 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5 p-2">
                    <Link href="/products" className="block px-4 py-3 text-sm font-bold text-gray-800 rounded-xl hover:bg-brand-orange/10 hover:text-brand-orange transition mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs shadow-sm"><i className="fa-solid fa-box-open"></i></div>
                        <span>Semua Katalog</span>
                      </div>
                    </Link>
                    <div className="pt-1 pb-2 border-t border-gray-100">
                      <p className="px-4 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider mb-2 mt-2">Kategori</p>
                      <Link href="/products" className="px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-brand-orange/10 hover:text-brand-orange transition flex items-center gap-3"><i className="fa-solid fa-cloud text-gray-400 w-4 text-center"></i> Bukhur</Link>
                      <Link href="/products" className="px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-brand-orange/10 hover:text-brand-orange transition flex items-center gap-3"><i className="fa-solid fa-fire text-brand-orange w-4 text-center"></i> Dupa</Link>
                      <Link href="/products" className="px-4 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-brand-orange/10 hover:text-brand-orange transition flex items-center gap-3"><i className="fa-solid fa-spray-can text-purple-400 w-4 text-center"></i> Parfum</Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/map" className={navClass('/map')}>
                Peta Mitra
              </Link>

              <Link href="/partnership" className={navClass('/partnership')}>
                Kemitraan
              </Link>
              
              {/* Dropdown Bantuan */}
              <div className="relative group h-full flex items-center py-6">
                <button className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-1 ${['/about', '/faq', '/contact'].includes(pathname) ? 'bg-brand-orange/10 text-brand-orange' : 'text-gray-600 hover:bg-brand-orange/10 hover:text-brand-orange'}`}>
                  Bantuan <i className="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
                </button>
                <div className="absolute top-[75px] right-0 w-64 pt-2 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5 flex flex-col p-2">
                    <Link href="/about" className="px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-brand-orange/10 hover:text-brand-orange transition flex items-center gap-3 mb-1">
                      <i className="fa-regular fa-building text-gray-400 text-lg"></i> Profil Qodha
                    </Link>
                    <Link href="/faq" className="px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-brand-orange/10 hover:text-brand-orange transition flex items-center gap-3 mb-2">
                      <i className="fa-regular fa-circle-question text-gray-400 text-lg"></i> Tanya Jawab (FAQ)
                    </Link>
                    <div className="pt-2 border-t border-gray-100">
                      <Link href="/contact" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-brand-orange hover:text-white transition shadow-md">
                        <i className="fa-brands fa-whatsapp text-green-400"></i> Hubungi CS
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KANAN: Logo Tambahan (Ignite Your Life) & Mobile Toggle */}
            <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
              <img 
                src="/assets/img/ignite%20your%20life.png" 
                alt="Ignite Your Life" 
                className="hidden sm:block h-5 md:h-6 lg:h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} 
              />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden text-gray-600 hover:bg-brand-orange/10 hover:text-brand-orange p-2 transition-all duration-300 rounded-xl focus:outline-none"
              >
                <i className={`fa-solid text-2xl transition-transform ${isMobileMenuOpen ? 'fa-xmark rotate-90' : 'fa-bars'}`}></i>
              </button>
            </div>

          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-100 transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'scale-y-100 opacity-100 max-h-[80vh]' : 'scale-y-0 opacity-0 max-h-0'}`}>
          <div className="p-5 space-y-2 overflow-y-auto max-h-[80vh] hide-scrollbar">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange transition">Beranda</Link>
            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange transition">Katalog Produk</Link>
            <Link href="/map" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange transition">Peta Mitra</Link>
            <Link href="/partnership" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3.5 rounded-xl font-bold text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange transition">Kemitraan</Link>
            
            <div className="border-t border-gray-100 mt-4 pt-4">
              <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bantuan & Informasi</p>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-orange transition">Profil Perusahaan</Link>
              <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-orange transition">FAQ (Tanya Jawab)</Link>
              <div className="pt-4 px-2">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-4 py-3.5 rounded-xl font-bold shadow-lg hover:bg-brand-orange hover:text-white transition-all">
                  <i className="fa-brands fa-whatsapp text-green-400"></i> Hubungi CS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}