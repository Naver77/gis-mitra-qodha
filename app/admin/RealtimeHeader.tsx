"use client";
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RealtimeHeader() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // FIX LINTER: Gunakan setTimeout agar update state berjalan asinkron dan mencegah cascading renders
    setTimeout(() => setMounted(true), 0);
    
    // Membuat jam berdetak setiap 1 detik (1000 ms)
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Logika Sapaan Berdasarkan Waktu Real-time
  const hour = mounted ? time.getHours() : 12;
  let greeting = 'Selamat Siang';
  if (mounted) {
    if (hour >= 5 && hour < 11) greeting = 'Selamat Pagi';
    else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
    else greeting = 'Selamat Malam';
  }

  // Format Tanggal dan Waktu ala Indonesia
  const formattedDate = mounted 
    ? time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Memuat tanggal...';
    
  const formattedTime = mounted 
    ? time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          {greeting}, 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-500 ml-2">Admin Qodha!</span>
        </h1>
      </div>
      
      {/* KOTAK WAKTU REAL-TIME (Hanya Konten) */}
<div className="flex items-center gap-4">
  <div className="w-2.5 h-2.5 rounded-full"></div>
  <div className={`${inter.className} flex flex-col items-end`}>
    <span className="text-xs font-extrabold text-gray-800">{formattedDate}</span>
    <span className="text-[11px] font-bold text-gray-500 font-mono mt-0.5 tracking-wider">{formattedTime} WIB</span>
  </div>
</div>
    </div>
  );
}