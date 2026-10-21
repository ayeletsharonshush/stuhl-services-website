import { pageFromPath } from './routes';
import { Section } from './types';
import { townBySlug } from './data/towns';
import { businessJsonLd } from './data/business';
import { imageAttrs, ImageAttrs, HOME_HERO, TOWN_HERO_SIZES } from './data/images';

// Must match the <title> in index.html; scripts/prerender.mjs checks this.
export const DEFAULT_TITLE = 'Stuhl Services LLC | Premium Remodeling in NJ';

export interface Head {
  title?: string; // undefined keeps index.html's title and descriptions
  description?: string;
  jsonLd: object;
  heroImage?: ImageAttrs; // preloaded, so the largest above-the-fold image starts downloading first
}

export const headFor = (path: string): Head => {
  const page = pageFromPath(path);
  const town = page.section === Section.TOWN ? townBySlug(page.townSlug) : undefined;
  if (!town) {
    return {
      jsonLd: businessJsonLd(),
      heroImage: page.section === Section.HOME ? imageAttrs(HOME_HERO.path, HOME_HERO.sizes) : undefined,
    };
  }
  return {
    title: `Home Remodeling in ${town.name}, NJ | Stuhl Services LLC`,
    description: town.metaDescription,
    jsonLd: businessJsonLd(town.areaServed),
    heroImage: imageAttrs(town.photos[0].src, TOWN_HERO_SIZES),
  };
};
