import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-4 pt-[85px]">
      <div className="max-w-md w-full text-center">
        
        {/* Dekorasi Visual */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative w-full h-full bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-100 rotate-12 hover:rotate-0 transition-transform duration-500 cursor-pointer">
            <span className="text-6xl text-gray-900 font-black tracking-tighter shadow-sm">
              4<span className="text-brand-gold">0</span>4
            </span>
          </div>
        </div>

        {/* Teks Konten */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Waduh, Anda Tersesat!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Halaman yang Anda cari sepertinya sudah dipindahkan, dihapus, atau memang tidak pernah ada. Jangan khawatir, mari kembali ke jalan yang benar.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-colors shadow-lg flex items-center justify-center gap-2 group"
          >
            <i className="fa-solid fa-house group-hover:-translate-y-1 transition-transform"></i>
            Kembali ke Beranda
          </Link>
          <Link 
            href="/products" 
            className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            Lihat Katalog Produk
          </Link>
        </div>

      </div>
    </div>
  );
}