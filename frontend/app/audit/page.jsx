'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { Search, BarChart3, Zap, ArrowRight, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { submitAuditForm } from '../actions';

export default function AuditPage() {
  const [formData, setFormData] = useState({
    website: '',
    platforme: [],
    buget: '',
    nume: '',
    email: '',
    telefon: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('Date Audit:', formData);

    try {
      const result = await submitAuditForm(formData);
      
      if (result.success) {
        if (typeof window !== 'undefined' && window.ttq) {
          window.ttq.track('SubmitForm', {
            content_name: 'Formular Audit Gratuit',
          });
        }
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('❌ Eroare: ' + result.message);
      }
    } catch (error) {
       alert('A apărut o eroare neașteptată.');
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Audit Gratuit</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Completează datele de mai jos și află de ce reclamele tale nu convertesc așa cum ți-ai dori.</p>
        </div>

        {isSuccess ? (
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-emerald-100 text-center max-w-3xl mx-auto animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-emerald-600" size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Cerere trimisă!</h2>
                <p className="text-gray-600 text-lg mb-8">
                    Un specialist PandaAds îți va analiza contul și te va contacta în curând.
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => window.location.href = '/'} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-all">
                        Înapoi la Home
                    </button>
                    <button onClick={() => { setIsSuccess(false); setFormData({ website: '', platforme: [], buget: '', nume: '', email: '', telefon: '' }); }} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg transition-all">
                        Trimite altă cerere
                    </button>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Partea Stângă - Formular Date */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">1</span>
                    Datele Tale
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nume Complet</label>
                        <input required name="nume" value={formData.nume} onChange={(e) => setFormData({...formData, nume: e.target.value})} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50 transition-colors" placeholder="Popescu Andrei" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                        <input required name="telefon" value={formData.telefon} onChange={(e) => setFormData({...formData, telefon: e.target.value})} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50 transition-colors" placeholder="07xx xxx xxx" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email de business</label>
                        <input required name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50 transition-colors" placeholder="contact@firma-ta.ro" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website-ul Tău</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                required
                                placeholder="ex: www.siteul-tau.ro" 
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 outline-none bg-gray-50 transition-colors"
                                value={formData.website}
                                onChange={(e) => setFormData({...formData, website: e.target.value})}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Partea Dreaptă - Detalii Audit & Trimitere */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">2</span>
                    Detalii Audit
                </h3>

                <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Unde rulezi reclame acum?</label>
                    <div className="flex flex-wrap gap-2">
                        {['Facebook / Instagram', 'TikTok', 'Google Ads', 'Nu rulez încă'].map((plat) => (
                            <button
                                key={plat}
                                type="button"
                                onClick={() => togglePlatform(plat)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all w-full text-left
                                    ${formData.platforme.includes(plat) 
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.platforme.includes(plat) ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}>
                                        {formData.platforme.includes(plat) && <CheckCircle size={12} className="text-white"/>}
                                    </div>
                                    {plat}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-900 mb-2">Buget Lunar Aproximativ</label>
                    <div className="relative">
                        <select 
                            className="w-full p-4 rounded-xl border appearance-none outline-none cursor-pointer bg-gray-50 border-gray-200 focus:border-emerald-500 transition-colors font-medium text-gray-700"
                            value={formData.buget}
                            onChange={(e) => setFormData({...formData, buget: e.target.value})}
                            required
                        >
                            <option value="">-- Selectează Buget --</option>
                            <option value="<500">Sub 500 €</option>
                            <option value="500-2000">500 € - 2.000 €</option>
                            <option value="2000-5000">2.000 € - 5.000 €</option>
                            <option value="5000+">Peste 5.000 €</option>
                        </select>
                    </div>
                </div>

                <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    {isSubmitting ? <><Loader2 className="animate-spin" size={20}/> Se procesează...</> : <>Solicită Auditul Gratuit <ArrowRight size={20}/></>}
                </button>
                <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                    Prin trimiterea acestui formular ești de acord cu <a href="/termeni" className="underline hover:text-emerald-600">Termenii și Condițiile</a>.
                </p>

                </div>
            </div>
            </div>
        )}

      </div>
      <Footer />
    </div>
  );
}