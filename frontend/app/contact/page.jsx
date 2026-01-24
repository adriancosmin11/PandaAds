'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowRight, Megaphone, Globe, Loader2 } from 'lucide-react';
import { submitContactForm, getSiteContent } from '../actions';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Starea pentru textele editabile
  const [pageData, setPageData] = useState({
      title: 'Contactează-ne',
      subtitle: 'Completează formularul pentru o ofertă personalizată sau o discuție generală.',
      contact_email: 'contact@pandaads.ro',
      contact_phone: '07xx xxx xxx'
  });

  // Încărcăm textele din admin
  useEffect(() => {
    async function loadTexts() {
        const data = await getSiteContent('contact_page');
        if(data) setPageData(prev => ({...prev, ...data}));
    }
    loadTexts();
  }, []);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const finalData = {
      client: formData,
      pachetAds: selectedAds || 'Niciunul (Discuție Generală)',
      pachetWeb: selectedWeb || 'Niciunul (Discuție Generală)'
    };

    try {
      const result = await submitContactForm(finalData);
      if (result.success) {
        alert('✅ Mesajul tău a fost trimis cu succes!');
        setFormData({ nume: '', prenume: '', email: '', telefon: '', firma: '', mesaj: '' });
        setSelectedAds('');
        setSelectedWeb('');
      } else {
        alert('❌ Eroare: ' + result.message);
      }
    } catch (error) {
      alert('A apărut o eroare neașteptată.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="text-center mb-12">
          {/* TITLURI DINAMICE */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{pageData.title}</h1>
          <p className="text-gray-600">{pageData.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">1</span>
                Datele Tale
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nume</label>
                  <input required name="nume" value={formData.nume} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none" placeholder="Popescu" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prenume</label>
                  <input required name="prenume" value={formData.prenume} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none" placeholder="Andrei" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none" placeholder={pageData.contact_email} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <input required name="telefon" value={formData.telefon} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none" placeholder={pageData.contact_phone} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mesaj / Detalii</label>
                  <textarea name="mesaj" value={formData.mesaj} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none" placeholder="Salut! Sunt interesat de o colaborare..."></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
                Interesat de... (Opțional)
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <Megaphone size={18} className="text-blue-600"/> Pachet Ads
                </label>
                <div className="relative">
                    <select value={selectedAds} onChange={(e) => setSelectedAds(e.target.value)} className="w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer bg-gray-50 border-gray-200">
                        <option value="">-- Neselectat --</option>
                        {ADS_PACKAGES.map(pkg => (<option key={pkg.id} value={pkg.id}>{pkg.name} ({pkg.price})</option>))}
                    </select>
                </div>
              </div>

              <div className="mb-8 border-t border-gray-100 pt-6">
                <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <Globe size={18} className="text-emerald-600"/> Pachet Web
                </label>
                <div className="relative">
                    <select value={selectedWeb} onChange={(e) => setSelectedWeb(e.target.value)} className="w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer bg-gray-50 border-gray-200">
                        <option value="">-- Neselectat --</option>
                        {WEB_PACKAGES.map(pkg => (<option key={pkg.id} value={pkg.id}>{pkg.name} ({pkg.price})</option>))}
                    </select>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="animate-spin" size={20}/> Se trimite...</> : <>Trimite Mesajul <ArrowRight size={20}/></>}
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