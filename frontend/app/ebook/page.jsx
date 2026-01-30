'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { BookOpen, Check, Download, Star } from 'lucide-react';

export default function EbookPage() {
  const [formData, setFormData] = useState({
    nume: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Download Ebook:', formData);
    // Aici ai putea face redirect către PDF sau să afișezi un link
    alert(`Felicitări, ${formData.nume}! Ebook-ul a fost trimis pe emailul ${formData.email}.`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow relative py-8 lg:py-12 overflow-hidden">
        
        {/* --- BACKGROUND WAVES --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Image 
                src="/assets/background-waves.png" 
                alt="Background Pattern" 
                fill
                className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-emerald-50/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: COPY & MOCKUP --- */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
                <BookOpen size={16} /> Ghid Gratuit 2026
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Rețeta Secretă pentru <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                Reclame Virale
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Nu mai irosi bugetul pe teste inutile. Descarcă ghidul nostru și află structura exactă a campaniilor care ne-au generat vânzări de peste 1M € anul trecut.
            </p>

            {/* Ce vei învăța - Listă */}
            <div className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Ce vei descoperi în interior:</h3>
                <ListItem text="Structura ideală a unui cont de TikTok Ads" />
                <ListItem text="3 Tipuri de Creative care convertesc instant" />
                <ListItem text="Cum să scalezi bugetul fără să strici ROAS-ul" />
                <ListItem text="Checklist pentru lansarea campaniilor" />
            </div>
          </div>

          {/* --- RIGHT SIDE: FORMULAR & COVER --- */}
          <div className="order-1 lg:order-2 flex flex-col items-center">
             
             {/* Mockup Ebook (CSS Pure) */}
             <div className="relative w-64 h-80 mb-10 group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-r-2xl rounded-l-md shadow-2xl transform group-hover:rotate-y-12 transition-transform duration-500 border-l-4 border-gray-800 flex flex-col items-center justify-center text-center p-6 z-10">
                    <div className="text-emerald-500 font-bold tracking-widest text-xs mb-4">PANDA ADS</div>
                    <h2 className="text-3xl font-black text-white leading-none mb-2">VIRAL<br/>ADS<br/>2026</h2>
                    <div className="w-12 h-1 bg-emerald-500 rounded-full mt-4"></div>
                </div>
                {/* Pagini spate (efect 3D) */}
                <div className="absolute inset-0 bg-white rounded-r-2xl rounded-l-md shadow-lg transform translate-x-4 translate-y-4 -z-10 border border-gray-200"></div>
                <div className="absolute inset-0 bg-white rounded-r-2xl rounded-l-md shadow-lg transform translate-x-2 translate-y-2 -z-10 border border-gray-200"></div>
             </div>

             {/* Formular Card */}
             <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative">
                 <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                    <Star size={12} fill="currentColor"/> 100% GRATUIT
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Prenume</label>
                        <input 
                            type="text" required placeholder="Ex: Alex"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-gray-50"
                            value={formData.nume}
                            onChange={(e) => setFormData({...formData, nume: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" required placeholder="alex@gmail.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-gray-50"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-1 flex items-center justify-center gap-2 mt-2"
                    >
                        <Download size={20} /> Descarcă Ghidul PDF
                    </button>
                    <p className="text-[10px] text-center text-gray-400">
                        Datele tale sunt în siguranță. Nu trimitem spam.
                    </p>
                 </form>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const ListItem = ({ text }) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 min-w-[20px] h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Check size={12} strokeWidth={3} />
        </div>
        <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
);