import { VideoEntry } from '../types';

// Homeowner-tip videos. Adding a future video is a data-only edit: append a
// { title, url, description } entry (the url can be a Shorts, watch, or youtu.be
// link — the embed id is derived in the component). Set noProducts: true on a
// video with no recommended product (e.g. the channel intro).
export const VIDEOS: VideoEntry[] = [
  {
    title: 'Your House Talks. We Listen.',
    url: 'https://youtube.com/shorts/itJADa5A_lY',
    description: 'Why I started this channel: small fixes that stop small problems from getting expensive.',
    noProducts: true,
  },
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
  {
    title: 'The $40 Alarm That Catches Leaks Before They Ruin Your Home',
    url: 'https://youtube.com/shorts/dXfj3yxNPGc',
    description: 'Small alarms that sound the moment water touches them, before a hidden leak turns into a ruined floor.',
  },
  {
    title: 'The Hidden Fire Hazard in Your Laundry Room',
    url: 'https://youtube.com/shorts/AW4O-Asku28',
    description: 'Why a slow dryer is a warning sign, and the once-a-year vent cleaning that fixes it.',
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
