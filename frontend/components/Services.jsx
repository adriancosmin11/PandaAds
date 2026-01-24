import React from 'react';
import { Facebook, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const Services = () => {
  return (
    // Adăugat 'relative overflow-hidden' și scos culoarea de fundal gri
    <section className="relative py-24 bg-white overflow-hidden">
      
      {/* --- SECTION BACKGROUND (WAVES THIN) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/background-waves.png" 
          alt="Background Pattern" 
          fill
          className="object-cover opacity-50" // Opacitate foarte mică pentru subtilitate
        />
        {/* Gradient pentru a îmbina secțiunile între ele */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Content Wrapper cu z-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Serviciile Noastre
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Abordăm fiecare platformă cu o strategie dedicată pentru a maximiza ROI-ul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

          {/* Card 2: Meta */}
          <ServiceCard 
            icon={<Facebook size={32} className="text-blue-600" />} 
            title="Facebook & Instagram Ads" 
            desc="Setăm reclame Meta avansate cu retargeting precis. Transformăm audiența rece în clienți fideli printr-un funnel de vânzări bine structurat."
          />

          {/* Card 3: Creatives */}
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

// Sub-componenta pentru card (rămâne neschimbată, păstrează și ea pattern-ul mic din colț)
const ServiceCard = ({ icon, title, desc }) => (
  <div className="relative group bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full">
    
    {/* --- CARD CORNER BACKGROUND --- */}
    <div className="absolute top-0 right-0 w-3/4 h-3/4 pointer-events-none z-0">
        <Image 
            src="/assets/hero-bg.png" // Aici folosim tot hero-bg pentru consistența cardurilor
            alt="Background Pattern"
            fill
            className="object-cover object-top-right opacity-15 group-hover:opacity-25 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-transparent"></div>
    </div>

    {/* --- CONTENT --- */}
    <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="w-16 h-16 bg-emerald-50/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100/50">
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