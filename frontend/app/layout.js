import "./globals.css";
import { Inter } from "next/font/google";
import CookieBanner from "../components/CookieBanner";
import FacebookPixel from "../components/FacebookPixel";
import { Suspense } from "react";
import FloatingButtons from "../components/FloatingButtons";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PandaAds - Agenție de Marketing Digital & Web Design",
  description:
    "Creștem afaceri prin campanii TikTok Ads, Facebook Ads și Website-uri performante. Cere un audit gratuit!",
  icons: {
    icon: "/assets/logo.jpeg", // Opțional: pune logo-ul tău ca iconiță la tab
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        {children}
        <CookieBanner />
        <FloatingButtons />
        <SpeedInsights />
      </body>
    </html>
  );
}
