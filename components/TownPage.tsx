import React from 'react';
import { Bath, Warehouse, CookingPot, Layers, Hammer, Wrench, Phone, ShieldCheck, MapPin, Quote, CheckCircle } from 'lucide-react';
import { Town } from '../data/towns';
import { PROJECTS } from '../constants';
import { SERVICES_OFFERED, ServiceIcon, PHONE_DISPLAY, PHONE_HREF, LICENSE_NUMBER } from '../data/business';
import { inApp } from './inApp';
import { imageAttrs, TOWN_HERO_SIZES } from '../data/images';

interface TownPageProps {
  town: Town;
  onContactClick: () => void;
  onPortfolioClick: () => void;
}

const SERVICE_ICONS: Record<ServiceIcon, { icon: React.FC<{ size?: number }>; gradient: string }> = {
  bath: { icon: Bath, gradient: 'from-cyan-500 to-teal-600' },
  basement: { icon: Warehouse, gradient: 'from-blue-800 to-indigo-900' },
  kitchen: { icon: CookingPot, gradient: 'from-red-500 to-rose-600' },
  flooring: { icon: Layers, gradient: 'from-amber-500 to-yellow-600' },
  carpentry: { icon: Hammer, gradient: 'from-brand-gold to-amber-600' },
  handyman: { icon: Wrench, gradient: 'from-slate-600 to-slate-800' },
};

const projectById = (id: string) => PROJECTS.find((p) => p.id === id);

