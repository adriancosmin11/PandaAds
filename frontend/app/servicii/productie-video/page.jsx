"use client";

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Play, CheckCircle2, ArrowRight, Video, Target, Sparkles, TrendingUp, Clock, Smartphone, MessageSquare, PlayCircle, Star } from 'lucide-react';

export default function ProductieVideoPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    
    try {
      const { submitVideoProductieForm } = await import('../../actions');
      const response = await submitVideoProductieForm({
        nume: formData.name,
        telefon: formData.phone,
        email: formData.email,
        mesaj: formData.business
      });

      if (response.success) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', business: '' });
      } else {
        setStatus('error');
        setMessage(response.message || 'Eroare la trimiterea mesajului.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('A apărut o eroare la conexiune.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-[#f4f4f7] font-sans text-gray-900 overflow-x-hidden">
      <Navbar theme="dark" fixed={false} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-900 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-rose-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/80 to-[#0f1016]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold tracking-wider text-white uppercase">Acceptăm proiecte noi pentru 2026</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
                Tu tratezi pacienții.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                  Noi îți construim prezența
                </span> care aduce programări.
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                Transformăm 1 oră din timpul tău în 30 de videoclipuri scurte, gândite pentru TikTok, Reels și Shorts. Ne ocupăm de strategie, scenarii, filmare și editare, ca tu să rămâi focusat pe clinică, pacienți și creșterea business-ului.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="#formular" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 font-bold text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-y-1">
                  Vreau 30 de videoclipuri virale
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="#proces" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 border border-white/20 font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                  Vezi cum lucrăm
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Target, text: 'Strategie Done-For-You' },
                  { icon: Video, text: 'Filmare la locație' },
                  { icon: Sparkles, text: 'Editare premium social media' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg relative">
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] aspect-[4/5] bg-gray-800">
                <Image 
                  src="/assets/video-pandaads/1video.png" 
                  alt="Video Production System" 
                  fill 
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white mb-1">Badge Autoritate</div>
                    <div className="text-xs text-gray-300">Done-For-You</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                    <Play className="w-5 h-5 text-white ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 relative flex items-center justify-center text-white">
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
                    <span className="font-bold text-xl">30</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Livrabile</div>
                  <div className="font-bold text-white">Clipuri / lună</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTICI */}
       <section className="py-12 bg-[#0f1016] border-t border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { nr: '100M+', label: 'vizualizări generate' },
              { nr: '2500+', label: 'videoclipuri create' },
              { nr: '500+', label: 'clipuri virale' },
              { nr: '4+', label: 'ani experiență' }
            ].map((stat, i) => (
              <div key={i} className="text-center group relative p-6 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 group-hover:scale-110 transition-transform">{stat.nr}</div>
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LOGO STRIP */}
      <section className="py-16 bg-white overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Am lucrat cu jurnaliști de la televiziuni partenere</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <Image src="/assets/TVR1.png" alt="TVR1" width={80} height={40} className="object-contain" />
                <Image src="/assets/TotalTV.png" alt="TotalTV" width={100} height={50} className="object-contain" />
                <Image src="/assets/romania-tv.png" alt="Romania TV" width={120} height={40} className="object-contain" />
                <Image src="/assets/ANTENA1.png" alt="Antena 1" width={60} height={40} className="object-contain" />
                <Image src="/assets/ILIKEIT.png" alt="I Like IT" width={100} height={40} className="object-contain" />
                <Image src="/assets/OBSERVATOR.png" alt="Observator" width={120} height={40} className="object-contain" />
            </div>
        </div>
      </section>

      {/* 4. SECTIUNE SERVICII */}
      <section className="py-24 bg-gray-50 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wider uppercase mb-4">Serviciile noastre</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Cele 4 motoare de creștere Panda Ads</h2>
            <p className="text-xl text-gray-600">
              Nu facem doar video. Construim un sistem de conținut care îți crește autoritatea, îți clarifică mesajul și îți aduce mai multă atenție din partea publicului potrivit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Target,
                title: 'Strategie',
                desc: 'Identificăm unghiurile de comunicare care funcționează în nișa ta și construim direcția corectă pentru conținut.',
                color: 'bg-blue-50 text-blue-600 border-blue-200'
              },
              {
                icon: MessageSquare,
                title: 'Scenarii',
                desc: 'Scriem hook-uri și texte clare, ușor de filmat, care opresc scroll-ul și transmit mesajul potrivit.',
                color: 'bg-purple-50 text-purple-600 border-purple-200'
              },
              {
                icon: Video,
                title: 'Filmarea',
                desc: 'Venim direct la tine în locație cu echipament complet și ghidaj, astfel încât să filmăm eficient și natural.',
                color: 'bg-rose-50 text-rose-600 border-rose-200'
              },
              {
                icon: Sparkles,
                title: 'Editarea',
                desc: 'Livrăm clipuri scurte, curate și premium, optimizate special pentru TikTok, Reels și Shorts.',
                color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
              }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${srv.color}`}>
                  <srv.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{srv.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{srv.desc}</p>
                <div className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Vezi detalii <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTIUNE PROBLEMA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1">
              <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 text-sm font-bold tracking-wider uppercase mb-4">Problema reală</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Concurența ta postează deja și îți fură atenția pacienților.
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Nu pierzi oportunități pentru că ești mai slab. Le pierzi pentru că alții apar mai des, mai clar și mai convingător în fața publicului tău.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Nu ai timp pentru content', desc: 'Programul este deja plin, iar social media rămâne mereu pe ultimul loc.' },
                  { title: 'Nu știi ce să filmezi', desc: 'Fără o strategie, cele mai multe clipuri ies haotic și nu transmit încredere.' },
                  { title: 'Nu știi ce funcționează în nișa ta', desc: 'Ce merge la alții nu merge automat și pentru clinica sau business-ul tău.' },
                  { title: 'Concurența este mai vizibilă', desc: 'În online, câștigă mai des cel care apare constant și profesionist.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative rounded-[2.5rem] bg-gray-50 p-8 sm:p-12 border border-gray-100">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl mb-8">
                   <Image 
                      src="/assets/video-pandaads/2video.png" 
                      alt="Concurenta" 
                      fill 
                      className="object-cover"
                    />
                </div>
                
                {/* Visual Cards Overlapped */}
                <div className="absolute -left-6 top-12 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-64 rotate-[-3deg] hover:rotate-0 transition-transform cursor-default">
                  <div className="font-black text-gray-900 text-lg mb-1">30 clipuri / lună</div>
                  <div className="text-sm text-gray-500 font-medium leading-tight">conținut pregătit dintr-o singură sesiune de filmare</div>
                </div>

                <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-64 rotate-[3deg] hover:rotate-0 transition-transform cursor-default z-10">
                  <div className="font-black text-indigo-600 text-lg mb-1">Done-For-You</div>
                  <div className="text-sm text-gray-500 font-medium leading-tight">strategie, scenarii, filmare, editare și livrare finală</div>
                </div>

                <div className="absolute left-8 -bottom-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-72 rotate-[-1deg] hover:rotate-0 transition-transform cursor-default z-10">
                  <div className="font-black text-emerald-600 text-lg mb-1">Mai multă autoritate</div>
                  <div className="text-sm text-gray-500 font-medium leading-tight">prezență mai curată, coerentă și mai greu de ignorat</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PASII COLABORARII */}
      <section className="py-24 bg-gray-900 text-white" id="proces">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-indigo-300 text-sm font-bold tracking-wider uppercase mb-4 border border-white/20">Pașii colaborării</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Un proces clar, rapid pentru tine și puternic pentru imaginea ta</h2>
            <p className="text-xl text-gray-400">
              Tot sistemul este construit să îți consume minim de timp și să îți livreze conținut utilizabil, premium și coerent pentru o lună întreagă.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Ședința de analiză', desc: 'Înțelegem exact ce vinzi, cui te adresezi și ce tip de conținut atrage.' },
              { step: '02', title: 'Generarea ideilor', desc: 'Selectăm unghiurile convingătoare: educativ, autoritate, storytelling.' },
              { step: '03', title: 'Scenarii care opresc scroll-ul', desc: 'Scriem hook-uri și texte clare ca tu să nu improvizezi.' },
              { step: '04', title: 'Organizarea filmării', desc: 'Ne ocupăm de cadru, lumină, microfoane și ordinea filmării.' },
              { step: '05', title: 'Filmarea videoclipurilor', desc: 'Te ghidăm astfel încât să arăți natural și profesionist.' },
              { step: '06', title: 'Revizuire și ajustări', desc: 'Verificăm fiecare clip din perspectivă vizuală și comercială.' },
              { step: '07', title: 'Editare premium', desc: 'Adăugăm ritm, subtitrări, muzică și finisaje profesionale.' },
              { step: '08', title: 'Livrarea conținutului', desc: 'Rămâi cu 30 de videoclipuri gata pentru TikTok, Reels și Shorts.' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors relative overflow-hidden group">
                <div className="text-6xl font-black text-white/5 absolute -top-4 -right-2 group-hover:scale-110 transition-transform">{item.step}</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold mb-6 shadow-lg relative z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SISTEMUL PANDA ADS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1 w-full order-2 lg:order-1">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Cercetare pe nișa ta', desc: 'Adaptăm mesajele și structura clipurilor exact pe publicul pe care vrei să îl atragi.' },
                  { title: 'Scenarii scrise de experți', desc: 'Venim cu idei, unghiuri și texte clare, ușor de filmat și bune pentru conversie.' },
                  { title: 'Filmare premium la locația ta', desc: 'O singură sesiune îți aduce conținut pentru o lună.' },
                  { title: 'Editare optimizată', desc: 'Subtitrări, hook-uri, tăieturi rapide și aspect premium pentru rețelele sociale.' },
                ].map((item, i) => (
                   <div key={i} className="bg-gray-50 border border-gray-100 p-8 rounded-3xl">
                     <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mb-4">{i+1}</div>
                     <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                     <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                   </div>
                ))}
               </div>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wider uppercase mb-4">Sistemul Panda Ads</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Tu nu cumperi doar filmare. Cumperi un mecanism de creștere.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Diferența dintre un simplu videograf și un sistem bun de conținut este că noi gândim totul pentru business: atenție, încredere, claritate și imagine premium.
              </p>
              
              <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-indigo-900 text-white shadow-2xl">
                 <h4 className="text-2xl font-bold mb-4">Ce primești concret după colaborare</h4>
                 <p className="text-gray-300 mb-8">Un brand mai prezent, o imagine mai curată și un volum mare de conținut gata de folosit, fără să îți consumi energia pe producție.</p>
                 
                 <div className="flex items-center justify-between border-t border-white/20 pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-400">30</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">videoclipuri</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-400">1h</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">filmare</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-emerald-400">3</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">platforme</div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. COMPARATIE */}
      <section className="py-24 bg-[#f4f4f7] border-y border-gray-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Poze, video singur sau sistem complet?</h2>
            <p className="text-xl text-gray-600">
              Nu toate variantele de conținut au același impact asupra imaginii și atenției din piață.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    <th className="p-6 font-semibold">Varianta</th>
                    <th className="p-6 font-semibold">Impact</th>
                    <th className="p-6 font-semibold">Calitate</th>
                    <th className="p-6 font-semibold">Consistență</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Postări cu poze</td>
                    <td className="p-6"><span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">Scăzut</span></td>
                    <td className="p-6 text-gray-600 font-medium">Mediu</td>
                    <td className="p-6 text-gray-600 font-medium">Medie</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Video filmat singur</td>
                    <td className="p-6"><span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Mediu</span></td>
                    <td className="p-6 text-gray-600 font-medium">Slab</td>
                    <td className="p-6 text-gray-600 font-medium">Slabă</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-gray-900 flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Agenții clasice</td>
                    <td className="p-6"><span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">Mediu</span></td>
                    <td className="p-6 text-gray-900 font-bold">Bun</td>
                    <td className="p-6 text-gray-600 font-medium">Medie</td>
                  </tr>
                  <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors relative">
                    <td className="p-6 font-black text-indigo-700 text-lg flex items-center gap-3 border-l-4 border-indigo-500">
                       <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                       Sistemul Panda Ads
                    </td>
                    <td className="p-6"><span className="inline-flex px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">Ridicat</span></td>
                    <td className="p-6 text-indigo-900 font-black">Premium</td>
                    <td className="p-6 text-indigo-900 font-black">Ridicată</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 9. NISE POTRIVITE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-700 text-sm font-bold tracking-wider uppercase mb-4">Nișe potrivite</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Indiferent de domeniu, avem unghiul potrivit de comunicare</h2>
            <p className="text-xl text-gray-600">
              Adaptăm stilul clipurilor în funcție de tipul de afacere, obiectivul tău și nivelul de încredere de care ai nevoie în piață.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Clinici medicale & beauty',
                desc: 'Transformăm expertiza ta în conținut care construiește autoritate, încredere și aduce mai multe programări.',
                img: '/assets/video-pandaads/unnamed (2).jpg'
              },
              {
                title: 'HoReCa',
                desc: 'Surprindem atmosfera și experiența locației tale în clipuri care deschid pofta și aduc oameni în locație.',
                img: '/assets/video-pandaads/4video2.png'
              },
              {
                title: 'E-commerce & produse',
                desc: 'Filmam produsele astfel încât să pară mai dorite, mai valoroase și mai ușor de cumpărat.',
                img: '/assets/video-pandaads/image1b.jpg'
              }
            ].map((niche, i) => (
              <div key={i} className="group rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                   <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10"></div>
                   <Image src={niche.img} alt={niche.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{niche.title}</h3>
                  <p className="text-gray-600">{niche.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA FINAL & FORMULAR */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden" id="formular">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1">
              <div className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-bold tracking-wider uppercase mb-6 border border-white/20">Următorul pas</div>
              <h2 className="text-5xl font-black mb-6 leading-tight">
                Ești pregătit să nu mai lași concurența să îți ia fața online?
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Completează formularul și revenim rapid cu o analiză gratuită a afacerii tale. Îți spunem direct dacă serviciul este potrivit pentru tine și ce direcție de conținut merită testată prima.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Afli ce tip de videoclipuri funcționează în nișa ta',
                  'Înțelegi ce lipsește din prezența ta actuală',
                  'Primești o propunere clară, fără bătăi de cap'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-6 h-6 flex-shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative">
                <h3 className="text-3xl font-bold mb-2">Solicită analiza gratuită</h3>
                <p className="text-gray-300 mb-8 text-sm">Lasă-ne câteva date și revenim cât mai repede posibil.</p>

                {status === 'success' ? (
                  <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                      <CheckCircle2 className="text-emerald-400" size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Cerere Trimisă!</h4>
                    <p className="text-gray-300 mb-6">
                      Îți mulțumim pentru interes. Un specialist PandaAds te va contacta în curând.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                    >
                      Trimite altă cerere
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Nume" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="Telefon" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <textarea 
                        name="business"
                        placeholder="Spune-ne pe scurt ce business ai"
                        rows="3"
                        required
                        value={formData.business}
                        onChange={handleChange}
                         className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                      ></textarea>
                    </div>
                    
                    {status === 'error' && (
                      <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm font-medium text-center">
                        {message}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === 'loading'}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-[60px]"
                    >
                      {status === 'loading' ? (
                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Vreau să fiu contactat <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                      Nu facem spam. Datele tale rămân în siguranță.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
