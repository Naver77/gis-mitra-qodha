"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; // TAMBAHAN WAJIB NEXT.JS

export default function AdminWrapper({ children, adminName }: { children: React.ReactNode, adminName: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: 'fa-gauge-high' },
    { title: 'Data Produk', path: '/admin/produk', icon: 'fa-box' },
    { title: 'Kategori', path: '/admin/kategori', icon: 'fa-tags' },
    { title: 'Data Mitra', path: '/admin/mitra', icon: 'fa-store' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden selection:bg-brand-gold selection:text-gray-900">
      
      {/* SIDEBAR (Desktop & Mobile) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-center border-b border-gray-800 shrink-0">
          <h1 className="text-2xl font-black tracking-wider text-brand-gold">QODHA <span className="text-white text-sm font-normal tracking-normal">ADMIN</span></h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 hide-scrollbar">
          <p className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 mt-2">Menu Utama</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              // PERUBAHAN: Gunakan <Link> agar perpindahan halaman mulus tanpa reload
              <Link 
                key={item.path} 
                href={item.path} 
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold text-sm ${
                  isActive ? 'bg-brand-gold text-gray-900 shadow-[0_4px_15px_rgba(245,158,11,0.2)]' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center ${isActive ? 'text-gray-900' : ''}`}></i>
                {item.title}
              </Link>
            );
          })}

          <p className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 mt-8">WebGIS Area</p>
          {/* Untuk link ke luar Admin (seperti peta publik), tetap pakai <a> target="_blank" */}
          <a href="/map" target="_blank" className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold text-sm text-gray-400 hover:text-emerald-400 hover:bg-gray-800 group">
            <i className="fa-solid fa-map-location-dot w-5 text-center group-hover:animate-bounce"></i>
            Lihat Peta (Live)
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800 shrink-0">
          {/* Logout biarkan <a> agar browser benar-benar membersihkan sesi & cookie saat dipindah */}
          <a href="/admin/logout" className="flex items-center gap-3 justify-center w-full py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all text-sm font-bold">
            <i className="fa-solid fa-power-off"></i> Keluar Sistem
          </a>
        </div>
      </aside>

      {/* OVERLAY MOBILE */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* AREA KANAN (Header & Main Content) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        
        {/* HEADER GLASSMORPHISM */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-brand-gold shadow-sm">
              <i className="fa-solid fa-bars text-sm"></i>
            </button>
            <h2 className="text-lg font-black text-gray-800 hidden sm:block">Panel Kontrol</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-extrabold text-gray-900">{adminName}</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 inline-block px-2 py-0.5 rounded-md mt-0.5">Administrator</p>
            </div>
            <div className="w-11 h-11 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-inner">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>
        </header>

        {/* KONTEN UTAMA */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>

    </div>
  );
}