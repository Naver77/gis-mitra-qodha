import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-900 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/assets/img/pattern-islamic.png')]"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <span className="inline-block py-1.5 px-4 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-extrabold tracking-widest uppercase mb-6 animate-pulse">
          Peluang Bisnis 2026
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Struktur Harga & Keuntungan</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Transparansi harga modal untuk setiap level mitra. Bandingkan dan pilih paket cuan terbaik Anda.
        </p>
      </div>
    </section>
  );
};

export default Hero;