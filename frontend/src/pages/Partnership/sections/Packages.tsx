import React from 'react';

const Packages: React.FC = () => {
  return (
    <section id="paket" className="py-20 bg-white border-b border-gray-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Syarat & Ketentuan</h2>
          <p className="text-gray-500 text-lg">Mulai bisnis Anda dengan modal yang terjangkau.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* RESELLER */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition relative group">
            <div className="text-center pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-700 transition">Reseller</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">1 Juta</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-1">Min. Belanja Awal</span>
              </div>
              <div className="mt-3 text-xs font-bold text-gray-500 bg-gray-100 py-1.5 px-3 rounded-lg inline-block border border-gray-200">Atau Pembelanjaan 1 Karton</div>
            </div>
            <div className="pt-8 text-center">
              <button className="block w-full py-3.5 border-2 border-gray-200 text-gray-600 font-bold text-center rounded-xl hover:border-gray-800 hover:text-gray-900 hover:bg-gray-50 transition duration-300">Daftar Reseller</button>
            </div>
          </div>

          {/* AGEN */}
          <div className="bg-white rounded-2xl p-8 border-2 border-brand-green shadow-xl relative transform md:-translate-y-4 z-10 hover:shadow-2xl transition duration-300">
            <div className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm">MOST POPULAR</div>
            <div className="text-center pb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-brand-green uppercase tracking-wider">Agen</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">3 Juta</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-1">Min. Belanja Awal</span>
              </div>
              <div className="mt-3 text-xs font-bold text-green-700 bg-green-50 py-1.5 px-3 rounded-lg inline-block border border-green-100">Atau Pembelanjaan 3 Karton</div>
            </div>
            <div className="pt-8 text-center">
              <button className="block w-full py-4 bg-brand-green text-white font-bold text-center rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-green-200 transform hover:-translate-y-0.5">Daftar Agen</button>
            </div>
          </div>

          {/* DISTRIBUTOR */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl relative text-white overflow-hidden group hover:shadow-brand-gold/20 hover:border-brand-gold/50 transition duration-300">
            <div className="absolute top-0 right-0 bg-brand-gold text-gray-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg shadow-sm">VIP TIER</div>
            <div className="text-center pb-6 border-b border-gray-700">
              <h3 className="text-lg font-bold text-brand-gold uppercase tracking-wider flex items-center justify-center gap-2"><i className="fa-solid fa-crown"></i> Distributor</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold text-white tracking-tight">6 Juta</span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mt-1">Min. Belanja Awal</span>
              </div>
              <div className="mt-3 text-xs font-bold text-yellow-900 bg-brand-gold/80 py-1.5 px-3 rounded-lg inline-block shadow-sm">Atau Pembelanjaan 6 Karton</div>
            </div>
            <div className="pt-8 text-center">
              <button className="block w-full py-3.5 bg-brand-gold text-gray-900 font-bold text-center rounded-xl hover:bg-white transition shadow-lg shadow-brand-gold/20 transform hover:-translate-y-0.5">Daftar Distributor</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;