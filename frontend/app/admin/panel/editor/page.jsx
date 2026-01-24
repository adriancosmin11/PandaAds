'use client';

import React, { useState, useEffect } from 'react';
import { Save, Layout, Loader2, AlignLeft, DollarSign, Mail, BookOpen } from 'lucide-react';
import { getSiteContent, updateSiteContent } from '../../../actions';

// Lista secțiunilor pe care le putem edita
const SECTIONS = [
  { id: 'hero_section', label: 'Home: Hero (Sus)', icon: Layout },
  { id: 'services_section', label: 'Home: Servicii', icon: AlignLeft },
  { id: 'ads_pricing', label: 'Home: Prețuri Ads', icon: DollarSign },
  { id: 'contact_page', label: 'Pagina: Contact', icon: Mail },
  { id: 'ebook_page', label: 'Pagina: Ebook', icon: BookOpen },
];

export default function EditorPage() {
  const [currentSection, setCurrentSection] = useState('hero_section');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Încărcăm datele de fiecare dată când schimbăm secțiunea din dropdown
  useEffect(() => {
    setLoading(true);
    async function load() {
      const data = await getSiteContent(currentSection);
      setFormData(data || {}); // Dacă nu există date, folosim un obiect gol
      setLoading(false);
    }
    load();
  }, [currentSection]);

  const handleSave = async () => {
    setSaving(true);
    const result = await updateSiteContent(currentSection, formData);
    setSaving(false);
    if (result.success) alert('✅ Salvat cu succes!');
    else alert('❌ Eroare: ' + result.message);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Randarea condițională a câmpurilor în funcție de secțiune
  const renderForm = () => {
    switch (currentSection) {
      case 'hero_section':
        return (
          <div className="space-y-4">
             <Input label="Badge (Text mic sus)" name="badge" val={formData.badge} onChange={handleChange} />
             <div className="grid grid-cols-2 gap-4">
                <Input label="Titlu Prefix" name="titlePrefix" val={formData.titlePrefix} onChange={handleChange} />
                <Input label="Titlu Highlight (Colorat)" name="titleHighlight" val={formData.titleHighlight} onChange={handleChange} />
             </div>
             <TextArea label="Subtitlu" name="subtitle" val={formData.subtitle} onChange={handleChange} />
             <div className="grid grid-cols-2 gap-4">
                <Input label="Buton Principal" name="btnPrimary" val={formData.btnPrimary} onChange={handleChange} />
                <Input label="Buton Secundar" name="btnSecondary" val={formData.btnSecondary} onChange={handleChange} />
             </div>
             <div className="grid grid-cols-3 gap-4">
                <Input label="Beneficiu 1" name="trust1" val={formData.trust1} onChange={handleChange} />
                <Input label="Beneficiu 2" name="trust2" val={formData.trust2} onChange={handleChange} />
                <Input label="Beneficiu 3" name="trust3" val={formData.trust3} onChange={handleChange} />
             </div>
          </div>
        );

      case 'services_section':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="font-bold mb-4 text-emerald-700">Header Secțiune</h4>
                <Input label="Titlu Mic (Badge)" name="badge" val={formData.badge} onChange={handleChange} />
                <Input label="Titlu Mare" name="title" val={formData.title} onChange={handleChange} />
                <TextArea label="Descriere Scurtă" name="subtitle" val={formData.subtitle} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase">Card 1 (Meta Ads)</p>
                    <Input label="Titlu" name="card1_title" val={formData.card1_title} onChange={handleChange} />
                    <TextArea label="Descriere" name="card1_desc" val={formData.card1_desc} onChange={handleChange} />
                </div>
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase">Card 2 (TikTok)</p>
                    <Input label="Titlu" name="card2_title" val={formData.card2_title} onChange={handleChange} />
                    <TextArea label="Descriere" name="card2_desc" val={formData.card2_desc} onChange={handleChange} />
                </div>
                <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-bold text-sm text-gray-500 uppercase">Card 3 (Web)</p>
                    <Input label="Titlu" name="card3_title" val={formData.card3_title} onChange={handleChange} />
                    <TextArea label="Descriere" name="card3_desc" val={formData.card3_desc} onChange={handleChange} />
                </div>
            </div>
          </div>
        );

      case 'ads_pricing':
        return (
            <div className="space-y-4">
                <Input label="Titlu Secțiune" name="title" val={formData.title} onChange={handleChange} />
                <TextArea label="Subtitlu" name="subtitle" val={formData.subtitle} onChange={handleChange} />
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold mb-2 text-blue-800">Prețuri Pachete</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <Input label="Preț Silver" name="price_silver" val={formData.price_silver} onChange={handleChange} />
                        <Input label="Preț Gold" name="price_gold" val={formData.price_gold} onChange={handleChange} />
                        <Input label="Preț Platinum" name="price_platinum" val={formData.price_platinum} onChange={handleChange} />
                    </div>
                </div>
            </div>
        );

      case 'contact_page':
        return (
            <div className="space-y-4">
                <Input label="Titlu Pagină" name="title" val={formData.title} onChange={handleChange} />
                <TextArea label="Text Introductiv" name="subtitle" val={formData.subtitle} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Email Afișat" name="contact_email" val={formData.contact_email} onChange={handleChange} />
                    <Input label="Telefon Afișat" name="contact_phone" val={formData.contact_phone} onChange={handleChange} />
                </div>
            </div>
        );

        case 'ebook_page':
            return (
                <div className="space-y-4">
                    <Input label="Titlu Ebook" name="title" val={formData.title} onChange={handleChange} />
                    <TextArea label="Descriere" name="description" val={formData.description} onChange={handleChange} />
                    <Input label="Text Buton Download" name="btnText" val={formData.btnText} onChange={handleChange} />
                </div>
            );
    
      default:
        return <div>Selectează o secțiune validă.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Editor Conținut</h1>
            <p className="text-gray-500">Alege ce parte a site-ului vrei să modifici.</p>
        </div>
        
        <div className="flex gap-3 items-center">
            <div className="relative">
                <select 
                    value={currentSection}
                    onChange={(e) => setCurrentSection(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block w-64 p-3 pr-8 font-bold cursor-pointer shadow-sm"
                >
                    {SECTIONS.map((sec) => (
                        <option key={sec.id} value={sec.id}>{sec.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">▼</div>
            </div>

            <button 
                onClick={handleSave}
                disabled={saving || loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all active:scale-95 disabled:opacity-50"
            >
                {saving ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />} 
                Salvează
            </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 min-h-[400px]">
        {loading ? (
            <div className="flex justify-center items-center h-40 text-gray-400">
                <Loader2 className="animate-spin mr-2" /> Se încarcă datele...
            </div>
        ) : (
            renderForm()
        )}
      </div>
    </div>
  );
}

// Componente Helper simple pentru a nu repeta codul HTML
const Input = ({ label, name, val, onChange }) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">{label}</label>
        <input 
            type="text" 
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-gray-800"
            value={val || ''}
            onChange={(e) => onChange(name, e.target.value)}
        />
    </div>
);

const TextArea = ({ label, name, val, onChange }) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 ml-1">{label}</label>
        <textarea 
            rows="3"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all font-medium text-gray-800"
            value={val || ''}
            onChange={(e) => onChange(name, e.target.value)}
        />
    </div>
);