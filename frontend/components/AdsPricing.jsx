import React from 'react';
import { Check } from 'lucide-react';

export default function AdsPricing({ data }) {
    const {
        title = "Investiție Transparentă",
        subtitle = "Alege pachetul care se potrivește stadiului afacerii tale.",
        price_silver = "300 – 500 €",
        price_gold = "600 – 1.000 €",
        price_platinum = "1.200 – 2.000 €"
    } = data || {};

    return (
        <section className="py-24 bg-white relative overflow-hidden">
             {/* Background simplu */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    
                    {/* SILVER */}
                    <PricingCard 
                        name="SILVER" 
                        price={price_silver} 
                        desc="Pentru afaceri la început"
                        features={["Audit Campanii", "Setup Pixel & API", "Raportare Lunară", "1 Canal (FB sau TikTok)"]}
                        color="gray"
                    />

                    {/* GOLD */}
                    <PricingCard 
                        name="GOLD" 
                        price={price_gold} 
                        desc="Best Seller"
                        features={["Tot ce e în Silver", "2 Canale (FB + TikTok)", "Creatives Strategy", "Copywriting Ads", "Raportare Săptămânală"]}
                        color="blue"
                        popular
                    />

                    {/* PLATINUM */}
                    <PricingCard 
                        name="PLATINIUM" 
                        price={price_platinum} 
                        desc="Scaling Agresiv"
                        features={["Tot ce e în Gold", "Consultant Dedicat", "Editare Video Inclusă", "Scaling Strategy", "Prioritate la Suport"]}
                        color="black"
                    />
                </div>
            </div>
        </section>
    );
}

// Sub-componentă mică pentru carduri
function PricingCard({ name, price, desc, features, color, popular }) {
    const isBlue = color === 'blue';
    const isBlack = color === 'black';

    let bgClass = "bg-white border-gray-200";
    let btnClass = "bg-gray-100 text-gray-900 hover:bg-gray-200";
    
    if (isBlue) {
        bgClass = "bg-white border-blue-200 shadow-xl shadow-blue-50 ring-2 ring-blue-500 ring-offset-2";
        btnClass = "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200";
    }
    if (isBlack) {
        bgClass = "bg-gray-900 text-white border-gray-800";
        btnClass = "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-900/20";
    }

    return (
        <div className={`relative p-8 rounded-3xl border flex flex-col ${bgClass} transition-transform hover:-translate-y-2`}>
            {popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                    Cel mai ales
                </div>
            )}
            
            <div className="mb-6">
                <h3 className={`text-sm font-bold tracking-widest uppercase mb-2 ${isBlack ? 'text-gray-400' : 'text-gray-500'}`}>{name}</h3>
                <div className={`text-3xl font-bold mb-1 ${isBlack ? 'text-white' : 'text-gray-900'}`}>{price}</div>
                <p className={`text-sm ${isBlack ? 'text-gray-500' : 'text-gray-400'}`}>/ lună + Buget Ads</p>
            </div>

            <p className={`text-sm mb-8 pb-8 border-b ${isBlack ? 'text-gray-400 border-gray-800' : 'text-gray-600 border-gray-100'}`}>
                {desc}
            </p>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <Check size={18} className={isBlack ? "text-emerald-500" : "text-blue-500"} />
                        <span className={isBlack ? "text-gray-300" : "text-gray-600"}>{feat}</span>
                    </li>
                ))}
            </ul>

            <a href={`/contact?plan=${name}`} className={`w-full py-4 rounded-xl font-bold text-center transition-all ${btnClass}`}>
                Alege {name}
            </a>
        </div>
    )
}