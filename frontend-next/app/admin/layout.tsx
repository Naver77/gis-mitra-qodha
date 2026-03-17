import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminWrapper from './AdminWrapper';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'qodha-aromatic-rahasia-skripsi-s1');

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  // 1. Jika tidak ada token (Belum Login), tendang ke halaman login
  if (!token) {
    redirect('/admin/login');
  }

  let adminName = 'Admin Qodha';

  // 2. Jika ada token, verifikasi keasliannya
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    adminName = payload.nama as string;
  } catch { 
    // FIX: Menghapus parameter error secara total
    // Jika token kedaluwarsa atau dipalsukan, tendang ke login
    redirect('/admin/login');
  }

  // 3. Jika aman, bungkus konten dengan UI Sidebar & Header
  return <AdminWrapper adminName={adminName}>{children}</AdminWrapper>;
}