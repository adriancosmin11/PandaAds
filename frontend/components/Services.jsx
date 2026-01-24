import React from "react";
import { MousePointer2, Smartphone, Monitor } from "lucide-react";
import Image from "next/image";

export default function Services({ data }) {
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
  } = data || {};

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      
      {/* --- BACKGROUND WAVES-FAT --- */}
      <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
        <Image
            src="/assets/background-waves-fat.png" // Asigură-te că ai imaginea aici
            alt="Waves Pattern"
            fill
            className="object-cover"
        />
      </div>

      {/* --- CONTENT CONTAINER (z-10 ca să fie peste background) --- */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MousePointer2 className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {card1_title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{card1_desc}</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {card2_title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{card2_desc}</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Monitor className="text-emerald-600" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {card3_title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{card3_desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}