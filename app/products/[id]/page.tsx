/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id_produk: string | number;
  nama_produk: string;
  nama_kategori: string;
  harga: number;
  gender?: string | null; 
  gambar?: string | null;
  foto_produk?: string | null; // FIX: Tambahkan tipe untuk foto_produk
  rating?: number;
  terjual?: number;
  stok?: number;
  deskripsi?: string;
  aroma?: string;
}

const formatRupiah = (angka: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
};

// FIX: Fungsi Pembaca Base64 
const getImageUrl = (foto: string | null | undefined) => {
  if (!foto) return '';
  if (foto.startsWith('data:image') || foto.startsWith('http')) return foto;
  return `/uploads/produk/${foto}`;
};

export default function ProductDetail() {
  const params = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('deskripsi');

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 85) {
            setIsHeaderVisible(true);
          } else if (currentScrollY < lastScrollY.current) {
            setIsHeaderVisible(true);
          } else {
            setIsHeaderVisible(false);
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
    let isMounted = true;

    const fetchProductData = async () => {
      try {
        setIsLoading(true);
        if (!params || !params.id) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const productId = String(Array.isArray(params.id) ? params.id[0] : params.id);
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Gagal mengambil data API');
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        if (!isMounted) return;

        const foundProduct = data.find((p: Product) => String(p.id_produk) === productId);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null); 
        }
      } catch (error) {
        console.error("Gagal memuat detail produk:", error);
        if (isMounted) setProduct(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProductData();
    return () => { isMounted = false; };
  }, [params]);

  const handleBuyNow = () => {
    if (!product) return;
    const waNumber = "6281717302223"; 
    const total = formatRupiah(product.harga * quantity);
    const text = `Halo Admin Qodha!%0A%0ASaya tertarik untuk memesan:%0A📦 *${product.nama_produk}*%0A🔢 Jumlah: ${quantity} pcs%0A💰 Estimasi Total: ${total}%0A%0AMohon info ketersediaan stok dan ongkos kirim. Terima kasih!`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-21.25">
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mb-4 shadow-lg"></div>
          <p className="text-gray-500 font-extrabold tracking-widest uppercase text-xs animate-pulse">Menyiapkan Produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-21.25 px-4">
        <div className="text-center bg-white p-8 md:p-12 rounded-4xl shadow-2xl border border-gray-100 max-w-md w-full animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <i className="fa-solid fa-box-open text-4xl text-gray-400"></i>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">Produk Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">Maaf, produk yang Anda cari mungkin telah habis, dihapus, atau URL tidak valid.</p>
          <Link href="/products" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-xl w-full flex items-center justify-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const isPremium = product.nama_kategori.toLowerCase().includes('premium');
  const stokTersedia = product.stok !== undefined ? product.stok : 99;
  const ratingProduk = product.rating || "5.0";
  const terjualProduk = product.terjual || "0";
  const deskripsiProduk = product.deskripsi || `Koleksi eksklusif ${product.nama_produk} dari Qodha Aromatic. Diracik menggunakan bahan-bahan alami pilihan dengan standar higienis yang tinggi. Menghasilkan aroma khas Timur Tengah yang tahan lama, sangat cocok untuk menemani relaksasi, majelis ilmu, dan mengharumkan ruangan Anda sehari-hari.`;
  const listAroma = product.aroma ? product.aroma.split(',') : (isPremium ? ["Kayu Gaharu", "Mawar Arab", "Oud Murni"] : ["Floral Lembut", "Rempah Alami", "Woody"]);

  // FIX: Tentukan URL Akhir menggunakan helper Base64
  const fotoToUse = product.foto_produk || product.gambar;
  const finalImageUrl = getImageUrl(fotoToUse);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="h-20 md:h-21.25 w-full bg-transparent pointer-events-none"></div>

      <div className={`bg-white border-b border-gray-100 sticky z-40 shadow-sm transition-all duration-300 ease-in-out ${isHeaderVisible ? 'top-20 md:top-21.25' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center text-xs md:text-sm text-gray-500 font-bold whitespace-nowrap overflow-x-auto hide-scrollbar">
            <Link href="/" className="hover:text-brand-gold transition-colors flex items-center gap-2"><i className="fa-solid fa-house"></i> Beranda</Link>
            <span className="mx-3 text-gray-300">/</span>
            <Link href="/products" className="hover:text-brand-gold transition-colors">Katalog</Link>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md">{product.nama_kategori}</span>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-37.5 md:max-w-xs">{product.nama_produk}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-8">
        <div className="bg-white rounded-4xl md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
            
            <div className={`relative p-6 md:p-12 lg:p-16 bg-gray-50 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 lg:sticky lg:h-[calc(100vh-140px)] transition-all duration-300 ease-in-out ${isHeaderVisible ? 'lg:top-35' : 'lg:top-15'}`}>
              {isPremium && (
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 bg-gray-900 text-brand-gold border border-brand-gold/30 text-[10px] md:text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl animate-fade-in-up flex items-center gap-2">
                  <i className="fa-solid fa-crown"></i> Premium
                </div>
              )}

              <div className="relative w-full max-w-sm md:max-w-md aspect-square rounded-2xl md:rounded-4xl overflow-hidden shadow-2xl group border border-gray-200/50 bg-white">
                {/* FIX: Tampilkan gambar Base64 di sini */}
                {finalImageUrl ? (
                  <img 
                    src={finalImageUrl} 
                    alt={product.nama_produk} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale pointer-events-none bg-gray-100">
                    <img src="/assets/img/qodhablack.png" alt="Qodha" className={`w-1/2 h-auto object-contain ${isPremium ? 'invert opacity-50' : ''}`} />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center">
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] md:text-xs font-extrabold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg uppercase tracking-wider">
                  {product.nama_kategori}
                </span>
                <div className="flex items-center gap-1 text-xs md:text-sm font-bold text-yellow-500 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                  <i className="fa-solid fa-star"></i> {ratingProduk} <span className="text-gray-400 font-medium ml-1">({terjualProduk}+ Terjual)</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
                {product.nama_produk}
              </h1>
              
              <div className="text-3xl md:text-4xl font-black text-brand-green mb-6">
                {formatRupiah(product.harga)}
              </div>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 md:mb-10 line-clamp-4 md:line-clamp-none">
                {deskripsiProduk}
              </p>

              <div className="bg-gray-50 rounded-2xl p-5 md:p-6 mb-8 border border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <span className="block text-[10px] md:text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Atur Jumlah</span>
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 w-32 shadow-sm">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-minus text-sm"></i>
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={quantity} 
                        className="w-10 text-center bg-transparent font-black text-lg text-gray-900 outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(Math.min(stokTersedia, quantity + 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-plus text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 text-right w-full sm:w-auto">
                    Stok Tersedia: <br className="hidden sm:block" />
                    <span className="font-black text-xl text-gray-900">{stokTersedia}</span> pcs
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-brand-gold text-white hover:text-gray-900 px-6 py-4 md:py-5 rounded-2xl font-black text-sm md:text-base transition-all duration-300 shadow-xl shadow-gray-900/20 flex items-center justify-center gap-3 group active:scale-95"
                >
                  <i className="fa-brands fa-whatsapp text-2xl text-green-400 group-hover:text-green-600 transition-colors"></i>
                  Pesan via WhatsApp
                </button>
                <Link 
                  href="/products"
                  className="px-6 py-4 md:py-5 rounded-2xl font-bold border-2 border-gray-200 text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 active:scale-95 text-sm md:text-base"
                >
                  Katalog Lainnya
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 4. TABS INFORMASI TAMBAHAN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10">
        <div className="bg-white rounded-4xl md:rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden p-6 md:p-12">
          
          <div className="flex border-b border-gray-100 mb-8 overflow-x-auto hide-scrollbar snap-x">
            <button onClick={() => setActiveTab('deskripsi')} className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition-colors relative snap-start ${activeTab === 'deskripsi' ? 'text-brand-gold' : 'text-gray-400 hover:text-gray-900'}`}>
              Deskripsi Lengkap
              {activeTab === 'deskripsi' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold rounded-t-full"></span>}
            </button>
            <button onClick={() => setActiveTab('aroma')} className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition-colors relative snap-start ${activeTab === 'aroma' ? 'text-brand-gold' : 'text-gray-400 hover:text-gray-900'}`}>
              Kandungan Aroma
              {activeTab === 'aroma' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold rounded-t-full"></span>}
            </button>
            <button onClick={() => setActiveTab('pengiriman')} className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition-colors relative snap-start ${activeTab === 'pengiriman' ? 'text-brand-gold' : 'text-gray-400 hover:text-gray-900'}`}>
              Info Pengiriman
              {activeTab === 'pengiriman' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold rounded-t-full"></span>}
            </button>
          </div>

          <div className="text-gray-500 leading-relaxed text-sm md:text-base animate-fade-in-up">
            {activeTab === 'deskripsi' && (
              <p className="max-w-4xl text-justify md:text-left">{deskripsiProduk}</p>
            )}
            
            {activeTab === 'aroma' && (
              <div className="max-w-4xl">
                <p className="mb-5 font-medium">Produk <span className="font-bold text-gray-900">{product.nama_produk}</span> ini memiliki paduan *notes* aroma utama berikut:</p>
                <div className="flex flex-wrap gap-3">
                  {listAroma.map((a: string, i: number) => (
                    <span key={i} className="bg-yellow-50/50 text-yellow-700 border border-yellow-200/50 font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm flex items-center">
                      <i className="fa-solid fa-droplet text-brand-gold mr-2.5"></i>{a.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pengiriman' && (
              <ul className="space-y-4 max-w-4xl">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-calendar-check text-brand-green mt-1"></i>
                  <span>Pengiriman dilakukan setiap hari Senin - Sabtu. Pesanan hari Minggu diproses Senin.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-clock-rotate-left text-brand-green mt-1"></i>
                  <span>Pesanan yang dikonfirmasi sebelum jam <strong>15:00 WIB</strong> akan dikirim pada hari yang sama.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-box-open text-brand-green mt-1"></i>
                  <span>Packing dijamin sangat aman menggunakan *bubble wrap* tebal ekstra dan kardus khusus pengiriman.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-truck-fast text-brand-green mt-1"></i>
                  <span>Melayani pengiriman ke seluruh Indonesia via Ekspedisi reguler dan Cargo (khusus untuk Mitra Grosir).</span>
                </li>
              </ul>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}