import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coloana 1: Logo & Despre */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
               <Image src="/assets/logo-footer.png" alt="PandaAds Logo" width={120} height={40} className="object-contain"/>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Partenerul tău de încredere pentru creștere organică și performanță plătită. Transformăm vizitatorii în clienți fideli prin strategii smart.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook size={18}/>} href="#" />
              <SocialIcon icon={<Instagram size={18}/>} href="#" />
              <SocialIcon icon={<Linkedin size={18}/>} href="#" />
              <SocialIcon icon={<Twitter size={18}/>} href="#" />
            </div>
          </div>

          {/* Coloana 2: Link-uri Rapide */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Navigare</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Acasă</Link></li>
              <li><Link href="#servicii" className="hover:text-emerald-400 transition-colors">Servicii</Link></li>
              <li><Link href="#studii" className="hover:text-emerald-400 transition-colors">Studii de caz</Link></li>
              <li><Link href="#preturi" className="hover:text-emerald-400 transition-colors">Prețuri</Link></li>
            </ul>
          </div>

          {/* Coloana 3: Servicii */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Servicii</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">TikTok Ads</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Facebook & Instagram Ads</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Consultantă Marketing</a></li>
            </ul>
          </div>

          {/* Coloana 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>București, România<br/>Sector 1</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-emerald-500 shrink-0" />
                <a href="tel:+40700000000" className="hover:text-white transition-colors">+40 700 000 000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-emerald-500 shrink-0" />
                <a href="mailto:contact@pandaads.ro" className="hover:text-white transition-colors">contact@pandaads.ro</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} PandaAds Agency. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300">Termeni și Condiții</a>
            <a href="#" className="hover:text-gray-300">Politica de Confidențialitate</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componentă mică pentru iconițele social media
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;