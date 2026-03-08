/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// --- 1. DEFINISI TIPE DATA (INTERFACE) ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  priceString: string;
  rating: number;
  sold: number;
  stock: number;
  image: string;
  badge: string;
  desc: string;
  aroma: string[];
}

// --- 2. DATA PRODUK DUMMY ---
const productsDatabase: Product[] = [
  { id: 1, name: "Bukhur Maghribi Premium", category: "Bukhur", price: 25000, priceString: "Rp 25.000", rating: 4.9, sold: 1250, stock: 50, image: "https://placehold.co/800x800/1f2937/fff?text=Bukhur+Maghribi", badge: "Terlaris", desc: "Wewangian khas Timur Tengah dengan ketahanan aroma hingga 12 jam. Diramu dari kayu gaharu pilihan dan minyak wangi konsentrat tinggi. Cocok untuk relaksasi, mengharumkan ruangan, dan menemani majelis ilmu.", aroma: ["Kayu Gaharu", "Mawar", "Rempah Arab"] },
  { id: 2, name: "Parfum Kasturi Kijang", category: "Parfum", price: 35000, priceString: "Rp 35.000", rating: 4.8, sold: 890, stock: 120, image: "https://placehold.co/800x800/1f2937/fff?text=Kasturi+Kijang", badge: "Terbaru", desc: "Parfum Sunnah non-alkohol (100% konsentrat murni) dengan aroma Kasturi Kijang yang lembut, segar, dan menenangkan jiwa. Aman digunakan langsung di kulit atau pakaian ibadah.", aroma: ["Kasturi Asli", "Vanilla Lembut"] },
  { id: 3, name: "Dupa Kerucut Keraton", category: "Dupa", price: 15000, priceString: "Rp 15.000", rating: 4.7, sold: 540, stock: 200, image: "https://placehold.co/800x800/1f2937/fff?text=Dupa+Keraton", badge: "", desc: "Menghadirkan suasana keraton yang magis dan sakral ke dalam ruangan Anda. Asap mengalir lembut ke bawah (backflow) menciptakan efek visual yang menenangkan.", aroma: ["Cendana", "Melati", "Kemenyan Jawa"] },
  { id: 4, name: "Bukhur Emirate VIP", category: "Bukhur", price: 45000, priceString: "Rp 45.000", rating: 5.0, sold: 320, stock: 25, image: "https://placehold.co/800x800/1f2937/fff?text=Bukhur+Emirate", badge: "Premium", desc: "Edisi VIP eksklusif dengan serpihan emas (dekoratif) dan campuran minyak Oud kelas A. Aroma mewah yang sering digunakan di hotel-hotel bintang 5 Dubai.", aroma: ["Oud Murni", "Saffron", "Amber"] },
];

