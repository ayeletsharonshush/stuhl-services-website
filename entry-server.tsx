import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { ROUTES } from './routes';
export { headFor, DEFAULT_TITLE } from './head';
export { SITE_URL } from './data/business';

// Used only at build time by scripts/prerender.mjs.
export function render(path: string): string {
  return renderToString(
    <React.StrictMode>
      <App initialPath={path} />
    </React.StrictMode>
  );
}
