'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'; 
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// --- 1. Formular CONTACT ---
export async function submitContactForm(data) {
  try {
    if (!data.client.email && !data.client.telefon) {
      return { success: false, message: 'Te rugăm să completezi emailul sau telefonul.' };
    }

    await prisma.lead.create({
      data: {
        nume: data.client.nume,
        prenume: data.client.prenume,
        email: data.client.email,
        telefon: data.client.telefon,
        firma: data.client.firma || '',
        mesaj: data.client.mesaj || '',
        pachetAds: data.pachetAds,
        pachetWeb: data.pachetWeb,
        status: 'Nou'
      }
    });

    revalidatePath('/admin/panel');
    return { success: true, message: 'Cererea a fost înregistrată!' };

  } catch (error) {
    console.error('Eroare Contact:', error);
    return { success: false, message: 'A apărut o eroare de server.' };
  }
}

// --- 2. Formular AUDIT ---
export async function submitAuditForm(data) {
  try {
    const platformeString = Array.isArray(data.platforme) 
      ? data.platforme.join(', ') 
      : data.platforme;

    await prisma.auditRequest.create({
      data: {
        website: data.website,
        platforme: platformeString,
        buget: data.buget,
        nume: data.nume,
        email: data.email,
        telefon: data.telefon,
        status: 'Nou'
      }
    });

    revalidatePath('/admin/panel');
    return { success: true, message: 'Cererea de audit a fost trimisă!' };

  } catch (error) {
    console.error('Eroare Audit:', error);
    return { success: false, message: 'Eroare la salvare.' };
  }
}

// --- 3. GET Content (Pentru Editor) ---
export async function getSiteContent(sectionKey) {
  try {
    const data = await prisma.siteContent.findUnique({
      where: { sectionKey: sectionKey }
    });
    return data ? data.content : null;
  } catch (error) {
    console.error('Eroare la citire content:', error);
    return null;
  }
}

// --- 4. UPDATE Content (Pentru Editor) ---
export async function updateSiteContent(sectionKey, newContent) {
  try {
    await prisma.siteContent.upsert({
      where: { sectionKey: sectionKey },
      update: { content: newContent },
      create: {
        sectionKey: sectionKey,
        content: newContent
      }
    });
    revalidatePath('/');
    // Ensure the blog listing is revalidated when blog_posts change
    try {
      revalidatePath('/blog');
    } catch (e) {
      // ignore if revalidation not necessary or fails in some environments
    }
    return { success: true, message: 'Conținut actualizat cu succes!' };
  } catch (error) {
    console.error('Eroare la actualizare content:', error);
    return { success: false, message: 'Eroare la salvare.' };
  }
}

// --- 5. LOGIN ADMIN (Cu AWAIT cookies) ---
export async function loginAdmin(email, password, rememberMe) {
  if (email === 'admin@pandaads.ro' && password === 'admin') {
    
    const expires = rememberMe 
      ? Date.now() + 30 * 24 * 60 * 60 * 1000 
      : Date.now() + 24 * 60 * 60 * 1000;

    // --- MODIFICAREA ESTE AICI: await cookies() ---
    const cookieStore = await cookies();

    // Debug log: indicate we're setting the cookie
    try {
      // eslint-disable-next-line no-console
      console.log('[loginAdmin] setting admin_session cookie, expires=', new Date(expires).toISOString());
    } catch (e) {}

    cookieStore.set('admin_session', 'true', {
      expires: expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { success: true };
  } else {
    return { success: false, message: 'Email sau parolă greșită' };
  }
}

// --- 6. LOGOUT ADMIN (Cu AWAIT cookies) ---
export async function logoutAdmin() {
  // --- ȘI AICI: await cookies() ---
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  
  redirect('/admin/login');
}

// --- 7. SAVE COOKIE CONSENT ---
export async function saveCookieConsent(accepted) {
  try {
    const visitorId = 'vis_' + Date.now().toString(36);

    await prisma.cookieLog.create({
      data: {
        visitorId: visitorId,
        accepted: accepted
      }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Eroare salvare cookie:', error);
    return { success: false };
  }
}