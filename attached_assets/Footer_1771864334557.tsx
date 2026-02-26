
import React from 'react';
import { Section } from '../types';
import { Facebook, Instagram, ArrowUpRight, Phone, Mail } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setSection: (section: Section) => void;
}

const Footer: React.FC<FooterProps> = ({ setSection }) => {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Logo size={28} />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-extrabold tracking-tight text-white">STUHL</span>
                <span className="text-[8px] font-bold tracking-[0.3em] text-brand-gold uppercase">SERVICES LLC</span>
              </div>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed text-sm">
              Stuhl Services LLC is a local, owner-operated remodeling company specializing in bathrooms, basements and kitchens. Built on trust and quality.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:9087235922" className="flex items-center gap-2 text-white/40 hover:text-brand-gold transition-colors text-sm">
                <Phone size={14} /> (908) 723-5922
              </a>
              <a href="mailto:stuhlservices@gmail.com" className="flex items-center gap-2 text-white/40 hover:text-brand-gold transition-colors text-sm">
                <Mail size={14} /> stuhlservices@gmail.com
              </a>
            </div>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/stuhlservicesLLC" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-xl text-white/40 hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/stuhl_services" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-xl text-white/40 hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-extrabold text-white mb-6 text-xs uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => setSection(Section.HOME)} className="text-white/40 font-medium hover:text-brand-gold transition-colors text-sm flex items-center gap-1 group">
                  Home <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => setSection(Section.PORTFOLIO)} className="text-white/40 font-medium hover:text-brand-gold transition-colors text-sm flex items-center gap-1 group">
                  Portfolio <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button onClick={() => setSection(Section.CONTACT)} className="text-white/40 font-medium hover:text-brand-gold transition-colors text-sm flex items-center gap-1 group">
                  Contact <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white mb-6 text-xs uppercase tracking-wider">Service Area</h4>
            <ul className="space-y-3">
              {['Long Hill', 'Morristown', 'New Providence', 'Summit', 'Westfield', 'Watchung'].map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm text-white/40">
                  <div className="w-1 h-1 rounded-full bg-brand-gold"></div>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="relative mb-10 rounded-2xl overflow-hidden">
          <img 
            src="/images/owner.jpg" 
            alt="Owner of Stuhl Services" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-xl px-2 py-1.5 sm:px-4 sm:py-3">
              <p className="text-brand-navy font-bold text-[10px] sm:text-sm leading-tight">My<br />Latest<br />Remodel!</p>
              <div className="absolute top-1/2 -right-1.5 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-white/95 rotate-45 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-white/20 text-xs pt-10 border-t border-white/5">
          <p>&copy; 2025 Stuhl Services LLC. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
