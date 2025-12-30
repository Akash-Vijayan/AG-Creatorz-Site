
import { Service, PortfolioItem, Testimonial, FaqItem } from './types';

export const CONTACT_INFO = {
  email: "ag.creatorz.official@gmail.com",
  phone: "+91 89035 74460",
  phoneNote: "WhatsApp Call & Message Only",
  address: "Chunkankadai, Nagercoil - 629 003, Kanyakumari Dist, Tamil Nadu, India"
};

export const BRAND_QUOTES = [
  "Turning abstract visions into digital reality. ✨",
  "Design that speaks louder than words. 🎨",
  "Precision engineering for the modern web. 🚀",
  "Elevating brands through cinematic storytelling. 💎",
  "Your digital evolution starts here. 📖",
  "Minimalism meets maximum impact. ⚡"
];

export const HERO_CONTENT = {
  headline: "Building Digital Experiences That Stand Out",
  subhead: "High-performance web development, graphic design, and video editing services focused on clarity, creativity, and quality.",
  primaryCta: "Let’s Work Together",
  secondaryCta: "See Our Work"
};

export const PROFILE_CONTENT = {
  name: "Akash",
  title: "Full-Stack Creator & Digital Strategist",
  intro: "I’m Akash, the founder of AG Creatorz. I bridge the gap between technical complexity and creative excellence, delivering digital solutions that don't just look good—they perform with absolute precision.",
  button: "Curated Portfolio"
};

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: "Web Engineering",
    description: "Developing blazing-fast, responsive, and SEO-optimized digital ecosystems that serve as the cornerstone of your online identity.",
    price: "From ₹2,500",
    icon: 'web',
    details: {
      headline: "Advanced Web Solutions",
      subhead: "We build more than just websites. We engineer high-performance platforms that drive conversions and offer unparalleled user experiences.",
      features: [
        "Custom React & Next.js Platforms",
        "High-Conversion Landing Pages",
        "Performance & SEO Optimization",
        "Interactive UI/UX Prototypes"
      ],
      process: [
        "Brand DNA Discovery",
        "Wireframing & Logic Mapping",
        "Full-Stack Development",
        "Quality Assurance & Launch"
      ],
      whyChooseUs: [
        "Blazing fast load times",
        "Mobile-first philosophy",
        "Scalable clean code",
        "Strategic SEO integration"
      ]
    }
  },
  {
    id: 'design',
    title: "Brand Design",
    description: "Crafting iconic visual identities and marketing collaterals that ensure your brand cuts through the digital noise with absolute clarity.",
    price: "From ₹500",
    icon: 'design',
    details: {
      headline: "Visual Identity Design",
      subhead: "Strategic design that communicates value. We translate your brand's core mission into a cohesive and stunning visual language.",
      features: [
        "Logos & Brand Identity Systems",
        "Strategic Social Media Assets",
        "Premium Thumbnails & Creatives",
        "Marketing & Print Collateral"
      ],
      process: [
        "Visual Research & Moodboarding",
        "Conceptual Sketching",
        "Vector Refinement",
        "Asset Export & Guidelines"
      ],
      whyChooseUs: [
        "Unique, non-templated designs",
        "Consistent brand messaging",
        "High-impact visual strategy",
        "Market-ready deliverables"
      ]
    }
  },
  {
    id: 'video',
    title: "Post-Production",
    description: "Transforming raw footage into engaging, cinematic narratives designed to maximize audience retention and social reach.",
    price: "From ₹1,000",
    icon: 'video',
    details: {
      headline: "Cinematic Video Editing",
      subhead: "Storytelling refined. We use professional color grading, sound design, and motion graphics to make your content unforgettable.",
      features: [
        "Viral Short-form (Reels/TikToks)",
        "High-Production YouTube Edits",
        "Commercial & Product Promos",
        "Motion Graphics & Titles"
      ],
      process: [
        "Script & Pacing Analysis",
        "Dynamic Rough Cut",
        "Color Grading & SFX",
        "Final Render & Polish"
      ],
      whyChooseUs: [
        "Retention-focused editing",
        "Professional color science",
        "Custom sound landscapes",
        "Platform-specific optimization"
      ]
    }
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: '1', title: "Ethereal Aesthetic", category: "Brand Design", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '2', title: "Nova FinTech", category: "Web Platforms", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '3', title: "Urban Momentum", category: "Motion/Video", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '4', title: "Nexus Core", category: "Visual Identity", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '5', title: "Atlas Journey", category: "Web Design", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '6', title: "Velocity Reels", category: "Social Content", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '7', title: "Sphere Bio", category: "Modern UI", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=600&h=800" },
  { id: '8', title: "Prism Logic", category: "Brand Design", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=600&h=800" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: "Vikram Malhotra",
    role: "Marketing Director",
    quote: "Akash understands the pulse of digital branding. The web platform he built for us became our primary engine for growth within weeks.",
    image: "https://i.pravatar.cc/150?u=vikram"
  },
  {
    id: '2',
    name: "Sarah Jenkins",
    role: "Content Creator",
    quote: "The attention to detail in their video editing is insane. My audience retention numbers have never been higher.",
    image: "https://i.pravatar.cc/150?u=sarah"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  { id: '1', question: "What is your typical project timeline?", answer: "Timelines vary: Brand Design (5-10 days), Web Development (15-30 days), and Video Editing (2-4 days). We prioritize quality without compromising on efficiency." },
  { id: '2', question: "How do you handle revisions?", answer: "We provide 3 major rounds of revisions for every project phase. Our goal is to ensure the final deliverable exceeds your initial expectations." },
  { id: '3', question: "Do you offer post-launch support?", answer: "Yes, we provide 30 days of complimentary technical support for all web projects and are always available for future updates." }
];

export const LOGO_PATH = "/mnt/data/A_logo_design_in_blac";
