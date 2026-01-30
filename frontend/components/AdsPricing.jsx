import React from "react";
import { Check, AlertCircle, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function AdsPricing({ data }) {
  const {
    title = "Investiție Transparentă",
    subtitle = "Alege pachetul care se potrivește stadiului afacerii tale.",
    price_silver = "300 – 500 €",
    price_gold = "600 – 1.000 €",
    price_platinum = "1.200 – 2.000 €",
  } = data || {};

  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* SILVER */}
          <SilverCard
            name="SILVER"
            price={price_silver}
            desc="Start sigur pentru reclamă online"
            mainDesc="Pachetul Silver este conceput pentru afaceri affiliate la început sau pentru cei care vor prezenta o activitate în reclamă. Țara o strategie complexă."
            includes={[
              "Setare campanii publicitare",
              "Administrare și monitorizare de bază",
              "Optimizări simple (bugete & audiență)",
              "1-2 campanii active",
              "Raport lunar de performanță"
            ]}
          />

          {/* GOLD */}
          <GoldCard
            name="GOLD"
            price={price_gold}
            desc="Alegerea nr. 1 pentru rezultate constante"
            mainDesc="Pachetul Gold oferă cea mai bună valoare pentru magazine online care vor vânzări constante și o strategie eficientă, într-o cu carul la bugetele de promovare."
            includes={[
              "Strategie de promovare personalizată",
              "Creație și optimizare constantă a campaniilor",
              "Testare audiență & creativ",
              "Ajustare bugete pentru rezultate mai bune",
              "Retargeting și strategii avansate",
              "Raport detaliat lunar de performanță"
            ]}
          />

          {/* PLATINUM */}
          <PlatiniumCard
            name="PLATINIUM"
            price={price_platinum}
            desc="Scalare avansata și rezultate maxime"
            mainDesc="Pachetul Platinium este gândit pentru business-uri ambițioase care vor creștere accelerată. Acest pachet exclusiv oferă toate instrumentele necesare pentru o strategie avansată și performanță maximă în reclamă."
            includes={[
              "Strategie completă de scalare",
              "Funnel-uri avansate de vânzare",
              "Retargeting & lookalike audiences intensiv",
              "Optimizare conversii & ROAS",
              "Analiță detaliată și raportare avansată",
              "Support prioritizat și consultanță personală"
            ]}
          />

        </div>

        {/* DETAILS SECTION - Avantajele fiecărui pachet */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center">Detalii despre fiecare pachet</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* SILVER Details */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                SILVER
              </h4>
              
              <div>
                <h5 className="text-sm font-bold text-gray-700 uppercase mb-3">Ce trebuie să știi:</h5>
                <ul className="space-y-2">
                  {[
                    "Reclamele sunt menținute funcționale, dar fără testare avansată",
                    "Optimizări sunt limitate, focus pe stabilitate",
                    "Ideal pentru validare inițială, nu pentru scalare"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <AlertCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                <div className="flex gap-2">
                  <Lightbulb size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Silver este un bun punct de plecare</strong>, însă pentru rezultate vizibile și creștere constantă, majoritatea clienților aleg să treacă rapid la Gold, unde strategie și optimizarea fac diferența reală.
                  </p>
                </div>
              </div>
            </div>

            {/* GOLD Details */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                <span className="w-4 h-4 bg-amber-500 rounded-full"></span>
                GOLD
              </h4>
              
              <div>
                <h5 className="text-sm font-bold text-amber-900 uppercase mb-3">De ce să alegi Gold:</h5>
                <ul className="space-y-2">
                  {[
                    "Cel mai popular pachet, ales de majoritatea clienților noștri",
                    "Strategie activă pe 2 canale (FB + TikTok), nu promitere",
                    "Raportare detaliată pentru decizii informate"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-amber-800">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0 mt-1.5"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-100/50 border border-amber-300 rounded-lg p-3">
                <p className="text-sm text-amber-900">
                  <strong>Cel mai bun raport calitate-preț</strong> pentru magazine online. Ideal pentru cei care doresc să investească inteligent în reclamă și crească profit real.
                </p>
              </div>
            </div>

            {/* PLATINUM Details */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                <span className="w-4 h-4 bg-slate-600 rounded-full"></span>
                <span className="text-gray-900">PLATINIUM</span>
              </h4>
              
              <div>
                <h5 className="text-sm font-bold text-gray-700 uppercase mb-3">Pentru cine este Platinium:</h5>
                <ul className="space-y-2">
                  {[
                    "Business-uri de succes care vor să-și duce afacerile la un alt nivel",
                    "Pentru cei care au nevoie de maximă expertiză și performanță în reclamă"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-slate-600 rounded-full flex-shrink-0 mt-1.5"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-100 border border-slate-300 rounded-lg p-3">
                <p className="text-sm text-gray-800">
                  <strong>Platinium este pentru afaceri care vor cu adevărat să scaleze.</strong> Dacă vrei tot ce e mai bun în reclamă și un focus total pe creștere accelerată, Platinium este alegerea potrivită pentru tine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Silver Card Component
function SilverCard({ name, price, desc, mainDesc, includes }) {
  return (
    <div className="relative rounded-3xl border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden shadow-lg flex flex-col h-full">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-4 text-center">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <h3 className="text-2xl font-black text-white tracking-wider relative z-10" style={{textShadow: "2px 2px 4px rgba(0,0,0,0.3)"}}>
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title & Price */}
        <h4 className="text-lg font-bold text-gray-900 mb-2">{desc}</h4>
        <div className="mb-6">
          <div className="text-2xl font-black text-gray-800 mb-1">{price}</div>
          <p className="text-xs text-gray-500">/ lună + Buget Ads</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-6 pb-6 border-b border-gray-300">
          {mainDesc}
        </p>

        {/* Ce includem */}
        <div className="mb-8 flex-1">
          <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Ce includem:</h5>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <a
          href={`/contact?plan=${name}`}
          className="w-full py-3 rounded-xl font-bold text-center transition-all bg-gray-400 text-white hover:bg-gray-500 shadow-lg"
        >
          Alege {name}
        </a>
      </div>
    </div>
  );
}

// Gold Card Component
function GoldCard({ name, price, desc, mainDesc, includes, reasons, tip }) {
  return (
    <div className="relative rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-50 to-amber-100/50 overflow-hidden shadow-2xl flex flex-col h-full">
      {/* Header Banner with Ribbon */}
      <div className="relative bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-6 text-center">
        <div className="absolute inset-0 opacity-30 bg-pattern"></div>
        <h3 className="text-3xl font-black text-white tracking-wider relative z-10" style={{textShadow: "3px 3px 6px rgba(0,0,0,0.4)"}}>
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title & Price */}
        <h4 className="text-lg font-bold text-amber-900 mb-2">{desc}</h4>
        <div className="mb-6">
          <div className="text-2xl font-black text-amber-800 mb-1">{price}</div>
          <p className="text-xs text-amber-700">/ lună + Buget Ads</p>
        </div>

        {/* Description */}
        <p className="text-sm text-amber-900 mb-6 pb-6 border-b-2 border-amber-300">
          {mainDesc}
        </p>

        {/* Ce includem */}
        <div className="mb-8 flex-1">
          <h5 className="text-sm font-bold text-amber-900 mb-3 uppercase tracking-wider">Ce includem:</h5>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-amber-900">
                <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5 font-bold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <a
          href={`/contact?plan=${name}`}
          className="w-full py-3 rounded-xl font-bold text-center transition-all bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg"
        >
          Alege {name}
        </a>
      </div>
    </div>
  );
}

// Platinium Card Component
function PlatiniumCard({ name, price, desc, mainDesc, includes }) {
  return (
    <div className="relative rounded-3xl border-2 border-slate-600 bg-gradient-to-b from-slate-700 to-slate-800 overflow-hidden shadow-2xl flex flex-col h-full text-white">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 px-6 py-6 text-center border-b-2 border-slate-600">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <h3 className="text-3xl font-black text-slate-200 tracking-wider relative z-10" style={{textShadow: "3px 3px 6px rgba(0,0,0,0.6)"}}>
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title & Price */}
        <h4 className="text-lg font-bold text-slate-100 mb-2">{desc}</h4>
        <div className="mb-6">
          <div className="text-2xl font-black text-slate-200 mb-1">{price}</div>
          <p className="text-xs text-slate-400">/ lună + Buget Ads</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-6 pb-6 border-b-2 border-slate-600">
          {mainDesc}
        </p>

        {/* Ce includem */}
        <div className="mb-8 flex-1">
          <h5 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">Ce includem:</h5>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <Check size={18} className="text-emerald-400 flex-shrink-0 mt-0.5 font-bold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <a
          href={`/contact?plan=${name}`}
          className="w-full py-3 rounded-xl font-bold text-center transition-all bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 shadow-lg border border-slate-500"
        >
          Alege {name}
        </a>
      </div>
    </div>
  );
}

// Sub-componentă mică pentru carduri (Old version - kept for reference)
function PricingCard({ name, price, desc, features, color, popular }) {
  const isGold = color === "gold";
  const isPlatinum = color === "platinum";
  const isSilver = color === "silver";

  let bgClass = "bg-white border-gray-200";
  let btnClass = "bg-gray-100 text-gray-900 hover:bg-gray-200";
  let accentColor = "text-gray-500";
  let checkColor = "text-gray-500";

  if (isSilver) {
    bgClass = "bg-white border-gray-300 shadow-md shadow-gray-100";
    btnClass = "bg-gray-400 text-white hover:bg-gray-500 shadow-lg shadow-gray-300/30";
    accentColor = "text-gray-600";
    checkColor = "text-gray-500";
  }
  if (isGold) {
    bgClass =
      "bg-white border-amber-300 shadow-xl shadow-amber-100 ring-2 ring-amber-400 ring-offset-2";
    btnClass =
      "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-300";
    accentColor = "text-amber-600";
    checkColor = "text-amber-500";
  }
  if (isPlatinum) {
    bgClass = "bg-slate-800 text-white border-slate-600 shadow-xl shadow-slate-400/20";
    btnClass =
      "bg-slate-600 text-white hover:bg-slate-700 shadow-lg shadow-slate-500/30";
    accentColor = "text-slate-300";
    checkColor = "text-slate-400";
  }

  return (
    <div
      className={`relative p-8 rounded-3xl border flex flex-col ${bgClass} transition-transform hover:-translate-y-2 h-full`}
    >
      {popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
          Cel mai ales
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`text-sm font-bold tracking-widest uppercase mb-2 ${isPlatinum ? "text-slate-400" : "text-gray-500"}`}
        >
          {name}
        </h3>
        <div
          className={`text-3xl font-bold mb-1 ${isPlatinum ? "text-white" : "text-gray-900"}`}
        >
          {price}
        </div>
        <p className={`text-sm ${isPlatinum ? "text-slate-500" : "text-gray-400"}`}>
          / lună + Buget Ads
        </p>
      </div>

      <p
        className={`text-sm mb-8 pb-8 border-b ${isPlatinum ? "text-slate-400 border-slate-700" : "text-gray-600 border-gray-100"}`}
      >
        {desc}
      </p>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check
              size={18}
              className={checkColor}
            />
            <span className={isPlatinum ? "text-slate-300" : "text-gray-600"}>
              {feat}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={`/contact?plan=${name}`}
        className={`w-full py-4 rounded-xl font-bold text-center transition-all ${btnClass}`}
      >
        Alege {name}
      </a>
    </div>
  );
}
