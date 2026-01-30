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
            mainDesc="Pachetul Silver este conceput pentru afaceri la început sau pentru cei care vor prezență și activitate în reclamă fără o strategie complexă."
            includes={[
              "Setare campanii publicitare",
              "Administrare și monitorizare de bază",
              "Optimizări simple (bugete & audiență)",
              "1-2 campanii active",
              "Raport lunar de performanță",
            ]}
          />

          {/* GOLD */}
          <GoldCard
            name="GOLD"
            price={price_gold}
            desc="Alegerea nr. 1 pentru rezultate constante"
            mainDesc="Pachetul Gold oferă cea mai bună valoare pentru magazine online care vor vânzări constante și o strategie eficientă, raportată la bugetele de promovare."
            includes={[
              "Strategie de promovare personalizată",
              "Creație și optimizare constantă a campaniilor",
              "Testare audiență & creativ",
              "Ajustare bugete pentru rezultate mai bune",
              "Retargeting și strategii avansate",
              "Raport detaliat lunar de performanță",
            ]}
          />

          {/* PLATINUM */}
          <PlatiniumCard
            name="PLATINIUM"
            price={price_platinum}
            desc="Scalare avansata și rezultate maxime"
            mainDesc="Pachetul Platinium este gândit pentru business-uri ambițioase care vor creștere accelerată. Acest pachet exclusiv oferă toate instrumentele necesare pentru o strategie avansată și performanță maximă."
            includes={[
              "Strategie completă de scalare",
              "Funnel-uri avansate de vânzare",
              "Retargeting & lookalike audiences intensiv",
              "Optimizare conversii & ROAS",
              "Analiță detaliată și raportare avansată",
              "Support prioritizat și consultanță personală",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// --- AM ACTUALIZAT LINK-URILE ÎN CARDURI MAI JOS ---

// Silver Card Component
function SilverCard({ name, price, desc, mainDesc, includes }) {
  return (
    <div className="relative rounded-3xl border border-gray-400 bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden shadow-lg flex flex-col h-full">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-4 text-center">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <h3
          className="text-2xl font-black text-white tracking-wider relative z-10"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        >
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{desc}</h4>
        <div className="mb-6">
          <div className="text-2xl font-black text-gray-800 mb-1">{price}</div>
          <p className="text-xs text-gray-500">/ lună + Buget Ads</p>
        </div>

        <p className="text-sm text-gray-700 mb-6 pb-6 border-b border-gray-300">
          {mainDesc}
        </p>

        <div className="mb-8 flex-1">
          <h5 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
            Ce includem:
          </h5>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-700"
              >
                <Check
                  size={18}
                  className="text-green-500 flex-shrink-0 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          // FIX: Adăugat parametru service=ads
          href={`/contact?service=ads&plan=${name}`}
          className="w-full py-3 rounded-xl font-bold text-center transition-all bg-gray-400 text-white hover:bg-gray-500 shadow-lg"
        >
          Alege {name}
        </a>
      </div>
    </div>
  );
}

// Gold Card Component
function GoldCard({ name, price, desc, mainDesc, includes }) {
  return (
    <div className="relative rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-50 to-amber-100/50 overflow-hidden shadow-2xl flex flex-col h-full">
      {/* Header Banner with Ribbon */}
      <div className="relative bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-6 text-center">
        <div className="absolute inset-0 opacity-30 bg-pattern"></div>
        <h3
          className="text-3xl font-black text-white tracking-wider relative z-10"
          style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.4)" }}
        >
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-amber-900 mb-2">{desc}</h4>
        <div className="mb-6">
          <div className="text-2xl font-black text-amber-800 mb-1">{price}</div>
          <p className="text-xs text-amber-700">/ lună + Buget Ads</p>
        </div>

        <p className="text-sm text-amber-900 mb-6 pb-6 border-b-2 border-amber-300">
          {mainDesc}
        </p>

        <div className="mb-8 flex-1">
          <h5 className="text-sm font-bold text-amber-900 mb-3 uppercase tracking-wider">
            Ce includem:
          </h5>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-amber-900"
              >
                <Check
                  size={18}
                  className="text-green-600 flex-shrink-0 mt-0.5 font-bold"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          // FIX: Adăugat parametru service=ads
          href={`/contact?service=ads&plan=${name}`}
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
        <h3
          className="text-3xl font-black text-slate-200 tracking-wider relative z-10"
          style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.6)" }}
        >
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-slate-100 mb-2">{desc}</h4>
        <div className="mb-6">
          <div className="text-2xl font-black text-slate-200 mb-1">{price}</div>
          <p className="text-xs text-slate-400">/ lună + Buget Ads</p>
        </div>

        <p className="text-sm text-slate-300 mb-6 pb-6 border-b-2 border-slate-600">
          {mainDesc}
        </p>

        <div className="mb-8 flex-1">
          <h5 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wider">
            Ce includem:
          </h5>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-slate-300"
              >
                <Check
                  size={18}
                  className="text-emerald-400 flex-shrink-0 mt-0.5 font-bold"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          // FIX: Adăugat parametru service=ads
          href={`/contact?service=ads&plan=${name}`}
          className="w-full py-3 rounded-xl font-bold text-center transition-all bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 shadow-lg border border-slate-500"
        >
          Alege {name}
        </a>
      </div>
    </div>
  );
}
