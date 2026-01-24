'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { Search, BarChart3, Zap, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AuditPage() {
  const [formData, setFormData] = useState({
    website: '',
    platforme: [],
    buget: '',
    nume: '',
    email: '',
    telefon: ''
  });

  const togglePlatform = (platform) => {
    setFormData(prev => {
      const exists = prev.platforme.includes(platform);
      return {
        ...prev,
        platforme: exists 
          ? prev.platforme.filter(p => p !== platform) 
          : [...prev.platforme, platform]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Date Audit:', formData);
    alert('Cererea de audit a fost trimisă! Un specialist PandaAds te va contacta în 24h.');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow relative pt-10 pb-20">
        
        {/* --- BACKGROUND WAVES --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Image 
                src="/assets/background-waves.png" 
                alt="Background Pattern" 
                fill
                className="object-cover opacity-20"
            />
             {/* Gradient Overlay pentru lizibilitate */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-emerald-50/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: SALES COPY --- */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold animate-pulse">
                <Zap size={16} fill="currentColor" /> Audit Gratuit & Fără Obligații
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Află de ce reclamele tale <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                nu convertesc
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Majoritatea conturilor de ads pierd 30-40% din buget din cauza setărilor greșite. Experții noștri vor analiza manual contul tău și îți vor spune exact unde greșești.
            </p>

            {/* Beneficii List */}
            <div className="space-y-4 pt-4">
                <BenefitItem 
                    icon={<Search className="text-blue-500" />}
                    title="Analiză Setup Tehnic"
                    desc="Verificăm Pixel-ul, API-ul de conversii și structura campaniilor."
                />
                <BenefitItem 
                    icon={<BarChart3 className="text-purple-500" />}
                    title="Verificare Creatives & Copy"
                    desc="Îți spunem dacă vizualurile tale opresc scroll-ul sau sunt ignorate."
                />
                <BenefitItem 
                    icon={<AlertTriangle className="text-orange-500" />}
                    title="Identificare Pierderi Buget"
                    desc="Găsim audiențele și plasamentele care îți consumă banii degeaba."
                />
            </div>

            {/* Social Proof mic */}
            <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                </div>
                <div className="text-sm font-medium text-gray-500">
                    Peste <span className="font-bold text-gray-900">50+ Audituri</span> realizate luna aceasta.
                </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: FORMULARUL --- */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative">
             {/* Decorative element */}
             <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

             <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Vreau analiza gratuită
             </h3>

             <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 1. Website URL */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Website-ul Tău</label>
                    <div className="relative">
                        <input 
                            type="url" 
                            required
                            placeholder="https://www.siteul-tau.ro" 
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-gray-50/50"
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                {/* 2. Platforme (Multi-select) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Unde rulezi reclame acum?</label>
                    <div className="flex flex-wrap gap-2">
                        {['Facebook / Instagram', 'TikTok', 'Google Ads', 'Nu rulez încă'].map((plat) => (
                            <button
                                key={plat}
                                type="button"
                                onClick={() => togglePlatform(plat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all
                                    ${formData.platforme.includes(plat) 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                            >
                                {plat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Buget Lunar */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Buget Lunar Aproximativ</label>
                    <select 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white cursor-pointer"
                        value={formData.buget}
                        onChange={(e) => setFormData({...formData, buget: e.target.value})}
                        required
                    >
                        <option value="">Alege o opțiune...</option>
                        <option value="<500">Sub 500 €</option>
                        <option value="500-2000">500 € - 2.000 €</option>
                        <option value="2000-5000">2.000 € - 5.000 €</option>
                        <option value="5000+">Peste 5.000 €</option>
                    </select>
                </div>

                {/* 4. Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="text" required placeholder="Nume Prenume"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        value={formData.nume}
                        onChange={(e) => setFormData({...formData, nume: e.target.value})}
                    />
                    <input 
                        type="tel" required placeholder="Telefon"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        value={formData.telefon}
                        onChange={(e) => setFormData({...formData, telefon: e.target.value})}
                    />
                </div>
                <input 
                    type="email" required placeholder="Email de business"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg mt-4"
                >
                    Solicită Auditul Gratuit <ArrowRight size={20}/>
                </button>
                <p className="text-xs text-center text-gray-400 mt-2">
                    Nu cerem acces în conturi în această etapă. Doar analiză externă.
                </p>
             </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

// Sub-componentă pentru listă beneficii
const BenefitItem = ({ icon, title, desc }) => (
    <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
        <div className="mt-1 p-2 bg-white rounded-lg shadow-sm h-fit">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 leading-snug">{desc}</p>
        </div>
    </div>
);