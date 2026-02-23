import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/api/auth/login', '/api/auth/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if user has session
  const token = request.cookies.get('sb-access-token')?.value;

  if (!token) {
    // Redirect to login for protected routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
