import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Sisipkan informasi URL saat ini ke dalam Header 
  // Agar bisa dibaca oleh layout.tsx nantinya
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-current-path', path);

  // 2. Cek apakah komputer pengunjung membawa session
  const token = request.cookies.get('admin_session')?.value;

  // 3. Jika mencoba masuk ke area /admin/ (selain login) TANPA token, langsung tendang!
  if (!token && path.startsWith('/admin') && path !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 4. Lanjutkan perjalanan dengan membawa header baru
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Beri tahu satpam ini area mana saja yang harus dijaga
export const config = {
  matcher: ['/admin/:path*'],
};