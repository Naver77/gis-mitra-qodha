/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Mitra } from '@/lib/geo-utils';

interface MapSidebarProps {
  processedMitra: Mitra[];
  activeLevel: string;
  setActiveLevel: (lvl: string) => void;
  activeRadius: number;
  setActiveRadius: (rad: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSmartSearch: (e: React.FormEvent) => void;
  isSearchingLoc: boolean;
  activeMarker: string | null;
  handlePartnerClick: (id: string) => void;
  triggerContactModal: (mitra: Mitra, distance?: number) => void;
  userLoc: { lat: number; lng: number } | null;
  setShowGuide: (show: boolean) => void;
}

export default function MapSidebar({
  processedMitra,
  activeLevel,
  setActiveLevel,
  activeRadius,
  setActiveRadius,
  searchQuery,
  setSearchQuery,
  handleSmartSearch,
  isSearchingLoc,
  activeMarker,
  handlePartnerClick,
  triggerContactModal,
  userLoc,
  setShowGuide
}: MapSidebarProps) {
  
  // Mencari data mitra yang sedang aktif/dipilih
  const selectedMitra = activeMarker ? processedMitra.find(m => m.id === activeMarker) : null;

  return (
    <div className="w-full md:w-1/3 h-[50dvh] md:h-full flex flex-col bg-white shadow-2xl z-20 border-r border-gray-100 relative">
      
      {/* HEADER SIDEBAR (Tetap Tampil Sebagai Kendali Utama) */}
      <div className="p-4 md:p-5 border-b border-gray-100 bg-white/95 backdrop-blur z-10 shrink-0">
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">📍 Lokasi Mitra</h1>
            <button 
              onClick={() => setShowGuide(true)} 
              title="Panduan Sistem Kemitraan"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-50 text-brand-gold border border-yellow-200 hover:bg-yellow-100 hover:scale-110 transition-all"
            >
              <i className="fa-solid fa-circle-info text-sm"></i>
            </button>
          </div>
          
          <button className="md:hidden w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-400 hover:text-red-500 transition-colors">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>

        <div className="space-y-3">
          <form onSubmit={handleSmartSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Cari daerah, kota..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-sm font-medium rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
              {isSearchingLoc && <i className="fa-solid fa-circle-notch fa-spin absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold"></i>}
            </div>
            <button 
              type="button"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(() => {
                    handleSmartSearch({ preventDefault: () => {} } as React.FormEvent); 
                  });
                }
              }}
              title="Gunakan GPS Saya" 
              className="w-11 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-brand-gold hover:text-gray-900 transition-colors"
            >
              <i className="fa-solid fa-location-crosshairs"></i>
            </button>
          </form>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <select 
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs md:text-sm font-bold rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all cursor-pointer"
              >
                <option value="Semua">Semua Level</option>
                <option value="Distributor">👑 Distributor</option>
                <option value="Agen">💎 Agen</option>
                <option value="Reseller">🚀 Reseller</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
            </div>

            <div className="relative flex-1">
              <select 
                value={activeRadius}
                onChange={(e) => setActiveRadius(Number(e.target.value))}
                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs md:text-sm font-bold rounded-xl pl-3 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all cursor-pointer"
              >
                <option value={0}>Semua Jarak</option>
                <option value={5}>&lt; 5 KM</option>
                <option value={10}>&lt; 10 KM</option>
                <option value={15}>&lt; 15 KM</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
            </div>
          </div>
        </div>

      </div>

