// Builds the WebP images the site serves from the originals in images-src/.
//
//   npm run images
//
// The code keeps referring to images by their original names
// ('/images/kitchen-warren-thumb.png'). This script finds every such reference,
// writes resized WebP copies into public/ ('/images/kitchen-warren-thumb-800.1a2b3c4d.webp',
// named by content so they can be cached for a year)
// and records them in data/image-manifest.json, which data/images.ts uses to
// fill in src, srcSet, width and height. Originals stay out of public/, so they
// are never deployed. Run it after adding or replacing a photo, and commit the
// new .webp files and the manifest.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(root, 'images-src');
const PUBLIC = path.join(root, 'public');
const MANIFEST = path.join(root, 'data/image-manifest.json');
const SCAN = ['App.tsx', 'constants.tsx', 'components', 'data'];

// Widths to produce, capped at the original's width. Photos get a card size
// and a hero/lightbox size; small graphics only what they are shown at.
const DEFAULT_WIDTHS = [800, 1600];
const WIDTHS = {
  '/images/logo.png': [160, 512],
  '/images/click-icon.png': [128],
  '/images/owner.jpg': [800],
};
const WEBP = { quality: 78, alphaQuality: 90, effort: 5 };
const QUALITY = JSON.stringify(WEBP); // part of the file hash, so new settings mean new names
const widthsFor = (ref) => WIDTHS[ref] ?? (ref.startsWith('/products/') ? [800] : DEFAULT_WIDTHS);

const files = (p) =>
  fs.statSync(p).isDirectory() ? fs.readdirSync(p).flatMap((f) => files(path.join(p, f))) : [p];

const refs = new Set();
for (const entry of SCAN) {
  for (const file of files(path.join(root, entry))) {
    if (!/\.(tsx?|json)$/.test(file) || file === MANIFEST) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/\/(?:images|products)\/[\w.-]+\.(?:png|jpe?g)/gi)) refs.add(m[0]);
  }
}

const manifest = {};
let written = 0;
for (const ref of [...refs].sort()) {
  if (fs.existsSync(path.join(PUBLIC, ref))) continue; // served as-is, like og-image.png
  const source = path.join(SRC, ref);
  if (!fs.existsSync(source)) throw new Error(`${ref} is referenced in the code but ${path.relative(root, source)} does not exist`);

  const image = sharp(source).rotate(); // apply EXIF orientation
  const { width, height } = await image.metadata().then((m) =>
    (m.orientation ?? 1) >= 5 ? { width: m.height, height: m.width } : m,
  );
  const base = ref.replace(/\.(png|jpe?g)$/i, '');
  const hash = crypto.createHash('sha1').update(fs.readFileSync(source)).update(QUALITY).digest('hex').slice(0, 8);
  const targets = [...new Set(widthsFor(ref).map((w) => Math.min(w, width)))];

  const variants = [];
  for (const w of targets) {
    const out = `${base}-${w}.${hash}.webp`;
    const outPath = path.join(PUBLIC, out);
    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      await sharp(source).rotate().resize({ width: w }).webp(WEBP).toFile(outPath);
      written++;
    }
    variants.push({ src: out, width: w, height: Math.round((height * w) / width) });
  }
  manifest[ref] = variants;

  // Remove copies made from an earlier version of this image.
  const dir = path.dirname(path.join(PUBLIC, base));
  const current = new Set(variants.map((v) => path.basename(v.src)));
  const stale = new RegExp(`^${path.basename(base).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-\\d+\\.[0-9a-f]{8}\\.webp$`);
  for (const f of fs.readdirSync(dir)) if (stale.test(f) && !current.has(f)) fs.rmSync(path.join(dir, f));
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`${Object.keys(manifest).length} images, ${written} WebP files written, manifest at ${path.relative(root, MANIFEST)}`);
