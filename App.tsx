
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Recommends from './components/Recommends';
import Videos from './components/Videos';
import Footer from './components/Footer';
import { Section } from './types';

// The site is a state-based SPA (no router). A few sections carry a real URL,
// so the app reads the path on load and keeps it in sync.
const PATH_SECTIONS: { path: string; section: Section }[] = [
  { path: '/recommends', section: Section.RECOMMENDS },
  { path: '/videos', section: Section.VIDEOS },
];

const sectionFromPath = (): Section => {
  if (typeof window === 'undefined') return Section.HOME;
  const p = window.location.pathname.toLowerCase();
  const match = PATH_SECTIONS.find((m) => p.startsWith(m.path));
  return match ? match.section : Section.HOME;
};

const pathForSection = (section: Section): string =>
  PATH_SECTIONS.find((m) => m.section === section)?.path ?? '/';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(sectionFromPath());
  const [hasScrolled, setHasScrolled] = useState(false);

  // Keep the URL in sync with the active section.
  useEffect(() => {
    const path = pathForSection(activeSection);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [activeSection]);

  // Support browser back/forward.
  useEffect(() => {
    const onPop = () => setActiveSection(sectionFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

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
      case Section.RECOMMENDS:
        return <Recommends />;
      case Section.VIDEOS:
        return <Videos onRecommendsClick={() => setActiveSection(Section.RECOMMENDS)} />;
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
      
      {hasScrolled && (
        <div className="fixed bottom-20 right-6 md:hidden z-40 animate-fade-in flex flex-col gap-3">
          {activeSection !== Section.CONTACT && (
            <button 
              onClick={() => setActiveSection(Section.CONTACT)}
              className="bg-brand-gold/60 text-white px-6 py-3.5 rounded-full shadow-xl backdrop-blur-sm transition-all flex items-center justify-center font-bold text-sm"
            >
              Start Your Project
            </button>
          )}
          {activeSection !== Section.PORTFOLIO && (
            <button 
              onClick={() => setActiveSection(Section.PORTFOLIO)}
              className="bg-brand-gold/60 text-white px-6 py-3.5 rounded-full shadow-xl backdrop-blur-sm transition-all flex items-center justify-center font-bold text-sm"
            >
              Our Works
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
