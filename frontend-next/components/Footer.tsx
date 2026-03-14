/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

interface FooterProps {
  onFloatingWaClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onFloatingWaClick }) => {
  // State untuk melacak Accordion mana yang terbuka di Mobile
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Fungsi Toggle Exclusive Accordion (Hanya di Mobile)
  const toggleSection = (section: string) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) return; 
    setOpenSection(prev => prev === section ? null : section);
  };

  const logClick = (type: string, id: string) => {
    // Simulasi log click ke backend
    console.log(`[Klik Dicatat] Tipe: ${type}, ID: ${id}`);
  };

  return (
    <>
      {/* MENGHAPUS 'font-sans' AGAR MEWARISI FONT PLUS JAKARTA SANS DARI BODY GLOBAL */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800 mt-auto z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* GRID UTAMA (4 Kolom di Desktop, 1 Kolom di Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            
            {/* KOLOM 1: Brand & Sertifikasi */}
            <div>
              <img 
                src="/assets/img/qodhawhite.png" 
                className="h-10 w-auto object-contain brightness-0 invert opacity-90 mb-6" 
                alt="Qodha Aromatic" 
                onError={(e) => { e.currentTarget.src = "https://placehold.co/200x60/111827/fff?text=Qodha+Aromatic"; }}
              />
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Produsen wewangian Sunnah berkualitas tinggi dengan bahan alami. Menghadirkan ketenangan dan keberkahan aroma di setiap aktivitas ibadah Anda.
              </p>
              
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">Terverifikasi Oleh</p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white rounded-lg p-1.5 h-10 w-auto flex items-center justify-center">
                    <img src="/assets/img/banggabuatanindonesia.png" className="h-full w-auto object-contain" alt="BBI" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                  <div className="bg-white rounded-lg p-1.5 h-10 w-auto flex items-center justify-center">
                    <img src="/assets/img/halal.png" className="h-full w-auto object-contain" alt="Halal" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM 2: Jelajahi */}
            <div className="border-t border-gray-800 pt-4 md:border-none md:pt-0">
              <button onClick={() => toggleSection('jelajahi')} className="w-full flex justify-between items-center md:cursor-default focus:outline-none group">
                <h4 className="text-white font-bold tracking-wide">Jelajahi</h4>
                <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300 md:hidden ${openSection === 'jelajahi' ? 'rotate-180 text-brand-orange' : ''}`}></i>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 md:h-auto md:opacity-100 ${openSection === 'jelajahi' ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-full md:mt-6'}`}>
                <ul className="space-y-3 text-sm text-gray-400 font-medium">
                  <li><Link href="/" className="hover:text-brand-orange transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Beranda</Link></li>
                  <li><Link href="/products" className="hover:text-brand-orange transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Katalog Produk</Link></li>
                  <li><Link href="/map" className="hover:text-brand-orange transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Peta Sebaran Mitra</Link></li>
                  <li><Link href="/partnership" className="hover:text-brand-orange transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Peluang Kemitraan</Link></li>
                  <li><Link href="/about" className="hover:text-brand-orange transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Profil Qodha</Link></li>
                  <li><Link href="/faq" className="hover:text-brand-orange transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Bantuan & FAQ</Link></li>
                </ul>
              </div>
            </div>

            {/* KOLOM 3: Official Store & Sosmed */}
            <div className="flex flex-col gap-4 md:gap-8 border-t border-gray-800 pt-4 md:border-none md:pt-0">
              
              {/* E-Commerce */}
              <div>
                <button onClick={() => toggleSection('store')} className="w-full flex justify-between items-center md:cursor-default focus:outline-none group">
                  <h4 className="text-white font-bold tracking-wide">Official Store</h4>
                  <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300 md:hidden ${openSection === 'store' ? 'rotate-180 text-brand-orange' : ''}`}></i>
                </button>
                <div className={`overflow-hidden transition-all duration-300 md:h-auto md:opacity-100 ${openSection === 'store' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-full md:mt-6'}`}>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.tokopedia.com/qodha" target="_blank" rel="noreferrer" onClick={() => logClick('store', 'tokopedia')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform" title="Tokopedia">
                      <img src="/assets/img/tokopedia.png" className="w-5 h-5 object-contain" alt="Tokopedia" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </a>
                    <a href="https://shopee.co.id/qodha.id" target="_blank" rel="noreferrer" onClick={() => logClick('store', 'shopee')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform" title="Shopee">
                      <img src="/assets/img/shopee.png" className="w-5 h-5 object-contain" alt="Shopee" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </a>
                    <a href="https://www.tiktok.com/@qodhaaromatic" target="_blank" rel="noreferrer" onClick={() => logClick('store', 'tiktok')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform" title="TikTok">
                      <img src="/assets/img/tiktok.png" className="w-5 h-5 object-contain" alt="TikTok" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Sosial Media */}
              <div className="border-t border-gray-800 pt-4 md:border-none md:pt-0">
                <button onClick={() => toggleSection('sosmed')} className="w-full flex justify-between items-center md:cursor-default focus:outline-none group">
                  <h4 className="text-white font-bold tracking-wide">Ikuti Kami</h4>
                  <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300 md:hidden ${openSection === 'sosmed' ? 'rotate-180 text-brand-orange' : ''}`}></i>
                </button>
                <div className={`overflow-hidden transition-all duration-300 md:h-auto md:opacity-100 ${openSection === 'sosmed' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-full md:mt-6'}`}>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/qodha.id/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-colors" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/qodhaaromatic" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-colors" title="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/channel/UC3MouHTaJ5rD90jzYENTzqQ" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-colors" title="YouTube"><i className="fa-brands fa-youtube"></i></a>
                  </div>
                </div>
              </div>

            </div>

            {/* KOLOM 4: Kontak & Jam Operasional */}
            <div className="border-t border-gray-800 pt-4 md:border-none md:pt-0">
              <button onClick={() => toggleSection('kontak')} className="w-full flex justify-between items-center md:cursor-default focus:outline-none group">
                <h4 className="text-white font-bold tracking-wide">Hubungi Kami</h4>
                <i className={`fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300 md:hidden ${openSection === 'kontak' ? 'rotate-180 text-brand-orange' : ''}`}></i>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 md:h-auto md:opacity-100 ${openSection === 'kontak' ? 'max-h-125 opacity-100 mt-4' : 'max-h-0 opacity-0 md:max-h-full md:mt-6'}`}>
                <ul className="space-y-4 text-sm text-gray-400 font-medium mb-6">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-map-location-dot text-brand-orange mt-1"></i>
                    <span className="leading-relaxed text-xs">Bogor, Jawa Barat<br/><span className="text-[10px] text-gray-500">(Pusat Distribusi)</span></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-brands fa-whatsapp text-brand-orange"></i>
                    <a href="https://wa.me/6281717302223" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xs">+62 817 1730 2223</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-regular fa-envelope text-brand-orange"></i>
                    <a href="mailto:info@qodha.id" className="hover:text-white transition-colors text-xs">info@qodha.id</a>
                  </li>
                </ul>

                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <h5 className="text-white text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="fa-regular fa-clock text-brand-orange"></i> Jam Operasional
                  </h5>
                  <div className="space-y-2 text-xs font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Senin - Sabtu</span>
                      <span className="text-white font-bold tracking-wider">08:00 - 16:45</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Minggu / Libur</span>
                      <span className="text-red-400">Tutup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COPYRIGHT BAR (Sesuai Permintaan) */}
          <div className="pt-4 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs font-medium">
              &copy; {new Date().getFullYear()} Qodha Aromatic WebGIS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) - Desain Kasual */}
      <button 
        onClick={onFloatingWaClick}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-90 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:bg-[#1ebd57] hover:scale-110 transition-all duration-300 animate-bounce-slow"
        aria-label="Chat WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </button>
    </>
  );
};

export default Footer;