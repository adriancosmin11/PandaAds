"use client";

import React from "react";
import {
  Check,
  X,
  Zap,
  Layout,
  ShoppingCart,
  ArrowRight,
  Server,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WebPricing = () => {
  const plans = [
    {
      id: "start",
      name: "START",
      price: "",
      badge: "Landing Page",
      description: "Ideal pentru campanii Ads și validare rapidă a ideilor.",
      icon: <Zap size={28} className="text-emerald-600" />,
      popular: false,
      features: [
        "Tehnologie Next.js (SPA)",
        "Design Custom (Fără template)",
        "Viteză Google PageSpeed 95+",
        "Secțiune Hero, Servicii, Contact",
        "Formular funcțional + Email",
        "Hosting inclus (Vercel) - 1 an",
      ],
      missing: [
        "CMS (Panou administrare)",
        "Blog / Știri",
        "Funcționalități E-commerce",
      ],
    },
    {
      id: "business",
      name: "BUSINESS",
      price: "",
      badge: "Best Value",
      description:
        "Site complet pentru companii care vor să domine piața locală.",
      icon: <Layout size={28} className="text-emerald-600" />,
      popular: true, // Acesta va fi evidențiat
      features: [
        "Tot ce include pachetul START",
        "5-8 Pagini (Despre, Servicii, etc)",
        "CMS (Panou Admin) pentru texte",
        "Modul de Blog / Noutăți",
        "Integrare Pixel & Analytics Avansat",
        "Animații Premium (Framer Motion)",
        "GDPR & Cookie Consent Setup",
      ],
      missing: ["Magazin Online", "Plăți cu cardul"],
    },
    {
      id: "ecommerce",
      name: "E-COMMERCE",
      price: "",
      badge: "Headless Shop",
      description:
        "Magazin online ultra-rapid. Experiență de cumpărare instantanee.",
      icon: <ShoppingCart size={28} className="text-emerald-600" />,
      popular: false,
      features: [
        "Arhitectură Headless (Shopify/Woo API)",
        "Număr nelimitat de produse",
        "Filtrare produse fără reîncărcare",
        "Integrare Plăți (Stripe/Netopia)",
        "Integrare Curieri (AWB Automat)",
        "Sistem Cont Client & Istoric",
        "Tracking E-commerce (Purchase)",
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
            {" "}
            Plătești pentru performanță sau doar pentru o temă?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            În timp ce competitorii tăi se luptă cu plugin-uri lente și
            securitate precară, tu poți avea un avantaj neloial. Treci de la un
            site care doar "există" la o platformă custom care vinde.
          </p>
        </div>

        {/* Grid Carduri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-emerald-500 shadow-2xl scale-105 z-10"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-emerald-300 hover:shadow-xl"
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
                  <span className="text-4xl font-black text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 font-medium text-sm">
                    / proiect
                  </span>
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
                href={`/contact?service=web&plan=${encodeURIComponent(plan.name)}`}
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

        {/* Secțiune Custom / SaaS */}
        <div className="mt-16 text-center relative z-10">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Server className="text-blue-600" size={24} />
                Proiect Custom / SaaS?
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Ai nevoie de o platformă complexă, dashboard-uri sau o aplicație
                web personalizată?
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 whitespace-nowrap flex items-center gap-2"
            >
              Discută Proiectul <ArrowRight size={18} />
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            *Prețurile nu includ domeniul și mentenanța lunară opțională.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WebPricing;
