import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  // Simulasi data produk untuk interaksi slider
  const heroProducts = [
    { name: "Bukhur Pouch Premium", price: "Rp 25.000", desc: "Aroma khas timur tengah yang menenangkan untuk menemani ibadah.", img: "https://via.placeholder.com/400x400?text=Bukhur+Pouch" },
    { name: "Dupa Kerucut", price: "Rp 20.000", desc: "Praktis digunakan dengan keharuman tahan lama di ruangan tertutup.", img: "https://via.placeholder.com/400x400?text=Dupa+Kerucut" },
    { name: "Parfum Roll On 6ml", price: "Rp 15.000", desc: "Non-alkohol, praktis dibawa, dan wanginya awet seharian.", img: "https://via.placeholder.com/400x400?text=Parfum+Roll+On" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
  const prevProduct = () => setCurrentIndex((prev) => (prev === 0 ? heroProducts.length - 1 : prev - 1));

  const activeProduct = heroProducts[currentIndex];

  return (
    <section className="relative w-full min-h-[90vh] bg-gray-900 flex items-center overflow-hidden py-16 lg:py-24">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2000ms' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Kiri: Copywriting */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              <span className="text-xs font-bold text-brand-gold tracking-wide uppercase">Premium Aromatic Sunnah</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Keharuman <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Bernilai Ibadah</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hadirkan ketenangan jiwa dengan koleksi wewangian alami Qodha. Diproses higienis dengan bahan baku terbaik untuk menemani ibadah Anda.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Link to="/products" className="px-8 py-4 bg-brand-gold text-gray-900 font-bold rounded-xl hover:bg-white transition shadow-lg transform hover:-translate-y-1 flex items-center gap-2">
                <i className="fa-solid fa-bag-shopping"></i> Lihat Koleksi
              </Link>
              <Link to="/distributor" className="px-8 py-4 border border-gray-600 text-white font-bold rounded-xl hover:bg-gray-800 transition flex items-center gap-2">
                <i className="fa-solid fa-map-location-dot"></i> Cari Agen
              </Link>
            </div>
          </div>

          {/* Kanan: Card Carousel Interaktif */}
          <div className="flex justify-center w-full relative">
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-700/10 transform rotate-1 hover:rotate-0 transition duration-500">
              <div className="relative h-80 bg-gray-100 flex items-center justify-center overflow-hidden group">
                <img src={activeProduct.img} alt="Produk" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-gold uppercase tracking-wide shadow-sm">Featured</div>
              </div>
              <div className="p-6 relative bg-white">
                <div className="absolute -top-6 right-6 flex gap-2">
                  <button onClick={prevProduct} className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-brand-gold transition hover:scale-110"><i className="fa-solid fa-chevron-left"></i></button>
                  <button onClick={nextProduct} className="w-10 h-10 bg-brand-gold rounded-full shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition hover:scale-110"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{activeProduct.name}</h3>
                <p className="text-brand-gold font-bold text-lg mb-2">{activeProduct.price}</p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{activeProduct.desc}</p>
                <div className="flex gap-2 justify-center pt-2">
                  {heroProducts.map((_, idx) => (
                    <div key={idx} className={`h-2 rounded-full transition-all ${idx === currentIndex ? 'w-6 bg-brand-gold' : 'w-2 bg-gray-200'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;