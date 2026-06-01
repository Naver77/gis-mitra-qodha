import React from 'react';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminWrapper from './AdminWrapper';
import GlobalConfirmModal from './GlobalConfirmModal';
import AdminProvider from './AdminProvider'; 
import SecurityWrapper from './SecurityWrapper';

const jwtSecretString = process.env.JWT_SECRET;
if (!jwtSecretString) {
  throw new Error('FATAL ERROR: JWT_SECRET environment variable is missing.');
}
const SECRET_KEY = new TextEncoder().encode(jwtSecretString);

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
        {/* Bungkus halaman login juga agar terlindungi dari tombol Back */}
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </div>
    );
  }
  
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) redirect('/admin/login');

  let adminName = 'Admin Qodha';
  let adminRole = 'Admin'; // Default fallback

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    adminName = (payload.nama as string) || 'Admin Qodha';
    adminRole = (payload.role as string) || 'Admin'; // EKSTRAK ROLE DARI JWT
  } catch (error) { 
    console.error("JWT Verification Failed:", error);
    redirect('/admin/login');
  }

  return (
    <div className="antialiased bg-gray-50 min-h-screen text-gray-900">
      <GlobalConfirmModal /> 
      
      {/* SECURITY WRAPPER MELINDUNGI SELURUH DASHBOARD */}
      <SecurityWrapper>
        <AdminProvider name={adminName} role={adminRole}>
          <AdminWrapper>
            {children}
          </AdminWrapper>
        </AdminProvider>
      </SecurityWrapper>
      
    </div>
  );
}