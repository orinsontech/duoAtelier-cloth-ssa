import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, isSessionTokenValid } from '@/lib/admin-auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected =
    (pathname.startsWith('/admin') && pathname !== '/admin/login') ||
    pathname.startsWith('/api/admin');

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
