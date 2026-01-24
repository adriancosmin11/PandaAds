'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulare Logare
    if (email === 'admin@pandaads.ro' && password === 'admin') {
      router.push('/admin/panel');
    } else {
      alert('Email sau parolă incorectă! (Încearcă: admin@pandaads.ro / admin)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              PANDA<span className="text-emerald-600">ADMIN</span>
            </h1>
            <p className="text-gray-500">Loghează-te pentru a administra site-ul.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  // --- MODIFICARE AICI: am adăugat text-gray-900 ---
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="admin@pandaads.ro"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parolă</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  // --- MODIFICARE AICI: am adăugat text-gray-900 ---
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1"
            >
              Autentificare
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
          Acces securizat • PandaAds Agency
        </div>
      </div>
    </div>
  );
}