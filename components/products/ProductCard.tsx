/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatRupiah } from '@/lib/product-utils';

// FIX: Menambahkan Fungsi Pintar Pembaca Base64
const getImageUrl = (foto: string | null | undefined) => {
  if (!foto) return '';
  if (foto.startsWith('data:image') || foto.startsWith('http')) return foto;
  return `/uploads/produk/${foto}`;
};

interface ProductCardProps {
  product: Product;
  mainCat: string;
}

export const ProductCard = ({ product, mainCat }: ProductCardProps) => {
  const isPremium = product.nama_kategori.toLowerCase().includes('premium bukhur qodha');

  let badgeText = null;
  let badgeClass = "";

  if (isPremium) {
    badgeText = 'Premium';
    badgeClass = 'bg-gray-900 text-brand-gold border border-brand-gold/30';
  } else if (mainCat === 'Parfum' && product.gender) {
    badgeText = product.gender;
    if (product.gender === 'pria') badgeClass = 'bg-blue-100 text-blue-700';
    else if (product.gender === 'wanita') badgeClass = 'bg-pink-100 text-pink-700';
    else badgeClass = 'bg-emerald-100 text-emerald-700'; 
  }

  // FIX: Ambil foto_produk dari database (fallback ke variabel gambar jika ada)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fotoToUse = (product as any).foto_produk || product.gambar;
  const finalImageUrl = getImageUrl(fotoToUse);

  return (
    <div className={`rounded-2xl md:rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full ${isPremium ? 'bg-gray-900 border-brand-gold/30' : 'bg-white border-gray-100'}`}>
      
      <Link href={`/products/${product.id_produk}`} className={`relative aspect-square block overflow-hidden ${isPremium ? 'bg-gray-800' : 'bg-gray-50'}`}>
        
        {badgeText && (
          <div className={`absolute top-2 left-2 md:top-4 md:left-4 z-10 text-[8px] md:text-[9px] font-extrabold px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider shadow-md ${badgeClass}`}>
            {badgeText}
          </div>
        )}
        
        {/* FIX: Render gambar menggunakan finalImageUrl */}
        {finalImageUrl ? (
          <img 
            src={finalImageUrl} 
            alt={product.nama_produk} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale pointer-events-none">
             <img src="/assets/img/qodhablack.png" alt="Qodha" className={`w-1/2 h-auto object-contain ${isPremium ? 'invert opacity-50' : ''}`} />
          </div>
        )}

        <div className="hidden md:flex absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center rounded-t-3xl">
          <div className="bg-white text-gray-900 font-extrabold text-sm px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl group-hover:bg-brand-gold group-hover:text-white flex items-center gap-2">
            Lihat Detail <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </Link>

      <div className="p-3 md:p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-1.5 md:mb-2">
          <span className={`text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-md uppercase tracking-wider line-clamp-1 mr-1 md:mr-2 ${isPremium ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-orange/10 text-brand-orange'}`}>
            {product.nama_kategori}
          </span>
          <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-yellow-500 shrink-0">
            <i className="fa-solid fa-star"></i> {product.rating || "5.0"}
          </div>
        </div>
        
        <Link href={`/products/${product.id_produk}`}>
          <h3 className={`font-extrabold mb-1.5 md:mb-2 leading-snug transition-colors line-clamp-2 text-xs md:text-base ${isPremium ? 'text-white hover:text-brand-gold' : 'text-gray-900 hover:text-brand-gold'}`}>
            {product.nama_produk}
          </h3>
        </Link>
        
        <div className={`flex flex-col xl:flex-row xl:items-end justify-between mt-auto pt-2 md:pt-4 border-t gap-1 md:gap-2 ${isPremium ? 'border-gray-800' : 'border-gray-50'}`}>
          <span className={`text-sm md:text-lg font-black leading-none ${isPremium ? 'text-brand-gold' : 'text-brand-green'}`}>{formatRupiah(product.harga)}</span>
          <span className={`text-[9px] md:text-xs font-medium ${isPremium ? 'text-gray-400' : 'text-gray-400'}`}>{product.terjual || 0} Terjual</span>
        </div>
        
        <Link href={`/products/${product.id_produk}`} className={`md:hidden w-full mt-3 text-center py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold transition-colors shadow-sm ${isPremium ? 'bg-brand-gold text-gray-900 active:bg-yellow-500' : 'bg-gray-900 text-white active:bg-brand-gold active:text-gray-900'}`}>
          Beli
        </Link>
      </div>
    </div>
  );
};