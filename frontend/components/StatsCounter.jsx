"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

// --- LOGICA DE NUMĂRARE ---
const Counter = ({ end, duration = 2500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Easing function: easeOutExpo pentru un final lin
      const percentage = Math.min(progress / duration, 1);
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeOut * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- COMPONENTA PRINCIPALĂ ---
export default function StatsCounter() {
  const stats = [
    {
      id: 1,
      value: 388,
      label: "CLIENȚI FERICIȚI",
      suffix: "+",
      // Gradient Albastru-Cyan
      gradient: "from-cyan-500 to-blue-500",
      shadow: "shadow-cyan-100"
    },
    {
      id: 2,
      value: 167,
      label: "PROIECTE FINALIZATE",
      suffix: "+",
      // Gradient Albastru-Indigo
      gradient: "from-blue-500 to-indigo-600",
      shadow: "shadow-blue-100"
    },
    {
      id: 3,
      value: 28,
      label: "MILIOANE € GENERATI",
      suffix: "+",
      // Gradient specific PandaAds (Verde/Emerald)
      gradient: "from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald-100"
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gray-50">
      
      {/* --- BACKGROUND WAVES (Integrare vizuală) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Image
          src="/assets/background-waves-fat.png"
          alt="Background Pattern"
          fill
          className="object-cover"
        />
        {/* Gradient overlay pentru a estompa marginile */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-gray-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className={`
                bg-white rounded-3xl p-10 text-center 
                border border-gray-100 shadow-xl ${stat.shadow}
                transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                flex flex-col items-center justify-center
              `}
            >
              {/* Numărul cu Gradient Text */}
              <div className={`text-6xl lg:text-7xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}>
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              
              {/* Linia decorativă */}
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mb-4"></div>

              {/* Eticheta */}
              <p className="text-gray-500 font-bold tracking-widest text-sm lg:text-base uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}