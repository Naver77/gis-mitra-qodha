import React from 'react';
import { Link } from 'react-router-dom';

const MapPreview: React.FC = () => {
  return (
    <section id="lokasi" className="bg-gray-50 py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-brand-green font-bold tracking-widest text-xs uppercase bg-green-50 px-3 py-1.5 rounded-full border border-green-200">Jaringan Luas</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">Jaringan Mitra Qodha</h2>
          <p className="text-gray-500 mt-2">Cek lokasi mitra terdekat di kota Anda.</p>
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200 h-[500px] overflow-hidden relative group">
          {/* Sementara pakai iframe ke webgis, nanti kita bangun Peta React aslinya */}
          <iframe src="/distributor" className="w-full h-full border-0 rounded-xl relative z-10" title="Peta Mitra"></iframe>
          <Link to="/distributor" className="absolute top-4 right-4 bg-white shadow-lg text-gray-700 px-5 py-2.5 rounded-xl text-sm font-bold z-20 hover:text-brand-gold hover:scale-105 transition transform opacity-0 group-hover:opacity-100 border border-gray-100">
            <i className="fa-solid fa-expand mr-2"></i> Buka Fullscreen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;