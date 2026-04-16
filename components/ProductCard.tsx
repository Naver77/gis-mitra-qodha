"use client";
import React from 'react';
import { formatRupiah } from '@/lib/constants';

interface ProductCardProps {
  id: string | number;
  nama: string;
  harga: string | number;
  foto?: string;
  isBestSeller?: boolean;
}

export default function ProductCard({ id, nama, harga, foto, isBestSeller = false }: ProductCardProps) {
  // Logic Fallback Gambar
  const imgUrl = foto ? `/uploads/produk/${foto}` : 'https://placehold.co/400x500/f3f4f6/9ca3af?text=Qodha';
  
  // Logic Auto-Text WhatsApp
  const pesanWa = `Halo Admin Qodha, saya tertarik dengan produk *${nama}*. Apakah stok masih ada?`;
  const linkWa = `https://wa.me/628123456789?text=${encodeURIComponent(pesanWa)}`;

  const handleCopyLink = () => {
    // Fitur Salin Link Produk via Web Clipboard API
    navigator.clipboard.writeText(`${window.location.origin}/produk/${id}`).then(() => {
      alert(`Link untuk produk ${nama} berhasil disalin!`);
    });
  };

  return (
    <div className="flex-shrink-0 w-44 md:w-56 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-gold transition-all duration-300 group h-full flex flex-col snap-center relative overflow-hidden">
      
      {/* Area Gambar */}
      <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imgUrl} 
          alt={nama} 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x500/f3f4f6/9ca3af?text=Qodha'; }}
        />
        
        {/* Tombol Salin Link (Muncul saat di-hover) */}
        <div className="absolute top-2 right-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button onClick={handleCopyLink} className="bg-white text-gray-500 hover:text-brand-gold w-8 h-8 flex items-center justify-center rounded-full shadow-md text-xs transition-colors" title="Salin Link Produk">
            <i className="fa-solid fa-link"></i>
          </button>
        </div>

        {/* Badge Best Seller Dinamis */}
        {isBestSeller && (
          <div className="absolute top-2 left-2 bg-brand-gold text-white text-[9px] px-2.5 py-1 rounded font-black uppercase tracking-widest shadow-sm">
            Best Seller
          </div>
        )}
      </div>

      {/* Area Detail Text */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-brand-gold transition-colors leading-snug">
          {nama}
        </h4>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-brand-gold font-black text-[15px]">{formatRupiah(harga)}</span>
          <a 
            href={linkWa} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all shadow-sm group-hover:scale-110"
            title="Pesan via WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
          </a>
        </div>
      </div>
      
    </div>
  );
}