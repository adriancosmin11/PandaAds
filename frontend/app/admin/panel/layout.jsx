'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Edit, LogOut, FileText } from 'lucide-react';
import { logoutAdmin } from '../../actions'; // <--- 1. Importăm acțiunea de logout

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // --- 2. Funcția care te deloghează ---
  const handleLogout = async () => {
    await logoutAdmin(); 
    // Nu mai e nevoie de router.push, serverul face redirect automat la /admin/login
  };

  // Helper pentru a evidenția butonul activ
  const isActive = (path) => pathname === path ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50';

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* --- SIDEBAR (Meniul din Stânga) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full flex flex-col z-20">
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            Panda<span className="text-emerald-600">Admin</span>
          </h2>
        </div>

        {/* Meniu Navigare */}
        <nav className="flex-1 p-4 space-y-2">
          
          <Link href="/admin/panel" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/admin/panel')}`}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link href="/admin/panel/editor" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/admin/panel/editor')}`}>
            <Edit size={20} />
            Editor Website
          </Link>

          {/* Poți adăuga linkuri extra aici dacă vrei */}
          {/* <Link href="/admin/panel/ebooks" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/admin/panel/ebooks')}`}>
            <FileText size={20} />
            Ebooks
          </Link> 
          */}
        </nav>

        {/* Buton Logout (Jos) */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all text-left"
          >
            <LogOut size={20} />
            Deconectare
          </button>
        </div>
      </aside>

      {/* --- CONȚINUTUL PRINCIPAL (Dreapta) --- */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
      
    </div>
  );
}