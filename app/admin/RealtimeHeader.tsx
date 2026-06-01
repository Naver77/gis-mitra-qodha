"use client";
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

// 1. IMPORT HOOK PROVIDER UNTUK MENGAMBIL NAMA ADMIN
import { useAdmin } from './AdminProvider'; 

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RealtimeHeader() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  
  // 2. PANGGIL NAMA DARI SESI JWT
  const { name } = useAdmin(); 

  useEffect(() => {
    // FIX 1: Kembalikan setTimeout untuk memuaskan Linter yang ketat
    const mountTimeout = setTimeout(() => setMounted(true), 0);
    
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Jangan lupa bersihkan timeout dan interval saat komponen unmount
    return () => {
      clearTimeout(mountTimeout);
      clearInterval(timer);
    };
  }, []);

  const hour = mounted ? time.getHours() : 12;
  let greeting = 'Selamat Siang';
  if (mounted) {
    if (hour >= 5 && hour < 11) greeting = 'Selamat Pagi';
    else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
    else greeting = 'Selamat Malam';
  }

  const formattedDate = mounted 
    ? time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Memuat tanggal...';
    
  const formattedTime = mounted 
    ? time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  // Ambil nama panggilan (kata pertama dari nama lengkap) agar tidak terlalu panjang
  const namaPanggilan = name ? name.split(' ')[0] : 'Admin';

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {greeting}, 
          {/* FIX 2: Kembalikan ke bg-linear-to-r sesuai rekomendasi Tailwind v4 */}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-gold to-yellow-600 ml-2">
            {namaPanggilan}!
          </span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
        {/* 4. PERBAIKAN: Menambahkan lampu indikator live berkedip */}
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        <div className={`${inter.className} flex flex-col items-end`}>
          <span className="text-xs font-extrabold text-gray-800">{formattedDate}</span>
          <span className="text-[11px] font-bold text-gray-500 font-mono mt-0.5 tracking-wider">{formattedTime} WIB</span>
        </div>
      </div>
    </div>
  );
}