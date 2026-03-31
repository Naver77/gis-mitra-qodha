import React from 'react';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminWrapper from './AdminWrapper';
import SecurityWrapper from './SecurityWrapper';
import GlobalConfirmModal from './GlobalConfirmModal'; // <-- IMPORT MODAL GLOBAL

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'qodha-aromatic-rahasia-skripsi-s1');

export const metadata = {
  title: "Dashboard Admin - Qodha Aromatic",
  description: "Sistem Manajemen WebGIS & Produk",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || '';

  if (currentPath === '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col antialiased">
        {children}
      </div>
    );
  }
  
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) redirect('/admin/login');

  let adminName = 'Admin Qodha';

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    adminName = (payload.nama as string) || 'Admin Qodha';
  } catch (error) { 
    console.error("JWT Verification Failed:", error);
    redirect('/admin/login');
  }

  return (
    <div className="antialiased bg-gray-50 min-h-screen text-gray-900">
      {/* KITA PASANG MODAL DI SINI AGAR BISA MUNCUL DI ATAS SEMUANYA */}
      <GlobalConfirmModal /> 
      
      <AdminWrapper adminName={adminName}>
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </AdminWrapper>
    </div>
  );
}