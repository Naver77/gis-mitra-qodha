"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function LayoutWrapper({
  header,
  footer,
  children
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Deteksi apakah pengunjung sedang berada di rute Admin (termasuk login)
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      {/* Jika BUKAN halaman admin, tampilkan Header Utama */}
      {!isAdminPage && header}

      {/* Konten Halaman (Berubah-ubah) */}
      {children}

      {/* Jika BUKAN halaman admin, tampilkan Footer Utama */}
      {!isAdminPage && footer}
    </>
  );
}