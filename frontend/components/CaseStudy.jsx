"use client";

import React, { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Import pentru animații

const CaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = dreapta, -1 = stânga

  // --- LOGICA DE SWIPE (TOUCH) ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Distanța minimă în pixeli pentru a considera swipe

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };
  // ------------------------------

  const caseStudies = [
    {
      id: 1,
      type: "Retail & Pharma",
      roi: "+360%",
      description: "Scalare campanii pentru catalog cu 50k+ produse",
      testimonial: "Volumul de produse la Bebe Tei este imens. Echipa PandaAds a reușit să segmenteze audiențele perfect și să automatizeze reclamele dinamice. ROAS-ul a crescut constant.",
      author: "Alina Diaconu",
      company: "Bebe Tei",
      role: "E-commerce Manager",
      logo: "/assets/bebeteilogo.png", 
      chart: [30, 45, 60, 75, 85, 100],
      metric: "ROAS"
    },
    {
      id: 2,
      type: "Fashion & Premium",
      roi: "+285%",
      description: "Promovare colecții noi și awareness local",
      testimonial: "Aveam nevoie de o abordare premium, aliniată cu standardele globale Massimo Dutti. Au înțeles rapid estetica brandului și au livrat campanii de awareness care au adus trafic relevant.",
      author: "Horia Munteanu",
      company: "Massimo Dutti",
      role: "Regional Marketing Lead",
      logo: "/assets/Logo-MassimoDuti.png",
      chart: [20, 40, 55, 70, 88, 95],
      metric: "Footfall"
    },
    {
      id: 3,
      type: "Multi-brand Fashion",
      roi: "+420%",
      description: "Boost vânzări pe segmentul Gen Z & Millennials",
      testimonial: "Colaborarea cu PandaAds a revitalizat prezența noastră pe TikTok. Au creat conținut care rezonează cu publicul Collective, transformând vizualizările în achiziții reale.",
      author: "Sabina Radu",
      company: "Collective",
      role: "Brand Specialist",
      logo: "/assets/Logo-Collective.png",
      chart: [25, 50, 65, 80, 95, 105],
      metric: "Sales"
    },
    {
      id: 4,
      type: "Food Delivery",
      roi: "+540%",
      description: "Optimizare cost per comandă în orele de vârf",
      testimonial: "În delivery, viteza și timing-ul sunt totul. PandaAds ne-a optimizat campaniile pe intervale orare și zone de livrare. Am redus costul de achiziție per client nou.",
      author: "Victor Stanciu",
      company: "Presto Pizza",
      role: "Administrator",
      logo: "/assets/logo.jpeg",
      chart: [15, 35, 55, 75, 95, 120],
      metric: "Orders"
    },
    {
      id: 5,
      type: "Home & Deco",
      roi: "+195%",
      description: "Lansare colecție sezonieră",
      testimonial: "Am lucrat cu ei pentru o campanie punctuală de Black Friday și am rămas parteneri. Au o structură de raportare foarte clară, nu ne pierdem în detalii tehnice inutile.",
      author: "Diana Cojocaru",
      company: "Mobexpert",
      role: "Digital Marketing Coordinator",
      logo: "/assets/Logo-Mobexpert.png",
      chart: [30, 42, 58, 72, 88, 100],
      metric: "Revenue"
    }
  ];

  const study = caseStudies[currentIndex];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  // Variante pentru animația de slide
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section className="relative py-20 pb-60 overflow-hidden bg-white">
      {/* --- BACKGROUND WAVES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/background-waves-fat.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-gray-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center md:text-left">
          Rezultate care vorbesc
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Zona Animată (Container cu înălțime fixă pentru a evita layout shift) */}
          <div 
             className="relative z-10 min-h-[580px] md:min-h-[400px]"
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 overflow-hidden"
                >
                    
                    {/* Partea Stângă: Grafic */}
                    <div className="p-8 md:p-12 bg-emerald-50/50 flex flex-col justify-center relative border-r border-gray-100 min-h-[300px] md:min-h-auto">
                        <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            {study.type}
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-5xl font-black text-emerald-600">
                            {study.roi}
                            </span>
                            <span className="text-lg font-bold text-gray-700">{study.metric}</span>
                        </div>
                        <p className="text-gray-500 mb-8 text-sm">
                            {study.description}
                        </p>

                        {/* Grafic */}
                        <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 h-48 md:h-56 flex items-end justify-between gap-3 px-6 pb-0 relative z-10">
                            {study.chart.map((height, idx) => (
                            <div
                                key={idx}
                                className="w-full bg-emerald-400 rounded-t-sm relative group"
                                style={{ height: `${height * 1.5}px` }}
                            >
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-0 bg-black text-white text-xs p-1 rounded transition-opacity">
                                M{idx + 1}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* Partea Dreaptă: Testimonial */}
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-white/60 min-h-[250px] md:min-h-auto">
                        <div className="flex gap-1 text-yellow-400 mb-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} fill="currentColor" size={20} />
                            ))}
                        </div>
                        <blockquote className="text-lg md:text-xl font-medium text-gray-800 mb-8 leading-relaxed italic">
                            "{study.testimonial}"
                        </blockquote>

                        <div className="flex items-center gap-4 border-t pt-6 border-gray-100">
                            
                            {/* LOGO CONTAINER */}
                            <div className="relative w-16 h-16 bg-white rounded-full border border-gray-200 shadow-sm overflow-hidden p-2 flex items-center justify-center shrink-0">
                                <Image 
                                    src={study.logo} 
                                    alt={`Logo ${study.company}`}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            
                            <div>
                                <div className="font-bold text-gray-900">{study.author}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                    {study.role}
                                </div>
                                <div className="text-sm text-emerald-600 font-bold">
                                    {study.company}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute z-20 top-[40%] md:top-1/2 -translate-y-1/2 left-2 p-2 md:left-0 md:-translate-x-20 md:p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all shadow-lg active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute z-20 top-[40%] md:top-1/2 -translate-y-1/2 right-2 p-2 md:right-0 md:translate-x-20 md:p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all shadow-lg active:scale-95"
          >
            <ChevronRight size={24} />
          </button>

          {/* Buline */}
          <div className="flex justify-center gap-2 mt-8">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-emerald-600 w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;