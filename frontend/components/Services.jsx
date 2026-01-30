"use client";

import React, { useState, useRef, useEffect } from "react";
import { Monitor, X } from "lucide-react";
import Image from "next/image";

// Importuri pentru logouri
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"; 
import { FcGoogle } from "react-icons/fc"; 

export default function Services({ data }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const contentRefs = useRef({});

  // Recalculare înălțime la expandare
  useEffect(() => {
    if (expandedCard) {
      setTimeout(() => {
        Object.keys(contentRefs.current).forEach(key => {
          const el = contentRefs.current[key];
          if (el) {
            el.style.maxHeight = el.scrollHeight + "px";
          }
        });
      }, 0);
    }
  }, [expandedCard]);

  const {
    badge = "Serviciile Noastre",
    title = "Ce facem noi mai exact?",
    subtitle = "Nu suntem o agenție 360. Facem doar ce ne pricepem cel mai bine.",
    card1_title = "Meta Ads (Facebook & Instagram)",
    card1_desc = "Campanii de conversie, scalare și retargeting avansat.",
    card2_title = "TikTok Ads",
    card2_desc = "Creatives UGC, Spark Ads și strategii virale.",
    card3_title = "Web Development",
    card3_desc = "Magazine online Shopify/WooCommerce și Landing Pages.",
    card4_title = "Google Ads",
    card4_desc = "Campanii de căutare, display și retargeting pe Google Network.",
  } = data || {};

  const services = [
    {
      id: 1,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      title: card1_title,
      desc: card1_desc,
      logos: [
        <FaFacebook key="fb" size={32} className="text-[#1877F2]" />, 
        <FaInstagram key="insta" size={32} className="text-[#E4405F]" />
      ],
      details: [
        "Strategie completă de retargeting pe Facebook și Instagram",
        "Campaign optimization pentru maximizarea ROI",
        "A/B testing avansat de audiențe și creative",
        "Raportare detaliată și consulturi bi-săptămânale",
        "Scalare inteligentă fără Drop în conversii"
      ]
    },
    {
      id: 2,
      bgColor: "bg-gray-100", 
      iconColor: "text-gray-900",
      title: card2_title,
      desc: card2_desc,
      logos: [
        <FaTiktok key="tiktok" size={28} className="text-black" />
      ],
      details: [
        "UGC content creation și testing rapid",
        "Spark Ads și organic TikTok growth strategies",
        "Viral campaign optimization și trend analysis",
        "Integration cu shoppable features și TikTok Shop",
        "Performance tracking și monthly strategy sessions"
      ]
    },
    // --- AM MUTAT GOOGLE ADS AICI (POZIȚIA 3) ---
    {
      id: 3,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      title: card4_title, // Folosim datele de la card4 (Google)
      desc: card4_desc,
      logos: [
        <FcGoogle key="google" size={32} />
      ],
      details: [
        "Google Search campaigns cu keyword research avansat",
        "Display network campaigns cu retargeting inteligent",
        "Remarketing lists și audience building",
        "Conversion tracking și attribution modeling",
        "Monthly performance reviews și optimization recommendations"
      ]
    },
    // --- AM MUTAT WEB DEVELOPMENT AICI (POZIȚIA 4) ---
    {
      id: 4,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: card3_title, // Folosim datele de la card3 (Web Dev)
      desc: card3_desc,
      logos: [
        <Monitor key="monitor" size={32} className="text-emerald-600" />
      ],
      details: [
        "Custom Shopify și WooCommerce store setup",
        "High-converting landing pages design",
        "Mobile-first responsive design",
        "SEO optimization și page speed boost",
        "Ongoing maintenance și improvement support"
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      
      {/* --- BACKGROUND WAVES --- */}
      <div 
        className="absolute left-0 w-full z-0 opacity-100 pointer-events-none"
        style={{
          height: '130vh', 
          top: '-250px' 
        }}
      >
        <Image
            src="/assets/background-waves-fat.png"
            alt="Waves Pattern"
            fill
            className="object-cover object-top"
            priority
        />
      </div> 

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-emerald-600 mb-6 shadow-sm">
            {badge}
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Grid Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((service) => {
              const isExpanded = expandedCard === service.id;

              return (
                <div key={service.id}>
                  {/* Mobile/Tablet */}
                  <div className="md:hidden">
                    <div
                      onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                      ref={(el) => {
                        if (el) contentRefs.current[`mobile-${service.id}`] = el;
                      }}
                      className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all ${
                        isExpanded ? "shadow-xl" : "hover:shadow-xl hover:-translate-y-1"
                      }`}
                      style={{
                        maxHeight: isExpanded ? "2000px" : "400px",
                        transition: "max-height 500ms ease-out, box-shadow 300ms ease-out, transform 300ms ease-out",
                        contain: "layout style paint",
                        willChange: "max-height",
                      }}
                    >
                      <div className="p-8">
                        <div 
                           className="h-20 w-auto min-w-[5rem] px-3 rounded-2xl flex items-center justify-center mb-6 transition-transform gap-3 relative overflow-hidden" 
                        >
                           <div className={`absolute inset-0 opacity-100 ${service.bgColor}`} style={{ zIndex: -1 }}></div>

                          {service.logos.map((LogoComponent, idx) => (
                              <div key={idx} className="flex items-center justify-center w-12 h-12 shrink-0 bg-white rounded-full shadow-sm p-2">
                                {LogoComponent}
                              </div>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {service.desc}
                        </p>
                        
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-gray-200 opacity-100 transition-opacity duration-500">
                            <h4 className="font-bold text-gray-900 mb-3">Ce includem:</h4>
                            <ul className="space-y-3">
                              {service.details.map((detail, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button className={`mt-4 w-full py-2 rounded-lg font-semibold text-sm transition-colors ${service.bgColor} ${service.iconColor}`}>
                          {isExpanded ? "Show less" : "Learn More"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden md:block">
                    <div
                      onClick={() => setExpandedCard(isExpanded ? null : service.id)}
                      ref={(el) => {
                        if (el) contentRefs.current[`desktop-${service.id}`] = el;
                      }}
                      className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer h-full ${
                        isExpanded 
                          ? "md:col-span-2 shadow-2xl" 
                          : "hover:shadow-xl hover:-translate-y-1"
                      }`}
                      style={{
                        transition: "all 500ms ease-out, box-shadow 300ms ease-out, transform 300ms ease-out",
                        maxHeight: isExpanded ? "2000px" : "400px",
                        contain: "layout style paint",
                        willChange: "max-height",
                      }}
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Icon Container */}
                            <div 
                                className={`h-14 w-auto min-w-[3.5rem] px-2 rounded-2xl flex items-center justify-center mb-6 transition-transform gap-3 ${service.bgColor}`}
                            >
                              {service.logos.map((LogoComponent, idx) => (
                                  <div key={idx} className="flex items-center justify-center w-10 h-10 shrink-0 bg-white rounded-full shadow-sm p-1.5">
                                    {LogoComponent}
                                  </div>
                              ))}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {service.desc}
                            </p>
                          </div>
                          
                          {isExpanded && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedCard(null);
                              }}
                              className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                            >
                              <X size={24} className="text-gray-600" />
                            </button>
                          )}
                        </div>

                        {isExpanded && (
                          <div className="mt-8 pt-8 border-t border-gray-200 opacity-100 transition-opacity duration-500">
                            <h4 className="font-bold text-gray-900 mb-4 text-lg">Ce includem:</h4>
                            
                            <ul className="space-y-3">
                              {service.details.map((detail, i) => (
                                <li key={i} className="text-gray-600 flex items-start gap-2">
                                  <span className="text-emerald-600 font-bold mt-0.5 text-lg">✓</span>
                                  <span className="leading-relaxed">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}