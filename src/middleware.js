import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const isAuthPath = path.startsWith('/auth');
  const isProtectedPath =
    path.startsWith('/dashboard') || path.startsWith('/user');
  const authCookie = request.cookies.get('auth')?.value || '';

  if (authCookie && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!authCookie && isProtectedPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (path === '/auth/verify') {
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (path === '/auth/reset-password') {
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (path === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/:path*'],
};
