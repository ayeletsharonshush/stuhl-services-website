import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { RECOMMEND_SECTIONS, AFFILIATE_DISCLOSURE } from '../data/recommendations';
import { RecommendedProduct, RecommendSection } from '../types';

// Card width drives both the flex-basis of a card and how far an arrow click
// scrolls. Kept in one place so the two can't drift apart.
const CARD_W = 'w-[280px] sm:w-[300px] lg:w-[320px]';
const SCROLL_STEP = 300 + 20; // card + gap, close enough for a one-card nudge

const ProductCard: React.FC<{ product: RecommendedProduct }> = ({ product }) => (
  <article
    className={`${CARD_W} shrink-0 snap-start flex flex-col rounded-2xl border border-brand-navy/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
  >
    {/* Fixed-height image area so cards in a row line up regardless of the
        shot's aspect. These are product photos on white, so contain (never
        crop) and keep the plate white. */}
    {product.image && (
      <div className="h-36 sm:h-40 bg-white border-b border-brand-navy/5 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    )}
    <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
      <h3 className="text-lg font-extrabold text-brand-navy leading-snug">{product.name}</h3>
      <p className="mt-2 text-sm text-brand-charcoal/70 leading-relaxed flex-grow">
        {product.blurb}
      </p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener sponsored"
        className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-gold text-white font-bold text-sm rounded-full hover:bg-brand-gold/90 transition-all shadow-md shadow-brand-gold/20 hover:shadow-lg hover:shadow-brand-gold/30 self-start"
      >
        View on Amazon
        <ExternalLink size={16} />
      </a>
    </div>
  </article>
);

// Horizontal, snap-scrolling row of cards. Touch-scrolls on phones (with the
// next card peeking past the gutter so it reads as scrollable); on desktop it
// only grows arrows when the row actually overflows.
const ProductRow: React.FC<{ section: RecommendSection }> = ({ section }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setOverflow(max > 4);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure]);

  const nudge = (dir: -1 | 1) =>
    ref.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' });

  const arrowBase =
    'hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white text-brand-navy border border-brand-navy/10 shadow-lg hover:bg-brand-cream transition-all disabled:opacity-0 disabled:pointer-events-none';

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-5 px-5 scroll-px-5 sm:-mx-1 sm:px-1 sm:scroll-px-1"
      >
        {section.products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      {overflow && (
        <>
          <button
            type="button"
            aria-label={`Scroll ${section.title} products left`}
            onClick={() => nudge(-1)}
            disabled={atStart}
            className={`${arrowBase} -left-3`}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${section.title} products right`}
            onClick={() => nudge(1)}
            disabled={atEnd}
            className={`${arrowBase} -right-3`}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
};

const Recommends: React.FC = () => {
  return (
    <div className="pt-4 sm:pt-5 pb-20 bg-brand-cream/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header. Kept tight so the title, intro and the first product row all
            land above the fold on a laptop. */}
        <header className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
            My Recommendations
          </h1>
          <div className="h-1.5 w-20 bg-brand-gold rounded-full mt-2.5 mb-3" />
          <p className="text-sm sm:text-base text-brand-charcoal/70 leading-relaxed">
            These are products I actually install and trust in my own work. I keep this list short
            on purpose: one recommendation per job, the thing I would put in my own house. The links
            are Amazon affiliate links; if you buy through them it costs you nothing extra and
            supports the free videos I make.
          </p>
          <p className="mt-2 text-xs text-brand-charcoal/50">{AFFILIATE_DISCLOSURE}</p>
        </header>

        {/* Room sections */}
        <div className="mt-5 space-y-8">
          {RECOMMEND_SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                {section.title}
              </h2>
              <div className="h-1 w-14 bg-brand-gold/60 rounded-full mt-2 mb-3" />
              <ProductRow section={section} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommends;
