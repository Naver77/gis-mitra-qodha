import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// WAJIB POST: Mencegah serangan CSRF via prefetching atau link injeksi
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  
  // Hapus cookie sesi admin
  cookieStore.delete('admin_session');
  
  // Gunakan request.url agar lebih dinamis tanpa perlu hardcode localhost/domain
  return NextResponse.redirect(new URL('/admin/login', request.url));
}