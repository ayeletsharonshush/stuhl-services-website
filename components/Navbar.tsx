
import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import { LogoBricks } from './LogoBricks';
import { pathForSection } from '../routes';
import { Menu, X, Home } from 'lucide-react';
const LOGO_VERSION = 2;

interface NavbarProps {
  activeSection: Section;
  setSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: Section.HOME },
    { label: 'Portfolio', value: Section.PORTFOLIO },
    { label: 'Videos', value: Section.VIDEOS },
    { label: 'Recommended Products', value: Section.RECOMMENDS },
    { label: 'Contact', value: Section.CONTACT },
  ];

  // Nav items are real links so crawlers can follow them; a plain click
  // switches section in-app, a modified click opens the URL normally.
  const handleNav = (section: Section, e?: React.MouseEvent) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)) return;
    e?.preventDefault();
    setSection(section);
    setMobileOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled ? 'glass shadow-lg shadow-brand-navy/5 border-b border-white/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <a
            href="/"
            className="flex items-center cursor-pointer group gap-3"
            onClick={(e) => handleNav(Section.HOME, e)}
          >
            <LogoBricks logoImage="/images/logo.png" />
            <div className="flex flex-col leading-none">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
                STUHL
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-brand-gold uppercase">
                SERVICES LLC
              </span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.value}
                href={pathForSection(item.value)}
                onClick={(e) => handleNav(item.value, e)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeSection === item.value 
                    ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20' 
                    : 'text-brand-charcoal/70 hover:text-brand-navy hover:bg-brand-navy/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => handleNav(Section.CONTACT, e)}
              className="ml-4 px-6 py-2.5 bg-brand-gold text-white font-bold text-sm rounded-full hover:bg-brand-gold/90 transition-all shadow-md shadow-brand-gold/20 hover:shadow-lg hover:shadow-brand-gold/30"
            >
              Free Estimate
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            {activeSection !== Section.HOME && (
              <button
                onClick={() => handleNav(Section.HOME)}
                className="p-2 rounded-xl bg-transparent hover:bg-brand-navy/5 transition-colors"
              >
                <Home size={22} className="text-brand-navy" />
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl hover:bg-brand-navy/5 transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/50 animate-fade-in">
          <div className="px-5 py-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.value}
                href={pathForSection(item.value)}
                onClick={(e) => handleNav(item.value, e)}
                className={`block w-full text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                  activeSection === item.value 
                    ? 'bg-brand-navy text-white' 
                    : 'text-brand-charcoal/70 hover:bg-brand-navy/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => handleNav(Section.CONTACT, e)}
              className="block text-center w-full mt-2 px-5 py-3.5 bg-brand-gold text-white font-bold text-sm rounded-2xl"
            >
              Free Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
