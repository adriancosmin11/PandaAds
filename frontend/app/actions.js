'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';
import path from 'path';
import { sendTikTokServerEvent } from '../lib/tiktok';

const prisma = new PrismaClient();

// --- CONFIGURARE EMAIL ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // Folosește true pentru port 465, false pentru 587
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

    // Construire conținut email Admin
    let subject = `🔔 Cerere Nouă: ${data.nume}`;
    let htmlContent = `
      <h2>Ai o cerere nouă pe site!</h2>
      <p><strong>Nume:</strong> ${data.nume} ${data.prenume || ''}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.telefon || '-'}</p>
    `;

    // Adăugare detalii specifice în funcție de tip
    if (data.type === 'audit') {
        htmlContent += `<p><strong>Website Audit:</strong> ${data.website || 'N/A'}</p>`;
        subject = `🔍 Cerere AUDIT: ${data.nume}`;
    } else if (data.type === 'ebook') {
        subject = `📚 Download EBOOK: ${data.nume}`;
    } else {
        htmlContent += `<p><strong>Mesaj:</strong><br/>${data.mesaj || '-'}</p>`;
        if(data.pachetAds) htmlContent += `<p><strong>Pachet Ads:</strong> ${data.pachetAds}</p>`;
        if(data.pachetWeb) htmlContent += `<p><strong>Pachet Web:</strong> ${data.pachetWeb}</p>`;
    }

    // Email Notificare Admin
    await transporter.sendMail({
      from: `"PandaAds Site" <${process.env.SMTP_USER}>`,
      to: destinatar,
      replyTo: data.email,
      subject: subject,
      html: htmlContent,
    });
    console.log('✅ Email Admin TRIMIS');

    // Email Confirmare Client (Doar pentru Contact)
    if (data.type === 'contact' && data.email) {
       await transporter.sendMail({
        from: `"Echipa PandaAds" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `Salut! Am primit mesajul tău.`,
        html: `
          <h3>Salutare, ${data.nume}! 🐼</h3>
          <p>Îți mulțumim că ne-ai scris. Am primit detaliile tale și un coleg va reveni către tine în cel mai scurt timp posibil.</p>
          <br>
          <p>O zi excelentă,<br>Echipa PandaAds</p>
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
    // Validare minimală
    if (!data.client?.email) return { success: false, message: 'Email lipsă' };

    await prisma.lead.create({
      data: {
        nume: data.client.nume,
        prenume: data.client.prenume,
        email: data.client.email,
        telefon: data.client.telefon,
        firma: data.client.firma || '',
        mesaj: data.client.mesaj || '',
        pachetAds: data.pachetAds || 'Niciunul', // Default values
        pachetWeb: data.pachetWeb || 'Niciunul',
        status: 'Nou'
      }
    });

    // Pregătire date pentru email notification
    const emailData = {
        nume: data.client.nume,
        prenume: data.client.prenume,
        email: data.client.email,
        telefon: data.client.telefon,
        mesaj: data.client.mesaj,
        pachetAds: data.pachetAds,
        pachetWeb: data.pachetWeb,
        type: 'contact'
    };
    
    // Nu folosim await aici pentru a nu bloca răspunsul UI (fire & forget), 
    // dar la Vercel Serverless e recomandat await pt a nu fi omorât procesul.
    await sendNotifications(emailData);

    // Trimitem eveniment la TikTok (Server-side)
    await sendTikTokServerEvent({
      eventName: 'Contact',
      userData: {
        email: emailData.email,
        phone: emailData.telefon,
      }
    });

    revalidatePath('/admin/panel');
    return { success: true, message: 'Mesaj trimis!' };
  } catch (error) {
    console.error('Eroare Contact:', error);
    return { success: false, message: 'Eroare server: ' + error.message };
  }
}

// --- 2. FORMULAR EBOOK ---
export async function submitEbookForm(data) {
  try {
    if (!data.email || !data.nume) {
      return { success: false, message: 'Adresa de email și numele sunt obligatorii.' };
    }

    await prisma.lead.create({
      data: {
        nume: data.nume,
        prenume: data.prenume || '',
        email: data.email,
        telefon: data.telefon || '', // Asigură-te că există acest câmp în form sau pune string gol
        status: 'Ebook Download',
        mesaj: 'A descărcat Ebook-ul Gratuit',
        pachetAds: 'Niciunul', // Necesare dacă sunt obligatorii în schemă
        pachetWeb: 'Niciunul'
      }
    });

    const pdfPath = path.join(process.cwd(), 'public', 'assets', 'ebook-pandaads.pdf');

    // Email Client cu Ebook
    await transporter.sendMail({
      from: `"Echipa PandaAds" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `🎁 Aici ai Ebook-ul promis: Ghid PandaAds`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #059669;">Salutare, ${data.nume}!</h2>
          <p>Îți mulțumim pentru interes.</p>
          <p>Atașat acestui email vei găsi ghidul nostru gratuit.</p>
          <p>Spor la citit și implementat!</p>
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
    await sendNotifications({
        nume: data.nume,
        email: data.email,
        mesaj: 'A descărcat EBOOK-ul Gratuit!',
        type: 'ebook'
    });

    // Trimitem eveniment la TikTok (Server-side)
    await sendTikTokServerEvent({
      eventName: 'CompleteRegistration',
      userData: {
        email: data.email,
        phone: data.telefon || '',
      }
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
    // Convertim array-ul de platforme în string pentru DB
    const platformeString = Array.isArray(data.platforme) ? data.platforme.join(', ') : (data.platforme || '');
    
    // Verifică dacă modelul AuditRequest există în schema.prisma
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
    
    await sendNotifications({
        nume: data.nume,
        email: data.email,
        telefon: data.telefon,
        website: data.website,
        mesaj: `Buget: ${data.buget}, Platforme: ${platformeString}`,
        type: 'audit'
    });

    // Trimitem eveniment la TikTok (Server-side)
    await sendTikTokServerEvent({
      eventName: 'Contact',
      userData: {
        email: data.email,
        phone: data.telefon,
      }
    });

    revalidatePath('/admin/panel');
    return { success: true, message: 'Cerere trimisă!' };
  } catch (error) {
    console.error('Eroare Audit:', error);
    return { success: false, message: 'Eroare server.' };
  }
}

// --- 3.5. VIDEO PRODUCTION FORM ---
export async function submitVideoProductieForm(data) {
  try {
    if (!data.nume || !data.email || !data.telefon) {
      return { success: false, message: 'Numele, emailul și telefonul sunt obligatorii.' };
    }

    // Save lead to Database
    await prisma.lead.create({
      data: {
        nume: data.nume,
        prenume: '',
        email: data.email,
        telefon: data.telefon,
        firma: data.companie || '',
        mesaj: data.mesaj || 'Formular: Producție Video TikTok/Reels',
        pachetAds: 'Producție Video',
        pachetWeb: 'Niciunul',
        status: 'Nou'
      }
    });

    // Prepare custom email content
    let htmlContent = `
      <h2>Cerere Nouă: Servicii Producție Video</h2>
      <p><strong>Nume:</strong> ${data.nume}</p>
      <p><strong>Companie/Clinică:</strong> ${data.companie || '-'}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.telefon}</p>
      <p><strong>Detalii Proiect:</strong><br/>${data.mesaj || '-'}</p>
    `;

    // Send direct Email to contact@pandaads.ro
    await transporter.sendMail({
      from: `"PandaAds Video" <${process.env.SMTP_USER}>`,
      to: 'contact@pandaads.ro', // Hardcoded as requested
      replyTo: data.email,
      subject: `🎬 Cerere Nouă Producție Video: ${data.nume}`,
      html: htmlContent,
    });
    
    // Optional: Send auto-reply to client
    await transporter.sendMail({
      from: `"Echipa PandaAds" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Salut! Am primit cererea ta pentru Video TikTok/Reels`,
      html: `
        <h3>Salutare, ${data.nume}! 🐼</h3>
        <p>Am primit detaliile tale referitoare la serviciile noastre de producție video.</p>
        <p>Un specialist din echipa PandaAds va analiza cererea și te va contacta în cel mai scurt timp pentru a discuta cum îți putem transforma ideile în materiale virale.</p>
        <br>
        <p>O zi excelentă,<br>Echipa PandaAds</p>
      `,
    });

    // Send TikTok Server Event
    await sendTikTokServerEvent({
      eventName: 'Contact',
      userData: {
        email: data.email,
        phone: data.telefon,
      }
    });

    revalidatePath('/admin/panel');
    return { success: true, message: 'Formularul a fost trimis cu succes!' };
  } catch (error) {
    console.error('Eroare Formular Video:', error);
    return { success: false, message: 'Nu am putut trimite mesajul. Vă rugăm să încercați din nou.' };
  }
}

// --- 4. GET CONTENT ---
export async function getSiteContent(sectionKey) {
  try {
    const data = await prisma.siteContent.findUnique({ where: { sectionKey } });
    return data ? data.content : null;
  } catch (error) {
    console.error("Error getting content:", error);
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
    console.error("Error updating content:", error);
    return { success: false };
  }
}

// --- 6. AUTH (SECURED) ---
export async function loginAdmin(email, password, rememberMe) {
  // Folosește variabile de mediu! Nu hardcodea parolele.
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@pandaads.ro';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin'; // Fallback doar pt dev

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const expires = rememberMe ? Date.now() + 30 * 24 * 3600000 : Date.now() + 24 * 3600000;
    const cookieStore = await cookies();
    
    // Setare cookie securizat
    cookieStore.set('admin_session', 'true', { 
        expires, 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // Doar HTTPS în producție
        sameSite: 'strict',
        path: '/' 
    });
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