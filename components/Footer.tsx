
import React from 'react';
import { Section } from '../types';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  setSection: (section: Section) => void;
}

const TOWNS_LEFT = ['Long Hill', 'Morristown', 'New Providence'];
const TOWNS_RIGHT = ['Summit', 'Westfield', 'Watchung'];

const Footer: React.FC<FooterProps> = ({ setSection }) => {
  return (
    <footer className="bg-brand-cream text-brand-navy">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">

          <div className="lg:col-span-5">
            <p className="text-brand-charcoal/60 max-w-md mb-8 leading-relaxed text-sm sm:text-base">
              Stuhl Services LLC is a local, owner-operated remodeling company serving Morris and Union Counties in New Jersey. We specialize in premium bathroom, basement, and kitchen transformations. With over 100 satisfied clients, we're built on trust, quality craftsmanship, and exceptional references.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="tel:9087235922" className="inline-flex items-center justify-center gap-3 px-5 py-3 bg-brand-navy text-white rounded-xl hover:bg-brand-navy/90 transition-all duration-300 text-sm font-medium group">
                <Phone size={16} className="group-hover:scale-110 transition-transform" />
                (908) 723-5922
              </a>
              <a href="mailto:stuhlservices@gmail.com" className="inline-flex items-center justify-center gap-3 px-5 py-3 bg-brand-navy/5 text-brand-navy rounded-xl hover:bg-brand-navy/10 transition-all duration-300 text-sm font-medium group">
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                stuhlservices@gmail.com
              </a>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a href="https://www.facebook.com/stuhlservicesLLC" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center border border-brand-navy/10 rounded-xl text-brand-navy/40 hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/stuhl_services" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center border border-brand-navy/10 rounded-xl text-brand-navy/40 hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300">
                <Instagram size={18} />
              </a>
              <span className="text-brand-charcoal/40 text-xs ml-1">See our latest transformations</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-cyan/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-brand-gold" />
                  <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Where We Work</h4>
                </div>
                <p className="text-white/40 text-xs mb-5">From Summit to Watchung, we're the family-owned team your neighbors trust.</p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
                  {[...TOWNS_LEFT, ...TOWNS_RIGHT].map((town) => (
                    <div key={town} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></div>
                      {town}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/30 text-xs">Serving Morris & Union Counties, NJ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative mb-8 rounded-2xl overflow-hidden">
          <img 
            src="/images/owner.jpg" 
            alt="Owner of Stuhl Services" 
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-xl px-2 py-1.5 sm:px-4 sm:py-3">
              <p className="text-brand-navy font-bold text-[10px] sm:text-sm leading-tight">Our<br />Latest<br />Remodel!</p>
              <div className="absolute top-1/2 -right-1.5 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-white/95 rotate-45 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-brand-charcoal/30 text-xs pt-8 border-t border-brand-navy/10">
          <p>&copy; 2021 Stuhl Services LLC. All rights reserved.</p>
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
