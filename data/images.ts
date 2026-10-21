// Turns an original image path ('/images/kitchen-warren-thumb.png') into the
// <img> attributes for its WebP copies. The copies and data/image-manifest.json
// come from `npm run images` (scripts/optimize-images.mjs).

import manifest from './image-manifest.json';

type Variant = { src: string; width: number; height: number };
const MANIFEST = manifest as Record<string, Variant[]>;

export interface ImageAttrs {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
}

const variantsFor = (path: string): Variant[] => {
  const variants = MANIFEST[path];
  // Fails the prerender, so a new photo can't ship without its WebP copies.
  if (!variants) throw new Error(`No WebP copies for ${path}. Run \`npm run images\`.`);
  return variants;
};

// `sizes` describes how wide the image is shown, so the browser can pick the
// smallest copy that is still sharp. width/height give its aspect ratio.
export const imageAttrs = (path: string, sizes = '100vw'): ImageAttrs => {
  const variants = variantsFor(path);
  const largest = variants[variants.length - 1];
  return {
    src: largest.src,
    ...(variants.length > 1 && {
      srcSet: variants.map((v) => `${v.src} ${v.width}w`).join(', '),
      sizes,
    }),
    width: largest.width,
    height: largest.height,
  };
};

// How wide the page heroes are shown. Shared by the <img> tags and the
// <link rel="preload"> that scripts/prerender.mjs adds for them.
export const HOME_HERO = { path: '/images/hero-main.jpg', sizes: '(min-width: 1024px) 50vw, 100vw' };
export const TOWN_HERO_SIZES = '(min-width: 1024px) 40vw, 100vw';

// The largest copy, for full-screen viewing and video posters.
export const largestImage = (path: string) => {
  const variants = variantsFor(path);
  return variants[variants.length - 1].src;
};

// The card-sized copy (800px or smaller).
export const cardImage = (path: string) => variantsFor(path)[0].src;