const TownPage: React.FC<TownPageProps> = ({ town, onContactClick, onPortfolioClick }) => {
  const testimonialProject = projectById(town.testimonialFrom);
  const photos = town.photos
    .map((photo) => {
      const project = photo.projectId ? projectById(photo.projectId) : undefined;
      const alt = photo.alt ?? (project && `${project.category} remodel by Stuhl Services in ${project.location}`);
      const caption = photo.caption ?? (project && { title: project.title, location: project.location });
      return { src: photo.src, alt, caption };
    })
    .filter((photo) => photo.alt);
  const [heroPhoto, ...morePhotos] = photos;

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-cream">
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-brand-cyan/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10 py-10 lg:py-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 px-4 py-1.5 bg-brand-gold/5 rounded-full">
                <MapPin size={14} />
                Serving {town.name}, NJ
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy leading-[1.1] mb-8">
                Home Remodeling in {town.name}, NJ
              </h1>
              {town.intro.map((paragraph, i) => (
                <p key={i} className="text-lg text-brand-charcoal/70 mb-5 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-row gap-3 sm:gap-4 mt-10">
                <a
                  href={PHONE_HREF}
                  className="flex-1 sm:flex-none px-6 sm:px-10 py-4 sm:py-5 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-charcoal transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base tracking-wide"
                >
                  <Phone size={18} />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href="/contact"
                  onClick={inApp(onContactClick)}
                  className="flex-1 sm:flex-none px-6 sm:px-10 py-4 sm:py-5 bg-brand-gold text-white font-bold rounded-2xl hover:bg-brand-gold/90 transition-all duration-300 shadow-lg flex items-center justify-center text-sm sm:text-base tracking-wide"
                >
                  Free Estimate
                </a>
              </div>
            </div>

            {heroPhoto && (
              <div className="lg:col-span-2 mt-14 lg:mt-0 relative">
                <figure className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/15">
                  <img
                    {...imageAttrs(heroPhoto.src, TOWN_HERO_SIZES)}
                    alt={heroPhoto.alt}
                    fetchPriority="high"
                    className="w-full h-[420px] lg:h-[520px] object-cover"
                  />
                </figure>
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-5 rounded-2xl shadow-xl border border-brand-navy/5">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-brand-cyan to-teal-600 text-white p-2.5 rounded-xl">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <p className="font-extrabold text-brand-navy text-sm">Licensed, Insured &amp; Bonded</p>
                      <p className="text-[10px] font-bold text-brand-charcoal/70 uppercase tracking-wider">NJ HIC #{LICENSE_NUMBER}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-gold to-brand-cyan"></div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-16">
            <span className="inline-block text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 px-4 py-1.5 bg-brand-gold/5 rounded-full">Services</span>
            <h2 className="text-4xl lg:text-5xl text-brand-navy">Remodeling Services in {town.name}</h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {SERVICES_OFFERED.map((service) => {
              const { icon: Icon, gradient } = SERVICE_ICONS[service.icon];
              return (
                <li key={service.title} className="bg-brand-navy/[0.04] p-5 sm:p-6 rounded-2xl border border-brand-navy/10 h-full flex items-start gap-4">
                  <div className={`w-12 h-12 shrink-0 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold mb-1 text-brand-navy">{service.title}</h3>
                    <p className="text-brand-charcoal/70 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-14 lg:py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-16">
            <span className="inline-block text-brand-cyan font-bold uppercase tracking-[0.3em] text-xs mb-4 px-4 py-1.5 bg-brand-cyan/5 rounded-full">Our Work</span>
            <h2 className="text-4xl lg:text-5xl text-brand-navy mb-4">Recent Projects Near {town.name}</h2>
            <p className="text-brand-charcoal/70 max-w-xl mx-auto">
              Real photos from our own jobs.{' '}
              <a href="/portfolio" onClick={inApp(onPortfolioClick)} className="text-brand-gold font-semibold hover:underline">
                See the full portfolio
              </a>
              .
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {morePhotos.map((photo) => (
              <figure key={photo.src} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-navy/5">
                <img
                  {...imageAttrs(photo.src, '(min-width: 768px) 33vw, 100vw')}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
                {photo.caption && (
                  <figcaption className="px-5 py-4">
                    <span className="block text-sm font-extrabold text-brand-navy">{photo.caption.title}</span>
                    <span className="block text-xs text-brand-charcoal/70 font-semibold mt-0.5">{photo.caption.location}</span>
                  </figcaption>
                )}
              </figure>
            ))}
            {testimonialProject && (
              <figure className={`bg-white rounded-3xl p-8 shadow-sm border border-brand-navy/5 flex flex-col ${morePhotos.length < 2 ? 'md:col-span-2' : ''}`}>
                <Quote className="text-brand-gold mb-4" size={28} />
                <blockquote className="text-brand-charcoal/70 leading-relaxed flex-grow">
                  “{testimonialProject.testimonial.text}”
                </blockquote>
                <figcaption className="mt-6">
                  <span className="block text-sm font-extrabold text-brand-navy">{testimonialProject.testimonial.author}</span>
                  <span className="block text-xs text-brand-charcoal/70 font-semibold mt-0.5">{testimonialProject.title}</span>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section className="py-6 lg:py-10 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-brand-navy to-brand-charcoal rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
            <div className="relative z-10 lg:grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
                  Planning a project in <span className="text-brand-gold-light italic">{town.name}?</span>
                </h2>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  Call for a free, no-obligation estimate. You talk to the owner, and every inquiry gets a callback within 24 hours.
                </p>
              </div>
              <div className="mt-10 lg:mt-0">
                <a href={PHONE_HREF} className="flex items-center gap-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-gold to-amber-600 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/70 font-bold uppercase tracking-wider">Call us</p>
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">{PHONE_DISPLAY}</p>
                  </div>
                </a>
                <a
                  href="/contact"
                  onClick={inApp(onContactClick)}
                  className="inline-block mt-8 px-8 py-4 bg-brand-gold text-white font-bold rounded-2xl hover:bg-brand-gold/90 transition-all duration-300 shadow-lg text-sm sm:text-base tracking-wide"
                >
                  Request a Free Estimate
                </a>
                <p className="mt-6 flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle size={16} className="text-brand-gold-light shrink-0" aria-hidden="true" />
                  Licensed, insured, and bonded · NJ HIC #{LICENSE_NUMBER}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TownPage;
