"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix ikon Leaflet bawaan yang sering hilang di Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [Longitude, Latitude]
  };
  properties: {
    id: number;
    nama: string;
    pemilik: string;
    alamat: string;
    hp: string;
    jenis: string;
    foto: string;
  };
}

export default function MapPublic() {
  const [features, setFeatures] = useState<GeoJsonFeature[]>([]);

  useEffect(() => {
    // Memanggil API GeoJSON yang sudah kita buat sebelumnya
    fetch('/api/map')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.features) {
          setFeatures(data.features);
        }
      })
      .catch((err) => console.error("Gagal memuat peta:", err));
  }, []);

  const handleMarkerClick = (id: number) => {
    // Mencatat analitik 'Mitra Paling Dicari' secara asinkron di belakang layar
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'klik_mitra', id }),
    }).catch((err) => console.error("Gagal mencatat log:", err));
  };

  // Center peta default: Tengah-tengah negara Indonesia
  const defaultCenter: [number, number] = [-2.5489, 118.0149];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={5} 
      className="w-full h-full z-0 outline-none" 
      zoomControl={false} // Kita matikan zoom bawaan agar lebih bersih (opsional)
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {features.map((feature, idx) => (
        <Marker 
          key={idx} 
          // Leaflet butuh format [Latitude, Longitude], sedangkan GeoJSON [Lng, Lat]
          position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
          eventHandlers={{ click: () => handleMarkerClick(feature.properties.id) }}
        >
          <Popup className="rounded-2xl overflow-hidden shadow-2xl border-0 p-0 m-0">
            <div className="w-64 text-sm font-sans -m-5">
                {/* Header Gambar Popup */}
                <div className="w-full h-32 bg-gray-100 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`/uploads/produk/${feature.properties.foto}`} 
                      alt={feature.properties.nama} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300?text=Toko+Mitra'; }} 
                    />
                    <div className="absolute top-3 left-3 bg-brand-gold text-gray-900 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-md">
                        {feature.properties.jenis}
                    </div>
                </div>
                
                {/* Detail Konten Popup */}
                <div className="p-5">
                    <h3 className="font-black text-gray-900 text-lg leading-tight mb-1">{feature.properties.nama}</h3>
                    <p className="text-xs font-bold text-gray-400 mb-2"><i className="fa-solid fa-user mr-1"></i> {feature.properties.pemilik}</p>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-4">{feature.properties.alamat}</p>
                    
                    <a 
                      href={`https://wa.me/${feature.properties.hp}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 w-full bg-emerald-500 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
                    >
                        <i className="fa-brands fa-whatsapp text-base"></i> Hubungi Mitra
                    </a>
                </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}