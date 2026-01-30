"use client"; 

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CaseStudy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const caseStudies = [
    {
      id: 1,
      type: "E-commerce Client",
      roi: "+360%",
      description: "Creștere medie lunară în primele 3 luni",
      testimonial: "Nu credeam că putem scala așa rapid. PandaAds a preluat totul, de la creație la optimizare, iar noi ne-am ocupat doar de livrarea comenzilor. Recomand!",
      author: "Alex Popescu",
      company: "CEO, FashionStore",
      avatar: "👨‍💼",
      chart: [30, 45, 60, 75, 85, 100],
      metric: "ROI"
    },
    {
      id: 2,
      type: "SaaS Startup",
      roi: "+285%",
      description: "Creștere exponențială în user acquisition",
      testimonial: "Am încercat alte agenții, dar PandaAds a înțeles business-ul nostru la nivel mai profund. Campania lor a fost meticulos planificată și executată.",
      author: "Maria Ionescu",
      company: "Founder, CloudSync",
      avatar: "👩‍💼",
      chart: [20, 40, 55, 70, 88, 95],
      metric: "Conversii"
    },
    {
      id: 3,
      type: "Local Service Business",
      roi: "+420%",
      description: "Agenție de reparații care a triplat clientela",
      testimonial: "Rezultatele au depășit orice așteptare. Echipa PandaAds a fost atentă la detalii și mereu disponibilă pentru ajusturi. Investment-ul s-a recuperat în 2 luni!",
      author: "Mihai Dumitrescu",
      company: "Owner, RepairPro",
      avatar: "👨‍🔧",
      chart: [25, 50, 65, 80, 95, 105],
      metric: "Leads"
    },
    {
      id: 4,
      type: "Dropshipping Store",
      roi: "+540%",
      description: "Transform magazin stagnant în multi-canalnic",
      testimonial: "Am fost pe cale să renunț la e-commerce. PandaAds mi-a relansat afacerea prin TikTok Ads și Meta Ads cu strategie UGC. Acum fac 50k€/lună!",
      author: "Cristian Badescu",
      company: "Entrepreneur, DropHub",
      avatar: "📈",
      chart: [15, 35, 55, 75, 95, 120],
      metric: "Revenue"
    },
    {
      id: 5,
      type: "Digital Agency",
      roi: "+195%",
      description: "Agenție care și-a optimizat propriile campanii",
      testimonial: "Lucram cu agenții pentru clienții noștri, dar pentru noi înșine nu aveam timp. PandaAds a venit cu o strategie inteligentă și acum suportul nostru e full booked.",
      author: "Elena Georgescu",
      company: "Director, DigitalWorks",
      avatar: "💼",
      chart: [30, 42, 58, 72, 88, 100],
      metric: "Clienți Noi"
    }
  ];

  const study = caseStudies[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* --- BACKGROUND WAVES (FAT) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/background-waves-fat.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-gray-50"></div>
      </div>

      {/* Content Wrapper cu z-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center md:text-left">
          Rezultate care vorbesc
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Case Study Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            {/* Partea Stângă: Graficul */}
            <div className="p-8 md:p-12 bg-emerald-50/50 flex flex-col justify-center relative border-r border-gray-100">
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

              {/* Grafic CSS Pur */}
              <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 h-56 flex items-end justify-between gap-3 px-6 pb-0 relative z-10">
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
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white/60">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} fill="currentColor" size={20} />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                "{study.testimonial}"
              </blockquote>

              <div className="flex items-center gap-4 border-t pt-6 border-gray-100">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-2xl">
                  {study.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{study.author}</div>
                  <div className="text-sm text-emerald-600 font-semibold">
                    {study.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
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
