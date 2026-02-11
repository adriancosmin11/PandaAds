"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, ShieldCheck, Search, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link"; // Importăm Link

const advantages = [
  {
    id: 1,
    title: "Viteză Instantanee (99/100)",
    description: "Nu folosim template-uri greoaie. Construim pe Next.js, tehnologia folosită de Netflix și TikTok. Site-ul tău se va încărca înainte ca clientul să clipească.",
    icon: <Zap className="w-6 h-6 text-white" />,
    // Parametrul trimis în URL
    queryParam: "Viteză & Performanță" 
  },
  {
    id: 2,
    title: "Google te va iubi (SEO Nativ)",
    description: "Codul nostru este 'Server-Side Rendered'. Asta înseamnă că Google poate citi conținutul perfect, fără obstacole, propulsându-te mai sus în rezultate.",
    icon: <Search className="w-6 h-6 text-white" />,
    queryParam: "SEO & Vizibilitate"
  },
  {
    id: 3,
    title: "Securitate Blindată",
    description: "Fără plugin-uri vulnerabile de WordPress care trebuie actualizate săptămânal. Site-urile noastre sunt statice și imposibil de spart prin metode convenționale.",
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    queryParam: "Securitate Web"
  },
  {
    id: 4,
    title: "Mobile-First Design",
    description: "Nu doar 'responsive'. Gândim interfața prioritar pentru telefon, unde se află 80% din traficul tău. Butoane accesibile, navigație fluidă, experiență de aplicație.",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    queryParam: "Mobile Design"
  },
];

export default function WebAdvantages() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"] 
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            De ce un site <span className="text-emerald-600">Custom Code</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nu vindem teme instalate. Vindem performanță, scalabilitate și conversii. 
            Iată diferența dintre un site de 300€ și tehnologia noastră.
          </p>
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div className="relative pl-8 md:pl-0">
          
          {/* LINIA DE FUNDAL */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 rounded-full"></div>

          {/* LINIA DE PROGRES */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-400 -translate-x-1/2 rounded-full origin-top z-10"
          ></motion.div>

          <div className="space-y-24 relative z-20">
            {advantages.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* TEXT SIDE (ACUM ESTE UN LINK) */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full flex-1"
                >
                  <Link 
                    href={`/contact?service=web&details=${encodeURIComponent(item.queryParam)}`}
                    className="block text-left md:text-center lg:text-left bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                     {/* Hover Effect Background */}
                     <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                     
                     <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors flex items-center gap-2 justify-start md:justify-center lg:justify-start">
                            {item.title}
                            <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500"/>
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                     </div>
                  </Link>
                </motion.div>

                {/* ICON CENTER (DOT) */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center pointer-events-none">
                   <motion.div 
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200 border-4 border-white z-30 relative"
                   >
                      {item.icon}
                   </motion.div>
                </div>

                {/* EMPTY SPACE SIDE */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}