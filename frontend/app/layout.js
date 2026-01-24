import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// --- AICI TREBUIE MODIFICAT ---
export const metadata = {
  title: 'PandaAds - Agenție de Marketing Digital & Web Design',
  description: 'Creștem afaceri prin campanii TikTok Ads, Facebook Ads și Website-uri performante. Cere un audit gratuit!',
  icons: {
    icon: '/assets/logo.jpeg', // Opțional: pune logo-ul tău ca iconiță la tab
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className={inter.className}>{children}</body>
    </html>
  );
}