export default function ProductDetail() {
  const params = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('deskripsi');

  // --- 3. AMBIL DATA PRODUK (ASYNC FIX) ---
  useEffect(() => {
    let isMounted = true; // Mencegah memory leak saat pindah halaman cepat

    const fetchProductData = async () => {
      // 1. Simulasi delay jaringan secara Asynchronous (Ini yang disukai React)
      await new Promise(resolve => setTimeout(resolve, 400));

      if (!isMounted) return;

      // 2. Cek parameter
      if (!params || !params.id) {
        setIsLoading(false);
        return;
      }

      // 3. Proses pencarian data
      const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
      const productId = Number(idParam);
      const foundProduct = productsDatabase.find(p => p.id === productId);

      // 4. Update state dengan aman
      setProduct(foundProduct || null);
      setIsLoading(false);
    };

    fetchProductData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, [params]);

  // --- 4. FUNGSI WHATSAPP ---
  const handleBuyNow = () => {
    if (!product) return;
    const waNumber = "6281717302223"; 
    const total = (product.price * quantity).toLocaleString('id-ID');
    const text = `Halo Admin Qodha!%0A%0ASaya ingin memesan:%0A📦 *${product.name}*%0A🔢 Jumlah: ${quantity} pcs%0A💰 Estimasi Total: Rp ${total}%0A%0AMohon info ketersediaan dan ongkos kirim ke alamat saya. Terima kasih!`;
    
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  // --- RENDER LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-bold animate-pulse">Memuat produk...</p>
        </div>
      </div>
    );
  }

  // --- RENDER 404 (PRODUK TIDAK DITEMUKAN) ---
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <div className="text-6xl mb-4">🕵️‍♂️</div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-8">Maaf, produk yang Anda cari mungkin sudah dihapus atau URL tidak valid.</p>
          <Link href="/products" className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-colors shadow-lg w-full block">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDER HALAMAN PRODUK ---
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. BREADCRUMB (Navigasi Jejak) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500 font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
            <Link href="/" className="hover:text-brand-gold transition flex items-center"><i className="fa-solid fa-house mr-2"></i>Beranda</Link>
            <span className="mx-3 text-gray-300">/</span>
            <Link href="/products" className="hover:text-brand-gold transition">Katalog</Link>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-gray-400 cursor-default">{product.category}</span>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-gray-900 font-bold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* 2. PRODUK UTAMA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Kiri: Gambar Produk */}
            <div className="relative p-6 md:p-12 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 bg-brand-gold text-gray-900 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md animate-fade-in-up">
                  {product.badge}
                </div>
              )}
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Kanan: Info & Aksi */}
            <div className="p-6 md:p-12 flex flex-col justify-center">
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-md uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                  <i className="fa-solid fa-star"></i> {product.rating} <span className="text-gray-400 font-normal ml-1">({product.sold}+ Terjual)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="text-3xl font-black text-brand-green mb-6">
                {product.priceString}
              </div>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {product.desc}
              </p>

              <div className="border-t border-gray-100 pt-8 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  
                  {/* Kuantitas */}
                  <div>
                    <span className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Jumlah</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 w-32">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 rounded-lg hover:shadow-sm transition"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={quantity} 
                        className="w-10 text-center bg-transparent font-bold text-gray-900 outline-none"
                      />
                      <button 
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 rounded-lg hover:shadow-sm transition"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-medium text-gray-500">
                    Tersedia: <span className="font-bold text-gray-900">{product.stock} pcs</span>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-brand-gold text-white hover:text-gray-900 px-8 py-4 rounded-xl font-extrabold transition-all duration-300 shadow-xl shadow-gray-900/20 flex items-center justify-center gap-3 group"
                >
                  <i className="fa-brands fa-whatsapp text-xl text-green-400 group-hover:text-green-600 transition-colors"></i>
                  Pesan Sekarang
                </button>
                <Link 
                  href="/products"
                  className="px-8 py-4 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900 transition flex items-center justify-center gap-2"
                >
                  Katalog Lainnya
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3. TABS INFORMASI TAMBAHAN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-10">
          
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
            <button onClick={() => setActiveTab('deskripsi')} className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'deskripsi' ? 'text-brand-gold' : 'text-gray-500 hover:text-gray-900'}`}>
              Deskripsi Lengkap
              {activeTab === 'deskripsi' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold rounded-t-full"></span>}
            </button>
            <button onClick={() => setActiveTab('aroma')} className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'aroma' ? 'text-brand-gold' : 'text-gray-500 hover:text-gray-900'}`}>
              Kandungan Aroma
              {activeTab === 'aroma' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold rounded-t-full"></span>}
            </button>
            <button onClick={() => setActiveTab('pengiriman')} className={`pb-4 px-6 font-bold text-sm whitespace-nowrap transition-colors relative ${activeTab === 'pengiriman' ? 'text-brand-gold' : 'text-gray-500 hover:text-gray-900'}`}>
              Info Pengiriman
              {activeTab === 'pengiriman' && <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold rounded-t-full"></span>}
            </button>
          </div>

          <div className="text-gray-600 leading-relaxed text-sm md:text-base animate-fade-in-up">
            {activeTab === 'deskripsi' && (
              <p>Produk <strong>{product.name}</strong> diproduksi dengan standar higienis tinggi menggunakan bahan baku 100% alami tanpa bahan kimia berbahaya. Sangat cocok digunakan untuk ibadah sehari-hari, majelis taklim, relaksasi, atau sebagai pengharum ruangan alami di rumah Anda. Asap yang dihasilkan tidak membuat pedih di mata dan wanginya tahan lama menempel pada kain atau ruangan.</p>
            )}
            
            {activeTab === 'aroma' && (
              <div>
                <p className="mb-4">Produk ini memiliki paduan *notes* aroma berikut:</p>
                <div className="flex flex-wrap gap-2">
                  {product.aroma?.map((a: string, i: number) => (
                    <span key={i} className="bg-yellow-50 text-yellow-800 border border-yellow-200 font-bold px-4 py-2 rounded-xl text-sm">
                      <i className="fa-solid fa-droplet text-brand-gold mr-2"></i>{a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pengiriman' && (
              <ul className="space-y-3 list-disc pl-5">
                <li>Pengiriman dilakukan setiap hari Senin - Sabtu.</li>
                <li>Pesanan yang masuk sebelum jam 15:00 WIB akan dikirim pada hari yang sama.</li>
                <li>Packing dijamin aman menggunakan bubble wrap tebal dan kardus khusus.</li>
                <li>Melayani pengiriman ke seluruh Indonesia via JNE, J&T, Sicepat, dan Cargo (untuk pembelian grosir/mitra).</li>
              </ul>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}