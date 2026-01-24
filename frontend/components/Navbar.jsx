'use client';

import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react'; // Importăm BookOpen
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="relative h-12 w-40">
              <Image 
                src="/assets/logo.jpeg" 
                alt="PandaAds Logo" 
                fill 
                className="object-contain object-left" 
                sizes="(max-width: 768px) 100vw, 200px"
                priority 
              />
            </Link>
          </div>

          {/* Desktop Menu - Păstrat text-lg conform cerinței */}
          <div className="hidden md:flex items-center space-x-8 text-lg font-medium text-gray-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Acasă</Link>
            <Link href="#servicii" className="hover:text-emerald-600 transition-colors">Servicii</Link>
            <Link href="#studii" className="hover:text-emerald-600 transition-colors">Studii de caz</Link>
            <Link href="#preturi" className="hover:text-emerald-600 transition-colors">Prețuri</Link>
          </div>

          {/* --- CTA BUTTONS AREA (DESKTOP) --- */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Buton EBOOK (Secundar) */}
            <Link href="/ebook">
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2">
                   <BookOpen size={16}/> Ebook
                </button>
            </Link>

            {/* Buton AUDIT (Principal) */}
            <Link href="/audit">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-emerald-200 hover:-translate-y-0.5">
                Audit Gratuit
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-emerald-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Acasă</Link>
            <Link href="#servicii" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Servicii</Link>
            <Link href="#studii" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Studii de caz</Link>
            <Link href="#preturi" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md">Prețuri</Link>
            
            <div className="pt-4 space-y-3">
              {/* Mobile Ebook */}
              <Link href="/ebook" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                   <BookOpen size={18}/> Descarcă Ebook
                </button>
              </Link>

              {/* Mobile Audit */}
              <Link href="/audit" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-emerald-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200">
                  Cere Audit Gratuit
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;