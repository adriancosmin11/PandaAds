"use client";

import React from "react";
import { Check, X, Zap, Crown, Star, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdsPricing({ data }) {
  const {
    title = "Investiție Transparentă",
    subtitle = "Alege pachetul care se potrivește stadiului afacerii tale.",
    price_silver = "300 – 500 €",
    price_gold = "600 – 1.000 €",
    price_platinum = "1.200 – 2.000 €",
  } = data || {};

  const plans = [
    {
      id: "silver",
      name: "SILVER",
      price: price_silver,
      badge: "Start Rapid",
      description: "Pentru afaceri la început care vor vizibilitate imediată.",
      icon: <Zap size={28} className="text-emerald-600" />,
      popular: false,
      features: [
        "Setare campanii Facebook & Instagram",
        "1-2 Campanii Active simultan",
        "Monitorizare & Optimizare de bază",
        "Raport lunar de performanță",
        "Consulting Buget Media"
      ],
      missing: [
        "Strategie avansată de scalare",
        "Creație grafică inclusă",
        "Retargeting dinamic",
        "TikTok Ads"
      ],
    },
    {
      id: "gold",
      name: "GOLD",
      price: price_gold,
      badge: "Best Value",
      description: "Pentru magazine care vor vânzări constante și strategie.",
      icon: <Star size={28} className="text-emerald-600" />,
      popular: true, // Acesta va fi evidențiat
      features: [
        "Tot ce include pachetul SILVER",
        "Facebook, Instagram & TikTok Ads",
        "Strategie Retargeting & Lookalike",
        "Testare A/B constantă (Audiențe)",
        "Ajustare bugete în timp real",
        "Raportare detaliată (ROAS Focus)"
      ],
      missing: ["Funnel-uri complexe de vânzare", "Suport prioritar 24/7"],
    },
    {
      id: "platinum",
      name: "PLATINUM",
      price: price_platinum,
      badge: "Scale Up",
      description: "Pentru branduri ambițioase care vor să domine piața.",
      icon: <Crown size={28} className="text-emerald-600" />,
      popular: false,
      features: [
        "Strategie Omnichannel Completă",
        "Funnel-uri avansate de vânzare",
        "Optimizare agresivă pentru scalare",
        "Consultă dedicată săptămânală",
        "Analiză Competitori & Piață",
        "Suport Prioritar & Slack Channel",
        "Audit UX/UI Site inclus"
      ],
      missing: [],
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="oferta">
      {/* --- BACKGROUND WAVES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/background-waves-fat.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-gray-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Secțiune */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Grid Carduri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-emerald-500 shadow-2xl scale-105 z-10"
                  : "bg-white/80 backdrop-blur-sm border border-gray-600 hover:border-emerald-300 hover:shadow-xl"
              }`}
            >
              {/* Badge pentru Popular */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg tracking-wide uppercase">
                  Cel mai vândut
                </div>
              )}

              {/* Header Card */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    {plan.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-black text-gray-900 whitespace-nowrap">
                    {plan.price}
                  </span>
                </div>
                <div className="text-gray-400 text-xs font-medium mb-1">
                   / lună (Manoperă Agenție)
                </div>
                
                <p className="text-gray-500 text-sm mt-4 leading-relaxed h-10">
                  {plan.description}
                </p>
              </div>

              {/* Lista Funcționalități */}
              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <Check
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5"
                      strokeWidth={3}
                    />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}

                {/* Funcționalități lipsă (pentru upsell) */}
                {plan.missing.map((miss, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-400 opacity-70"
                  >
                    <X size={18} className="text-gray-300 shrink-0 mt-0.5" />
                    <span className="leading-snug line-through decoration-gray-300">
                      {miss}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buton CTA */}
              <Link
                href={`/contact?service=ads&plan=${encodeURIComponent(plan.name)}`}
                className={`block text-center w-full py-4 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 hover:-translate-y-1"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600"
                }`}
              >
                Alege {plan.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Secțiune Audit / Custom */}
        <div className="mt-16 text-center relative z-10">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-blue-600" size={24} />
                Vrei un Audit Gratuit?
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Nu ești sigur ce buget să aloci? Lasă-ne să analizăm contul tău actual
                și să-ți propunem o strategie.
              </p>
            </div>
            <Link
              href="/contact?details=Vreau Audit Gratuit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 whitespace-nowrap flex items-center gap-2"
            >
              Cere Audit <ArrowRight size={18} />
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            *Bugetul de media (banii plătiți către Facebook/Google) se achită separat, direct de pe cardul tău.
          </p>
        </div>
      </div>
    </section>
  );
}