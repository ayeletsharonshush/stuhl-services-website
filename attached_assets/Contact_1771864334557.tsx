
import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Clock, Send, MapPin, CheckCircle } from 'lucide-react';

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

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Bathroom',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', phone: '', projectType: 'Bathroom', message: '' });
    }, 3000);
  };

  return (
    <div className="py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 items-start">
          <FadeInSection className="lg:col-span-2">
            <div>
              <span className="inline-block text-brand-cyan font-bold uppercase tracking-[0.3em] text-xs mb-4 px-4 py-1.5 bg-brand-cyan/5 rounded-full">Get In Touch</span>
              <h2 className="text-4xl lg:text-5xl text-brand-navy mb-6 leading-tight">Elevate Your<br />Home Today.</h2>
              <p className="text-brand-charcoal/50 mb-12 text-lg leading-relaxed">
                Every project starts with a conversation. Share your vision with us for a zero-obligation consultation.
              </p>

              <div className="space-y-8">
                <a href="tel:9087235922" className="flex gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-amber-600 rounded-xl flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy text-sm mb-0.5">Direct Line</h4>
                    <p className="text-brand-charcoal/60 font-semibold">(908) 723-5922</p>
                    <p className="text-[10px] text-brand-charcoal/30 font-bold uppercase tracking-wider mt-0.5">Tap to call</p>
                  </div>
                </a>

                <a href="mailto:stuhlservices@gmail.com" className="flex gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-rose-600 rounded-xl flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy text-sm mb-0.5">Email Inquiry</h4>
                    <p className="text-brand-charcoal/60 font-semibold">stuhlservices@gmail.com</p>
                    <p className="text-[10px] text-brand-charcoal/30 font-bold uppercase tracking-wider mt-0.5">Tap to email</p>
                  </div>
                </a>

                <div className="flex gap-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan to-teal-600 rounded-xl flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy text-sm mb-0.5">Priority Service</h4>
                    <p className="text-brand-charcoal/60 font-semibold">24-Hour callback guaranteed.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-16 lg:mt-0 lg:col-span-3" delay={200}>
            {submitted ? (
              <div className="bg-white p-16 rounded-3xl shadow-xl shadow-brand-navy/5 border border-brand-navy/5 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h3 className="text-2xl text-brand-navy mb-3">Inquiry Received!</h3>
                <p className="text-brand-charcoal/50 text-lg">A project manager from Stuhl Services will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl shadow-brand-navy/5 border border-brand-navy/5">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-charcoal/40 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      placeholder="John Stuhl"
                      className="w-full px-5 py-3.5 rounded-xl border border-brand-navy/10 bg-brand-cream/50 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all font-semibold text-brand-navy placeholder:text-brand-charcoal/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-charcoal/40 uppercase tracking-wider mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 rounded-xl border border-brand-navy/10 bg-brand-cream/50 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all font-semibold text-brand-navy placeholder:text-brand-charcoal/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-charcoal/40 uppercase tracking-wider mb-2">Phone (Optional)</label>
                    <input 
                      type="tel" 
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      placeholder="(555) 000-0000"
                      className="w-full px-5 py-3.5 rounded-xl border border-brand-navy/10 bg-brand-cream/50 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all font-semibold text-brand-navy placeholder:text-brand-charcoal/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-charcoal/40 uppercase tracking-wider mb-2">Project Type</label>
                    <select 
                      value={formState.projectType}
                      onChange={(e) => setFormState({...formState, projectType: e.target.value})}
                      className="w-full px-5 py-3.5 rounded-xl border border-brand-navy/10 bg-brand-cream/50 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all font-semibold text-brand-navy appearance-none cursor-pointer"
                    >
                      <option>Bathroom</option>
                      <option>Basement</option>
                      <option>Kitchen</option>
                      <option>Custom Work</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-[11px] font-bold text-brand-charcoal/40 uppercase tracking-wider mb-2">Project Details</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="Tell us about the space you want to transform..."
                    className="w-full px-5 py-3.5 rounded-xl border border-brand-navy/10 bg-brand-cream/50 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all font-semibold text-brand-navy resize-none placeholder:text-brand-charcoal/20"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-navy text-white font-bold py-4 rounded-xl hover:bg-brand-charcoal transition-all duration-300 shadow-lg shadow-brand-navy/20 hover:shadow-xl hover:shadow-brand-navy/30 flex items-center justify-center group text-sm tracking-wide"
                >
                  Request Free Estimate
                  <Send size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </FadeInSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
