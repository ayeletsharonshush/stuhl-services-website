
export interface Testimonial {
  text: string;
  author: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Bathroom' | 'Basement' | 'Kitchen' | 'Custom Work' | 'Storage';
  location: string;
  description: string;
  // Projects without before photos show only the finished result.
  beforeImage?: string;
  beforeImages?: string[];
  afterImages: string[];
  // Shows the whole first photo on the card, letterboxed on this colour,
  // instead of cropping it to the card's 4:3 frame.
  thumbBackground?: string;
  videoUrl?: string;
  testimonial?: Testimonial;
}

export enum Section {
  HOME = 'home',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact',
  RECOMMENDS = 'recommends',
  VIDEOS = 'videos',
  TOWN = 'town'
}

export interface VideoEntry {
  title: string;
  url: string; // YouTube URL (Shorts, watch, or youtu.be form)
  description: string;
  noProducts?: boolean; // true hides the "products from these videos" line (e.g. the channel intro)
}

export interface RecommendedProduct {
  name: string;
  section: string;
  blurb: string;
  url: string;
  image?: string;
}

export interface RecommendSection {
  title: string;
  products: RecommendedProduct[];
}
