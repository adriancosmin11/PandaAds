import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import CaseStudy from '../components/CaseStudy';
import AdsPricing from '../components/AdsPricing.jsx';
import WebPricing from '../components/WebPricing';
import Footer from '../components/Footer';

export const metadata = {
  title: 'PandaAds | Agenție TikTok & Meta Ads',
  description: 'Creștem afacerea ta prin reclame plătite și strategii de conversie.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 scroll-smooth">
      {/* 1. Bara de navigare */}
      <Navbar />
      
      {/* 2. Hero Section (Mascota + Titlu) */}
      <HeroSection />
      
      {/* 3. Servicii (Cele 3 carduri) */}
      <div id="servicii">
        <Services />
      </div>
      
      {/* 4. Studii de caz (Grafic + Testimonial) */}
      <div id="studii">
        <CaseStudy />
      </div>
      
      {/* 5. Prețuri Ads (Scuturile Metalice) */}
      <div id="preturi">
        <AdsPricing />
      </div>

      {/* 6. Prețuri Web (Coloanele Colorate) */}
      <div id="web-design">
        <WebPricing />
      </div>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}