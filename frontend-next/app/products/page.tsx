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

// --- FUNGSI IKON DINAMIS ---
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


  // --- KOMPONEN UI INTERNAL ---
  
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
      <div className={`rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full ${isPremium ? 'bg-gray-900 border-brand-gold/30' : 'bg-white border-gray-100'}`}>
        <div className={`relative aspect-square overflow-hidden flex items-center justify-center ${isPremium ? 'bg-gray-800' : 'bg-gray-50'}`}>
          
          {badgeText && (
            <div className={`absolute top-4 left-4 z-10 text-[9px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md ${badgeClass}`}>
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

        <div className="p-4 md:p-5 flex flex-col grow">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider line-clamp-1 mr-2 ${isPremium ? 'bg-brand-gold/20 text-brand-gold' : 'bg-brand-orange/10 text-brand-orange'}`}>
              {product.nama_kategori}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 shrink-0">
              <i className="fa-solid fa-star"></i> {product.rating || "5.0"}
            </div>
          </div>
          
          <h3 className={`font-extrabold mb-2 leading-snug transition-colors line-clamp-2 text-sm md:text-base ${isPremium ? 'text-white group-hover:text-brand-gold' : 'text-gray-900 group-hover:text-brand-gold'}`}>
            {product.nama_produk}
          </h3>
          
          <div className={`flex flex-col xl:flex-row xl:items-end justify-between mt-auto pt-3 md:pt-4 border-t gap-2 ${isPremium ? 'border-gray-800' : 'border-gray-50'}`}>
            <span className={`text-base md:text-lg font-black leading-none ${isPremium ? 'text-brand-gold' : 'text-brand-green'}`}>{formatRupiah(product.harga)}</span>
            <span className={`text-[10px] md:text-xs font-medium ${isPremium ? 'text-gray-400' : 'text-gray-400'}`}>{product.terjual || 0} Terjual</span>
          </div>
          
          <Link href={`/products/${product.id_produk}`} className={`md:hidden w-full mt-4 text-center py-2.5 rounded-xl text-xs font-bold transition-colors shadow-md ${isPremium ? 'bg-brand-gold text-gray-900 hover:bg-yellow-500' : 'bg-gray-900 text-white hover:bg-brand-gold hover:text-gray-900'}`}>
            Beli Sekarang
          </Link>
        </div>
      </div>
    );
  };

  const ProductShelf = ({ title, items, mainCat }: { title: string, items: Product[], mainCat: string }) => {
    const shelfRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
      if (shelfRef.current) {
        shelfRef.current.scrollBy({ left: direction === 'left' ? -350 : 350, behavior: 'smooth' });
      }
    };

    return (
      <div className="bg-white rounded-4xl p-5 md:p-8 shadow-xl border border-gray-100 mb-10 relative group/shelf">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
          <h3 className="text-xl md:text-2xl font-black text-gray-800">{title}</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-brand-orange/10 text-brand-orange px-3 py-1.5 rounded-full font-bold shrink-0">{items.length} Varian</span>
            {items.length > 4 && (
              <span className="hidden md:flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest shrink-0">
                <i className="fa-solid fa-arrows-left-right"></i> Geser
              </span>
            )}
          </div>
        </div>
        
        <div className="relative">
          <button onClick={() => scroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-xl items-center justify-center text-gray-600 hover:text-brand-gold hover:scale-110 transition-all opacity-0 group-hover/shelf:opacity-100 -ml-5 border border-gray-100">
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div ref={shelfRef} className="flex overflow-x-auto pb-4 gap-4 md:gap-6 hide-scrollbar scroll-smooth relative z-10 px-1">
            {items.map(prod => (
              <div key={prod.id_produk} className="w-45 md:w-60 shrink-0">
                <ProductCard product={prod} mainCat={mainCat} />
              </div>
            ))}
            
            <div className="w-40 md:w-50 shrink-0 flex items-center justify-center">
               <button onClick={() => { setActiveCategory(getMainCategory(title)); window.scrollTo(0,0); }} className="flex flex-col items-center gap-3 text-gray-400 hover:text-brand-gold transition-all p-4 border-2 border-dashed border-gray-200 rounded-3xl w-full h-[80%] justify-center hover:bg-yellow-50 hover:border-brand-gold/50 group">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-white shadow-sm transition-transform group-hover:scale-110">
                    <i className="fa-solid fa-arrow-right text-lg"></i>
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-center tracking-wide">Lihat Semua<br/>Varian</span>
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

  const ProductGrid = ({ title, items, mainCat }: { title: string, items: Product[], mainCat: string }) => (
    <div className="bg-white rounded-4xl p-5 md:p-8 shadow-xl border border-gray-100 mb-10">
      <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
        <h3 className="text-xl md:text-2xl font-black text-gray-800">{title}</h3>
        <span className="text-xs bg-brand-orange/10 text-brand-orange px-3 py-1.5 rounded-full font-bold">{items.length} Produk</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map(prod => (
          <div key={prod.id_produk}>
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
      <section className="bg-gray-900 text-white pt-33.25 pb-16 md:pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Katalog <span className="text-brand-gold">Produk</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Temukan wangi Sunnah favorit Anda. Dari Bukhur premium hingga Parfum non-alkohol, semua diracik dengan bahan alami terbaik.
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH SECTION */}
      <section className={`sticky z-40 transition-all duration-300 ${isHidden ? 'top-0' : 'top-21.25'}`}>
        <div className={`mx-auto transition-all duration-300 ${isSticky ? 'max-w-full px-0' : 'max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative'}`}>
          <div className={`bg-white/90 backdrop-blur-xl flex flex-col md:flex-row gap-4 justify-between items-center transition-all duration-300 ${
            isSticky 
              ? 'rounded-none border-b border-gray-200 shadow-md py-3 px-4 md:px-8' 
              : 'rounded-3xl border border-gray-100 shadow-xl p-4 md:p-5'
          }`}>
            
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
              {mainCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 shrink-0 ${
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
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all font-medium text-sm ${isSticky ? 'rounded-lg' : 'rounded-full'}`}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800">Menarik Data Katalog...</h3>
            <p className="text-gray-500 mt-2">Menghubungkan ke Database MySQL.</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-4xl border border-red-100 shadow-sm animate-fade-in-up">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-server text-3xl text-red-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Koneksi Database Terputus</h3>
            <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto font-medium">
              Gagal mengambil data dari MySQL (Timeout). Pastikan server XAMPP/Laragon Anda menyala dan file API sudah dikonfigurasi dengan host &quot;127.0.0.1&quot;.
            </p>
            <button onClick={() => window.location.reload()} className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg">
              <i className="fa-solid fa-rotate-right mr-2"></i> Coba Muat Ulang
            </button>
          </div>
        ) : Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-20 bg-white rounded-4xl border border-gray-100 shadow-sm animate-fade-in-up">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-box-open text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Produk tidak ditemukan</h3>
            <p className="text-gray-500 mt-2 mb-6">Belum ada data produk atau kata kunci tidak cocok.</p>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-colors shadow-lg">
                Reset Pencarian
              </button>
            )}
          </div>
        ) : (
          /* FIX: LATAR BELAKANG GELAP (DARK MODE) UNTUK AREA PRODUK */
          <div className="bg-gray-900 rounded-3xl md:rounded-[3rem] p-6 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
            
            {/* Dekorasi Cahaya Halus di Latar Gelap */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none"></div>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10">
              {activeCategory === "Semua" ? (
                mainCategories
                  .filter(cat => cat !== "Semua" && groupedData[cat]) 
                  .map((mainCatName, index, array) => {
                    const subCats = groupedData[mainCatName];
                    const isLast = index === array.length - 1;
                    
                    return (
                      <div key={mainCatName} className={isLast ? "" : "mb-20"}>
                        {/* FIX: HEADER KATEGORI (Ikon Putih & Teks Putih) */}
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                            <i className={`fa-solid ${getCategoryIcon(mainCatName)} text-gray-900 text-xl`}></i>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-sm">{mainCatName}</h2>
                        </div>
                        
                        {Object.entries(subCats).map(([subCatName, prods]) => (
                          <ProductShelf key={subCatName} title={subCatName} items={prods} mainCat={mainCatName} />
                        ))}
                      </div>
                    );
                })
              ) : (
                groupedData[activeCategory] ? (
                  <div>
                    {/* FIX: HEADER KATEGORI (Ikon Putih & Teks Putih) */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg border border-gray-100">
                        <i className={`fa-solid ${getCategoryIcon(activeCategory)} text-gray-900 text-xl`}></i>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest drop-shadow-sm">{activeCategory}</h2>
                    </div>

                    {Object.entries(groupedData[activeCategory]).map(([subCatName, prods]) => (
                      <ProductGrid key={subCatName} title={subCatName} items={prods} mainCat={activeCategory} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400 font-bold">Kategori {activeCategory} kosong.</div>
                )
              )}
            </div>
          </div>
        )}
        
        {/* BOTTOM CTA */}
        {!isLoading && !isError && (
          <div className="mt-12 md:mt-20 animate-fade-in-up">
            <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-4xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 text-center md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Bingung Memilih Aroma?</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                  Setiap hidung memiliki memori wanginya sendiri. Datang langsung ke toko pusat atau kunjungi mitra terdekat kami untuk mencoba berbagai tester aroma secara langsung.
                </p>
              </div>
              <div className="relative z-10 w-full md:w-auto shrink-0">
                <Link href="/map" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold text-gray-900 px-8 py-4 rounded-xl font-extrabold hover:bg-yellow-500 transition-colors shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:-translate-y-1">
                  <i className="fa-solid fa-map-location-dot text-lg"></i> Temukan Mitra Terdekat
                </Link>
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
}