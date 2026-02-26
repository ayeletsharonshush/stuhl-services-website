
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
  CONTACT = 'contact'
}
