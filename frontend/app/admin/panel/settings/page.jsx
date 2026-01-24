'use client';

import React from 'react';
import { User, Lock, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto pb-20">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Setări Cont</h1>
        <p className="text-gray-500">Administrează accesul la platforma PandaAdmin.</p>
      </div>

      {/* --- SECȚIUNEA 1: PROFIL ADMIN --- */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
            <User className="text-emerald-600" size={24} /> Profil Administrator
        </h2>
        
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Admin</label>
                <div className="relative">
                    <input 
                        type="email" 
                        disabled
                        value="admin@pandaads.ro"
                        className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed font-medium"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Shield size={12}/> Email-ul principal nu poate fi schimbat din interfață.
                </p>
            </div>
        </div>
      </div>

      {/* --- SECȚIUNEA 2: SECURITATE (SCHIMBARE PAROLĂ) --- */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Lock className="text-emerald-600" size={24} /> Securitate
        </h2>
        
        <form className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Parola Veche</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Parola Nouă</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmă Parola</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                </div>
            </div>

            <div className="pt-4">
                <button type="button" className="bg-gray-900 hover:bg-black text-white px-6 py-4 rounded-xl font-bold w-full transition-all shadow-lg hover:-translate-y-1">
                    Salvează Noua Parolă
                </button>
            </div>
        </form>
      </div>

    </div>
  );
}