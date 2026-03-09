"use client";

import React, { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";

const Navbar = ({ theme = "light", fixed = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const isDark = theme === "dark";
  const positionClass = fixed ? "fixed" : isDark ? "absolute" : "sticky";
  
  const navClasses = `${positionClass} top-0 w-full z-50 transition-all duration-300 ` + 
    (isDark 
      ? "bg-white/5 backdrop-blur-xl border-b border-white/10" 
      : "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm");
    
  const logoSrc = isDark ? "/assets/logo-v2white.png" : "/assets/logo-v2.png";
  const textColor = isDark ? "text-gray-300" : "text-gray-600";
  const hoverColor = isDark ? "hover:text-white" : "hover:text-emerald-600";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO - MODIFICAT AICI (h-16 w-48) */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link href="/" className="relative h-16 w-48"> 
              <Image
                src={logoSrc}
                alt="PandaAds Logo"
                fill
                className="object-contain object-left"
                sizes="(max-width: 768px) 100vw, 350px"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-8 text-lg font-medium ${textColor}`}>
            <Link href="/" className={`${hoverColor} transition-colors`}>
              Acasă
            </Link>
            <Link href="/#servicii" className={`${hoverColor} transition-colors`}>
              Servicii
            </Link>
            <Link href="/servicii/productie-video" className={`${hoverColor} transition-colors`}>
              Video TikTok
            </Link>
            <Link href="/#studii" className={`${hoverColor} transition-colors`}>
              Studii de caz
            </Link>
            <Link href="/#preturi" className={`${hoverColor} transition-colors`}>
              Prețuri
            </Link>
            <Link href="/blog" className={`${hoverColor} transition-colors`}>
              Blog
            </Link>
            <Link href="/cariere" className={`font-medium ${hoverColor} transition-colors`}>
              Cariere
            </Link>
          </div>

          {/* --- CTA BUTTONS AREA (DESKTOP) --- */}
          <div className="hidden md:flex items-center gap-3">
            {/* Buton EBOOK */}
            <Link href="/ebook">
              <button className={isDark ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 backdrop-blur-md" : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2"}>
                <BookOpen size={16} /> Ebook
              </button>
            </Link>

            {/* Buton AUDIT */}
            <Link 
              href="/audit"
              onClick={() => {
                if (typeof window !== 'undefined' && window.ttq) {
                  window.ttq.track('ClickButton', {
                    content_name: 'Cere audit - Desktop Navbar',
                  });
                }
              }}
            >
              <button className={`bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5 ${isDark ? "shadow-emerald-500/10" : "shadow-emerald-200"}`}>
                Audit Gratuit
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textColor} ${hoverColor}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Acasă
            </Link>
            <Link
              href="/#servicii"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Servicii
            </Link>
            <Link
              href="/servicii/productie-video"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Video TikTok
            </Link>
            <Link
              href="/#studii"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Studii de caz
            </Link>
            <Link
              href="/#preturi"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Prețuri
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Blog
            </Link>
            <Link
              href="/cariere"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md"
            >
              Cariere
            </Link>

            {/* --- MOBILE BUTTONS SECTION --- */}
            <div className="pt-6 pb-2 flex flex-col items-center gap-4">
              <Link href="/ebook" onClick={() => setIsOpen(false)} className="w-[75%]">
                <button className="w-full bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  <BookOpen size={18} /> Descarcă Ebook
                </button>
              </Link>

              <Link 
                href="/audit" 
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== 'undefined' && window.ttq) {
                    window.ttq.track('ClickButton', {
                      content_name: 'Cere audit - Mobile Navbar',
                    });
                  }
                }} 
                className="w-[75%]"
              >
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