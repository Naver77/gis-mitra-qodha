"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix icon issue Next.js
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

interface MapPickerProps {
  lat: number;
  lng: number;
  setLat: (val: number) => void;
  setLng: (val: number) => void;
}

// 1. Komponen Events dipisah agar tidak re-render
function MapEvents({ setLat, setLng }: { setLat: (lat: number) => void, setLng: (lng: number) => void }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });
  return null;
}

// 2. Komponen Auto-Fly (Agar peta bergeser kalau kordinat berubah)
function MapUpdater({ lat, lng }: { lat: number, lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      map.flyTo([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
}

export default function MapPicker({ lat, lng, setLat, setLng }: MapPickerProps) {
  // Jika koordinat belum diisi (0,0), arahkan ke tengah Indonesia
  const centerLat = lat === 0 ? -2.5 : lat;
  const centerLng = lng === 0 ? 118.0 : lng;

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[centerLat, centerLng]} 
        zoom={lat === 0 ? 5 : 15} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer 
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        
        <MapEvents setLat={setLat} setLng={setLng} />
        <MapUpdater lat={lat} lng={lng} />

        {/* Marker pintar Anda yang bisa di-drag! */}
        {lat !== 0 && lng !== 0 && (
          <Marker 
            position={[lat, lng]} 
            draggable={true}
            icon={defaultIcon}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const pos = marker.getLatLng();
                setLat(pos.lat);
                setLng(pos.lng);
              }
            }} 
          />
        )}
      </MapContainer>

      {/* Instruksi UI melayang */}
      <div className="absolute top-2 right-2 z-1000 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-md text-xs font-bold text-gray-700 pointer-events-none">
        <i className="fa-solid fa-hand-pointer text-brand-gold mr-1"></i> Klik atau Geser Pin Merah
      </div>
    </div>
  );
}