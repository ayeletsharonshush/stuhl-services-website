import { Section } from './types';
import { TOWNS } from './data/towns';

// The site is a state-based SPA (no router). A few sections carry a real URL,
// so the app reads the path on load and keeps it in sync.
export const PATH_SECTIONS: { path: string; section: Section }[] = [
  { path: '/portfolio', section: Section.PORTFOLIO },
  { path: '/contact', section: Section.CONTACT },
  { path: '/recommends', section: Section.RECOMMENDS },
  { path: '/videos', section: Section.VIDEOS },
];

export const pathForSection = (section: Section): string =>
  PATH_SECTIONS.find((m) => m.section === section)?.path ?? '/';

export const townPath = (slug: string): string => `/remodeling-${slug}-nj`;

const townSlugFromPath = (pathname: string): string | undefined => {
  const m = pathname.toLowerCase().match(/^\/remodeling-([a-z-]+)-nj\/?$/);
  return m && TOWNS.some((t) => t.slug === m[1]) ? m[1] : undefined;
};

// What the app is showing: a section, plus the town for town landing pages.
export interface Page {
  section: Section;
  townSlug?: string;
}

export const pageFromPath = (pathname?: string): Page => {
  if (pathname === undefined) {
    if (typeof window === 'undefined') return { section: Section.HOME };
    pathname = window.location.pathname;
  }
  const townSlug = townSlugFromPath(pathname);
  if (townSlug) return { section: Section.TOWN, townSlug };
  const p = pathname.toLowerCase();
  const match = PATH_SECTIONS.find((m) => p.startsWith(m.path));
  return { section: match ? match.section : Section.HOME };
};

export const pathForPage = (page: Page): string =>
  page.section === Section.TOWN && page.townSlug ? townPath(page.townSlug) : pathForSection(page.section);

// Every URL that gets prerendered and listed in sitemap.xml.
export const ROUTES: { path: string; priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/portfolio', priority: '0.9' },
  { path: '/contact', priority: '0.8' },
  { path: '/videos', priority: '0.8' },
  { path: '/recommends', priority: '0.6' },
  ...TOWNS.map((t) => ({ path: townPath(t.slug), priority: '0.7' })),
];
