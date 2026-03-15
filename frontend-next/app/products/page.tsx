/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';

interface Product {
  id_produk: string | number;
  nama_produk: string;
  nama_kategori: string;
  harga: number;
  gender?: string | null; 
  gambar?: string | null;
  rating?: number;
  terjual?: number;
}

const mainCategories = ["Semua", "Bukhur", "Dupa", "Hio", "Parfum", "Perlengkapan", "Paket Hemat"];

const getMainCategory = (subCategoryName: string) => {
  const lower = subCategoryName.toLowerCase();
  if (lower.includes('bukhur')) return 'Bukhur';
  if (lower.includes('hio')) return 'Hio'; 
  if (lower.includes('dupa') || lower.includes('pelor')) return 'Dupa';
  if (lower.includes('parfum') || lower.includes('kasturi')) return 'Parfum';
  if (lower.includes('paket')) return 'Paket Hemat';
  if (lower.includes('aksesoris') || lower.includes('prapen') || lower.includes('perlengkapan') || lower.includes('mabkhara')) return 'Perlengkapan';
  return 'Lainnya';
};

const getCategoryIcon = (catName: string) => {
  const lower = catName.toLowerCase();
  if (lower.includes('bukhur')) return 'fa-fire-burner';
  if (lower.includes('dupa')) return 'fa-spa';
  if (lower.includes('hio')) return 'fa-seedling';
  if (lower.includes('parfum')) return 'fa-bottle-droplet';
  if (lower.includes('paket')) return 'fa-gift';
  if (lower.includes('perlengkapan') || lower.includes('aksesoris')) return 'fa-shapes';
  return 'fa-crown'; 
};

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

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


  // --- KOMPONEN KARTU PRODUK UNIVERSAL ---
  const ProductCard = ({ product, mainCat }: { product: Product, mainCat: string }) => {
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

    return (
      <div className={`rounded-2xl md:rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full ${isPremium ? 'bg-gray-900 border-brand-gold/30' : 'bg-white border-gray-100'}`}>
        <div className={`relative aspect-square overflow-hidden flex items-center justify-center ${isPremium ? 'bg-gray-800' : 'bg-gray-50'}`}>
          
          {badgeText && (
            <div className={`absolute top-2 left-2 md:top-4 md:left-4 z-10 text-[8px] md:text-[9px] font-extrabold px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase tracking-wider shadow-md ${badgeClass}`}>
              {badgeText}
            </div>
          )}
          
          {product.gambar ? (
            <img 
              src={product.gambar} 
              alt={product.nama_produk} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale pointer-events-none">
               <img src="/assets/img/qodhablack.png" alt="Qodha" className={`w-1/2 h-auto object-contain ${isPremium ? 'invert opacity-50' : ''}`} />
            </div>
          )}

          <div className="hidden md:flex absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center rounded-t-3xl">
            <Link href={`/products/${product.id_produk}`} className="bg-white text-gray-900 font-extrabold text-sm px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-brand-gold hover:text-white flex items-center gap-2">
              Lihat Detail <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="p-3 md:p-5 flex flex-col grow">
          <div className="flex justify-between items-start mb-1.5 md:mb-2">
            <span className={`text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-md uppercase tracking-wider line-clamp-1 mr-1 md:mr-2 ${isPremium ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-orange/10 text-brand-orange'}`}>
              {product.nama_kategori}
            </span>
            <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-yellow-500 shrink-0">
              <i className="fa-solid fa-star"></i> {product.rating || "5.0"}
            </div>
          </div>
          
          <h3 className={`font-extrabold mb-1.5 md:mb-2 leading-snug transition-colors line-clamp-2 text-xs md:text-base ${isPremium ? 'text-white group-hover:text-brand-gold' : 'text-gray-900 group-hover:text-brand-gold'}`}>
            {product.nama_produk}
          </h3>
          
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

  // --- KOMPONEN 1: SHELF (TAMPILAN "SEMUA" - SCROLL SAMPING) ---
  const ProductShelf = ({ title, items, mainCat }: { title: string, items: Product[], mainCat: string }) => {
    const shelfRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
      if (shelfRef.current) {
        shelfRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
      }
    };

    return (
      <div className="bg-white rounded-2xl md:rounded-4xl p-4 md:p-8 shadow-lg border border-gray-100 mb-6 md:mb-10 relative group/shelf">
        <div className="flex items-center justify-between mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-50">
          <h3 className="text-lg md:text-2xl font-black text-gray-800 leading-tight">{title}</h3>
          <div className="flex items-center gap-3">
            <span className="text-[10px] md:text-xs bg-brand-orange/10 text-brand-orange px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-bold shrink-0">{items.length} Varian</span>
            {items.length > 2 && (
              <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest shrink-0 animate-pulse md:animate-none">
                <i className="fa-solid fa-arrows-left-right"></i> Geser
              </span>
            )}
          </div>
        </div>
        
        <div className="relative">
          <button onClick={() => scroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition-all opacity-0 group-hover/shelf:opacity-100 -ml-5 border border-gray-100">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* FIX MOBILE: Kembali menjadi scroll horizontal dengan fitur Snap-X agar rapi */}
          <div ref={shelfRef} className="flex overflow-x-auto pb-4 gap-3 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth relative z-10 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-1">
            {items.map(prod => (
              <div key={prod.id_produk} className="w-37.5 md:w-60 shrink-0 snap-start">
                <ProductCard product={prod} mainCat={mainCat} />
              </div>
            ))}
            
            {/* Kartu "Lihat Semua" di ujung scroll */}
            <div className="w-32.5 md:w-50 shrink-0 snap-start flex items-center justify-center">
               <button onClick={() => { setActiveCategory(getMainCategory(title)); window.scrollTo(0,0); }} className="flex flex-col items-center justify-center gap-2 md:gap-3 text-gray-400 hover:text-brand-gold transition-all p-3 md:p-4 border-2 border-dashed border-gray-200 rounded-2xl md:rounded-3xl w-full h-full md:h-[80%] hover:bg-yellow-50 hover:border-brand-gold/50 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white shadow-sm transition-transform group-hover:scale-110">
                    <i className="fa-solid fa-arrow-right text-base md:text-lg"></i>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-center tracking-wide leading-tight">Lihat Semua<br/>Varian</span>
               </button>
            </div>
          </div>

          <button onClick={() => scroll('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition-all opacity-0 group-hover/shelf:opacity-100 -mr-5 border border-gray-100">
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    );
  };

  // --- KOMPONEN 2: GRID (TAMPILAN "TERFILTER" - KE BAWAH) ---
  const ProductGrid = ({ title, items, mainCat }: { title: string, items: Product[], mainCat: string }) => (
    <div className="bg-white rounded-2xl md:rounded-4xl p-4 md:p-8 shadow-lg border border-gray-100 mb-6 md:mb-10">
      <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-gray-50 pb-3 md:pb-4">
        <h3 className="text-lg md:text-2xl font-black text-gray-800 leading-tight">{title}</h3>
        <span className="text-[10px] md:text-xs bg-brand-orange/10 text-brand-orange px-2.5 py-1 md:px-3 md:py-1.5 rounded-full font-bold shrink-0">{items.length} Produk</span>
      </div>
      
      {/* FIX MOBILE: Menjadi Grid 2 Kolom ("Dua orang masuk sekolah") */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
        {items.map(prod => (
          <div key={prod.id_produk} className="col-span-1">
            <ProductCard product={prod} mainCat={mainCat} />
          </div>
        ))}
      </div>
    </div>
  );

  // --- RENDER UTAMA ---
  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-21.25">
      
      {/* HEADER SECTION */}
      <section className="bg-gray-900 text-white pt-29.5 md:pt-33.25 pb-12 md:pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 md:mb-4">Katalog <span className="text-brand-gold">Produk</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg px-2">
            Temukan wangi Sunnah favorit Anda. Dari Bukhur premium hingga Parfum non-alkohol, semua diracik dengan bahan alami terbaik.
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className={`sticky z-40 transition-all duration-300 ${isHidden ? 'top-0' : 'top-21.25'}`}>
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
      <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8 md:mt-16">
        
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
          /* KANVAS GELAP (Full width di HP, Melengkung di Desktop) */
          <div className="bg-gray-900 rounded-none sm:rounded-[3rem] px-4 py-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
            
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none"></div>

            <div className="relative z-10">
              
              {/* LOGIKA CABANG: TAMPILAN "SEMUA" VS "FILTER KATEGORI" */}
              {activeCategory === "Semua" ? (
                
                // JIKA SEMUA: Tampilkan Scroll Samping (Shelf)
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
                          // Memanggil Component Scroll Samping
                          <ProductShelf key={subCatName} title={subCatName} items={prods} mainCat={mainCatName} />
                        ))}
                      </div>
                    );
                })

              ) : (

                // JIKA DIFILTER: Tampilkan Grid Ke Bawah (Grid 2 Kolom)
                groupedData[activeCategory] ? (
                  <div>
                    <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 shrink-0">
                        <i className={`fa-solid ${getCategoryIcon(activeCategory)} text-gray-900 text-lg md:text-xl`}></i>
                      </div>
                      <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-sm">{activeCategory}</h2>
                    </div>

                    {Object.entries(groupedData[activeCategory]).map(([subCatName, prods]) => (
                      // Memanggil Component Grid Ke Bawah
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
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl md:rounded-4xl p-6 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
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