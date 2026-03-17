"use client";
import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function ContactMap() {
  const lat = -6.6071015;
  const lng = 106.795234;

  const qodhaIcon = useMemo(() => new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  }), []);

  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={17} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', zIndex: 10 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={qodhaIcon}>
        <Popup>
          <div className="text-center p-2 font-sans min-w-37.5">
            <h3 className="font-extrabold text-sm mb-1 text-gray-900">Gallery Qodha Pusat</h3>
            <p className="text-xs text-gray-500 mb-2">Jl. Empang No. 29B, Bogor</p>
            <a href={`https://maps.google.com/?q=${lat},${lng}`} target="_blank" rel="noreferrer" className="block text-xs bg-brand-green text-white py-1.5 px-3 rounded-lg hover:bg-green-700 transition font-bold shadow-sm">
              Buka di Google Maps
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}