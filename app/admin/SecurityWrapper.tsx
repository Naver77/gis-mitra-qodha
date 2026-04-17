"use client";
import React, { useEffect } from 'react';
import { customConfirm } from './GlobalConfirmModal';

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // FIX: Fungsi 'beforeunload' (peringatan bawaan browser) telah DIHAPUS 
    // agar tidak terjadi bentrok (notifikasi ganda) dengan modal custom kita.

    // 2. HISTORY HIJACKING (Pencegah Tombol Undo / Back Browser)
    let isLeaving = false;
    window.history.pushState(null, '', window.location.href);

    const handlePopState = async () => {
      if (isLeaving) return; // Jika sudah setuju keluar, abaikan popstate agar tidak looping

      // Tahan browser agar tetap di halaman ini
      window.history.pushState(null, '', window.location.href);

      // Panggil Modal Custom Mewah kita
      const confirmed = await customConfirm(
        "Peringatan Navigasi",
        "Anda mencoba meninggalkan halaman ini. Pekerjaan yang belum tersimpan mungkin akan hilang. Lanjutkan?",
        "warning",
        "Ya, Keluar",
        "Tetap di Sini"
      );
      
      if (confirmed) {
        isLeaving = true;
        window.history.back(); // Izinkan keluar
      }
    };

    // Pasang Pelindung Navigasi Custom (Modal kita saja)
    window.addEventListener('popstate', handlePopState);

    // Bersihkan Pelindung saat pindah komponen
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return <>{children}</>;
}