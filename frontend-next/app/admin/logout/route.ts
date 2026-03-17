import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  
  // Hapus cookie sesi admin
  cookieStore.delete('admin_session');
  
  // Arahkan kembali ke halaman login
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}