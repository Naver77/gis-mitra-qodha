"use client";
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

import LeadModal from '@/components/LeadModal';
import MapSidebar from '@/components/map/MapSidebar';
import { Mitra, calculateHaversineDistance } from '@/lib/geo-utils';

const MapView = dynamic(() => import('@/components/map/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
    </div>
  )
});

interface RawMitraData {
  id?: string | number;
  id_mitra?: string | number;
  nama_toko?: string;
  nama?: string;
  level?: 'Distributor' | 'Agen' | 'Reseller';
  jenis_mitra?: string;
  kecamatan?: string;
  kota?: string;
  alamat_lengkap?: string;
  alamat?: string;
  lat?: string | number;
  latitude?: string | number;
  lng?: string | number;
  longitude?: string | number;
  no_hp?: string;
  no_whatsapp?: string;
}

export default function PetaKemitraanPage() {
  const [mitraList, setMitraList] = useState<Mitra[]>([]);
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({lat: -6.200, lng: 106.816}); 
  
  const [activeLevel, setActiveLevel] = useState<string>('Semua');
  const [activeRadius, setActiveRadius] = useState<number>(0); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingLoc, setIsSearchingLoc] = useState(false);
  
  const [showGuide, setShowGuide] = useState(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadContext, setLeadContext] = useState('');

  useEffect(() => {
    const fetchMitraFromDB = async () => {
      try {
        const res = await fetch('/api/mitra');
        const data = await res.json();
        
        if (Array.isArray(data)) {
          const mappedData: Mitra[] = data.map((m: RawMitraData) => ({
            id: String(m.id || m.id_mitra),
            nama_toko: m.nama_toko || m.nama || 'Tanpa Nama',
            level: (m.level || m.jenis_mitra || 'Reseller') as 'Distributor' | 'Agen' | 'Reseller',
            kecamatan: m.kecamatan || m.kota || '',
            alamat_lengkap: m.alamat_lengkap || m.alamat || '',
            lat: Number(m.lat || m.latitude || 0),
            lng: Number(m.lng || m.longitude || 0),
            no_wa: String(m.no_hp || m.no_whatsapp || '6281717302223')
          }));
          setMitraList(mappedData);
        }
      } catch (err) {
        console.error("Gagal load data mitra asli:", err);
      }
    };
    
    fetchMitraFromDB();

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

  const handleSmartSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setIsSearchingLoc(true);
    try {
      const safeQuery = encodeURIComponent(`${searchQuery}, Indonesia`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${safeQuery}`);
      if (!res.ok) throw new Error("Server satelit menolak permintaan.");

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
      console.error("Geocoding Fetch Error:", err);
      alert("Gagal mencari lokasi. Pastikan koneksi internet stabil.");
    } finally {
      setIsSearchingLoc(false);
    }
  };

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

  const handlePartnerClick = (id: string) => setActiveMarker(id);

  const triggerContactModal = (mitra: Mitra, distance?: number) => {
    const distText = distance ? ` (${distance.toFixed(1)} KM)` : '';
    setLeadContext(`Cek Cabang: ${mitra.nama_toko} - ${mitra.level} daerah ${mitra.kecamatan}${distText}`);
    setIsLeadModalOpen(true);
  };

  if (showGuide) {
    return (
      <div className="fixed inset-0 z-9999 bg-gray-50 overflow-y-auto pt-21.25 px-4 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in-up border border-gray-100 mt-4">
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
          </div>
          
          <button onClick={() => setShowGuide(false)} className="mt-10 w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-colors">
            Saya Mengerti, Kembali ke Peta
          </button>
        </div>
      </div>
    );
  }

  return (
    // FIX SUPER CRITICAL: Menggunakan 'fixed' di bawah navbar (asumsi tinggi navbar ~80px). 
    // Ini mengunci container ke layar. Halaman UTAMA TIDAK AKAN BISA DI SCROLL LAGI!
    <div className="fixed top-17.5 md:top-21.25 bottom-0 left-0 right-0 flex flex-col md:flex-row bg-white z-40 overflow-hidden">
      
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