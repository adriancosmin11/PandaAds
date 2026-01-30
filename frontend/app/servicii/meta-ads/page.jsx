import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react'; 
// --- IMPORT LOGO-URI BRAND ---
import { FaFacebook, FaInstagram } from "react-icons/fa";

const pageConfig = {
  title: "Domină Feed-ul cu Meta Ads",
  subtitle: "Facebook & Instagram nu sunt moarte. Sunt doar mai scumpe pentru cei care nu știu ce fac. Noi transformăm scroll-ul în vânzări.",
  // Aici punem ambele iconițe într-un div flex
  icon: (
    <div className="flex items-center gap-2">
        <FaFacebook size={36} className="text-[#1877F2]" />
        <FaInstagram size={36} className="text-[#E4405F]" />
    </div>
  ),
  benefits: [
    "Targetare laser pe interese și comportamente",
    "Retargeting dinamic pentru recuperarea coșurilor",
    "Creative care opresc scroll-ul (Image & Video)",
    "Scalare predictibilă (ROAS pozitiv)"
  ],
  description: `
    La PandaAds, nu "dăm boost la postări". Construim pâlnii de vânzare (funnels) complexe. 
    Analizăm datele, testăm zeci de variante de reclame și optimizăm bugetul zilnic pentru a obține cel mai mic cost per achiziție.
    Fie că vinzi haine, cosmetice sau servicii, Meta rămâne cel mai puternic motor de conversie din lume dacă este gestionat corect.
  `
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      
      {/* HEADER */}
      <section className="pt-32 pb-20 px-6 bg-gray-50 relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="relative w-full h-full">
                <Image src="/assets/background-waves-fat.png" alt="bg" fill className="object-cover"/>
            </div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-auto inline-block p-4 bg-white rounded-3xl shadow-lg mx-auto mb-8 animate-in zoom-in duration-500">
                {pageConfig.icon}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {pageConfig.title}
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {pageConfig.subtitle}
            </p>
            <Link href="/contact?service=ads" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1">
                Vreau o strategie Meta Ads <ArrowRight size={20}/>
            </Link>
         </div>
      </section>

      {/* CONTENT & BENEFICII */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Stânga: Text Detaliat */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Cum abordăm noi lucrurile?</h2>
                <div className="prose prose-lg text-gray-600 mb-8 whitespace-pre-line">
                    {pageConfig.description}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ce primești în pachet:</h3>
                <ul className="space-y-4">
                    {pageConfig.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={20}/>
                            <span className="font-medium text-gray-700">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Dreapta: Card / Vizual */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">De ce să nu faci asta singur?</h3>
                    <p className="text-gray-600 mb-6">
                        Algoritmul Meta se schimbă săptămânal. Ceea ce funcționa acum 6 luni îți poate arde bugetul azi.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">X</div>
                             <div>
                                <p className="font-bold text-gray-900">Fără Agenție</p>
                                <p className="text-sm text-gray-500">Teste haotice, bani pierduți, blocări de cont.</p>
                             </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">✓</div>
                             <div>
                                <p className="font-bold text-gray-900">Cu PandaAds</p>
                                <p className="text-sm text-gray-500">Structură clară, tracking Pixel corect, scalare.</p>
                             </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-400 mb-4">Gata să treci la nivelul următor?</p>
                        <Link href="/contact?service=ads" className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
                            Programează o discuție gratuită <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}