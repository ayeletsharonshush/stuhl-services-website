import { Section } from './types';

// The site is a state-based SPA (no router). A few sections carry a real URL,
// so the app reads the path on load and keeps it in sync.
export const PATH_SECTIONS: { path: string; section: Section }[] = [
  { path: '/portfolio', section: Section.PORTFOLIO },
  { path: '/contact', section: Section.CONTACT },
  { path: '/recommends', section: Section.RECOMMENDS },
  { path: '/videos', section: Section.VIDEOS },
];

export const sectionFromPath = (pathname?: string): Section => {
  if (pathname === undefined) {
    if (typeof window === 'undefined') return Section.HOME;
    pathname = window.location.pathname;
  }
  const p = pathname.toLowerCase();
  const match = PATH_SECTIONS.find((m) => p.startsWith(m.path));
  return match ? match.section : Section.HOME;
};

export const pathForSection = (section: Section): string =>
  PATH_SECTIONS.find((m) => m.section === section)?.path ?? '/';
