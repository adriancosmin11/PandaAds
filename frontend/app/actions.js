'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

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
    
    // Returnăm conținutul JSON sau null
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

    // Revalidăm pagina principală pentru a vedea modificările instant
    revalidatePath('/'); 
    
    return { success: true, message: 'Conținut actualizat cu succes!' };
  } catch (error) {
    console.error('Eroare la actualizare content:', error);
    return { success: false, message: 'Eroare la salvare.' };
  }
}