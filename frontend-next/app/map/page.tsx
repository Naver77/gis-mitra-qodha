"use client";
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Import Komponen & Utilities Modular
import LeadModal from '@/components/LeadModal';
import MapSidebar from '@/components/map/MapSidebar';
import { Mitra, mockMitra, calculateHaversineDistance } from '@/lib/geo-utils';

// IMPORT DINAMIS: Mencegah error 'window is not defined' saat render Leaflet di Next.js SSR
const MapView = dynamic(() => import('@/components/map/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
    </div>
  )
});

export default function PetaKemitraanPage() {
  // State Utama Data
  const [mitraList] = useState<Mitra[]>(mockMitra);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({lat: -6.200, lng: 106.816}); 
  
  // State Pencarian & Filter
  const [activeLevel, setActiveLevel] = useState<string>('Semua');
  const [activeRadius, setActiveRadius] = useState<number>(0); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingLoc, setIsSearchingLoc] = useState(false);
  
  // State UI & Interaksi
  const [showGuide, setShowGuide] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadContext, setLeadContext] = useState('');

  // 1. Eksekusi GPS Otomatis saat pertama kali buka
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLoc({ lat: position.coords.latitude, lng: position.coords.longitude });
          setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => console.log("User menolak akses GPS.")
      );
    }
  }, []);

  // 2. Logika Geocoding (Ubah Teks Kecamatan Jadi Koordinat)
  const handleSmartSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearchingLoc(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}, Indonesia`);
      const data = await res.json();
      if (data && data.length > 0) {
        const newLat = parseFloat(data[0].lat);
        const newLng = parseFloat(data[0].lon);
        setUserLoc({ lat: newLat, lng: newLng });
        setMapCenter({ lat: newLat, lng: newLng });
      } else {
        alert("Lokasi tidak ditemukan. Coba nama kecamatan/kota yang lebih spesifik.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingLoc(false);
    }
  };

  // 3. Logika Filtering & Perhitungan Haversine Jarak
  const processedMitra = useMemo(() => {
    let filtered = [...mitraList];

    if (activeLevel !== 'Semua') {
      filtered = filtered.filter(m => m.level === activeLevel);
    }

    let withDistance = filtered.map(m => {
      let distance = 0;
      if (userLoc) {
        distance = calculateHaversineDistance(userLoc.lat, userLoc.lng, m.lat, m.lng);
      }
      return { ...m, distance };
    });

    if (activeRadius > 0 && userLoc) {
      withDistance = withDistance.filter(m => m.distance <= activeRadius);
    }

    if (userLoc) {
      withDistance.sort((a, b) => a.distance - b.distance);
    }

    return withDistance;
  }, [mitraList, activeLevel, activeRadius, userLoc]);

  // Handler Interaksi
  const handlePartnerClick = (id: string) => {
    setActiveMarker(id);
  };

  const triggerContactModal = (mitra: Mitra, distance?: number) => {
    const distText = distance ? ` (${distance.toFixed(1)} KM)` : '';
    setLeadContext(`Cek Cabang: ${mitra.nama_toko} - ${mitra.level} daerah ${mitra.kecamatan}${distText}`);
    setIsLeadModalOpen(true);
  };

  // Tampilan Panduan Layar Penuh
  if (showGuide) {
    return (
      <div className="min-h-screen bg-gray-50 pt-21.25 px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up border border-gray-100">
          <div className="flex justify-between items-start mb-8 border-b pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Panduan Sistem Kemitraan</h1>
              <p className="text-gray-500">Pelajari tingkatan mitra dan cara menggunakan fitur peta pintar Qodha Aromatic.</p>
            </div>
            <button onClick={() => setShowGuide(false)} className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center transition-colors">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><i className="fa-solid fa-layer-group text-brand-gold"></i> Tingkatan Mitra Qodha</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-yellow-200 bg-yellow-50 p-6 rounded-2xl">
                  <div className="w-10 h-10 bg-brand-gold text-gray-900 flex items-center justify-center rounded-full font-bold mb-3"><i className="fa-solid fa-crown"></i></div>
                  <h4 className="font-bold text-gray-900 mb-2">1. Distributor (Emas)</h4>
                  <p className="text-sm text-gray-600">Pusat distribusi area provinsi/kota besar. Melayani pembelian grosir partai besar dan menyuplai Agen di wilayahnya.</p>
                </div>
                <div className="border border-emerald-200 bg-emerald-50 p-6 rounded-2xl">
                  <div className="w-10 h-10 bg-emerald-500 text-white flex items-center justify-center rounded-full font-bold mb-3"><i className="fa-solid fa-store"></i></div>
                  <h4 className="font-bold text-gray-900 mb-2">2. Agen (Hijau)</h4>
                  <p className="text-sm text-gray-600">Mitra resmi tingkat kecamatan/kabupaten. Stok terjamin untuk pembelian satuan maupun menyuplai Reseller.</p>
                </div>
                <div className="border border-blue-200 bg-blue-50 p-6 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold mb-3"><i className="fa-solid fa-handshake"></i></div>
                  <h4 className="font-bold text-gray-900 mb-2">3. Reseller (Biru)</h4>
                  <p className="text-sm text-gray-600">Mitra penjualan langsung (End-User). Tersebar di berbagai kelurahan untuk jangkauan pengiriman tercepat.</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><i className="fa-solid fa-location-crosshairs text-brand-gold"></i> Cara Menggunakan Peta</h3>
              <ul className="space-y-4 list-none text-gray-600">
                <li className="flex gap-3"><span className="font-black text-brand-gold">1.</span> <strong>Aktifkan GPS:</strong> Izinkan browser mengakses lokasi Anda agar sistem otomatis menampilkan jarak mitra terdekat.</li>
                <li className="flex gap-3"><span className="font-black text-brand-gold">2.</span> <strong>Gunakan Pencarian:</strong> Jika GPS mati, ketik nama Kecamatan, Kelurahan, atau Provinsi Anda di kolom pencarian. Sistem pintar kami akan mengubah teks menjadi titik koordinat.</li>
                <li className="flex gap-3"><span className="font-black text-brand-gold">3.</span> <strong>Filter Radius:</strong> Pilih opsi 5km, 10km, atau 15km untuk mengerucutkan jangkauan lokasi mitra dari titik Anda.</li>
                <li className="flex gap-3"><span className="font-black text-brand-gold">4.</span> <strong>Penomoran Peta:</strong> Angka 1 pada peta dan daftar (list) menunjukkan mitra dengan jarak garis lurus terdekat dari lokasi Anda saat ini.</li>
              </ul>
            </section>
          </div>
          
          <button onClick={() => setShowGuide(false)} className="mt-10 w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-colors">
            Saya Mengerti, Kembali ke Peta
          </button>
        </div>
      </div>
    );
  }

  // TAMPILAN UTAMA (Sidebar Kiri & Peta Kanan)
  return (
    <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden bg-white z-40 relative h-[calc(100dvh-70px)] md:h-[calc(100dvh-85px)]">
      
      <MapSidebar 
        processedMitra={processedMitra}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
        activeRadius={activeRadius}
        setActiveRadius={setActiveRadius}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSmartSearch={handleSmartSearch}
        isSearchingLoc={isSearchingLoc}
        activeMarker={activeMarker}
        handlePartnerClick={handlePartnerClick}
        triggerContactModal={triggerContactModal}
        userLoc={userLoc}
        setShowGuide={setShowGuide}
      />

      <MapView 
        processedMitra={processedMitra}
        mapCenter={mapCenter}
        userLoc={userLoc}
        activeMarker={activeMarker}
        handlePartnerClick={handlePartnerClick}
        triggerContactModal={triggerContactModal}
      />

      <LeadModal 
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        sourceContext={leadContext}
      />

    </div>
  );
}