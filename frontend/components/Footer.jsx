import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'; // Scoatem Twitter/Linkedin daca nu ai
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Coloana 1: Logo & Social Media */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
               <Image src="/assets/logo-footer.png" alt="PandaAds Logo" width={100} height={100} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Partenerul tău de încredere pentru creștere organică și performanță plătită.
            </p>
            
            {/* --- AICI SUNT LINK-URILE SOCIAL MEDIA --- */}
            <div className="flex gap-4 pt-4">
              {/* Facebook */}
              <SocialIcon 
                href="https://www.facebook.com/profile.php?id=61586190579558" 
                icon={<Facebook size={20}/>} 
                color="hover:bg-[#1877F2]"
              />
              
              {/* Instagram */}
              <SocialIcon 
                href="https://www.instagram.com/pandaads.ro" 
                icon={<Instagram size={20}/>} 
                color="hover:bg-pink-600"
              />

              {/* TikTok (SVG Custom) */}
              <a 
                href="https://www.tiktok.com/@pandaads.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 7.392A6.341 6.341 0 0 0 15.829 12.5v-7.07a8.15 8.15 0 0 0 4.767 1.523v-3.452a4.86 4.86 0 0 1-1.007-.155Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Coloana 2: Navigare */}
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
              <li>TikTok Ads</li>
              <li>Facebook & Instagram Ads</li>
              <li>Web Design</li>
              <li>Google Ads</li>
            </ul>
          </div>

          {/* Coloana 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>București, România</span>
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

        {/* Bottom Section */}
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

// Componentă Helper actualizată
const SocialIcon = ({ icon, href, color }) => (
  <a 
    href={href} 
    target="_blank" // Deschide în tab nou
    rel="noopener noreferrer" // Securitate
    className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 ${color} hover:text-white transition-all duration-300 hover:-translate-y-1`}
  >
    {icon}
  </a>
);

export default Footer;