      {/* AREA KONTEN (Switch Antara List vs Detail) */}
      {selectedMitra ? (
        
        // --- 1. TAMPILAN DETAIL MITRA ---
        <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-gray-50/50 hide-scrollbar flex flex-col animate-fade-in-up">
          
          <button 
            onClick={() => handlePartnerClick('')} 
            className="mb-4 text-xs font-bold text-gray-500 hover:text-gray-900 transition flex items-center gap-2 w-fit px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Daftar
          </button>

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex-1 flex flex-col relative">
            
            {/* Foto Placeholder Toko */}
            <div className="h-32 md:h-40 bg-gray-200 relative shrink-0">
              <img 
                src={`https://placehold.co/600x300/f3f4f6/a1a1aa?text=Toko+${selectedMitra.nama_toko.replace(/\s/g, '+')}`} 
                alt="Foto Toko" 
                className="w-full h-full object-cover" 
              />
              <div className={`absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm border ${
                  selectedMitra.level === 'Distributor' ? 'border-yellow-200 text-yellow-600' : 
                  selectedMitra.level === 'Agen' ? 'border-emerald-200 text-emerald-600' : 'border-blue-200 text-blue-600'
                }`}>
                 {selectedMitra.level}
              </div>
            </div>

            {/* Informasi Detail (Tanpa No HP) */}
            <div className="p-5 flex flex-col flex-1">
               <h2 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">{selectedMitra.nama_toko}</h2>
               
               <div className="flex flex-wrap items-center gap-2 text-xs mb-6">
                  <span className="font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                    <i className="fa-solid fa-map-pin mr-1 text-gray-400"></i> {selectedMitra.kecamatan}
                  </span>
                  {selectedMitra.distance && (
                    <span className="font-bold text-brand-orange bg-orange-50 border border-orange-100 px-2 py-1 rounded-md">
                      <i className="fa-solid fa-location-arrow mr-1"></i> {(selectedMitra.distance / 1000).toFixed(1)} KM
                    </span>
                  )}
               </div>

               <div className="mb-6 flex-1">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Alamat Lengkap</h4>
                 <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   {selectedMitra.alamat_lengkap}
                 </p>
               </div>

               {/* Verifikasi Badge */}
               <div className="flex items-center gap-2 text-[10px] md:text-xs text-green-700 font-bold bg-green-50 p-3 rounded-xl border border-green-100 justify-center">
                 <i className="fa-solid fa-certificate text-lg"></i> Mitra Resmi & Terverifikasi
               </div>
            </div>
          </div>

          {/* Tombol Hubungi Terpusat di Bawah */}
          <div className="mt-4 shrink-0">
            <button 
              onClick={() => triggerContactModal(selectedMitra, selectedMitra.distance)} 
              className="w-full text-center bg-gray-900 hover:bg-brand-gold text-white hover:text-gray-900 font-bold py-3.5 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 group"
            >
              <i className="fa-solid fa-headset text-lg group-hover:scale-110 transition-transform"></i> Hubungi via Pusat
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">Layanan ini akan menghubungkan Anda ke CS Qodha Pusat.</p>
          </div>
        </div>

      ) : (

        // --- 2. TAMPILAN DAFTAR MITRA (List View) ---
        <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-gray-50/50 hide-scrollbar space-y-3">
          <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 px-1">
            {processedMitra.length} Mitra Ditemukan {activeRadius > 0 && userLoc ? `dalam ${activeRadius} KM` : ''}
          </p>

          {processedMitra.length === 0 ? (
            <div className="text-center py-10">
              <i className="fa-solid fa-store-slash text-4xl text-gray-300 mb-3"></i>
              <p className="text-sm text-gray-500 font-medium">Tidak ada mitra di area atau filter ini.</p>
            </div>
          ) : (
            processedMitra.map((mitra, index) => (
              <div 
                key={mitra.id} 
                onClick={() => handlePartnerClick(mitra.id)}
                className="bg-white p-4 rounded-2xl cursor-pointer transition-all duration-300 transform border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-brand-gold/30 group"
              >
                <div className="flex items-center gap-4">
                  {/* Penomoran Bulat di Kiri */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 shadow-inner transition-colors duration-300 
                    ${mitra.level === 'Distributor' ? 'bg-yellow-100 text-yellow-700' : 
                      mitra.level === 'Agen' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                    {index + 1}
                  </div>

                  {/* Konten Kanan (Lebih Padat) */}
                  <div className="flex-1">
                    <h4 className="font-extrabold text-sm leading-tight mb-1 text-gray-800 group-hover:text-brand-gold transition-colors">
                      {mitra.nama_toko}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded uppercase font-extrabold text-[8px] tracking-wider border ${
                          mitra.level === 'Distributor' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                          mitra.level === 'Agen' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-blue-50 text-blue-600 border-blue-200'
                        }`}>
                        {mitra.level}
                      </span>
                      <span className="text-gray-200">|</span>
                      <span className="font-bold text-gray-500 text-[10px]"><i className="fa-solid fa-map-pin text-gray-400 mr-1"></i> {mitra.kecamatan}</span>
                      
                      {userLoc && (
                        <>
                          <span className="text-gray-200">|</span>
                          <span className="font-bold text-brand-orange text-[10px] bg-orange-50 px-1.5 py-0.5 rounded-md border border-orange-100"><i className="fa-solid fa-location-arrow mr-1"></i> {mitra.distance?.toFixed(1)} KM</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Icon Chevron (Indikator bisa di-klik) */}
                  <div className="text-gray-300 group-hover:text-brand-gold transition-colors shrink-0">
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}