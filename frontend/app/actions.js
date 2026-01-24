'use server'; // <--- FOARTE IMPORTANT: Trebuie să fie prima linie!

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// --- 1. Acțiune pentru Formularul de Contact ---
export async function submitContactForm(data) {
  try {
    // Validare simplă
    if (!data.client.email && !data.client.telefon) {
      return { success: false, message: 'Te rugăm să completezi emailul sau telefonul.' };
    }

    // Salvăm în baza de date
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

    // Actualizăm admin panel-ul
    revalidatePath('/admin/panel');

    return { success: true, message: 'Cererea a fost înregistrată!' };

  } catch (error) {
    console.error('Eroare Contact:', error);
    return { success: false, message: 'A apărut o eroare de server.' };
  }
}

// --- 2. Acțiune pentru Formularul de Audit ---
export async function submitAuditForm(data) {
  try {
    // Convertim array-ul de platforme în string (pentru a-l salva în DB)
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