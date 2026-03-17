"use client";
import React from 'react'; // FIX: Menghapus useEffect karena tidak dipakai
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  lat: number;
  lng: number;
  setLat: (val: number) => void;
  setLng: (val: number) => void;
}

export default function MapPicker({ lat, lng, setLat, setLng }: MapPickerProps) {
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });

    return (
      <Marker 
        position={[lat, lng]} 
        draggable={true} 
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const pos = marker.getLatLng();
            setLat(pos.lat);
            setLng(pos.lng);
          }
        }} 
      />
    );
  };

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
}