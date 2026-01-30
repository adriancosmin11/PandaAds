import React from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CheckCircle, MapPin, Clock, Briefcase, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const metadata = {
  title: 'Cariere | PandaAds',
  description: 'Alătură-te echipei PandaAds. Căutăm experți în digital marketing.',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gray-50">
         {/* Background Waves */}
         <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <Image
                src="/assets/background-waves-fat.png" 
                alt="Waves Pattern"
                fill
                className="object-cover"
            />
         </div>

         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                <Briefcase size={16} /> Angajăm Freelanceri
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
               Vrei să faci performanță alături de <span className="text-emerald-600">PandaAds?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               Căutăm experți pasionați care vor să lucreze remote, pe proiecte challenging de E-commerce & Lead Gen.
            </p>
         </div>
      </section>

      {/* --- JOB LISTING --- */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
            
            {/* JOB CARD - Inspirat din afișul tău */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row hover:shadow-2xl transition-shadow duration-300">
                
                {/* Partea Stângă (Vizual + Titlu) */}
                <div className="lg:w-2/5 bg-emerald-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                    {/* Background Pattern subtil */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-400 to-transparent"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-2">Expert Media Buyer</h3>
                        <p className="text-emerald-200 font-medium mb-6 text-lg">Freelancer / Colaborare</p>
                        
                        <div className="flex gap-3 mb-8">
                            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm"><FcGoogle size={28} /></div>
                            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm"><FaFacebook size={28} className="text-[#1877F2]"/></div>
                            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm"><FaTiktok size={28} className="text-white"/></div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 space-y-4 text-sm font-medium">
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <MapPin className="text-emerald-400" size={20}/>
                            <span>Locație: <strong className="text-white">Remote</strong></span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <Clock className="text-emerald-400" size={20}/>
                            <span>Program: <strong className="text-white">Luni - Vineri (8h)</strong></span>
                        </div>
                    </div>
                </div>

                {/* Partea Dreaptă (Detalii) */}
                <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                        <CheckCircle className="text-emerald-600" size={24}/> Cerințe & Detalii
                    </h4>
                    
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-start gap-3 text-gray-600">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                            <span><strong>Specializare:</strong> E-commerce & Lead Generation.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                            <span><strong>Experiență:</strong> Minim 3 ani în administrarea campaniilor PPC.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                            <span><strong>Platforme:</strong> Expertiză demonstrabilă pe Google Ads, Facebook Ads și TikTok Ads.</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-600">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                            <span><strong>Venituri:</strong> Competitive, calculate pe bază de comision/fee de performanță.</span>
                        </li>
                    </ul>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase mb-1 tracking-wider">Ești interesat?</p>
                            <p className="text-gray-900 font-bold text-lg">Trimite-ne CV-ul tău</p>
                        </div>
                        <a 
                            href="mailto:cariera@pandaads.ro" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 hover:-translate-y-1 transition-all flex items-center gap-3 whitespace-nowrap"
                        >
                            <Mail size={20} />
                            cariera@pandaads.ro
                        </a>
                    </div>
                </div>
            </div>

            {/* Notă subsol */}
            <div className="text-center mt-12">
                <p className="text-gray-400 text-sm">
                    *Doar candidații selectați vor fi contactați pentru interviu.
                </p>
            </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}