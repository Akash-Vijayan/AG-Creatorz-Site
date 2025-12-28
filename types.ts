
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: 'design' | 'video' | 'web';
  details?: {
    headline: string;
    subhead: string;
    features: string[]; // Maps to "Services Included"
    process: string[];
    pricingPlans?: { name: string; price: string }[];
    whyChooseUs?: string[];
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type PricingTier = 'basic' | 'pro' | 'custom';
export type PaymentFrequency = 'monthly' | 'onetime';

// Navigation Types
export type ViewState = 'home' | 'services-hub' | 'service-detail' | 'about-page' | 'contact-page' | 'portfolio-page';

// Theme Types
export type Theme = 'light' | 'dark' | 'system';
