"use client";
import React, { useEffect } from 'react';
import { customConfirm } from './GlobalConfirmModal'; // Import fungsi sakti

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. MENCEGAH REFRESH / CLOSE TAB
    // Browser memaksa kita memakai alert bawaan mereka untuk event ini (Aturan Mutlak Web Modern)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    // 2. HISTORY HIJACKING (Pencegah Tombol Undo / Back Browser)
    let isLeaving = false;
    window.history.pushState(null, '', window.location.href);

    const handlePopState = async () => {
      if (isLeaving) return; // Jika sudah setuju keluar, abaikan popstate agar tidak looping

      // Tahan browser agar tetap di halaman ini
      window.history.pushState(null, '', window.location.href);

      // PANGGIL MODAL CUSTOM SUPER MEWAH!
      const confirmed = await customConfirm(
        "Peringatan Navigasi",
        "Anda mencoba kembali ke halaman sebelumnya. Data yang belum tersimpan di form ini akan hilang. Lanjutkan?",
        "warning",
        "Ya, Keluar",
        "Tetap di Sini"
      );
      
      if (confirmed) {
        isLeaving = true;
        window.history.back(); // Izinkan keluar
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // 3. AUTO LOGOUT IDLE 15 MENIT
    let idleTimer: NodeJS.Timeout;
    const TIME_LIMIT = 15 * 60 * 1000; 

    const resetIdleTimer = async () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(async () => {
        // FIX LINTER: Hapus 'const confirmed =' karena kita hanya butuh menunggu modal di-klik,
        // apapun yang di-klik, sistem akan tetap memaksa logout karena sudah idle.
        await customConfirm(
          "Sesi Habis (Idle)",
          "Tidak ada aktivitas selama 15 menit. Demi keamanan, Anda akan di-logout otomatis.",
          "info",
          "Login Ulang",
          "Tutup"
        );
        window.location.href = '/admin/login'; 
      }, TIME_LIMIT);
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    
    resetIdleTimer(); 

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  return <>{children}</>;
}