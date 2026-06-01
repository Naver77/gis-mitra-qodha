"use client";
import { useEffect } from 'react';

/**
 * Hook untuk mencegah user tidak sengaja menutup tab atau me-refresh halaman
 * saat ada form yang sedang diisi (belum disimpan).
 * * Cara pakai di komponen form:
 * const isDirty = formTelahDiubah; // true/false
 * useUnsavedChanges(isDirty);
 */
export function useUnsavedChanges(isDirty: boolean) {
  useEffect(() => {
    // Fungsi ini akan memunculkan popup bawaan browser yang 100% aman
    // saat user menekan F5, Ctrl+R, atau klik tombol [X] pada tab browser.
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Syarat wajib dari standar web modern agar dialog muncul
        e.returnValue = ''; 
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);
}