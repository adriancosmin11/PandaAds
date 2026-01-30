import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
// --- IMPORT LOGO BRAND ---
import { FcGoogle } from "react-icons/fc";

const pageConfig = {
  title: "Fii primul în căutări cu Google Ads",
  subtitle: "Clienții te caută deja. Întrebarea este: te găsesc pe tine sau pe concurență? Captăm cererea existentă și o transformăm în profit.",
  icon: <FcGoogle size={45} />, // Iconita colorata
  benefits: [
    "Captezi clienți cu intenție mare de cumpărare (Search)",
    "Retargeting vizual pe mii de site-uri (Display)",
    "Campanii video pe YouTube pentru Brand Awareness",
    "Maximizare ROAS prin campanii Performance Max"
  ],
  description: `
    Google Ads este despre "intenție". Oamenii intră pe Google ca să găsească o soluție la o problemă. Noi ne asigurăm că afacerea ta este acea soluție.
    
    Nu aruncăm cu banii pe cuvinte cheie generice. Facem research extensiv, folosim "negative keywords" pentru a filtra traficul slab și optimizăm landing page-ul pentru scor de calitate (Quality Score) maxim.
    
    Rezultatul? Costuri mai mici per click și clienți mai calificați.
  `
};

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 bg-gray-50 relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="relative w-full h-full">
                <Image src="/assets/background-waves-fat.png" alt="bg" fill className="object-cover"/>
            </div>
         </div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                {pageConfig.icon}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {pageConfig.title}
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {pageConfig.subtitle}
            </p>
            <Link href="/contact?service=ads" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1">
                Vreau o strategie Google Ads <ArrowRight size={20}/>
            </Link>
         </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-red-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-gray-100">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">De ce să nu faci asta singur?</h3>
                    <p className="text-gray-600 mb-6">
                        Google Ads este complex. O setare greșită la "Match Types" îți poate consuma tot bugetul în 2 ore.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">X</div>
                             <div>
                                <p className="font-bold text-gray-900">Fără Agenție</p>
                                <p className="text-sm text-gray-500">Cuvinte cheie scumpe, trafic "junk", ROI mic.</p>
                             </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                             <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">✓</div>
                             <div>
                                <p className="font-bold text-gray-900">Cu PandaAds</p>
                                <p className="text-sm text-gray-500">Research pro, structură SKAG/STAG, scalare.</p>
                             </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-400 mb-4">Gata să apari pe prima pagină?</p>
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