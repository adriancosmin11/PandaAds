import React from 'react';
import { Facebook, Instagram, Lightbulb } from 'lucide-react'; // Am importat si Instagram
import Image from 'next/image';

const Services = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* --- SECTION BACKGROUND (WAVES THIN) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/background-waves.png" 
          alt="Background Pattern" 
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Serviciile Noastre
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Abordăm fiecare platformă cu o strategie dedicată pentru a maximiza ROI-ul.
          </p>
        </div>

        {/* Am modificat grid-ul pentru 4 coloane */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: TikTok Ads */}
          <ServiceCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-8 h-8">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 7.392A6.341 6.341 0 0 0 15.829 12.5v-7.07a8.15 8.15 0 0 0 4.767 1.523v-3.452a4.86 4.86 0 0 1-1.007-.155Z"/>
              </svg>
            } 
            title="TikTok Ads" 
            desc="Creăm campanii virale care aduc brandul tău în fața a milioane de utilizatori activi. Focus pe UGC și conversii rapide."
          />

          {/* Card 2: Facebook & Instagram (Updated) */}
          <ServiceCard 
            icon={
              <div className="flex items-center gap-2">
                 <Facebook size={28} className="text-blue-600" />
                 {/* Iconita Instagram adăugată */}
                 <Instagram size={28} className="text-pink-600" />
              </div>
            } 
            title="Facebook & Instagram" 
            desc="Setăm reclame Meta avansate cu retargeting precis. Transformăm audiența rece în clienți fideli printr-un funnel de vânzări bine structurat."
          />

          {/* Card 3: Google Ads (NOU) */}
          <ServiceCard 
            icon={
              // Google Logo SVG Colorat
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            } 
            title="Google Ads" 
            desc="Apari exact atunci când clienții caută serviciile tale. Campanii Search & Display optimizate pentru intenția de cumpărare."
          />

          {/* Card 4: Creatives */}
          <ServiceCard 
            icon={<Lightbulb size={32} className="text-emerald-500" />} 
            title="Creatives & Design" 
            desc="O reclamă bună începe cu vizualul. Producem bannere și video-uri care opresc scroll-ul și cresc rata de click (CTR)."
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
  <div className="relative group bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full">
    
    {/* --- CARD CORNER BACKGROUND --- */}
    <div className="absolute top-0 right-0 w-3/4 h-3/4 pointer-events-none z-0">
        <Image 
            src="/assets/hero-bg.png" 
            alt="Background Pattern"
            fill
            className="object-cover object-top-right opacity-15 group-hover:opacity-25 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-transparent"></div>
    </div>

    {/* --- CONTENT --- */}
    <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="w-auto h-16 inline-flex bg-emerald-50/80 backdrop-blur-sm rounded-2xl items-center justify-center mb-6 shadow-sm border border-emerald-100/50 px-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm flex-grow">
          {desc}
        </p>
    </div>
  </div>
);

export default Services;