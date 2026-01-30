import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('admin_session');
  const path = new URL(request.url).searchParams.get('path') || '/admin';

  // Debug logging to help trace redirect behavior during development
  try {
    // eslint-disable-next-line no-console
    console.log('[auth-proxy] path=', path, 'hasSession=', hasSession);
  } catch (e) {
    // ignore logging failures
  }

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
