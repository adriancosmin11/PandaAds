import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ success: false, message: 'Niciun fișier nu a fost trimis' }, { status: 400 });
    }

    // Validăm tipul de fișier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ success: false, message: 'Tip fișier nu este suportat. Folosește JPG, PNG, WebP sau GIF.' }, { status: 400 });
    }

    // Validăm dimensiunea (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ success: false, message: 'Fișierul este prea mare. Maximum 5MB.' }, { status: 400 });
    }

    // Generăm nume unic cu timestamp
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
    const fileName = `${timestamp}-${originalName}`;

    // Path-ul unde salvăm imaginea
    const uploadDir = join(process.cwd(), 'public', 'assets', 'blog');
    const filePath = join(uploadDir, fileName);

    // Creăm directorul dacă nu există
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Salvăm fișierul
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    // Returnăm path-ul relativ pentru Next.js Image
    const imagePath = `/assets/blog/${fileName}`;

    return Response.json({ 
      success: true, 
      message: 'Imagine încărcată cu succes!',
      imagePath: imagePath 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ success: false, message: 'Eroare la încărcarea imaginii: ' + error.message }, { status: 500 });
  }
}
