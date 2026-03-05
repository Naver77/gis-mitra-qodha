import React from 'react';
import { Link } from 'react-router-dom';

const Values: React.FC = () => {
  const valueProps = [
    { icon: 'fa-leaf', title: '100% Bahan Alami', desc: 'Aman untuk pernapasan dan kesehatan keluarga.' },
    { icon: 'fa-flask', title: 'Proses Higienis', desc: 'Diproses dengan standar kebersihan yang tinggi.' },
    { icon: 'fa-tags', title: 'Harga Pabrik', desc: 'Kualitas premium dengan harga yang sangat terjangkau.' },
    { icon: 'fa-handshake', title: 'Support Kemitraan', desc: 'Didukung penuh oleh tim marketing pusat.' }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/img/pattern-islamic.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Values Grid */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-bold tracking-widest text-sm uppercase">Keunggulan Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">Kenapa Harus Qodha Aromatic?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {valueProps.map((p, idx) => (
            <div key={idx} className="bg-gray-800/50 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-brand-gold transition duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold transition">
                <i className={`fa-solid ${p.icon} text-brand-gold text-xl group-hover:text-gray-900`}></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Map */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-emerald-100">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Temukan Mitra Resmi</h2>
            <p className="text-gray-600 text-lg">Cek lokasi mitra terdekat di kota Anda untuk mendapatkan produk Qodha original.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/distributor" className="px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-emerald-600 transition shadow-lg flex items-center gap-2">
                <i className="fa-solid fa-map-location-dot"></i> Buka Peta
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-500">
              <img 
                src="/assets/img/map-preview.png" 
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x350?text=Peta+Sebaran+Mitra+Qodha'; }} 
                className="w-full h-auto" 
                alt="Peta Lokasi" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Values;