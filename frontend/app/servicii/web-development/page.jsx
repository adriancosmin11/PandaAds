import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Code2, Smartphone, Zap } from 'lucide-react';
import WebAdvantages from '../../../components/WebAdvantages'; // Componenta Scroll
import WebPricing from '../../../components/WebPricing';       // Componenta Preturi

export const metadata = {
  title: 'Web Development Premium | Site-uri Next.js & Magazine Online',
  description: 'Dezvoltăm site-uri ultra-rapide și magazine online scalabile folosind Next.js și tehnologii moderne. Fără WordPress lent.',
};

export default function WebDevelopmentPage() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-20">
           <Image 
             src="/assets/background-waves-fat.png" // Asigură-te că imaginea există
             alt="Background Pattern"
             fill
             className="object-cover"
           />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-semibold mb-6">
             <Code2 size={16} /> Web Development Next Gen
          </div>
          
          <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Nu construim doar site-uri. <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Construim Imperii Digitale.
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Renunță la site-urile lente pe WordPress. Treci la tehnologia folosită de giganții tech (Next.js). 
            Viteză extremă, securitate absolută și un design care vinde.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#oferta" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Vezi Oferta <ArrowRight size={20}/>
            </Link>
            <Link href="/portofoliu" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              Portofoliu
            </Link>
          </div>
        </div>
      </section>

      {/* --- COMPONENTA SCROLL REVEAL (AVANTAJE) --- */}
      <WebAdvantages />

      {/* --- SECTION: TECH STACK (Logo-uri) --- */}
      <section className="py-12 border-y border-gray-100 bg-white">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
            POWERED BY MODERN TECH STACK
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Poți pune aici imagini reale cu logo-uri (NextJS, React, Vercel, Tailwind) */}
              <span className="text-2xl font-bold font-mono text-black">NEXT.js</span>
              <span className="text-2xl font-bold font-mono text-cyan-500">React</span>
              <span className="text-2xl font-bold font-mono text-blue-400">Tailwind</span>
              <span className="text-2xl font-bold font-mono text-black">Vercel</span>
              <span className="text-2xl font-bold font-mono text-purple-600">Stripe</span>
          </div>
      </section>

      {/* --- COMPONENTA PRETURI --- */}
      <WebPricing />

      {/* --- FAQ SECTION SCURT --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          {/* Am adăugat text-gray-900 pentru titlul principal */}
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Întrebări Frecvente
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                {/* Titlu întrebare: text-gray-900 */}
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                    De ce nu folosiți WordPress?
                </h3>
                {/* Răspuns: text-gray-700 (mai închis decât 600) */}
                <p className="text-gray-700 leading-relaxed">
                    WordPress este grozav pentru bloguri, dar devine lent și nesigur pentru business-uri care vor scalabilitate. Next.js oferă viteză instantanee și securitate superioară.
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                {/* Titlu întrebare: text-gray-900 */}
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                    Cât durează execuția?
                </h3>
                {/* Răspuns: text-gray-700 */}
                <p className="text-gray-700 leading-relaxed">
                    Un landing page (Start) durează 5-7 zile. Un site Business 2-3 săptămâni, iar un Magazin Online 4-6 săptămâni, în funcție de complexitate.
                </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}