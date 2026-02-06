"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // Importăm Link pentru navigare
import { ArrowRight, Monitor } from "lucide-react";

// Importuri logouri
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"; 
import { FcGoogle } from "react-icons/fc"; 

export default function Services({ data }) {
  // Texte configurabile (sau defaulturile noi)
  const {
    badge = "Serviciile Noastre",
    title = "Tot ce ai nevoie sub un singur acoperiș",
    subtitle = "De la prima linie de cod a site-ului până la ultima vânzare generată din reclame. O singură echipă, o singură direcție: performanță.",
  } = data || {};

  const services = [
    {
      id: 1,
      slug: "meta-ads", // URL-ul paginii
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Meta Ads (Facebook & Instagram)",
      desc: "Campanii de conversie, scalare și retargeting avansat.",
      logos: [
        <FaFacebook key="fb" size={32} className="text-[#1877F2]" />, 
        <FaInstagram key="insta" size={32} className="text-[#E4405F]" />
      ]
    },
    {
      id: 2,
      slug: "tiktok-ads",
      bgColor: "bg-gray-100", 
      iconColor: "text-gray-900",
      title: "TikTok Ads",
      desc: "Creatives UGC, Spark Ads și strategii virale.",
      logos: [
        <FaTiktok key="tiktok" size={28} className="text-black" />
      ]
    },
    {
      id: 3,
      slug: "google-ads",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      title: "Google Ads",
      desc: "Campanii de căutare (Search), Display și YouTube.",
      logos: [
        <FcGoogle key="google" size={32} />
      ]
    },
    {
      id: 4,
      slug: "web-development",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Web Development",
      desc: "Magazine online Shopify/WooCommerce și Landing Pages.",
      logos: [
        <Monitor key="monitor" size={32} className="text-emerald-600" />
      ]
    }
  ];

  return (
    <section className="relative py-12 bg-gray-50 overflow-hidden">
      
      {/* --- BACKGROUND WAVES --- */}
      <div 
        className="absolute left-0 w-full z-0 opacity-100 pointer-events-none"
        style={{ height: '130vh', top: '-250px' }}
      >
        <Image
            src="/assets/background-waves-fat.png"
            alt="Waves Pattern"
            fill
            className="object-cover object-top"
            priority
        />
      </div> 

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-emerald-600 mb-6 shadow-sm">
            {badge}
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link 
                key={service.id} 
                href={`/servicii/${service.slug}`} // Link dinamic către pagina dedicată
                className="group block h-full"
              >
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
                  
                  {/* Icons */}
                  <div className={`h-20 w-auto min-w-[5rem] px-3 rounded-2xl flex items-center justify-center mb-6 gap-3 relative overflow-hidden transition-transform group-hover:scale-105`}>
                      <div className={`absolute inset-0 opacity-100 ${service.bgColor}`} style={{ zIndex: -1 }}></div>
                      {service.logos.map((LogoComponent, idx) => (
                          <div key={idx} className="flex items-center justify-center w-12 h-12 shrink-0 bg-white rounded-full shadow-sm p-2">
                            {LogoComponent}
                          </div>
                      ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {service.desc}
                  </p>

                  <div className="flex items-center text-sm font-bold text-emerald-600 mt-auto">
                    Vezi detalii <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                  </div>
                </div>
              </Link>
            ))}
        </div>

      </div>
    </section>
  );
}