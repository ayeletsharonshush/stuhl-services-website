
export interface Testimonial {
  text: string;
  author: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Bathroom' | 'Basement' | 'Kitchen' | 'Custom' | 'Storage';
  location: string;
  description: string;
  beforeImage: string;
  beforeImages?: string[];
  afterImages: string[];
  videoUrl?: string;
  testimonial: Testimonial;
}

export enum Section {
  HOME = 'home',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact',
  RECOMMENDS = 'recommends',
  VIDEOS = 'videos'
}

export interface VideoEntry {
  title: string;
  url: string; // YouTube URL (Shorts, watch, or youtu.be form)
  description: string;
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
