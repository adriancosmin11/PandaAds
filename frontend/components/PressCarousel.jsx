"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- DATE ---
const PRESS_LOGOS = [
  { id: 1, name: "RomaniaTV", src: "/assets/romania-tv.png", width: 150, height: 100 },
  { id: 2, name: "Antena 1", src: "/assets/ANTENA1.png", width: 150, height: 100 },
  { id: 3, name: "ILikeIT", src: "/assets/ILIKEIT.png", width: 150, height: 100 },
  { id: 4, name: "Observator", src: "/assets/OBSERVATOR.png", width: 150, height: 100 },
  { id: 5, name: "TVR1", src: "/assets/TVR1.png", width: 150, height: 100 },
  { id: 6, name: "TotalTV", src: "/assets/TotalTV.png", width: 150, height: 100 },
];

// Multiplicăm lista de 4 ori pentru a fi siguri că acoperă orice ecran (chiar și 4k/Ultrawide)
// Astfel nu va rămâne niciodată spațiu gol.
const REPEATED_LOGOS = [
  ...PRESS_LOGOS, 
  ...PRESS_LOGOS, 
  ...PRESS_LOGOS, 
  ...PRESS_LOGOS
];

export default function PressCarousel() {
  return (
    <section className="py-8 bg-white border-b border-gray-100 overflow-hidden relative">
      
      {/* Titlu mic deasupra */}
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          APARIȚII ÎN PRESĂ & MEDIA
        </p>
      </div>

      {/* Container Mascat */}
      <div className="relative w-full flex overflow-hidden">
        
        {/* Gradients pentru efect de Fade (Stânga/Dreapta) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Banda Animată */}
        <motion.div
          className="flex items-center"
          animate={{
            x: ["0%", "-25%"], // Ne mișcăm doar 25% (adică exact lungimea unei singure liste originale)
          }}
          transition={{
            repeat: Infinity, // Infinit
            ease: "linear",   // Viteză constantă (fără accelerare/frânare)
            duration: 20,     // Durata unei bucle (reglează viteza de aici)
          }}
        >
          {REPEATED_LOGOS.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              style={{ width: logo.width, height: logo.height }}
            >
              {/* Fallback simplu: Dacă nu există imaginea, nu crapă, doar nu afișează nimic */}
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
                sizes="150px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}