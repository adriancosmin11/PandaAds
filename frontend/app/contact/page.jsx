'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CheckCircle, ArrowRight, Package, Globe, Megaphone, MessageSquare } from 'lucide-react';

// Datele pachetelor
const ADS_PACKAGES = [
  { id: 'SILVER', name: 'SILVER Ads', price: '300 – 500 €' },
  { id: 'GOLD', name: 'GOLD Ads', price: '600 – 1.000 €' },
  { id: 'PLATINIUM', name: 'PLATINIUM Ads', price: '1.200 – 2.000 €' },
];

const WEB_PACKAGES = [
  { id: 'Site de Prezentare', name: 'Site de Prezentare', price: '499 €' },
  { id: 'Magazin Online Mic', name: 'Magazin Online Mic', price: '999 €' },
  { id: 'Magazin Online Mediu', name: 'Magazin Online Mediu', price: '1.499 €' },
  { id: 'Magazin Premium', name: 'Magazin Premium', price: '1.999 €' },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    nume: '',
    prenume: '',
    email: '',
    telefon: '',
    firma: '',
    mesaj: ''
  });

  const [selectedAds, setSelectedAds] = useState('');
  const [selectedWeb, setSelectedWeb] = useState('');

  // Pre-selectie din URL
  useEffect(() => {
    const service = searchParams.get('service');
    const plan = searchParams.get('plan');

    if (service === 'ads' && plan) {
      const exists = ADS_PACKAGES.find(p => p.id === plan);
      if (exists) setSelectedAds(plan);
    } else if (service === 'web' && plan) {
      const decodedPlan = decodeURIComponent(plan);
      const exists = WEB_PACKAGES.find(p => p.id === decodedPlan);
      if (exists) setSelectedWeb(decodedPlan);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trimitem datele (chiar daca pachetele sunt 'Niciunul')
    const finalData = {
      client: formData,
      pachetAds: selectedAds || 'Niciunul (Discuție Generală)',
      pachetWeb: selectedWeb || 'Niciunul (Discuție Generală)'
    };

    console.log('Date trimise:', finalData);
    alert('Mesajul tău a fost trimis! Te vom contacta în curând.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contactează-ne</h1>
          <p className="text-gray-600">Completează formularul pentru o ofertă personalizată sau o discuție generală.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- COLOANA STÂNGA: DATE CLIENT --- */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">1</span>
                Datele Tale
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nume</label>
                  <input required name="nume" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="Popescu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prenume</label>
                  <input required name="prenume" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="Andrei" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input required name="email" onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="contact@email.ro" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input required name="telefon" onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="07xx xxx xxx" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numele Firmei (Opțional)</label>
                  <input name="firma" onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="Firma Ta SRL" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mesaj / Detalii</label>
                  <textarea name="mesaj" onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" placeholder="Salut! Sunt interesat de o colaborare..."></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLOANA DREAPTA: SELECȚIE PACHETE (Opțional) --- */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
                Interesat de... (Opțional)
              </h3>

              {/* Rând 1: ADS */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <Megaphone size={18} className="text-blue-600"/> Pachet Ads
                </label>
                <div className="relative">
                    <select 
                        value={selectedAds} 
                        onChange={(e) => setSelectedAds(e.target.value)}
                        className={`w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer transition-all font-medium
                        ${selectedAds ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                    >
                        <option value="">-- Neselectat --</option>
                        {ADS_PACKAGES.map(pkg => (
                            <option key={pkg.id} value={pkg.id}>
                                {pkg.name} ({pkg.price})
                            </option>
                        ))}
                    </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>

              {/* Rând 2: WEB */}
              <div className="mb-8 border-t border-gray-100 pt-6">
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <Globe size={18} className="text-emerald-600"/> Pachet Web
                </label>
                <div className="relative">
                    <select 
                        value={selectedWeb} 
                        onChange={(e) => setSelectedWeb(e.target.value)}
                        className={`w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer transition-all font-medium
                        ${selectedWeb ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                    >
                        <option value="">-- Neselectat --</option>
                        {WEB_PACKAGES.map(pkg => (
                            <option key={pkg.id} value={pkg.id}>
                                {pkg.name} ({pkg.price})
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>

              {/* Rezumat Dinamic */}
              { (selectedAds || selectedWeb) ? (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sumar Selecție</h4>
                    <div className="space-y-1">
                        {selectedAds && <div className="text-sm font-medium text-gray-800 flex justify-between"><span>Ads:</span> <span>{selectedAds}</span></div>}
                        {selectedWeb && <div className="text-sm font-medium text-gray-800 flex justify-between"><span>Web:</span> <span>{selectedWeb}</span></div>}
                    </div>
                  </div>
              ) : (
                  // Mesaj când nu e selectat nimic (General Inquiry)
                  <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg mb-6 border border-blue-100 flex gap-2 items-start">
                      <MessageSquare size={16} className="shrink-0 mt-0.5"/>
                      <span>Nu ai selectat un pachet specific. Vei trimite un <b>mesaj general</b>.</span>
                  </div>
              )}

              {/* Butonul nu mai are DISABLED */}
              <button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Trimite Mesajul <ArrowRight size={20}/>
              </button>
              
            </div>
          </div>

        </form>
      </div>
      
      <Footer />
    </div>
  );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}