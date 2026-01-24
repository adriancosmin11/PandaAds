'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Importăm useRouter
import { LayoutDashboard, FileText, LogOut, Settings } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter(); // Hook pentru redirect

  // --- ACTUALIZARE CĂI (PATHS) ---
  const menuItems = [
    { name: 'Insights & Leads', icon: <LayoutDashboard size={20} />, path: '/admin/panel' },
    { name: 'Editor Website', icon: <FileText size={20} />, path: '/admin/panel/editor' },
    { name: 'Setări Cont', icon: <Settings size={20} />, path: '/admin/panel/settings' },
  ];

  const handleLogout = () => {
      // Ștergem sesiunea (simulat) și trimitem la login
      router.push('/admin/login');
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      
      {/* SIDEBAR STÂNGA */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center justify-center border-b border-gray-800">
            <span className="text-xl font-bold tracking-wider">
                PANDA<span className="text-emerald-500">ADMIN</span>
            </span>
        </div>

        <nav className="flex-grow p-4 space-y-2">
            {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        href={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            isActive 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                    </Link>
                );
            })}
        </nav>

        <div className="p-4 border-t border-gray-800">
            {/* Buton Logout cu funcție */}
            <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 hover:text-red-300 w-full rounded-xl transition-all"
            >
                <LogOut size={20} />
                <span>Deconectare</span>
            </button>
        </div>
      </aside>

      {/* ZONA DE CONȚINUT */}
      <main className="flex-grow overflow-y-auto p-8 relative">
        {children}
      </main>

    </div>
  );
}