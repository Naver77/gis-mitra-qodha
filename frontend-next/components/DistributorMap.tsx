"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// --- 1. INTERFACES & DATA ---
interface MitraProperties {
  id: string;
  nama: string;
  jenis: string;
  alamat: string;
  kota: string;
  hp: string;
  status_aktif: string;
}

interface GeoJSONFeature {
  type: "Feature";
  properties: MitraProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number]; 
  };
  distance?: number | null;
}

const mockGeoJSON: { features: GeoJSONFeature[] } = {
  features: [
    { type: "Feature", properties: { id: "1", nama: "Qodha Pusat", jenis: "Distributor", alamat: "Jl. Raya Serpong No.10, Tangerang Selatan", kota: "Tangerang", hp: "6281717302223", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.6647, -6.2886] } },
    { type: "Feature", properties: { id: "2", nama: "Agen Berkah Wangi", jenis: "Agen", alamat: "Jl. Margonda Raya No. 45, Depok", kota: "Depok", hp: "6281234567890", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.8330, -6.3731] } },
    { type: "Feature", properties: { id: "3", nama: "Toko Harum Mekar", jenis: "Reseller", alamat: "Pasar Tanah Abang Blok A", kota: "Jakarta Pusat", hp: "628987654321", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.8166, -6.1873] } },
    { type: "Feature", properties: { id: "4", nama: "Agen Bekasi Sentosa", jenis: "Agen", alamat: "Jl. Ahmad Yani, Bekasi Barat", kota: "Bekasi", hp: "628111222333", status_aktif: "1" }, geometry: { type: "Point", coordinates: [106.9896, -6.2415] } },
  ]
};

// --- 2. UTILITY (Hitung Jarak) ---
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; 
  const p1 = lat1 * Math.PI / 180;
  const p2 = lat2 * Math.PI / 180;
  const dp = (lat2 - lat1) * Math.PI / 180;
  const dl = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dp/2) * Math.sin(dp/2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl/2) * Math.sin(dl/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
};

// --- 3. KOMPONEN KONTROLER PETA (Untuk Auto-Zoom & FlyTo) ---
// React-Leaflet butuh komponen anak untuk bisa mengakses "map" instance
function MapController({ bounds, activePos }: { bounds: L.LatLngTuple[], activePos: L.LatLngTuple | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (activePos) {
      map.flyTo(activePos, 16, { animate: true, duration: 1.5 });
    } else if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePos, bounds.length]); // Hanya trigger jika activePos berubah atau jumlah data berubah

  return null;
}

