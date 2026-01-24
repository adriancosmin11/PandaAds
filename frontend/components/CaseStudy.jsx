import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image'; // Import Image

const CaseStudy = () => {
  return (
    // Adăugat 'relative overflow-hidden'
    <section className="relative py-20 overflow-hidden bg-white">
        
      {/* --- SECTION BACKGROUND (WAVES FAT) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/background-waves-fat.png" 
          alt="Background Pattern" 
          fill
          className="object-cover opacity-100" // Opacitate puțin mai mare
        />
         <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white"></div>
      </div>

      {/* Content Wrapper cu z-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 text-center md:text-left">
          Rezultate care vorbesc
        </h2>
        
        {/* Am adăugat backdrop-blur la containerul principal pentru contrast cu fundalul */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            
            {/* Partea Stângă: Graficul */}
            <div className="p-8 md:p-12 bg-emerald-50/50 flex flex-col justify-center relative border-r border-gray-100">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">E-commerce Client</div>
                <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-5xl font-black text-emerald-600">+360%</span>
                   <span className="text-lg font-bold text-gray-700">ROI</span>
                </div>
                <p className="text-gray-500 mb-8 text-sm">Creștere medie lunară în primele 3 luni</p>
                
                {/* Grafic CSS Pur */}
                <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 h-56 flex items-end justify-between gap-3 px-6 pb-0 relative z-10">
                    <div className="w-full bg-emerald-100 rounded-t-sm h-[30%] relative group"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-0 bg-black text-white text-xs p-1 rounded">Luna 1</div></div>
                    <div className="w-full bg-emerald-200 rounded-t-sm h-[45%]"></div>
                    <div className="w-full bg-emerald-300 rounded-t-sm h-[60%]"></div>
                    <div className="w-full bg-emerald-400 rounded-t-sm h-[75%]"></div>
                    <div className="w-full bg-emerald-500 rounded-t-sm h-[85%]"></div>
                    <div className="w-full bg-emerald-600 rounded-t-sm h-[100%] relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-lg whitespace-nowrap">
                            Record Nou 🚀
                        </div>
                    </div>
                </div>
            </div>

            {/* Partea Dreaptă: Testimonial */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-white/60">
                <div className="flex gap-1 text-yellow-400 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                    "Nu credeam că putem scala așa rapid. PandaAds a preluat totul, de la creație la optimizare, iar noi ne-am ocupat doar de livrarea comenzilor. Recomand!"
                </blockquote>
                
                <div className="flex items-center gap-4 border-t pt-6 border-gray-100">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-xl">
                        👨‍💼
                    </div>
                    <div>
                        <div className="font-bold text-gray-900">Alex Popescu</div>
                        <div className="text-sm text-emerald-600 font-semibold">CEO, FashionStore</div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudy;