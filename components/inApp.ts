import type React from 'react';

// Links are real <a href>s so crawlers can follow them; a plain click
// switches section in-app, a modified click opens the URL normally.
export const inApp = (go: () => void) => (e: React.MouseEvent) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  go();
};
