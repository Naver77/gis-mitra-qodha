/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// --- 1. DATA PRODUK DUMMY ---
const products = [
  { id: 1, name: "Bukhur Maghribi Premium", category: "Bukhur", price: "Rp 25.000", rating: 4.9, sold: 1250, image: "https://placehold.co/400x400/1f2937/fff?text=Bukhur+Maghribi", badge: "Terlaris" },
  { id: 2, name: "Parfum Kasturi Kijang", category: "Parfum", price: "Rp 35.000", rating: 4.8, sold: 890, image: "https://placehold.co/400x400/1f2937/fff?text=Kasturi+Kijang", badge: "Terbaru" },
  { id: 3, name: "Dupa Kerucut Keraton", category: "Dupa", price: "Rp 15.000", rating: 4.7, sold: 540, image: "https://placehold.co/400x400/1f2937/fff?text=Dupa+Keraton" },
  { id: 4, name: "Bukhur Emirate VIP", category: "Bukhur", price: "Rp 45.000", rating: 5.0, sold: 320, image: "https://placehold.co/400x400/1f2937/fff?text=Bukhur+Emirate", badge: "Premium" },
  { id: 5, name: "Mabkhara Kayu Jati Ukir", category: "Mabkhara", price: "Rp 85.000", rating: 4.9, sold: 150, image: "https://placehold.co/400x400/1f2937/fff?text=Mabkhara+Jati" },
  { id: 6, name: "Parfum Raudhah Madinah", category: "Parfum", price: "Rp 40.000", rating: 4.8, sold: 670, image: "https://placehold.co/400x400/1f2937/fff?text=Parfum+Raudhah" },
];

const categories = ["Semua", "Bukhur", "Parfum", "Dupa", "Mabkhara"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // --- 2. LOGIKA FILTER & PENCARIAN ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = activeCategory === "Semua" || product.category === activeCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* HEADER SECTION */}
      <section className="bg-gray-900 text-white py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold rounded-full filter blur-[100px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Katalog <span className="text-brand-gold">Produk</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Temukan wangi Sunnah favorit Anda. Dari Bukhur premium hingga Parfum non-alkohol, semua diracik dengan bahan alami terbaik.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-center border border-gray-100">
          
          {/* Tabs Kategori */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat 
                  ? 'bg-gray-900 text-brand-gold shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all font-medium text-sm"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

        </div>
      </section>

      {/* GRID PRODUK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-box-open text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Produk tidak ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                
                {/* Gambar Produk */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-brand-gold text-gray-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.badge}
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay Action */}
                  <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {/* PERUBAHAN DI SINI: URL diubah menjadi /products/${product.id} */}
                    <Link href={`/products/${product.id}`} className="bg-white text-gray-900 font-bold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-brand-gold">
                      Lihat Detail
                    </Link>
                  </div>
                </div>

                {/* Info Produk */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                      <i className="fa-solid fa-star"></i> {product.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 leading-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-end justify-between mt-4">
                    <span className="text-lg font-black text-brand-green">{product.price}</span>
                    <span className="text-xs text-gray-500 font-medium">{product.sold} Terjual</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}