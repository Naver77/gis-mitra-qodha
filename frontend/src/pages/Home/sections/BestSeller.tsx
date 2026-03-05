import React from 'react';
import { Link } from 'react-router-dom';

const BestSeller: React.FC = () => {
  // Simulasi data Produk Bestseller
  const bestSellers = [
    { id: 1, name: 'Bukhur Pouch (100gr)', category: 'Bukhur', price: 'Rp 25.000', img: 'https://via.placeholder.com/300?text=Bukhur+100gr' },
    { id: 2, name: 'Dupa Pelor (Isi 40)', category: 'Dupa', price: 'Rp 20.000', img: 'https://via.placeholder.com/300?text=Dupa+Pelor' },
    { id: 3, name: 'Parfum Roll On (6ml)', category: 'Parfum', price: 'Rp 15.000', img: 'https://via.placeholder.com/300?text=Parfum+6ml' },
    { id: 4, name: 'Dupa Maharaja Maharani', category: 'Dupa', price: 'Rp 45.000', img: 'https://via.placeholder.com/300?text=Dupa+Maharaja' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Produk Terlaris Bulan Ini</h2>
            <p className="text-gray-500 mt-1">Pilihan pelanggan setia Qodha.</p>
          </div>
          <Link to="/products" className="text-sm font-bold text-brand-gold hover:underline hidden md:inline-block">
            Lihat Semua <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-4 scrollbar-hide snap-x snap-mandatory">
          {bestSellers.length > 0 ? (
            bestSellers.map((prod) => (
              <div key={prod.id} className="min-w-[250px] md:min-w-[280px] bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow snap-start overflow-hidden group">
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-3 left-3 bg-brand-gold text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">TERLARIS</div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{prod.category}</span>
                  <h3 className="font-bold text-gray-900 mt-1 line-clamp-1">{prod.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-brand-green font-extrabold">{prod.price}</span>
                    <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-brand-gold hover:text-white transition flex items-center justify-center">
                      <i className="fa-solid fa-cart-plus text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm italic w-full text-center">Belum ada data produk.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;