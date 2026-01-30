import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import CaseStudy from '../components/CaseStudy';
import AdsPricing from '../components/AdsPricing'; // Verifică să fie calea corectă, fără .jsx explicit uneori
import WebPricing from '../components/WebPricing';
import Footer from '../components/Footer';
import StatsCounter from '../components/StatsCounter';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'PandaAds | Agenție TikTok & Meta Ads',
  description: 'Creștem afacerea ta prin reclame plătite și strategii de conversie.',
};

export default async function Home() {
  const prisma = new PrismaClient();

  // Citim datele pentru Hero, Servicii și Prețuri simultan
  const [heroRecord, servicesRecord, adsRecord] = await Promise.all([
    prisma.siteContent.findUnique({ where: { sectionKey: 'hero_section' } }),
    prisma.siteContent.findUnique({ where: { sectionKey: 'services_section' } }),
    prisma.siteContent.findUnique({ where: { sectionKey: 'ads_pricing' } }),
  ]);

  // Fallback la obiect gol dacă nu există date
  const heroData = heroRecord?.content || {};
  const servicesData = servicesRecord?.content || {};
  const adsData = adsRecord?.content || {};

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 scroll-smooth">
      <Navbar />
      
      <HeroSection data={heroData} />
      
      <div id="servicii">
        <Services data={servicesData} />
      </div>
      
      <div id="studii">
        <CaseStudy />
      </div>

      <div id="statistici">
        <StatsCounter />
      </div>
      
      <div id="preturi">
        <AdsPricing data={adsData} />
      </div>

      <div id="web-design">
        <WebPricing />
      </div>

      <Footer />
    </main>
  );
}