'use server';

import { getLastEmails } from '../lib/emailService';

export async function fetchContactEmails() {
    try {
        const config = {
            user: process.env.EMAIL_CONTACT_USER,
            password: process.env.EMAIL_CONTACT_PASSWORD,
            host: process.env.IMAP_HOST || 'imap.zoho.eu'
        };
        
        if (!config.user || !config.password) {
            return { success: false, message: 'Missing Contact Email Credentials' };
        }

        const emails = await getLastEmails(config);
        // Simple serialization to ensure no complex objects pass to client
        const serialized = emails.map(e => ({
            ...e,
            date: e.date.toISOString()
        }));
        
        return { success: true, data: serialized };
    } catch (e) {
        console.error("Failed to fetch contact emails:", e);
        return { success: false, message: e.message };
    }
}

export async function fetchCareerEmails() {
    try {
        const config = {
            user: process.env.EMAIL_CAREER_USER || process.env.EMAIL_CONTACT_USER, // Fallback if alias
            password: process.env.EMAIL_CAREER_PASSWORD || process.env.EMAIL_CONTACT_PASSWORD,
            host: process.env.IMAP_HOST || 'imap.zoho.eu'
        };

        if (!config.user || !config.password) {
            return { success: false, message: 'Missing Career Email Credentials' };
        }

        const emails = await getLastEmails(config);
        const serialized = emails.map(e => ({
            ...e,
            date: e.date.toISOString()
        }));

        return { success: true, data: serialized };
    } catch (e) {
        console.error("Failed to fetch career emails:", e);
        return { success: false, message: e.message };
    }
}
