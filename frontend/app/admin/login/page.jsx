'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../actions'; // Importăm logica din actions.js
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // State-uri pentru funcționalitate
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Funcția de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Apelăm Server Action-ul
      const result = await loginAdmin(formData.email, formData.password, remember);

      if (result.success) {
        router.push('/admin/panel');
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('A apărut o eroare neașteptată.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      
      {/* --- FUNDAL DECORATIV --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* --- CARDUL DE LOGIN --- */}
      <div className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl border border-white w-full max-w-md relative z-10 animate-fade-in-up">
        
        {/* Header cu Logo */}
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4 text-emerald-600 shadow-sm">
                <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Bun venit înapoi!</h1>
            <p className="text-gray-500 mt-2">Introdu datele pentru a accesa panoul de admin.</p>
        </div>
        
        {/* Mesaj de Eroare */}
        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-pulse">
                <span>⚠️</span> {error}
            </div>
        )}

        {/* Formularul */}
        <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Email */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <input 
                        type="email" 
                        placeholder="nume@pandaads.ro" 
                        required 
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-gray-800"
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            {/* Input Parolă */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Parolă</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-gray-800"
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
            </div>
            
            {/* Checkbox Remember Me */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        id="rem" 
                        className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                        checked={remember} 
                        onChange={e => setRemember(e.target.checked)}
                    />
                    <label htmlFor="rem" className="text-sm font-medium text-gray-600 cursor-pointer select-none">Ține-mă minte</label>
                </div>
            </div>

            {/* Buton Submit */}
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={22} /> Verificăm...
                    </>
                ) : (
                    <>
                        Autentificare <ArrowRight size={22} />
                    </>
                )}
            </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-400 font-medium">
            &copy; 2026 PandaAds Agency. Sistem securizat.
        </div>
      </div>
    </div>
  );
}