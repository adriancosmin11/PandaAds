'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// --- 1. ȘTERGERE LEAD ---
export async function deleteLead(id) {
    try {
        await prisma.lead.delete({ 
            where: { id } 
        });
        
        // Revalidăm panoul pentru a actualiza datele instant
        revalidatePath('/admin/panel'); 
        return { success: true };
    } catch (e) {
        console.error("Eroare la ștergere:", e);
        return { success: false, message: e.message };
    }
}

// --- 2. UPDATE STATUS (Nou, Văzut, etc.) ---
export async function updateLeadStatus(id, status) {
    try {
        await prisma.lead.update({
            where: { id },
            data: { status }
        });
        
        revalidatePath('/admin/panel');
        return { success: true };
    } catch (e) {
        console.error("Eroare la update status:", e);
        return { success: false, message: e.message };
    }
}

// --- 3. UPDATE NOTIȚE INTERNE ---
export async function updateLeadNotes(id, notes) {
    try {
        // IMPORTANT: Asigură-te că ai rulat 'npx prisma db push' 
        // după ce ai adăugat câmpul 'notes' în schema.prisma
        await prisma.lead.update({
            where: { id },
            data: { notes } // Dacă câmpul în DB se numește altfel, modifică aici
        });
        
        revalidatePath('/admin/panel');
        return { success: true };
    } catch (e) {
        console.error("Eroare la salvare notițe:", e);
        return { success: false, message: e.message };
    }
}