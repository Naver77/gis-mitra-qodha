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

const levelColors = {
  'Distributor': 'bg-brand-gold text-gray-900 border-brand-gold',
  'Agen': 'bg-emerald-500 text-white border-emerald-500',
  'Reseller': 'bg-blue-500 text-white border-blue-500'
};

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
  
  return (
    <div className="w-full md:w-1/3 h-[50dvh] md:h-full flex flex-col bg-white shadow-2xl z-20 border-r border-gray-100 relative">
      
      {/* Header Sidebar (Sticky Filter) */}
      <div className="p-4 md:p-6 border-b border-gray-100 bg-white/95 backdrop-blur z-10 shrink-0">
        <button onClick={() => setShowGuide(true)} className="w-full flex items-center justify-between bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl mb-4 hover:bg-yellow-100 transition-colors group">
          <span className="font-bold text-sm"><i className="fa-solid fa-circle-info mr-2 text-brand-gold"></i> Informasi & Panduan Penggunaan</span>
          <i className="fa-solid fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
        </button>

        <form onSubmit={handleSmartSearch} className="relative mb-4">
          <input 
            type="text" 
            placeholder="Cari Kelurahan, Kecamatan, Kota..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          {isSearchingLoc && <i className="fa-solid fa-circle-notch fa-spin absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold"></i>}
        </form>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-2">
          {['Semua', 'Distributor', 'Agen', 'Reseller'].map(lvl => (
            <button 
              key={lvl} 
              onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
                activeLevel === lvl 
                  ? lvl === 'Semua' ? 'bg-gray-900 text-white border-gray-900' : levelColors[lvl as keyof typeof levelColors]
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {[0, 5, 10, 15].map(rad => (
            <button 
              key={rad} 
              onClick={() => setActiveRadius(rad)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeRadius === rad ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/30' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <i className="fa-solid fa-route"></i> {rad === 0 ? 'Semua Jarak' : `< ${rad} KM`}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Mitra (Scrollable List) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50 hide-scrollbar space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
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
              className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${activeMarker === mitra.id ? 'border-brand-gold ring-1 ring-brand-gold' : 'border-gray-100'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                    mitra.level === 'Distributor' ? 'bg-yellow-100 text-yellow-700' : 
                    mitra.level === 'Agen' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {index + 1}
                  </span>
                  <h4 className="font-extrabold text-gray-900 text-sm md:text-base leading-tight">{mitra.nama_toko}</h4>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs mb-2">
                <span className={`px-2 py-0.5 rounded uppercase font-extrabold text-[9px] tracking-wider ${
                    mitra.level === 'Distributor' ? 'bg-yellow-500 text-gray-900' : 
                    mitra.level === 'Agen' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                  {mitra.level}
                </span>
                <span className="text-gray-400">|</span>
                <span className="font-bold text-gray-600"><i className="fa-solid fa-map-pin text-gray-400 mr-1"></i> {mitra.kecamatan}</span>
                
                {userLoc && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="font-bold text-brand-green"><i className="fa-solid fa-location-arrow mr-1"></i> {mitra.distance?.toFixed(1)} KM</span>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                {mitra.alamat_lengkap}
              </p>

              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  triggerContactModal(mitra, mitra.distance);
                }} 
                className="block w-full text-center bg-gray-900 hover:bg-brand-gold text-white hover:text-gray-900 font-bold py-2.5 rounded-lg text-xs transition-colors border border-gray-900"
              >
                <i className="fa-solid fa-headset mr-1"></i> Hubungi via Pusat
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}