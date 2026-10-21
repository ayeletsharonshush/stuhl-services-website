// Build-time static generation: renders each route to HTML so crawlers that
// don't run JavaScript see the full page, with per-page head tags and JSON-LD.
// Runs after `vite build` and the SSR build of entry-server.tsx (see the
// "build" script in package.json). Routes and head data come from routes.ts
// and head.ts via entry-server.tsx.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const { render, ROUTES, headFor, DEFAULT_TITLE, SITE_URL } = await import(
  pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href
);
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Replace exactly one match, so a template change can't silently skip a tag.
// A string replacement is inserted literally (no `$` patterns, so "$$$" stays "$$$").
const replaceOnce = (html, pattern, replacement, what) => {
  const matches = html.match(new RegExp(pattern.source, 'g')) ?? [];
  if (matches.length !== 1) throw new Error(`expected one ${what} in dist/index.html, found ${matches.length}`);
  return html.replace(pattern, typeof replacement === 'function' ? replacement : () => replacement);
};
const setMeta = (html, attr, name, value) =>
  replaceOnce(
    html,
    new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`),
    (_, open, close) => `${open}${escapeAttr(value)}${close}`,
    `${name} meta`,
  );

if (!template.includes(`<title>${DEFAULT_TITLE}</title>`)) {
  throw new Error('index.html <title> does not match DEFAULT_TITLE in head.ts');
}

// Inline the stylesheet (Tailwind plus the font-face rules, ~10 KB gzipped) so
// no CSS request blocks the first paint, and preload the two font files the
// first screen uses so text doesn't reflow when they arrive.
const cssLink = /<link rel="stylesheet" crossorigin href="(\/assets\/index-[\w-]+\.css)">/;
const cssFile = template.match(cssLink)?.[1];
if (!cssFile) throw new Error('no built stylesheet link in dist/index.html');
const css = fs.readFileSync(path.join(dist, cssFile), 'utf8');
template = replaceOnce(template, cssLink, `<style>${css}</style>`, 'stylesheet link');

const assets = fs.readdirSync(path.join(dist, 'assets'));
const fontPreloads = [/^inter-latin-wght-normal-.*\.woff2$/, /^dm-serif-display-latin-400-normal-.*\.woff2$/].map((pattern) => {
  const file = assets.find((f) => pattern.test(f));
  if (!file) throw new Error(`no font file matching ${pattern} in dist/assets`);
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
});
template = replaceOnce(template, /<\/head>/, `  ${fontPreloads.join('\n    ')}\n  </head>`, '</head>');

const preloadImage = (img) =>
  `<link rel="preload" as="image" href="${img.src}"` +
  (img.srcSet ? ` imagesrcset="${img.srcSet}" imagesizes="${img.sizes}"` : '') +
  ` fetchpriority="high" />`;

const fileFor = (route) => (route === '/' ? 'index.html' : `${route.slice(1)}.html`);

for (const route of ROUTES) {
  const url = SITE_URL + route.path;
  const head = headFor(route.path);
  let html = template;

  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${render(route.path)}</div>`, 'root div');
  const preload = head.heroImage ? `\n    ${preloadImage(head.heroImage)}` : '';
  html = replaceOnce(html, /<\/title>/, `</title>\n    <link rel="canonical" href="${url}" />${preload}`, '</title>');
  html = setMeta(html, 'property', 'og:url', url);
  if (head.title) {
    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(head.title)}</title>`, '<title>');
    html = setMeta(html, 'property', 'og:title', head.title);
    html = setMeta(html, 'name', 'twitter:title', head.title);
  }
  if (head.description) {
    html = setMeta(html, 'name', 'description', head.description);
    html = setMeta(html, 'property', 'og:description', head.description);
    html = setMeta(html, 'name', 'twitter:description', head.description);
  }
  const jsonLd = JSON.stringify(head.jsonLd, null, 2).replace(/</g, '\\u003c');
  html = replaceOnce(
    html,
    /<!-- LocalBusiness JSON-LD: injected per page by scripts\/prerender\.mjs -->/,
    `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
    'JSON-LD placeholder'
  );

  fs.writeFileSync(path.join(dist, fileFor(route.path)), html);
  console.log(`prerendered ${route.path} -> dist/${fileFor(route.path)} (${html.length} bytes)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`wrote dist/sitemap.xml (${ROUTES.length} URLs)`);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
