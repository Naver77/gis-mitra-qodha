import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Sisipkan informasi URL saat ini ke Header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', path);

  // 2. Baca Karcis (Cookie) dengan nama yang SAMA PERSIS dengan di auth.ts
  const token = request.cookies.get('admin_session')?.value;

  // 3. Jika mencoba masuk area Admin (selain login) TANPA Karcis, tendang!
  if (!token && path.startsWith('/admin') && path !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 4. Jika punya Karcis atau bukan di area Admin, silakan lewat
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Jaga ketat area admin
export const config = {
  matcher: ['/admin/:path*'],
};