'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Edit, LogOut, FileText } from 'lucide-react';
import { logoutAdmin } from '../../actions'; 
import { ThemeProvider } from '../../../components/ThemeProvider';
import ThemeToggle from '../../../components/ThemeToggle';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // --- 2. Funcția care te deloghează ---
  const handleLogout = async () => {
    await logoutAdmin(); 
    // Nu mai e nevoie de router.push, serverul face redirect automat la /admin/login
  };

  // Helper pentru a evidenția butonul activ
  const isActive = (path) => pathname === path 
    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800';

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-300">
        
        {/* --- SIDEBAR (Meniul din Stânga) --- */}
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed h-full flex flex-col z-20 transition-colors duration-300">
          
          {/* Logo */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
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

          </nav>

          {/* Buton Theme Toggle & Logout (Jos) */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            
            <div className="px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
                <span>Temă</span>
                <ThemeToggle />
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left"
            >
              <LogOut size={20} />
              Deconectare
            </button>
          </div>
        </aside>

        {/* --- CONȚINUTUL PRINCIPAL (Dreapta) --- */}
        <main className="flex-1 ml-64 p-8 dark:text-gray-100">
          {children}
        </main>
        
      </div>
    </ThemeProvider>
  );
}