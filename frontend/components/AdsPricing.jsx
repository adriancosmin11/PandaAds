import React from 'react';
import { Check, ShieldAlert, FileText, Settings, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Importăm Link pentru navigare

const AdsPricing = () => {
  const plans = [
    {
      name: 'SILVER',
      price: '300 – 500 €',
      period: '/lună',
      subtitle: 'Pentru Start-Up',
      gradient: 'bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300',
      border: 'border-gray-300',
      headerText: 'text-gray-700',
      button: 'bg-gray-700 hover:bg-gray-800',
      features: [
        'Setare Campanii',
        'Monitorizare de Bază',
        'Optimizări Simple',
        '1-2 campanii active',
        'Raport lunar de performanță'
      ]
    },
    {
      name: 'GOLD',
      price: '600 – 1.000 €',
      period: '/lună',
      subtitle: 'Pentru Vânzări',
      gradient: 'bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-400',
      border: 'border-yellow-400',
      headerText: 'text-yellow-800',
      button: 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
      isPopular: true,
      features: [
        'Strategie Personalizată',
        'Optimizare Constantă',
        'Retargeting & Testing',
        'Ajustare bugete dinamic',
        'Raport detaliat lunar'
      ]
    },
    {
      name: 'PLATINIUM',
      price: '1.200 – 2.000 €',
      period: '/lună',
      subtitle: 'Pentru Scalare',
      gradient: 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-300',
      border: 'border-blue-400',
      headerText: 'text-blue-900',
      button: 'bg-blue-700 hover:bg-blue-800',
      features: [
        'Scalare Avansată',
        'Funnel-uri & ROAS',
        'Analiză Avansată',
        'Retargeting intensiv',
        'Suport prioritizat'
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="preturi">

      {/* --- BACKGROUND WAVES (THIN) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/background-waves.png" 
          alt="Background Pattern" 
          fill
          className="object-cover opacity-10"
        />
         <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Administrare Reclame Online</h2>
          <p className="text-xl text-gray-600">Pachete Lunare — Magazine Online & Business-uri</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative z-10">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full
              ${plan.isPopular ? 'md:-mt-8 z-20 shadow-2xl scale-105 border-2 border-yellow-400' : 'border border-gray-100'}`}>
              
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
                  <Star size={14} fill="white" /> Cel mai ales
                </div>
              )}

              <div className={`p-8 ${plan.gradient} rounded-t-xl text-center border-b ${plan.border}`}>
                <h3 className={`text-3xl font-black tracking-widest uppercase ${plan.headerText} drop-shadow-sm mb-2`}>
                  {plan.name}
                </h3>
                <div className="inline-block bg-white/60 backdrop-blur-md px-4 py-2 rounded-lg shadow-inner mb-2">
                   <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                   <span className="text-xs text-gray-700 font-medium block">{plan.period}</span>
                </div>
                <p className="text-sm font-bold uppercase text-gray-800/80 tracking-wide mt-2">{plan.subtitle}</p>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                      <div className={`mt-0.5 p-0.5 rounded-full flex-shrink-0 
                        ${plan.isPopular ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
                
                {/* --- AICI ESTE UPDATE-UL CĂTRE PAGINA DE CONTACT --- */}
                <Link 
                  href={`/contact?service=ads&plan=${plan.name}`}
                  className={`block text-center w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 ${plan.button}`}
                >
                  Alege Pachetul
                </Link>

              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-center justify-center gap-3 text-yellow-800 font-semibold shadow-sm">
            <ShieldAlert size={20}/> Bugetul de reclame separat
          </div>
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center justify-center gap-3 text-green-800 font-semibold shadow-sm">
            <FileText size={20}/> Contract Lunar
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-center gap-3 text-blue-800 font-semibold shadow-sm">
            <Settings size={20}/> Pachete Personalizabile
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdsPricing;