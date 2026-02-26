
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { Quote, MoveRight, X, Eye, MapPin, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const thumb = (src: string) => src.replace('/images/', '/images/thumbs/');

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

const Lightbox: React.FC<{
  images: string[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex(i => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setCurrentIndex(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i => (i - 1 + images.length) % images.length); }}
            className="absolute left-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i => (i + 1) % images.length); }}
            className="absolute right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <img
        src={images[currentIndex]}
        alt={`Photo ${currentIndex + 1}`}
        className="max-w-[95vw] max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Bathroom', 'Basement', 'Kitchen'];
  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  useEffect(() => {
    if (activeProject || lightboxImages) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeProject, lightboxImages]);

  const getAllProjectImages = (project: Project): string[] => {
    const befores = project.beforeImages || [project.beforeImage];
    return [...befores, ...project.afterImages];
  };

  return (
    <div className="py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="inline-block text-brand-red font-bold uppercase tracking-[0.3em] text-xs mb-4 px-4 py-1.5 bg-brand-red/5 rounded-full">Proven Excellence</span>
            <h2 className="text-5xl text-brand-navy mb-6">Our Transformations</h2>
            <p className="text-brand-charcoal/50 max-w-2xl mx-auto text-lg mb-10">Real projects from homeowners across New Jersey. Every image is from our actual work.</p>
            
            <div className="flex justify-center gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    filter === cat
                      ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20'
                      : 'bg-white text-brand-charcoal/50 hover:text-brand-navy border border-brand-navy/5'
                  }`}
                >
                  {cat} {cat !== 'All' && <span className="text-xs opacity-60">({PROJECTS.filter(p => cat === 'All' || p.category === cat).length})</span>}
                </button>
              ))}
            </div>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeInSection key={project.id} delay={idx * 100}>
              <div 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-navy/5 flex flex-col group cursor-pointer hover:-translate-y-2"
                onClick={() => setActiveProject(project)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={thumb(project.afterImages[0])} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-5 left-5 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-brand-navy text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                      {project.category}
                    </span>
                    {project.videoUrl && (
                      <span className="bg-brand-gold/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                        <Play size={10} fill="white" /> Video
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-5 left-5">
                    <span className="bg-brand-navy/80 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <MapPin size={10} /> {project.location}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-brand-navy/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="bg-white text-brand-navy p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Eye size={28} />
                    </div>
                  </div>
                </div>
                
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-lg font-extrabold mb-2 text-brand-navy group-hover:text-brand-gold transition-colors duration-300">{project.title}</h3>
                  <p className="text-brand-charcoal/50 text-sm mb-5 leading-relaxed line-clamp-2">{project.description}</p>
                  
                  <div className="mt-auto pt-5 border-t border-brand-navy/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center text-[8px] font-bold text-brand-red">B</div>
                      <div className="w-6 h-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-[8px] font-bold text-brand-cyan">A</div>
                      <span className="text-[10px] font-bold text-brand-charcoal/30 uppercase tracking-wider ml-1">Before / After</span>
                    </div>
                    <span className="text-[11px] font-bold text-brand-navy group-hover:text-brand-gold transition-colors flex items-center gap-1">
                      Details <MoveRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          <div 
            className="absolute inset-0 bg-brand-charcoal/90 backdrop-blur-md" 
            onClick={() => setActiveProject(null)} 
          />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto animate-fade-up">
            <div className="sticky top-0 z-50 flex justify-end p-5">
              <button 
                onClick={() => setActiveProject(null)}
                className="p-3 bg-brand-navy/5 hover:bg-brand-red hover:text-white text-brand-navy rounded-full transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="px-8 pb-12 lg:px-16 lg:pb-16 -mt-4">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block text-brand-gold font-bold text-xs tracking-[0.3em] uppercase px-3 py-1 bg-brand-gold/5 rounded-full">{activeProject.category}</span>
                  <span className="text-brand-charcoal/30 text-xs font-semibold flex items-center gap-1"><MapPin size={11} /> {activeProject.location}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl text-brand-navy mb-4">{activeProject.title}</h2>
                <p className="text-brand-charcoal/50 text-lg max-w-3xl leading-relaxed">{activeProject.description}</p>
                <p className="text-brand-charcoal/30 text-xs mt-3 italic">Tap any photo to view full size</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-12">
                {(activeProject.beforeImages || [activeProject.beforeImage]).map((img, i) => (
                  <div key={`before-${i}`} className="group">
                    <div
                      className="relative rounded-2xl overflow-hidden border border-brand-navy/5 aspect-[9/16] cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); openLightbox(getAllProjectImages(activeProject), i); }}
                    >
                      <img 
                        src={thumb(img)} 
                        alt={`Before ${i + 1}`} 
                        className="w-full h-full object-cover bg-slate-50 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-brand-red/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Before</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full">
                          <Eye size={18} className="text-brand-navy" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-12">
                {activeProject.afterImages.map((img, i) => {
                  const beforeCount = (activeProject.beforeImages || [activeProject.beforeImage]).length;
                  return (
                    <div key={`after-${i}`} className="group">
                      <div
                        className={`relative ${activeProject.category === 'Kitchen' ? 'aspect-[16/9]' : 'aspect-[9/16]'} rounded-2xl overflow-hidden shadow-lg shadow-brand-navy/10 border border-brand-cyan/10 cursor-pointer`}
                        onClick={(e) => { e.stopPropagation(); openLightbox(getAllProjectImages(activeProject), beforeCount + i); }}
                      >
                        <img 
                          src={thumb(img)} 
                          alt={`After ${i + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 bg-brand-cyan/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">After</span>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full">
                            <Eye size={18} className="text-brand-navy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {activeProject.videoUrl && (
                <div className="mb-12">
                  <h4 className="text-xs font-bold text-brand-charcoal/30 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <Play size={14} className="text-brand-gold" /> Project Video Walkthrough
                  </h4>
                  <div className="rounded-2xl overflow-hidden border border-brand-navy/5 shadow-lg bg-black">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-auto max-h-[500px] mx-auto"
                      poster={thumb(activeProject.afterImages[0])}
                    >
                      <source src={activeProject.videoUrl} type="video/quicktime" />
                      <source src={activeProject.videoUrl} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  </div>
                </div>
              )}

              <div className="bg-brand-navy rounded-3xl p-8 lg:p-14 relative overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl -mt-20"></div>
                <Quote className="text-brand-gold/30 mx-auto mb-6" size={48} />
                <div className="relative z-10 max-w-3xl mx-auto">
                  <p className="text-xl lg:text-2xl font-medium text-white italic leading-relaxed mb-8">
                    "{activeProject.testimonial.text}"
                  </p>
                  <div className="w-8 h-0.5 bg-brand-gold mx-auto mb-4"></div>
                  <p className="font-extrabold text-brand-gold text-sm uppercase tracking-wider">{activeProject.testimonial.author}</p>
                  <p className="text-brand-cyan/60 text-xs font-semibold mt-1 tracking-wider">{activeProject.testimonial.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImages && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxImages(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
