import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Mitra } from '@/lib/geo-utils';

interface MapViewProps {
  processedMitra: Mitra[];
  mapCenter: { lat: number; lng: number };
  userLoc: { lat: number; lng: number } | null;
  activeMarker: string | null;
  handlePartnerClick: (id: string) => void;
  triggerContactModal: (mitra: Mitra, distance?: number) => void;
}

export default function MapView({
  processedMitra,
  mapCenter,
  userLoc,
  activeMarker,
  handlePartnerClick,
  triggerContactModal
}: MapViewProps) {
  
  // Custom Icon Logic
  const createNumberedIcon = (num: number, level: string, isActive: boolean) => {
    let colorClass = 'bg-gray-800';
    if (level === 'Distributor') colorClass = 'bg-yellow-500 text-gray-900';
    if (level === 'Agen') colorClass = 'bg-emerald-500 text-white';
    if (level === 'Reseller') colorClass = 'bg-blue-500 text-white';

    const activeRing = isActive ? 'ring-4 ring-red-500 scale-125 z-50' : '';

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="${colorClass} ${activeRing} w-8 h-8 flex items-center justify-center rounded-full font-black shadow-xl border-2 border-white transition-transform transform -translate-y-4 -translate-x-4">${num}</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32], 
    });
  };

  return (
    <div className="w-full md:w-2/3 h-[50dvh] md:h-full bg-gray-200 relative z-10">
      <MapContainer center={[mapCenter.lat, mapCenter.lng]} zoom={12} style={{ height: '100%', width: '100%', zIndex: 10 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Render Pin Mitra */}
        {processedMitra.map((mitra, index) => {
          const icon = createNumberedIcon(index + 1, mitra.level, activeMarker === mitra.id);
          if (!icon) return null;

          return (
            <Marker 
              key={mitra.id} 
              position={[mitra.lat, mitra.lng]} 
              icon={icon}
              eventHandlers={{ click: () => handlePartnerClick(mitra.id) }}
            >
              <Popup>
                <div className="text-center p-1 w-40">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1 text-white ${mitra.level === 'Distributor' ? 'bg-yellow-500' : mitra.level === 'Agen' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                    {mitra.level}
                  </span>
                  <h4 className="font-bold text-gray-900 mb-1">{mitra.nama_toko}</h4>
                  {mitra.distance && <p className="text-xs font-bold text-brand-green mb-2">{mitra.distance.toFixed(2)} KM</p>}
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerContactModal(mitra, mitra.distance);
                    }} 
                    className="w-full text-xs bg-gray-900 text-white px-3 py-2 rounded-lg font-bold hover:bg-brand-gold hover:text-gray-900 transition-colors block mt-2"
                  >
                    Hubungi via Pusat
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Render Lokasi User */}
        {userLoc && (
          <Marker position={[userLoc.lat, userLoc.lng]} icon={L.divIcon({
            html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>`,
            className: 'custom-user-icon',
            iconSize: [16,16]
          })}>
            <Popup>Titik Lokasi Anda</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Floating Copyright */}
      <div className="absolute bottom-4 right-4 z-999 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm text-[10px] font-bold text-gray-500 border border-white pointer-events-none">
        &copy; {new Date().getFullYear()} Qodha Aromatic GIS
      </div>
    </div>
  );
}