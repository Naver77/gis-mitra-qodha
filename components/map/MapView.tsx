"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle, useMapEvents, useMap } from 'react-leaflet';
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

interface GeoJsonFeature {
  type: string;
  properties: {
    WADMKK?: string;
    [key: string]: unknown;
  };
  geometry: unknown;
}

interface GeoJsonData {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

const normalizeCityName = (name: string | undefined) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/^(kota|kabupaten|kab\.|adm\.)\s+/g, '') 
    .trim(); 
};

function MapEventController({ setZoomLevel }: { setZoomLevel: (z: number) => void }) {
  const map = useMapEvents({
    zoomend: () => setZoomLevel(map.getZoom()),
  });
  return null;
}

// FIX CRITICAL LEAFLET: Meresize otomatis beberapa kali saat komponen dimuat
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    // Trik tembak paksa agar ukuran tidak pernah 0
    const timeouts = [100, 500, 1000].map(ms => setTimeout(() => map.invalidateSize(), ms));
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('resize', handleResize);
    }
  }, [map]);
  return null;
}

export default function MapView({
  processedMitra,
  mapCenter,
  userLoc,
  activeMarker,
  handlePartnerClick,
  triggerContactModal
}: MapViewProps) {
  
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(12); 
  // TAMBAHAN STATE UNTUK REKAP KOTA (Menggantikan useMemo yang berat)
  const [cityMitraCounts, setCityMitraCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // LEVEL 3 OPTIMIZATION: Ambil GeoJSON dan Data Rekap API secara BERSAMAAN (Paralel)
    // Jauh lebih cepat daripada menghitung satu per satu koordinat di browser pengguna
    Promise.all([
      fetch('/assets/geojson/batas_kabupaten.geojson').then((res) => {
        if (!res.ok) throw new Error("Gagal load GeoJSON");
        return res.json();
      }),
      fetch('/api/mitra-summary').then((res) => res.json())
    ])
    .then(([geoData, summaryData]) => {
      setGeoJsonData(geoData);
      setCityMitraCounts(summaryData); // Menyimpan rekap O(1) Instan
    })
    .catch((err) => console.error("Map Data Fetch Error:", err));
  }, []);

  const getFeatureStyle = (feature: GeoJsonFeature) => {
    const rawWADMKK = feature.properties?.WADMKK || '';
    const cleanFeatureName = normalizeCityName(rawWADMKK);
    
    // Mengambil nilai instan dari API tanpa perlu looping (SANGAT RINGAN)
    const mitraCount = cityMitraCounts[cleanFeatureName] || 0;

    let fillColor = '#9ca3af'; 
    let fillOpacity = 0.1;

    // Logika pewarnaan kepadatan yang sekarang sudah terhubung dengan data Server
    if (mitraCount > 0) {
      if (mitraCount >= 10) fillColor = '#10b981'; // Padat (Hijau)
      else if (mitraCount >= 4) fillColor = '#fbbf24'; // Sedang (Kuning)
      else fillColor = '#3b82f6'; // Sedikit (Biru)
      
      fillOpacity = zoomLevel > 11 ? 0.15 : 0.6; 
    }

    return { fillColor, weight: 1.5, opacity: zoomLevel > 11 ? 0.3 : 1, color: '#ffffff', fillOpacity };
  };

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
    // PETA SEPENUHNYA DIAMANATKAN PADA SISA RUANG FLEKSIBEL (Tanpa Tinggi Spesifik dVH)
    <div className="flex-1 relative w-full h-full bg-gray-200 z-10 overflow-hidden">
      
      {/* Memaksa elemen Leaflet menempel pada bingkai */}
      <div className="absolute inset-0">
        <MapContainer 
          center={[mapCenter.lat, mapCenter.lng]} 
          zoom={zoomLevel} 
          className="w-full h-full z-10"
        >
          <MapResizer />
          <MapEventController setZoomLevel={setZoomLevel} />

          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {geoJsonData && (
            <GeoJSON 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={geoJsonData as any} 
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={getFeatureStyle as any} 
              onEachFeature={(feature: GeoJsonFeature, layer: L.Layer) => {
                const rawWADMKK = feature.properties?.WADMKK || '';
                const cleanName = normalizeCityName(rawWADMKK);
                
                // Mengambil nilai dari Object API untuk Tooltip (Instan)
                const count = cityMitraCounts[cleanName] || 0;
                
                // Tooltip Info Kepadatan
                layer.bindTooltip(`<b>${rawWADMKK}</b><br/>${count} Mitra Aktif`, { sticky: true });
              }}
            />
          )}
          
          {processedMitra.map((mitra, index) => {
            const icon = createNumberedIcon(index + 1, mitra.level, activeMarker === String(mitra.id));
            if (!icon) return null;

            return (
              <React.Fragment key={`mitra-${mitra.id}`}>
                {zoomLevel >= 12 && (
                  <Circle 
                    center={[mitra.lat, mitra.lng]} 
                    pathOptions={{ 
                      fillColor: mitra.level === 'Distributor' ? '#fbbf24' : '#10b981', 
                      color: 'transparent', 
                      fillOpacity: 0.15 
                    }} 
                    radius={5000} 
                  />
                )}

                <Marker 
                  position={[mitra.lat, mitra.lng]} 
                  icon={icon}
                  eventHandlers={{ click: () => handlePartnerClick(String(mitra.id)) }}
                >
                  <Popup>
                    <div className="text-center p-1 w-40">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase mb-1 text-white ${mitra.level === 'Distributor' ? 'bg-yellow-500 text-yellow-900' : mitra.level === 'Agen' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                        {mitra.level}
                      </span>
                      <h4 className="font-bold text-gray-900 mb-1 leading-tight">{mitra.nama_toko}</h4>
                      {mitra.distance !== undefined && <p className="text-[10px] font-bold text-brand-gold mb-2 bg-yellow-50 rounded-full inline-block px-2 py-0.5 border border-yellow-200">{mitra.distance.toFixed(2)} KM dari Anda</p>}
                      <button 
                        onClick={(e) => { e.stopPropagation(); triggerContactModal(mitra, mitra.distance); }} 
                        className="w-full text-xs bg-gray-900 text-white px-3 py-2.5 rounded-lg font-bold hover:bg-brand-gold hover:text-gray-900 transition-colors block mt-2"
                      >
                        Hubungi Pusat
                      </button>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}

          {userLoc && (
            <Marker position={[userLoc.lat, userLoc.lng]} icon={L.divIcon({
              html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse"></div>`,
              className: 'custom-user-icon',
              iconSize: [16,16]
            })}>
              <Popup><span className="font-bold text-xs">Titik Lokasi Anda</span></Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* LEGENDA AMAN DARI SCROLL TERSEMBUNYI */}
      <div className="absolute bottom-8 right-4 z-1000 flex flex-col gap-2 pointer-events-none items-end">
        {zoomLevel < 12 && (
          <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-xl shadow-md border border-gray-100 flex flex-col gap-1 text-[10px] font-bold text-gray-600">
            <p className="text-gray-800 border-b border-gray-200 pb-1 mb-1">Kepadatan Area</p>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80"></span> Padat (&ge;10 Mitra)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80"></span> Sedang (4-9 Mitra)</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 opacity-80"></span> Sedikit (1-3 Mitra)</div>
          </div>
        )}
        <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-500 border border-white shadow-md">
          &copy; {new Date().getFullYear()} Qodha Aromatic GIS
        </div>
      </div>
    </div>
  );
}