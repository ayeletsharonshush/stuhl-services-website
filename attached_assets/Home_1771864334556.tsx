
import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../types';
import { SERVICES } from '../constants';
import { CheckCircle, ShieldCheck, MapPin, Users, CookingPot, Bath, Warehouse, LayoutGrid, ArrowRight, Star, Award } from 'lucide-react';

interface HomeProps {
  onPortfolioClick: () => void;
  onContactClick: () => void;
}

const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <div ref={ref}>{count}{suffix}</div>;
};

const FadeInSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Home: React.FC<HomeProps> = ({ onPortfolioClick, onContactClick }) => {
  const IconMap: any = {
    CookingPot: { icon: CookingPot, gradient: 'from-red-500 to-rose-600' },
    Bath: { icon: Bath, gradient: 'from-cyan-500 to-teal-600' },
    Warehouse: { icon: Warehouse, gradient: 'from-blue-800 to-indigo-900' },
    LayoutGrid: { icon: LayoutGrid, gradient: 'from-amber-500 to-yellow-600' }
  };

  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-cream">
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-navy/[0.02] to-transparent rounded-full"></div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-16 lg:mb-0">
              <div className="animate-fade-up">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold bg-white text-brand-navy mb-8 shadow-sm border border-brand-navy/5">
                  <MapPin size={13} className="mr-2 text-brand-red" />
                  <span className="uppercase tracking-wider">Morris & Union Counties, NJ</span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.05] mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                Crafting Spaces<br />
                You <span className="text-gradient italic">Love.</span>
              </h1>
              <p className="text-lg text-brand-charcoal/60 mb-10 max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
                Specializing in premium bathrooms, basements, kitchens and custom work. <span className="text-brand-navy font-semibold">Stuhl Services LLC</span> is a local family-owned company built on trust, quality craftsmanship, and exceptional references.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <button 
                  onClick={onContactClick}
                  className="group px-8 py-4 bg-brand-navy text-white font-bold rounded-full hover:bg-brand-charcoal transition-all duration-300 shadow-xl shadow-brand-navy/20 hover:shadow-2xl hover:shadow-brand-navy/30 flex items-center justify-center text-sm tracking-wide"
                >
                  Book a Free Consultation
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onPortfolioClick}
                  className="group px-8 py-4 bg-brand-navy text-white font-bold rounded-full hover:bg-brand-navy/90 transition-all duration-300 border-2 border-brand-navy text-sm tracking-wide shadow-md shadow-brand-navy/20 hover:shadow-lg hover:shadow-brand-navy/30 flex items-center justify-center"
                >
                  View Our Work
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-up" style={{ animationDelay: '400ms' }}>
              <div 
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/15 cursor-pointer group/photo"
                onClick={onPortfolioClick}
              >
                <img 
                  src="/images/hero-main.jpg" 
                  alt="Modern Home Renovation" 
                  className="w-full h-[500px] object-cover group-hover/photo:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 via-transparent to-transparent"></div>
                <div className="absolute top-[55%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 group-hover/photo:scale-110 transition-transform duration-300">
                  <img src="/images/click-icon.png" alt="Click to see more" className="w-16 h-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
                  <span className="text-white font-bold text-base tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] -mt-1">More</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-brand-navy/5 animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-brand-cyan to-teal-600 text-white p-2.5 rounded-xl">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="font-extrabold text-brand-navy text-sm">Owner-Operated</p>
                    <p className="text-[10px] font-semibold text-brand-charcoal/40 tracking-wider uppercase">Certified Pros</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-brand-navy/5" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-[10px] font-bold text-brand-charcoal/50 mt-1">100+ References</p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg">
            <FadeInSection delay={0}>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-brand-navy">
                  <AnimatedCounter end={6} suffix="+" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 mt-1">Local Years</div>
              </div>
            </FadeInSection>
            <FadeInSection delay={150}>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-brand-gold">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 mt-1">Ref. Projects</div>
              </div>
            </FadeInSection>
            <FadeInSection delay={300}>
              <div className="text-center">
                <div className="text-4xl font-extrabold text-brand-cyan">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 mt-1">Satisfaction</div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-gold to-brand-cyan"></div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection>
            <div className="text-center mb-20">
              <span className="inline-block text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 px-4 py-1.5 bg-brand-gold/5 rounded-full">Specializations</span>
              <h2 className="text-4xl lg:text-5xl text-brand-navy mb-6">Our Remodeling Expertise</h2>
              <p className="text-brand-charcoal/50 max-w-xl mx-auto">From concept to completion, we bring unmatched skill to every project.</p>
            </div>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => {
              const { icon: Icon, gradient } = IconMap[service.icon];
              return (
                <FadeInSection key={idx} delay={idx * 100}>
                  <div className="group relative bg-white p-8 rounded-3xl border border-brand-navy/5 hover:border-brand-navy/10 transition-all duration-500 hover:shadow-xl hover:shadow-brand-navy/5 hover:-translate-y-1 h-full">
                    <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={26} />
                    </div>
                    <h3 className="text-lg font-extrabold mb-3 text-brand-navy">{service.title}</h3>
                    <p className="text-brand-charcoal/50 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="bg-brand-navy rounded-[2.5rem] p-10 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-cyan/10 rounded-full -ml-30 -mb-30 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full"></div>
              
              <div className="relative z-10 lg:grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="inline-block text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 px-4 py-1.5 bg-brand-gold/10 rounded-full border border-brand-gold/20">Why Choose Us</span>
                  <h2 className="text-4xl lg:text-5xl mb-8 leading-tight">Expert Service.<br /><span className="text-gradient">Local Trust.</span></h2>
                  <p className="text-white/60 mb-12 text-lg leading-relaxed">At Stuhl Services, we treat your home like our own. Our business is built on word-of-mouth and a long list of successful local references.</p>
                  
                  <ul className="space-y-5">
                    {[
                      "Over 100+ local references available upon request",
                      "Hands-on owner working on all projects for maximum accountability",
                      "Specialized in Bathroom, Basement and Kitchen transformations",
                      "Transparent project timelines & cost estimates",
                      "Professional cleaning at project end for maximum satisfaction",
                      "Licensed, Insured and Bonded"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="bg-brand-gold/20 p-1 rounded-full mt-0.5 shrink-0">
                          <CheckCircle className="text-brand-gold" size={16} />
                        </div>
                        <span className="text-white/80 font-medium text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-16 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-amber-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                      <Users className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-extrabold text-white mb-1">Local Roots</p>
                    <p className="text-xs text-white/40 leading-relaxed">Serving Morris and Union Counties in New Jersey</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group sm:mt-8 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan to-teal-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                      <Award className="text-white" size={24} />
                    </div>
                    <p className="text-lg font-extrabold text-white mb-1">Trusted Pro</p>
                    <p className="text-xs text-white/40 leading-relaxed">Vetted references from satisfied homeowners</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
