import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Am adăugat Link pentru butoane


const HeroSection = ({ data }) => {
  // 1. Definim valorile implicite (fallback) în caz că baza de date e goală
  const {
    badge = "Acceptăm proiecte noi pentru 2026",
    titlePrefix = "Creștem afaceri prin",
    titleHighlight = "TikTok & Meta Ads",
    subtitle = "Strategii clare. Creativitate care convertește. Scaling constant. Transformăm scroll-ul în vânzări.",
    btnPrimary = "Vreau o ofertă",
    btnSecondary = "Vezi Portofoliu",
    trust1 = "Audit Gratuit",
    trust2 = "Setup Rapid",
    trust3 = "Raportare 24/7"
  } = data || {};

  return (
    <section className="relative pt-12 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/hero-bg.png" 
          alt="Background Pattern" 
          fill
          className="object-cover opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="space-y-8 text-center lg:text-left relative z-30">
          
          {/* BADGE EDITABIL */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-1.5 rounded-full text-emerald-700 text-sm font-semibold mb-2 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {badge}
          </div>

          {/* TITLU EDITABIL (Compus din 2 părți) */}
          <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            {titlePrefix} <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              {titleHighlight}
            </span>
          </h1>
          
          {/* SUBTITLU EDITABIL */}
          <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
            {subtitle}
          </p>

          {/* BUTOANE EDITABILE */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link href="/contact" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-emerald-200 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
              {btnPrimary}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/>
            </Link>
            <Link href="/#portofoliu" className="bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center">
              {btnSecondary}
            </Link>
          </div>

          {/* TRUST BADGES EDITABILE (Cele 3 bife de jos) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 pt-4 font-medium">
            <span className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-500"/> {trust1}</span>
            <span className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-500"/> {trust2}</span>
            <span className="flex items-center gap-1"><CheckCircle size={16} className="text-emerald-500"/> {trust3}</span>
          </div>
        </div>

        {/* --- RIGHT: PANDA & FLOATING ICONS (Rămân neschimbate vizual) --- */}
        <div className="relative h-[500px] lg:h-[650px] flex items-center justify-center perspective-1000">
            {/* Glow Effect */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-emerald-200 to-teal-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>

            {/* 1. GOOGLE */}
            <SocialTile className="top-[10%] right-[10%] lg:right-[15%] w-20 h-20 bg-white" rotate="rotate-6" delay="0s" zIndex="z-10">
                <svg viewBox="0 0 24 24" className="w-10 h-10"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            </SocialTile>

            {/* 2. TIKTOK */}
            <SocialTile className="top-[40%] right-[5%] lg:right-[5%] w-24 h-24 bg-black" rotate="-rotate-3" delay="1s" zIndex="z-30">
               <svg fill="white" viewBox="0 0 24 24" className="w-12 h-12"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </SocialTile>

            {/* 3. FACEBOOK */}
            <SocialTile className="bottom-[15%] right-[15%] lg:right-[20%] w-28 h-28 bg-[#1877F2]" rotate="rotate-12" delay="1.5s" zIndex="z-30">
                <svg fill="white" viewBox="0 0 24 24" className="w-16 h-16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </SocialTile>

            {/* 4. INSTAGRAM */}
            <SocialTile className="top-[20%] left-[5%] lg:left-[10%] w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" rotate="-rotate-12" delay="0.5s" zIndex="z-10">
                <svg fill="white" viewBox="0 0 24 24" className="w-10 h-10"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </SocialTile>

            {/* MASCOTA */}
            <div className="relative z-20 w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]">
                <Image 
                    src="/assets/panda-hero.png" 
                    alt="Panda Marketing Mascota" 
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

const SocialTile = ({ children, className, rotate, delay, zIndex }) => {
    return (
        <div 
            className={`absolute ${className} ${rotate} ${zIndex} rounded-3xl shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] flex items-center justify-center animate-bounce hover:scale-110 transition-transform duration-300 border border-white/20`}
            style={{ animationDuration: '4s', animationDelay: delay }}
        >
            {children}
        </div>
    )
}

export default HeroSection;