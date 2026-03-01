"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// --- DATE ---
const CLIENT_LOGOS = [
  { id: 1, name: "Anna Cori", src: "/assets/companii/anna-cori.png", width: 150, height: 100 },
  { id: 2, name: "Aridon", src: "/assets/companii/aridon.png", width: 150, height: 100 },
  { id: 3, name: "Auchan", src: "/assets/companii/auchan.png", width: 150, height: 100 },
  { id: 4, name: "Baby Boom", src: "/assets/companii/baby-boom.png", width: 150, height: 100 },
  { id: 5, name: "Beauty Factory", src: "/assets/companii/beauty-factory.png", width: 150, height: 100 },
  { id: 6, name: "Bebe Tei", src: "/assets/companii/bebe-tei.png", width: 150, height: 100 },
  { id: 7, name: "Bosch", src: "/assets/companii/bosch.png", width: 150, height: 100 },
  { id: 8, name: "Carpisa", src: "/assets/companii/carpisa.png", width: 150, height: 100 },
  { id: 9, name: "Citron", src: "/assets/companii/citron.png", width: 150, height: 100 },
  { id: 10, name: "Clocking", src: "/assets/companii/clocking.png", width: 150, height: 100 },
  { id: 11, name: "Crocs", src: "/assets/companii/crocs.png", width: 150, height: 100 },
  { id: 12, name: "Cronograf", src: "/assets/companii/cronograf.png", width: 150, height: 100 },
  { id: 13, name: "Ds Damat", src: "/assets/companii/ds-damat.png", width: 150, height: 100 },
  { id: 14, name: "Dyson", src: "/assets/companii/dyson.png", width: 150, height: 100 },
  { id: 15, name: "Expert Contabil", src: "/assets/companii/expert-contabil.png", width: 150, height: 100 },
  { id: 16, name: "Expert Control", src: "/assets/companii/expert-control.png", width: 150, height: 100 },
  { id: 17, name: "Fortis", src: "/assets/companii/fortis.png", width: 150, height: 100 },
  { id: 18, name: "Fotomax", src: "/assets/companii/fotomax.png", width: 150, height: 100 },
  { id: 19, name: "Herb", src: "/assets/companii/herb.png", width: 150, height: 100 },
  { id: 20, name: "Hippo Land", src: "/assets/companii/hippo-land.png", width: 150, height: 100 },
  { id: 21, name: "Il Passo", src: "/assets/companii/il-passo.png", width: 150, height: 100 },
  { id: 22, name: "Imprinto", src: "/assets/companii/imprinto.png", width: 150, height: 100 },
  { id: 23, name: "Intimissimi", src: "/assets/companii/intimissimi.png", width: 150, height: 100 },
  { id: 24, name: "Irina Schrotter", src: "/assets/companii/irina-schrotter.png", width: 150, height: 100 },
  { id: 25, name: "Ispace", src: "/assets/companii/ispace.png", width: 150, height: 100 },
  { id: 26, name: "La Doi Pasi", src: "/assets/companii/la-doi-pasi.png", width: 150, height: 100 },
  { id: 27, name: "Lealea Brand", src: "/assets/companii/lealea-brand.png", width: 150, height: 100 },
  { id: 28, name: "Lulu", src: "/assets/companii/lulu.png", width: 150, height: 100 },
  { id: 29, name: "Mariuca", src: "/assets/companii/mariuca.png", width: 150, height: 100 },
  { id: 30, name: "Massimo Dutti", src: "/assets/companii/massimo-dutti.png", width: 150, height: 100 },
  { id: 31, name: "Millo Mania", src: "/assets/companii/millo-mania.png", width: 150, height: 100 },
  { id: 32, name: "Nero", src: "/assets/companii/nero.png", width: 150, height: 100 },
  { id: 33, name: "Nissa", src: "/assets/companii/nissa.png", width: 150, height: 100 },
  { id: 34, name: "Office Shoes", src: "/assets/companii/office-shoes.png", width: 150, height: 100 },
  { id: 35, name: "Papionette", src: "/assets/companii/papionette.png", width: 150, height: 100 },
  { id: 36, name: "Plafaria", src: "/assets/companii/plafaria.png", width: 150, height: 100 },
  { id: 37, name: "Probeauty", src: "/assets/companii/probeauty.png", width: 150, height: 100 },
  { id: 38, name: "Raiffaisen Bank", src: "/assets/companii/raiffaisen-bank.png", width: 150, height: 100 },
  { id: 39, name: "Sokolov", src: "/assets/companii/sokolov.png", width: 150, height: 100 },
  { id: 40, name: "Splendor", src: "/assets/companii/splendor.png", width: 150, height: 100 },
  { id: 41, name: "Synlab", src: "/assets/companii/synlab.png", width: 150, height: 100 },
  { id: 42, name: "Top Shop", src: "/assets/companii/top-shop.png", width: 150, height: 100 },
  { id: 43, name: "Videt", src: "/assets/companii/videt.png", width: 150, height: 100 },
  { id: 44, name: "Wu", src: "/assets/companii/wu.png", width: 150, height: 100 }
];

// Multiplicăm lista de 4 ori pentru a fi siguri că acoperă orice ecran
const REPEATED_LOGOS = [
  ...CLIENT_LOGOS, 
  ...CLIENT_LOGOS, 
  ...CLIENT_LOGOS, 
  ...CLIENT_LOGOS
];

export default function LogoCarousel() {
  return (
    <section className="py-8 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="relative w-full flex overflow-hidden">
        {/* Gradients pentru efect de Fade (Stânga/Dreapta) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Banda Animată */}
        <motion.div
          className="flex items-center"
          animate={{
            x: ["0%", "-25%"], // Ne mișcăm doar 25% (adică exact lungimea unei singure liste originale)
          }}
          transition={{
            repeat: Infinity, // Infinit
            ease: "linear",   // Viteză constantă (fără accelerare/frânare)
            duration: 147,    // Durata unei bucle (reglează viteza de aici)
          }}
        >
          {REPEATED_LOGOS.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              style={{ width: logo.width, height: logo.height }}
            >
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
