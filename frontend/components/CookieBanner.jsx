'use client';

import React, { useState, useEffect } from 'react';
import { saveCookieConsent } from '../app/actions';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Verificăm dacă a ales deja
    const hasChoice = localStorage.getItem('cookie_consent');
    if (!hasChoice) {
      // Afișăm bannerul după 1 secundă
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = async (accepted) => {
    // 1. Salvăm local ca să nu mai apară
    localStorage.setItem('cookie_consent', accepted ? 'true' : 'false');
    setShow(false);

    // 2. Salvăm în Baza de Date (GDPR Log)
    await saveCookieConsent(accepted);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900/95 text-white p-6 z-50 backdrop-blur-sm border-t border-gray-700 shadow-2xl animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm md:text-base text-gray-300">
          <p className="font-bold text-white mb-1">🍪 Folosim Cookies</p>
          <p>Acest site folosește cookie-uri pentru a îmbunătăți experiența ta de navigare. Continuând, ești de acord cu utilizarea lor.</p>
        </div>
        
        <div className="flex gap-4 shrink-0">
          <button 
            onClick={() => handleChoice(false)}
            className="px-6 py-2.5 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Refuz
          </button>
          <button 
            onClick={() => handleChoice(true)}
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm font-bold shadow-lg shadow-emerald-900/20"
          >
            Accept Tot
          </button>
        </div>
      </div>
    </div>
  );
}