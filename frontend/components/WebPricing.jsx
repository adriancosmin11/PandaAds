import React from 'react';
import { Check, Globe, ShoppingCart, Layout, Store, ArrowRight } from 'lucide-react';
import Image from 'next/image'; // Import Image

const WebPricing = () => {
  const plans = [
    // ... (datele planurilor rămân neschimbate) ...
    {
      price: '499 €',
      title: 'Site de Prezentare',
      icon: <Globe size={32} className="text-white"/>,
      color: 'green',
      bgHeader: 'bg-green-500',
      bgLight: 'bg-green-50',
      textDark: 'text-green-700',
      features: ['Website modern & responsive', '3-4 pagini', 'Formular contact', 'Integrare Social Media']
    },
    {
      price: '999 €',
      title: 'Magazin Online Mic',
      icon: <ShoppingCart size={32} className="text-white"/>,
      color: 'blue',
      bgHeader: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textDark: 'text-blue-700',
      features: ['Magazin online complet', 'Până la 5-7 produse', 'Integrare plăți online', 'Pregătit pentru reclame']
    },
    {
      price: '1.499 €',
      title: 'Magazin Online Mediu',
      icon: <Layout size={32} className="text-white"/>,
      color: 'purple',
      bgHeader: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textDark: 'text-purple-700',
      features: ['Magazin avansat', '20-30 produse', 'Filtre & Categorii', 'Email-uri automate']
    },
    {
      price: '1.999 €',
      title: 'Magazin Premium',
      icon: <Store size={32} className="text-white"/>,
      color: 'orange',
      bgHeader: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textDark: 'text-orange-700',
      features: ['Magazin complex & scalabil', '30+ produse', 'Tracking avansat', 'Filtre multiple']
    }
  ];

  return (
    // Adăugat 'relative overflow-hidden'
    <section className="relative py-24 bg-white overflow-hidden">

      {/* --- SECTION BACKGROUND (WAVES FAT) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/background-waves-fat.png" 
          alt="Background Pattern" 
          fill
          className="object-cover opacity-100"
        />
         {/* Gradient mai puternic jos pentru tranziția spre footer-ul negru */}
         <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-gray-50"></div>
      </div>
      
      {/* Content Wrapper cu z-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Creare Website & Magazin Online</h2>
          <p className="text-xl text-gray-600">De la imagine profesională la vânzări online</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            // Adăugat backdrop-blur la carduri pentru a se separa de fundal
            <div key={idx} className="group flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden">
              
              <div className={`${plan.bgLight} p-8 text-center relative`}>
                 <div className={`w-16 h-16 mx-auto ${plan.bgHeader} rounded-2xl flex items-center justify-center shadow-lg mb-4 rotate-3 group-hover:rotate-6 transition-transform`}>
                    {plan.icon}
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 min-h-[3rem] flex items-center justify-center leading-tight">
                    {plan.title}
                 </h3>
                 <div className={`mt-2 text-2xl font-black ${plan.textDark}`}>
                    {plan.price}
                 </div>
                 <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">One-time payment</span>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                   {plan.features.map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                       <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.textDark}`} strokeWidth={3}/>
                       <span className="leading-snug">{item}</span>
                     </li>
                   ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-bold text-white shadow-md transition-colors ${plan.bgHeader} brightness-100 hover:brightness-110`}>
                  Alege Pachet
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center relative z-10">
            <button className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl flex items-center gap-2 mx-auto transition-all hover:scale-105">
                Cere o ofertă personalizată <ArrowRight size={20}/>
            </button>
            <p className="mt-4 text-sm text-gray-500">
                *Prețurile sunt orientative și pot varia în funcție de complexitate. Hosting-ul și domeniul nu sunt incluse.
            </p>
        </div>

      </div>
    </section>
  );
};

export default WebPricing;