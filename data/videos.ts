import { VideoEntry } from '../types';

// Homeowner-tip videos. Adding a future video is a data-only edit: append a
// { title, url, description } entry (the url can be a Shorts, watch, or youtu.be
// link — the embed id is derived in the component).
export const VIDEOS: VideoEntry[] = [
  {
    title: "Why Your Bathroom Fan Isn't Stopping Mold",
    url: 'https://youtube.com/shorts/uQAjoZ5Bepw',
    description: 'One habit change that prevents a moldy wall.',
  },
  {
    title: 'The $10 Fix That Prevents Every Shower Drain Clog',
    url: 'https://youtube.com/shorts/qh5kvpCTLWg',
    description: 'The strainer that hides inside your drain and catches everything.',
  },
];

// Extract the 11-char YouTube video id from any common URL form.
export const youTubeId = (url: string): string | null => {
  const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
};

// Privacy-enhanced embed URL (youtube-nocookie.com).
export const embedUrl = (url: string): string | null => {
  const id = youTubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
};
