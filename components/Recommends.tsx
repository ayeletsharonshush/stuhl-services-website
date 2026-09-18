import React from 'react';
import { ExternalLink } from 'lucide-react';
import { RECOMMEND_SECTIONS, AFFILIATE_DISCLOSURE } from '../data/recommendations';
import { RecommendedProduct } from '../types';

const ProductCard: React.FC<{ product: RecommendedProduct }> = ({ product }) => (
  <div className="flex flex-col rounded-2xl border border-brand-navy/10 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    {/* Optional image slot: rendered only when an image is provided. Sits above
        the text so a future image drops in without changing the card layout. */}
    {product.image && (
      <div className="aspect-[4/3] bg-brand-cream overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-6 sm:p-7 flex flex-col flex-grow">
      <h3 className="text-lg font-extrabold text-brand-navy leading-snug">{product.name}</h3>
      <p className="mt-3 text-sm text-brand-charcoal/70 leading-relaxed flex-grow">{product.blurb}</p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener sponsored"
        className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gold text-white font-bold text-sm rounded-full hover:bg-brand-gold/90 transition-all shadow-md shadow-brand-gold/20 hover:shadow-lg hover:shadow-brand-gold/30 self-start"
      >
        View on Amazon
        <ExternalLink size={16} />
      </a>
    </div>
  </div>
);

const Recommends: React.FC = () => {
  return (
    <div className="pt-14 sm:pt-20 pb-24 bg-brand-cream/40">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-navy">
            Products I Use On Jobs
          </h1>
          <div className="h-1.5 w-20 bg-brand-gold rounded-full mt-5 mb-7" />
          <p className="text-base sm:text-lg text-brand-charcoal/70 leading-relaxed">
            These are products I actually install and trust in my own work. I keep this list short
            on purpose: one recommendation per job, the thing I would put in my own house. The links
            are Amazon affiliate links; if you buy through them it costs you nothing extra and
            supports the free videos I make.
          </p>
          <p className="mt-4 text-xs text-brand-charcoal/50">{AFFILIATE_DISCLOSURE}</p>
        </header>

        {/* Sections */}
        <div className="mt-14 space-y-16">
          {RECOMMEND_SECTIONS.map((section) => (
            <section key={section.title}>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">{section.title}</h2>
                {section.comingSoon && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                    Coming soon
                  </span>
                )}
              </div>
              <div className="h-1 w-14 bg-brand-gold/60 rounded-full mt-2 mb-7" />

              {section.products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.products.map((product) => (
                    <ProductCard key={product.name} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-brand-navy/15 bg-white/60 p-8 text-center">
                  <p className="text-sm text-brand-charcoal/50">
                    Recommendations for this category are on the way.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommends;
