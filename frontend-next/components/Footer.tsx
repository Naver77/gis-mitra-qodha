"use client";
import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onFloatingWaClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onFloatingWaClick }) => {
  return (
    <>
      <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Kolom 1: Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <span className="text-gray-900 font-extrabold text-2xl">Q</span>
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Qodha <span className="text-brand-gold">Aromatic</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Produsen wewangian Sunnah premium. Menghadirkan aroma ketenangan untuk ibadah dan relaksasi di rumah Anda, dengan peluang kemitraan bisnis yang menguntungkan.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-white transition-colors"><i className="fa-brands fa-tiktok"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-white transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Jelajahi</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-medium">
                <li><Link href="/" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Beranda</Link></li>
                <li><Link href="/products" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Katalog Produk</Link></li>
                <li><Link href="/partnership" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Info Kemitraan</Link></li>
                <li><Link href="/about" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Tentang Kami</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak & Bantuan */}
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Bantuan</h4>
              <ul className="space-y-3 text-sm text-gray-400 font-medium">
                <li><Link href="/faq" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> FAQ</Link></li>
                <li><Link href="/map" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Peta Distributor</Link></li>
                <li><Link href="/contact" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-angle-right text-[10px]"></i> Hubungi Kami</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs font-medium">
              &copy; {new Date().getFullYear()} Qodha Aromatic. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-500 font-medium">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <span className="text-gray-700">•</span>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (WhatsApp) */}
      <button 
        onClick={onFloatingWaClick}
        className="fixed bottom-6 right-6 z-90 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-[0_10px_25px_rgba(34,197,94,0.4)] hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-bounce-slow"
        aria-label="Chat WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </button>
    </>
  );
};

export default Footer;