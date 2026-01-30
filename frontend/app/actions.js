'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';
import path from 'path'; // <--- IMPORT ESENȚIAL PENTRU PDF

const prisma = new PrismaClient();

// --- CONFIGURARE EMAIL ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- HELPER: LOGICĂ TRIMITERE EMAIL ---
async function sendNotifications(data) {
  const destinatar = process.env.CONTACT_EMAIL || 'contact@pandaads.ro';
  console.log('📧 Trimitere notificare către:', destinatar);

  try {
    await transporter.verify();

    // Email Notificare Admin
    await transporter.sendMail({
      from: `"PandaAds Site" <${process.env.SMTP_USER}>`,
      to: destinatar,
      replyTo: data.email,
      subject: `🔔 Cerere Nouă: ${data.nume}`,
      html: `
        <h2>Ai o cerere nouă pe site!</h2>
        <p><strong>Nume:</strong> ${data.nume} ${data.prenume || ''}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.telefon || '-'}</p>
        <p><strong>Mesaj/Tip:</strong><br/>${data.mesaj || 'Formular Ebook/Contact'}</p>
      `,
    });
    console.log('✅ Email Admin TRIMIS');

    // Email Confirmare Client (Doar pentru Contact, nu Ebook - Ebook are funcție separată mai jos)
    if (data.type === 'contact' && data.email) {
       await transporter.sendMail({
        from: `"Echipa PandaAds" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `Salut! Am primit mesajul tău.`,
        html: `
          <h3>Salutare! 🐼</h3>
          <p>Confirmăm că am primit mesajul tău. Revenim curând!</p>
        `,
      });
      console.log('✅ Email Client TRIMIS');
    }

  } catch (error) {
    console.error('❌ EROARE SMTP:', error);
  }
}

// --- 1. FORMULAR CONTACT ---
export async function submitContactForm(data) {
  try {
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

    const emailData = {
        nume: data.client.nume,
        prenume: data.client.prenume,
        email: data.client.email,
        telefon: data.client.telefon,
        mesaj: data.client.mesaj,
        type: 'contact'
    };
    sendNotifications(emailData);

    revalidatePath('/admin/panel');
    return { success: true, message: 'Mesaj trimis!' };
  } catch (error) {
    console.error('Eroare Contact:', error);
    return { success: false, message: 'Eroare server.' };
  }
}

// --- 2. FORMULAR EBOOK (ACEASTA LIPSEA!) ---
export async function submitEbookForm(data) {
  try {
    // Validare
    if (!data.email || !data.nume) {
      return { success: false, message: 'Adresa de email și numele sunt obligatorii.' };
    }

    // Salvare în DB
    await prisma.lead.create({
      data: {
        nume: data.nume,
        prenume: data.prenume || '',
        email: data.email,
        telefon: '',
        status: 'Ebook Download',
        mesaj: 'A descărcat Ebook-ul Gratuit'
      }
    });

    // Calea către PDF
    const pdfPath = path.join(process.cwd(), 'public', 'assets', 'ebook-pandaads.pdf');

    // Trimitere Email cu PDF
    console.log('📧 Trimitere Ebook către:', data.email);
    await transporter.sendMail({
      from: `"Echipa PandaAds" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `🎁 Aici ai Ebook-ul promis: Ghid PandaAds`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #059669;">Salutare, ${data.nume}!</h2>
          <p>Îți mulțumim pentru interes.</p>
          <p>Atașat acestui email vei găsi ghidul nostru gratuit.</p>
          <p>Sperăm să îți fie de folos!</p>
          <br/>
          <p>Cu drag,<br/>Echipa PandaAds</p>
        </div>
      `,
      attachments: [
        {
          filename: 'Ghid-PandaAds.pdf',
          path: pdfPath
        }
      ]
    });

    // Notificare Admin
    sendNotifications({
        nume: data.nume,
        email: data.email,
        mesaj: 'A descărcat EBOOK-ul Gratuit!',
        type: 'ebook'
    });

    return { success: true, message: 'Ebook trimis!' };

  } catch (error) {
    console.error('❌ Eroare Ebook:', error);
    return { success: false, message: 'Nu am putut trimite emailul. Verifică adresa.' };
  }
}

// --- 3. AUDIT FORM ---
export async function submitAuditForm(data) {
  try {
    const platformeString = Array.isArray(data.platforme) ? data.platforme.join(', ') : data.platforme;
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
    
    // Notificare simplă admin
    sendNotifications({
        nume: data.nume,
        email: data.email,
        telefon: data.telefon,
        mesaj: `Cerere AUDIT pentru site-ul: ${data.website}`,
        type: 'audit'
    });

    revalidatePath('/admin/panel');
    return { success: true, message: 'Cerere trimisă!' };
  } catch (error) {
    console.error('Eroare Audit:', error);
    return { success: false, message: 'Eroare server.' };
  }
}

// --- 4. GET CONTENT ---
export async function getSiteContent(sectionKey) {
  try {
    const data = await prisma.siteContent.findUnique({ where: { sectionKey } });
    return data ? data.content : null;
  } catch (error) {
    return null;
  }
}

// --- 5. UPDATE CONTENT ---
export async function updateSiteContent(sectionKey, newContent) {
  try {
    await prisma.siteContent.upsert({
      where: { sectionKey },
      update: { content: newContent },
      create: { sectionKey, content: newContent }
    });
    revalidatePath('/'); 
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// --- 6. AUTH ---
export async function loginAdmin(email, password, rememberMe) {
  if (email === 'admin@pandaads.ro' && password === 'admin') {
    const expires = rememberMe ? Date.now() + 30 * 24 * 3600000 : Date.now() + 24 * 3600000;
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', { expires, httpOnly: true, path: '/' });
    return { success: true };
  }
  return { success: false, message: 'Date incorecte' };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/login');
}

export async function saveCookieConsent(accepted) {
    try {
        await prisma.cookieLog.create({ data: { visitorId: 'vis_' + Date.now(), accepted } });
        return { success: true };
    } catch (e) { return { success: false }; }
}