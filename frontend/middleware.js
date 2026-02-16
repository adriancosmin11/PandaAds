import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check for the admin_session cookie
  const adminSession = request.cookies.get('admin_session');
  
  // If the cookie is missing, redirect to the login page
  if (!adminSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // If authenticated, continue
  return NextResponse.next();
}

// Configure the middleware to apply only to /admin/panel and its sub-paths
export const config = {
  matcher: '/admin/panel/:path*',
};
