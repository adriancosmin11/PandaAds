'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { User, ArrowRight } from 'lucide-react';

// Date Demo (înlocuiești tu textele aici când ai articole reale)
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'cum-sa-scalezi-tiktok-ads',
    title: 'Cum să scalezi campaniile de TikTok Ads în 2026',
    excerpt: 'Algoritmul TikTok s-a schimbat. Află care sunt noile strategii de bidding și cum să folosești Spark Ads pentru a dubla ROAS-ul.',
    category: 'TikTok Ads',
    image: '/assets/hero-bg.png', // Folosim o imagine existentă temporar
    author: 'Alex Panda',
    date: 'Jan 24, 2026',
    readTime: '5 min'
  },
  {
    id: 2,
    slug: 'meta-ads-vs-google-ads',
    title: 'Meta Ads vs Google Ads: Ce alegi pentru eCommerce?',
    excerpt: 'Analizăm costurile per conversie (CPA) și intenția de cumpărare pentru a determina mixul perfect pentru magazinul tău online.',
    category: 'Strategie',
    image: '/assets/hero-bg.png', 
    author: 'Diana Marketing',
    date: 'Jan 20, 2026',
    readTime: '7 min'
  },
  {
    id: 3,
    slug: 'ugc-content-creator',
    title: 'De ce UGC (User Generated Content) bate reclamele clasice',
    excerpt: 'Oamenii nu mai cumpără de la branduri, cumpără de la oameni. Cum să creezi conținut care pare organic dar vinde agresiv.',
    category: 'Content',
    image: '/assets/hero-bg.png', 
    author: 'Echipa Creativă',
    date: 'Jan 15, 2026',
    readTime: '4 min'
  },
  {
    id: 4,
    slug: 'setup-pixel-facebook',
    title: 'Ghid Complet: Setup Facebook Pixel & CAPI',
    excerpt: 'Fără tracking corect, arunci banii pe fereastră. Învață să configurezi Conversions API pentru a trece de limitările iOS 14+.',
    category: 'Tehnic',
    image: '/assets/hero-bg.png', 
    author: 'Dev Team',
    date: 'Jan 10, 2026',
    readTime: '10 min'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow relative py-20 lg:py-28">
        
        {/* --- BACKGROUND WAVES (Ca pe restul site-ului) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Image 
                src="/assets/background-waves.png" 
                alt="Background Pattern" 
                fill
                className="object-cover opacity-30"
            />
             <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          
          {/* Header Simplu */}
          <div className="mb-20 border-b border-gray-100 pb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  Blog & Resurse
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                  Ultimele noutăți din marketing digital, strategii de creștere și update-uri despre platformele de ads.
              </p>
          </div>

          {/* GRID LAYOUT (Structura cerută) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {BLOG_POSTS.map((post) => (
                  <article key={post.id} className="group cursor-pointer flex flex-col h-full bg-transparent">
                      
                      {/* 1. Imagine Mare Sus (Aspect Ratio fix) */}
                      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl mb-6 relative aspect-[16/10] w-full shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                          <Image 
                              src={post.image} 
                              alt={post.title}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                      </Link>

                      {/* 2. Conținut */}
                      <div className="flex flex-col flex-grow">
                          {/* Categorie (Verde) */}
                          <div className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-3">
                              {post.category}
                          </div>

                          {/* Titlu */}
                          <Link href={`/blog/${post.slug}`}>
                              <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
                                  {post.title}
                              </h2>
                          </Link>

                          {/* Descriere Scurtă */}
                          <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                              {post.excerpt}
                          </p>

                          {/* Meta Autor & Dată */}
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                                  <User size={18} />
                              </div>
                              <div className="flex flex-col">
                                  <span className="text-gray-900 font-semibold text-sm">{post.author}</span>
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                      <span>{post.date}</span>
                                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                      <span>{post.readTime} read</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </article>
              ))}
          </div>

          {/* Buton Load More */}
          <div className="mt-24 flex justify-center">
              <button className="group px-8 py-3 rounded-full bg-gray-50 border border-gray-200 text-gray-900 font-bold hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all flex items-center gap-2">
                  Vezi mai multe articole <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}