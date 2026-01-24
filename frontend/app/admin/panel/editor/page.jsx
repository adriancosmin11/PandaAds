'use client';

import React, { useState } from 'react';
import { Save, Image as ImageIcon, Type, Layout } from 'lucide-react';

export default function EditorPage() {
  // State simulat
  const [heroData, setHeroData] = useState({
    title: 'Creștem afaceri prin TikTok & Meta Ads',
    subtitle: 'Strategii clare. Creativitate care convertește. Scaling constant.',
    buttonText: 'Vreau o ofertă'
  });

  const handleSave = () => {
    alert('Modificările au fost salvate! (Simulare)');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Editor Conținut</h1>
            <p className="text-gray-500">Modifică textele de pe site în timp real.</p>
        </div>
        <button 
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-transform active:scale-95"
        >
            <Save size={20} /> Salvează
        </button>
      </div>

      {/* --- HERO SECTION EDIT --- */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Layout className="text-blue-500" /> Prima Pagină (Hero)
        </h2>

        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titlu Principal (H1)</label>
                <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 outline-none transition-all"
                    value={heroData.title}
                    onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitlu</label>
                <textarea 
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 outline-none transition-all"
                    value={heroData.subtitle}
                    onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                />
            </div>

            <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Text Buton</label>
                 <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 outline-none transition-all"
                    value={heroData.buttonText}
                    onChange={(e) => setHeroData({...heroData, buttonText: e.target.value})}
                />
            </div>
        </div>
      </div>

      {/* --- PREȚURI SECTION EDIT (Placeholder) --- */}
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 border-dashed text-center">
          <p className="text-gray-500">Mai multe secțiuni vor apărea aici după conectarea bazei de date.</p>
      </div>

    </div>
  );
}