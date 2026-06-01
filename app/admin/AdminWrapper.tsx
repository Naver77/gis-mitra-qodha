"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'; 
import { customConfirm } from './GlobalConfirmModal';

// 1. IMPORT HOOK PROVIDER KITA
import { useAdmin } from './AdminProvider'; 

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // 2. PANGGIL DATA DARI PROVIDER
  const { name, role } = useAdmin(); 

  const handleLogout = async () => {
    const isConfirmed = await customConfirm(
      "Keluar dari Sistem?",
      "Sesi Anda akan diakhiri. Anda harus login kembali untuk mengakses Dashboard Admin.",
      "warning",
      "Ya, Leave (Keluar)",
      "Batal"
    );

    if (isConfirmed) {
      // 3. PERBAIKAN LOGOUT: Panggil API POST yang aman
      try {
        await fetch('/admin/logout', { method: 'POST' });
        window.location.href = '/admin/login';
      } catch (error) {
        console.error("Gagal logout:", error);
      }
    }
  };

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: 'fa-gauge-high' },
    { title: 'Data Produk', path: '/admin/produk', icon: 'fa-box' },
    { title: 'Kategori', path: '/admin/kategori', icon: 'fa-tags' },
    { title: 'Data Mitra', path: '/admin/mitra', icon: 'fa-store' },
    { title: 'Data Prospek (Leads)', path: '/admin/prospek', icon: 'fa-address-book' },
    { title: 'Laporan Analitik', path: '/admin/laporan', icon: 'fa-chart-pie' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden selection:bg-brand-gold selection:text-gray-900">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="h-20 flex items-center justify-center border-b border-gray-800 shrink-0 gap-2 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/assets/img/qodhawhite.png" 
            alt="Qodha" 
            className="h-8 w-auto object-contain" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="text-brand-gold text-xs font-black tracking-widest mt-1">ADMIN</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 hide-scrollbar">
          <p className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 mt-2">Menu Utama</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
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

        </nav>

        <div className="p-4 border-t border-gray-800 shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-3 justify-center w-full py-3 rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all text-sm font-bold cursor-pointer">
            <i className="fa-solid fa-door-open mr-2"></i> Leave
          </button>
        </div>
      </aside>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* AREA KANAN */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-brand-gold shadow-sm">
              <i className="fa-solid fa-bars text-sm"></i>
            </button>
            <h2 className="text-lg font-black text-gray-800 hidden sm:block">Panel Kontrol</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              {/* 4. TAMPILKAN NAMA DAN ROLE SECARA DINAMIS */}
              <p className="text-sm font-extrabold text-gray-900">{name}</p>
              <p className={`text-[10px] font-bold uppercase tracking-widest inline-block px-2 py-0.5 rounded-md mt-0.5 ${role === 'Super Admin' ? 'bg-brand-gold text-yellow-900' : 'bg-emerald-50 text-emerald-600'}`}>
                {role}
              </p>
            </div>
            <div className="w-11 h-11 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-inner">
              <i className={`fa-solid ${role === 'Super Admin' ? 'fa-crown text-yellow-500' : 'fa-user-shield'}`}></i>
            </div>
          </div>
        </header>

        {/* KONTEN UTAMA & FOOTER */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 md:p-6 lg:p-8 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1">
             {children}
          </div>

          <footer className="mt-10 pt-6 pb-2 border-t border-gray-200/60 text-center shrink-0">
            <p className="text-xs font-bold text-gray-400">
              &copy; {new Date().getFullYear()} Qodha Aromatic System. All rights reserved.
            </p>
            <p className="text-[9px] text-gray-400/70 font-medium mt-1 uppercase tracking-widest">
              Developed & Managed by IT Qodha
            </p>
          </footer>
        </main>

      </div>
    </div>
  );
}