import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Verificăm dacă utilizatorul are cookie-ul de admin
  const hasSession = request.cookies.has('admin_session');
  
  // 2. Luăm calea pe care vrea să intre
  const path = request.nextUrl.pathname;

  // SCENARIUL A: E logat și încearcă să intre la Login -> Îl trimitem la Panel
  if (hasSession && path.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin/panel', request.url));
  }

  // SCENARIUL B: NU e logat și încearcă să intre la Panel -> Îl trimitem la Login
  if (!hasSession && path.startsWith('/admin/panel')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // SCENARIUL C: Acces simplu la /admin -> Redirect inteligent
  if (path === '/admin') {
    if (hasSession) {
        return NextResponse.redirect(new URL('/admin/panel', request.url));
    } else {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Altfel, lasă-l să treacă
  return NextResponse.next();
}

// Specificăm pe ce rute să ruleze acest "semafor"
export const config = {
  matcher: ['/admin/:path*'],
};