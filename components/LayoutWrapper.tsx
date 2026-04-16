"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // STATE UNTUK MODAL GLOBAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  const triggerLeadModal = (context: string) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  // DETEKSI URL SAAT INI
  const isAdminPage = pathname?.startsWith('/admin');
  const isHomePage = pathname === '/';
  const isMapPage = pathname === '/map';

  // MANAJEMEN BODY CSS (Hanya untuk Halaman Peta)
  useEffect(() => {
    if (isMapPage) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isMapPage]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HEADER (Sembunyikan di area Admin) */}
      {!isAdminPage && <Header />}

      {/* 2. SMART SPACER (Jarak Navbar Otomatis)
          Hanya muncul jika BUKAN di Homepage (agar Navbar nempel elegan) 
          dan BUKAN di Admin. Sesuaikan h-[80px] dengan tinggi Navbar Anda.
      */}
      {!isAdminPage && !isHomePage && (
        <div className="h-17.5 md:h-21.25 w-full shrink-0 bg-transparent" aria-hidden="true"></div>
      )}

      {/* 3. KONTEN UTAMA */}
      <main className="flex-1 w-full relative flex flex-col">
        {children}
      </main>

      {/* 4. FOOTER (Sembunyikan di Admin DAN di Peta) */}
      {!isAdminPage && !isMapPage && (
        <Footer onFloatingWaClick={() => triggerLeadModal("Pertanyaan Umum (Dari Tombol Melayang Bawah)")} />
      )}

      {/* 5. MODAL WA GLOBAL */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        sourceContext={modalContext} 
      />

    </div>
  );
}