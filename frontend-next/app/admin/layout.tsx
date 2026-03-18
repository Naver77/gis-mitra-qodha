import React from 'react';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminWrapper from './AdminWrapper';

// PENTING: Secret Key ini HARUS SAMA dengan yang ada di lib/auth.ts
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'qodha-aromatic-rahasia-skripsi-s1');

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Baca URL saat ini (Dikirim dari middleware)
  const headersList = await headers();
  const currentPath = headersList.get('x-current-path') || '';

  // 2. Jika ini halaman Login, JANGAN bungkus pakai Sidebar!
  if (currentPath === '/admin/login') {
    return <>{children}</>;
  }

  // ==========================================
  // LOGIKA KHUSUS DASHBOARD (Butuh Login)
  // ==========================================
  
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  // 3. Jika tidak ada token sama sekali, tendang!
  if (!token) {
    redirect('/admin/login');
  }

  let adminName = 'Admin Qodha';

  // 4. Verifikasi keaslian Token (Jangan-jangan token palsu/kadaluarsa)
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    // Ambil nama dari payload JWT (Sesuai yang kita buat di auth.ts)
    adminName = (payload.nama as string) || 'Admin Qodha';
  } catch (error) { 
    // JIKA VERIFIKASI GAGAL (Token expired/salah kunci), TENDANG!
    console.error("JWT Verification Failed:", error);
    redirect('/admin/login');
  }

  // 5. Jika lolos semua ujian, tampilkan konten lengkap dengan Sidebar!
  return <AdminWrapper adminName={adminName}>{children}</AdminWrapper>;
}