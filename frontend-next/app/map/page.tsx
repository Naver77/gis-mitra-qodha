"use client"; // KUNCI SOLUSINYA: Jadikan file ini sebagai Client Component

import dynamic from 'next/dynamic';

// Memuat komponen peta secara dinamis hanya di browser (menghindari error Leaflet 'window is not defined')
const DynamicMap = dynamic(() => import('@/components/DistributorMap'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full bg-gray-100" style={{ height: 'calc(100vh - 85px)' }}>
      <div className="w-16 h-16 border-4 border-gray-200 border-t-brand-gold rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-extrabold text-gray-800 animate-pulse">Menyiapkan Peta WebGIS...</h2>
      <p className="text-sm text-gray-500 mt-2">Memuat lokasi mitra Qodha Aromatic</p>
    </div>
  )
});

export default function MapPage() {
  return (
    <DynamicMap />
  );
}