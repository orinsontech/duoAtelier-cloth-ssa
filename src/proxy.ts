import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, isSessionTokenValid } from '@/lib/admin-auth';

// Only /admin/* pages go through proxy. API routes under /api/admin/* (e.g. the
// image upload endpoint) check the session cookie themselves instead — Next.js
// buffers/clones the entire request body for any route proxy matches, which
// corrupts large multipart file uploads, so those routes must bypass proxy.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isSessionTokenValid(token)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
