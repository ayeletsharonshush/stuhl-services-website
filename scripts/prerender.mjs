// Build-time static generation: renders each route to HTML so crawlers that
// don't run JavaScript see the full page. Runs after `vite build` and the SSR
// build of entry-server.tsx (see the "build" script in package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE = 'https://stuhlservices.com';

// Every URL the app answers to. `file` is what Netlify serves for that path.
const ROUTES = [
  { path: '/', file: 'index.html', priority: '1.0' },
  { path: '/portfolio', file: 'portfolio.html', priority: '0.9' },
  { path: '/contact', file: 'contact.html', priority: '0.8' },
  { path: '/videos', file: 'videos.html', priority: '0.8' },
  { path: '/recommends', file: 'recommends.html', priority: '0.6' },
];

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('root div not found in dist/index.html');

for (const route of ROUTES) {
  const url = SITE + route.path;
  const html = template
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`)
    .replace('</title>', `</title>\n    <link rel="canonical" href="${url}" />`);
  fs.writeFileSync(path.join(dist, route.file), html);
  console.log(`prerendered ${route.path} -> dist/${route.file} (${html.length} bytes)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote dist/sitemap.xml');

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
