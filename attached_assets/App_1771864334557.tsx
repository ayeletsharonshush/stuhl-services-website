
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasScrolled(false);
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case Section.HOME:
        return (
          <Home 
            onPortfolioClick={() => setActiveSection(Section.PORTFOLIO)} 
            onContactClick={() => setActiveSection(Section.CONTACT)} 
          />
        );
      case Section.PORTFOLIO:
        return <Portfolio />;
      case Section.CONTACT:
        return <Contact />;
      default:
        return <Home onPortfolioClick={() => {}} onContactClick={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeSection={activeSection} setSection={setActiveSection} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer setSection={setActiveSection} />
      
      {activeSection !== Section.CONTACT && hasScrolled && (
        <div className="fixed bottom-20 right-6 md:hidden z-40 animate-fade-in">
          <button 
            onClick={() => setActiveSection(Section.CONTACT)}
            className="bg-brand-gold text-white px-6 py-3.5 rounded-full shadow-xl shadow-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/40 transition-all flex items-center gap-2 font-bold text-sm"
          >
            Free Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
