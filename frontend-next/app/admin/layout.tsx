import React from 'react';
import { cookies, headers } from 'next/headers'; // FIX: Menambahkan headers
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminWrapper from './AdminWrapper';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'qodha-aromatic-rahasia-skripsi-s1');

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Baca URL saat ini dari kiriman Middleware
  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || '';

  // 2. JIKA INI HALAMAN LOGIN:
  // Jangan lakukan redirect (agar tidak looping).
  // Langsung tampilkan UI Login polos tanpa bingkai Sidebar/Navbar Admin.
  if (currentPath === '/admin/login') {
    return <>{children}</>;
  }

  // ========================================================
  // LOGIKA DI BAWAH INI HANYA JALAN UNTUK HALAMAN DASHBOARD
  // ========================================================
  
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  // Jika tidak ada token (Belum Login), tendang ke halaman login
  if (!token) {
    redirect('/admin/login');
  }

  let adminName = 'Admin Qodha';

  // Jika ada token, verifikasi keasliannya
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    adminName = payload.nama as string;
  } catch { 
    // Jika token kedaluwarsa atau dipalsukan, tendang ke login
    redirect('/admin/login');
  }

  // Jika aman, bungkus konten dengan UI Sidebar & Header
  return <AdminWrapper adminName={adminName}>{children}</AdminWrapper>;
}