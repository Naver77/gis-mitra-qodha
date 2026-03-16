"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';

// Import semua alat & komponen yang sudah dipisah
import { Product } from '@/types/product';
import { mainCategories, getMainCategory, getCategoryIcon } from '@/lib/product-utils';
import { ProductShelf } from '@/components/products/ProductShelf';
import { ProductGrid } from '@/components/products/ProductGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const [isHidden, setIsHidden] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsSticky(currentScrollY > 280);

          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsError(false);
        const response = await fetch('/api/products'); 
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setProducts(data || []);
      } catch (error) {
        console.error("Gagal memuat dari database", error);
        setProducts([]); 
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const groupedData = useMemo(() => {
    const searchFiltered = products.filter((product) => 
      product.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groups: Record<string, Record<string, Product[]>> = {};

    searchFiltered.forEach((p) => {
      const mainCat = getMainCategory(p.nama_kategori);
      const subCat = p.nama_kategori;

      if (!groups[mainCat]) groups[mainCat] = {};
      if (!groups[mainCat][subCat]) groups[mainCat][subCat] = [];

      groups[mainCat][subCat].push(p);
    });

    return groups;
  }, [products, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 -mt-[100px] md:-mt-[120px]">
      
      {/* HEADER SECTION */}
      <section className="bg-gray-900 text-white min-h-[35vh] md:min-h-[45vh] flex flex-col items-center justify-center pt-[140px] md:pt-[160px] pb-12 md:pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('[https://www.transparenttextures.com/patterns/stardust.png](https://www.transparenttextures.com/patterns/stardust.png)')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up w-full">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4">Katalog <span className="text-brand-gold">Produk</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg px-2">
            Temukan wangi Sunnah favorit Anda. Dari Bukhur premium hingga Parfum non-alkohol, semua diracik dengan bahan alami terbaik.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className={`sticky z-40 transition-all duration-300 ${isHidden ? 'top-0' : 'top-[80px] md:top-[85px]'}`}>
        <div className={`mx-auto transition-all duration-300 ${isSticky ? 'max-w-full px-0' : 'max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-8 relative'}`}>
          <div className={`bg-white/90 backdrop-blur-xl flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-center transition-all duration-300 ${
            isSticky 
              ? 'rounded-none border-b border-gray-200 shadow-md py-3 px-4 md:px-8' 
              : 'rounded-2xl md:rounded-3xl border border-gray-100 shadow-xl p-3 md:p-5'
          }`}>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] px-1">
              {mainCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 shrink-0 ${
                    isSticky ? 'rounded-lg' : 'rounded-xl'
                  } ${
                    activeCategory === cat 
                    ? 'bg-gray-900 text-brand-gold shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72 shrink-0">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all font-medium text-xs md:text-sm ${isSticky ? 'rounded-lg' : 'rounded-full'}`}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            </div>

          </div>
        </div>
      </section>

      {/* RENDER KONTEN UTAMA */}
      <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8 md:mt-12">
        
        {isLoading ? (
          <div className="text-center py-20 px-4">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Menarik Data Katalog...</h3>
            <p className="text-gray-500 mt-2 text-sm">Menghubungkan ke Database.</p>
          </div>
        ) : isError ? (
          <div className="text-center py-16 md:py-20 bg-white rounded-3xl md:rounded-4xl border border-red-100 shadow-sm animate-fade-in-up mx-4 sm:mx-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-server text-2xl md:text-3xl text-red-400"></i>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Koneksi Database Terputus</h3>
            <button onClick={() => window.location.reload()} className="bg-red-500 mt-4 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg text-sm">
              <i className="fa-solid fa-rotate-right mr-2"></i> Muat Ulang
            </button>
          </div>
        ) : Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white rounded-3xl md:rounded-4xl border border-gray-100 shadow-sm animate-fade-in-up mx-4 sm:mx-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-box-open text-2xl md:text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Produk tidak ditemukan</h3>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="bg-gray-900 mt-4 text-white px-5 py-2 rounded-xl font-bold text-sm">
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-none sm:rounded-[3rem] px-4 py-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('[https://www.transparenttextures.com/patterns/stardust.png](https://www.transparenttextures.com/patterns/stardust.png)')] opacity-[0.03] pointer-events-none"></div>
            <div className="relative z-10">
              
              {activeCategory === "Semua" ? (
                
                mainCategories
                  .filter(cat => cat !== "Semua" && groupedData[cat]) 
                  .map((mainCatName, index, array) => {
                    const subCats = groupedData[mainCatName];
                    const isLast = index === array.length - 1;
                    
                    return (
                      <div key={mainCatName} className={isLast ? "" : "mb-12 md:mb-20"}>
                        <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 shrink-0">
                            <i className={`fa-solid ${getCategoryIcon(mainCatName)} text-gray-900 text-lg md:text-xl`}></i>
                          </div>
                          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-sm">{mainCatName}</h2>
                        </div>
                        
                        {Object.entries(subCats).map(([subCatName, prods]) => (
                          <ProductShelf key={subCatName} title={subCatName} items={prods} mainCat={mainCatName} setActiveCategory={setActiveCategory} />
                        ))}
                      </div>
                    );
                })

              ) : (

                groupedData[activeCategory] ? (
                  <div>
                    <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 shrink-0">
                        <i className={`fa-solid ${getCategoryIcon(activeCategory)} text-gray-900 text-lg md:text-xl`}></i>
                      </div>
                      <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-sm">{activeCategory}</h2>
                    </div>

                    {Object.entries(groupedData[activeCategory]).map(([subCatName, prods]) => (
                      <ProductGrid key={subCatName} title={subCatName} items={prods} mainCat={activeCategory} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400 font-bold text-sm">Kategori {activeCategory} kosong.</div>
                )
              )}
            </div>
          </div>
        )}
        
        {/* BOTTOM CTA */}
        {!isLoading && !isError && (
          <div className="mt-8 md:mt-16 animate-fade-in-up px-4 sm:px-0 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl md:rounded-4xl p-6 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="absolute -top-20 -right-20 w-48 h-48 md:w-64 md:h-64 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 text-center md:text-left flex-1">
                <h3 className="text-xl md:text-3xl font-extrabold text-white mb-2 md:mb-3">Bingung Memilih Aroma?</h3>
                <p className="text-gray-400 text-xs md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                  Setiap hidung memiliki memori wanginya sendiri. Datang langsung ke toko pusat atau kunjungi mitra terdekat kami untuk mencoba berbagai tester aroma secara langsung.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                <Link href="/map" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-gray-900 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-extrabold hover:bg-yellow-500 transition-colors shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:-translate-y-1 text-sm md:text-base">
                  <i className="fa-solid fa-map-location-dot text-base md:text-lg"></i> Temukan Mitra
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}