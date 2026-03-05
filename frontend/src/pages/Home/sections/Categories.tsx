import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  const categories = [
    { id: 'bukhur', name: 'Bukhur', icon: 'fa-cloud', bg: 'bg-stone-50', col: 'text-stone-500' },
    { id: 'dupa', name: 'Dupa', icon: 'fa-fire', bg: 'bg-orange-50', col: 'text-orange-400' },
    { id: 'parfum', name: 'Parfum', icon: 'fa-spray-can', bg: 'bg-purple-50', col: 'text-purple-400' },
    { id: 'aksesoris', name: 'Aksesoris', icon: 'fa-gem', bg: 'bg-emerald-50', col: 'text-emerald-400' }
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Kategori Pilihan</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((c) => (
            <Link key={c.id} to={`/products?category=${c.id}`} className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1 border border-gray-100">
              <div className={`w-14 h-14 mx-auto ${c.bg} rounded-full flex items-center justify-center text-2xl mb-3 ${c.col} group-hover:scale-110 transition`}>
                <i className={`fa-solid ${c.icon}`}></i>
              </div>
              <h3 className="font-bold text-gray-800">{c.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;