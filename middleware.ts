import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', path);

  // PERBAIKAN 1: Sesuaikan pengecualian ke rute login yang sebenarnya
  if (path === '/admin/login') {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const token = request.cookies.get('admin_session')?.value;

  // PERBAIKAN 2: Arahkan ke /admin/login jika tidak ada token
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
    await jwtVerify(token, secret);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch {
    // PERBAIKAN 3: Arahkan kembali ke /admin/login jika token invalid/expired
    console.warn('[SECURITY] Upaya akses ditolak: Token tidak valid atau kedaluwarsa.');
    
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_session');
    
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};