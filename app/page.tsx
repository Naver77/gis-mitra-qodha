import React from 'react';
import Link from 'next/link';
import { getProdukList } from '@/app/admin/produk/actions';
import { Product } from '@/types/product';
import HeroSlider from '@/components/HeroSlider';

// ISR Cache: Render ulang otomatis dari database setiap 60 detik (Sangat Cepat)
export const revalidate = 60;

// FIX 1: Definisikan struktur data untuk Slider agar TypeScript tidak kebingungan
interface SlideProduct {
  id: string | number;
  name: string;
  desc: string;
  price: string;
  image: string;
  color: string;
}

export default async function Home() {
  // FIX 1 (Lanjutan): Terapkan interface SlideProduct[] ke variabel awal
  let sliderProducts: SlideProduct[] = [];

  try {
    const allProducts = await getProdukList() as unknown as Product[];
    
    // Daftar nama produk target sesuai database
    const targetNames = [
      "Bukhur Kayu Premium - Hajar Aswad",
      "Premium Bukhur - Dizwhar",
      "Bukhur Kayu Premium - Sabaya"
    ];
    
    // Deskripsi & Warna yang di-hardcode sesuai kecocokan nama produk
    const customData = {
      "Bukhur Kayu Premium - Hajar Aswad": {
        desc: "Wewangian khas Timur Tengah dengan ketahanan aroma hingga 12 jam. Cocok untuk relaksasi dan majelis ilmu.",
        color: "from-brand-gold/20 to-transparent"
      },
      "Premium Bukhur - Dizwhar": {
        desc: "Aroma rempah pilihan yang lembut dan menenangkan jiwa, menghadirkan nuansa sakral di setiap sudut ruangan Anda.",
        color: "from-blue-500/20 to-transparent"
      },
      "Bukhur Kayu Premium - Sabaya": {
        desc: "Karakter wangi elegan dan segar, memberikan energi positif dan keharuman premium yang elegan dan tahan lama.",
        color: "from-purple-500/20 to-transparent"
      }
    };

    const formatRupiah = (angka: number) => {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };

    const getImageUrl = (foto: string | null | undefined) => {
      if (!foto) return '';
      if (foto.startsWith('data:image') || foto.startsWith('http')) return foto;
      return `/uploads/produk/${foto}`;
    };

    // Mencocokkan data DB dengan list hardcoded
    const mappedProducts = targetNames.map((name, index) => {
      const product = allProducts.find(p => p.nama_produk === name);
      if (product) {
        
        // FIX 2: Memberi tahu TypeScript bahwa 'foto_produk' mungkin saja ada di dalam objek Product ini
        const productWithFoto = product as Product & { foto_produk?: string };
        
        return {
          id: product.id_produk || index,
          name: product.nama_produk, // Dari DB
          desc: customData[name as keyof typeof customData].desc, // Dari Hardcoded
          price: formatRupiah(product.harga), // Dari DB
          image: getImageUrl(productWithFoto.foto_produk || product.gambar), // Dari DB
          color: customData[name as keyof typeof customData].color // Dari Hardcoded
        };
      }
      return null;
    });
    
    // Memfilter data null dan meyakinkan TypeScript hasil akhirnya adalah SlideProduct[]
    sliderProducts = mappedProducts.filter(Boolean) as SlideProduct[]; 

  } catch (error) {
    console.error("Gagal mengambil data beranda dari database:", error);
  }

  // Fallback (Jika database bermasalah atau 3 produk di atas kebetulan terhapus)
  if (!sliderProducts || sliderProducts.length === 0) {
    sliderProducts = [
      {
        id: 1,
        name: "Koleksi Bukhur Premium",
        desc: "Jelajahi keharuman khas Timur Tengah yang menenangkan jiwa.",
        price: "Mulai Rp 25.000",
        image: "https://placehold.co/600x600/1f2937/fff?text=Qodha+Aromatic",
        color: "from-brand-gold/20 to-transparent"
      }
    ];
  }

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. HERO SECTION (Dynamic Database Slider) */}
      <HeroSlider products={sliderProducts} />

      {/* 2. KENAPA MEMILIH QODHA (Mobile UI Optimized) */}
      <section className="w-full py-12 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 md:mb-12">Mengapa Memilih <span className="text-brand-gold">Qodha</span>?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8">
            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-50 text-brand-gold rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-6">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">100% Bahan Premium</h3>
              <p className="text-gray-500 leading-relaxed text-[10px] sm:text-sm">Diramu dari serbuk kayu pilihan tanpa bahan kimia berbahaya.</p>
            </div>

            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 text-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-6">
                <i className="fa-solid fa-certificate"></i>
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">Aman & Nyaman</h3>
              <p className="text-gray-500 leading-relaxed text-[10px] sm:text-sm">Asap tidak perih di mata, aman untuk ibadah sehari-hari.</p>
            </div>

            <div className="col-span-2 md:col-span-1 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col md:block items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 text-brand-green rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-6">
                <i className="fa-solid fa-sack-dollar"></i>
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">Peluang Usaha</h3>
              <p className="text-gray-500 leading-relaxed text-[10px] sm:text-sm text-center">Bergabunglah dengan ratusan mitra. Margin profit tinggi & dukungan penuh.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KATEGORI PRODUK UTAMA (Mobile UI Optimized) */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-2 sm:gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">Kategori Produk</h2>
              <p className="text-xs sm:text-base text-gray-500">Temukan wangi khas yang menggambarkan kepribadian Anda.</p>
            </div>
            <Link href="/products" className="text-brand-gold text-sm sm:text-base font-bold hover:underline flex items-center gap-2 mt-2 sm:mt-0">
              Lihat Semua <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { name: "Bukhur", count: "35+ Varian", icon: "fa-fire", color: "bg-red-50 text-red-500" },
              { name: "Dupa Kerucut", count: "15+ Varian", icon: "fa-mountain", color: "bg-orange-50 text-orange-500" },
              { name: "Parfum Roll", count: "40+ Varian", icon: "fa-bottle-droplet", color: "bg-blue-50 text-blue-500" },
              { name: "Mabkhara", count: "10+ Model", icon: "fa-chess-rook", color: "bg-gray-100 text-gray-700" }
            ].map((cat, idx) => (
              <Link href="/products" key={idx} className="group bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-xl hover:border-brand-gold transition-all duration-300">
                {/* FIX 3: Mengubah h-14 yang typo menjadi sm:h-14 */}
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full ${cat.color} flex items-center justify-center text-base sm:text-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-gray-900 group-hover:text-brand-gold transition-colors">{cat.name}</h3>
                <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER (Mobile UI Optimized) */}
      <section className="w-full py-8 md:py-16 px-4">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-3xl md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold rounded-full filter blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-green rounded-full filter blur-[80px] opacity-30"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6">Siap Menjadi Bagian dari Kami?</h2>
            <p className="text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto text-xs sm:text-lg leading-relaxed">
              Jadilah agen/distributor resmi Qodha Aromatic di kota Anda dan nikmati keuntungan finansial sekaligus menebar wangi Sunnah.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/partnership" className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-extrabold transition shadow-lg shadow-brand-gold/30 text-sm sm:text-base">
                Pelajari Kemitraan
              </Link>
              <a href="https://wa.me/6281717302223" target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 backdrop-blur-sm text-sm sm:text-base">
                <i className="fa-brands fa-whatsapp text-green-400 text-lg"></i> Hubungi CS
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}