// --- 4. KOMPONEN UTAMA ---
export default function DistributorMap() {
  const [data, setData] = useState<GeoJSONFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [radiusFilter, setRadiusFilter] = useState<number | 'all'>('all');
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [activePos, setActivePos] = useState<L.LatLngTuple | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Setup Icon Custom (Dipanggil di dalam komponen agar aman dari SSR)
  const qodhaIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
  }), []);

  const userIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3180/3180127.png', // Icon biru untuk user
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  }), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockGeoJSON.features.filter(f => f.properties.status_aktif === '1'));
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredData = useMemo(() => {
    let processed = [...data];
    if (userLoc) {
      processed = processed.map(item => ({
        ...item,
        distance: calculateDistance(userLoc.lat, userLoc.lng, item.geometry.coordinates[1], item.geometry.coordinates[0])
      })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    return processed.filter(item => {
      const matchText = item.properties.nama.toLowerCase().includes(search.toLowerCase()) || item.properties.kota.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || item.properties.jenis === typeFilter;
      let matchRadius = true;
      if (radiusFilter !== 'all' && item.distance != null) {
        matchRadius = item.distance <= (radiusFilter * 1000);
      }
      return matchText && matchType && matchRadius;
    });
  }, [data, search, typeFilter, radiusFilter, userLoc]);

  const bounds = useMemo(() => {
    return filteredData.map(item => [item.geometry.coordinates[1], item.geometry.coordinates[0]] as L.LatLngTuple);
  }, [filteredData]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Browser Anda tidak mendukung GPS.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setActivePos([pos.coords.latitude, pos.coords.longitude]);
        setActiveId('user');
      },
      () => alert('Gagal mendeteksi lokasi.'),
      { timeout: 10000 }
    );
  };

  const handleItemClick = (lat: number, lng: number, id: string) => {
    setActiveId(id);
    setActivePos([lat, lng]);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 relative" style={{ height: 'calc(100vh - 85px)' }}>
      
      {/* SIDEBAR */}
      <aside className={`w-full md:w-[400px] h-full bg-white shadow-xl z-20 flex flex-col absolute md:relative transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-100 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-900">📍 Lokasi Mitra</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 text-xl font-bold"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Cari nama atau kota..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-gold font-medium"
            />
            <div className="flex gap-2">
              <select 
                value={radiusFilter} 
                onChange={(e) => setRadiusFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="flex-1 bg-white border border-gray-200 text-sm font-bold text-gray-600 rounded-lg px-3 py-2 outline-none hover:bg-gray-50 cursor-pointer"
              >
                <option value="all">Semua Jarak</option>
                <option value="5">Radius 5 KM</option>
                <option value="15">Radius 15 KM</option>
              </select>
              <button onClick={getLocation} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-location-crosshairs"></i> Terdekat
              </button>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-lg">
              {['all', 'Agen', 'Reseller'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${typeFilter === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  {type === 'all' ? 'Semua' : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
               <div className="w-8 h-8 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mb-3"></div>
               <span className="text-sm font-bold">Memuat Peta...</span>
            </div>
          ) : filteredData.length === 0 ? (
            <p className="text-center text-gray-400 mt-10 font-medium">Tidak ada mitra ditemukan.</p>
          ) : (
            filteredData.map((item) => (
              <div 
                key={item.properties.id}
                onClick={() => handleItemClick(item.geometry.coordinates[1], item.geometry.coordinates[0], item.properties.id)}
                className={`p-4 bg-white border rounded-xl cursor-pointer hover:border-brand-gold shadow-sm flex items-start gap-3 transition-all ${activeId === item.properties.id ? 'border-brand-gold bg-yellow-50/50 ring-1 ring-brand-gold' : 'border-gray-200'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 text-lg ${activeId === item.properties.id ? 'bg-brand-gold text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {item.properties.nama.charAt(0)}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${activeId === item.properties.id ? 'text-yellow-800' : 'text-gray-900'}`}>{item.properties.nama}</h4>
                  <div className="flex gap-2 mt-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${item.properties.jenis === 'Agen' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                      {item.properties.jenis}
                    </span>
                    {item.distance && <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{(item.distance / 1000).toFixed(1)} km</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{item.properties.alamat}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* MAP CONTAINER (React Leaflet) */}
      <main className="flex-1 w-full h-full relative z-10">
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="md:hidden absolute top-4 left-4 z-[9999] bg-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg border border-gray-200 text-gray-800 hover:text-brand-gold transition"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        
        <MapContainer 
          center={[-6.200, 106.816]} 
          zoom={10} 
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          {/* Kontrol Zoom di pojok kanan bawah */}
          {/* (Ini ditangani otomatis oleh react-leaflet jika zoomControl=true, tapi karena kita mau ubah posisi, kita letakkan default saja atau biarkan tanpa kontrol tambahan untuk kebersihan UI mobile) */}

          <MapController bounds={bounds} activePos={activePos} />

          {/* Marker Lokasi User */}
          {userLoc && (
             <Marker position={[userLoc.lat, userLoc.lng]} icon={userIcon}>
               <Popup><b className="text-sm">Lokasi Anda</b></Popup>
             </Marker>
          )}

          {/* Marker Mitra */}
          {filteredData.map(item => (
            <Marker 
              key={item.properties.id} 
              position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
              icon={qodhaIcon}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <h3 className="font-extrabold text-gray-900 text-sm mb-1">{item.properties.nama}</h3>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded uppercase ${item.properties.jenis === 'Agen' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{item.properties.jenis}</span>
                  <p className="text-xs text-gray-500 mt-2">{item.properties.alamat}</p>
                  <a href={`https://wa.me/${item.properties.hp}`} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center w-full bg-green-500 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition">
                    Chat WhatsApp
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </main>
      
    </div>
  );
}