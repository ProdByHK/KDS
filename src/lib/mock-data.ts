export interface Platform {
  id: string;
  name: string;
  slug: string;
  description: string;
  sector: string;
  features: string[];
}

export const platforms: Platform[] = [
  {
    id: "koonang",
    name: "KOONANG",
    slug: "koonang",
    description: "Digital Integration Hub providing ERP, CRM, POS, mobile apps, and AI automation.",
    sector: "Technology & Digital",
    features: ["Enterprise Resource Planning", "Customer Relationship Management", "Custom App Development", "AI Automation"],
  },
  {
    id: "carry",
    name: "CARRY",
    slug: "carry",
    description: "Multi-modal logistics aggregator handling courier, cargo, sea, and air freight.",
    sector: "Logistics & Supply Chain",
    features: ["Real-time Tracking", "Multi-modal Freight", "Dynamic Rate Calculator", "Customs Clearance"],
  },
  {
    id: "gold-lion",
    name: "GOLD LION",
    slug: "gold-lion",
    description: "Premium transportation locking luxury vehicles and corporate VIP rides.",
    sector: "Transportation",
    features: ["Luxury Fleet", "Corporate Accounts", "Fixed Pricing", "Professional Chauffeurs"],
  },
  {
    id: "pasarx",
    name: "PASARX",
    slug: "pasarx",
    description: "Global commodity trading B2B marketplace for coffee, spices, and agriculture.",
    sector: "Commodity Trading",
    features: ["Verified Sellers", "Global Reach", "Market Prices", "Secure Escrow"],
  },
  {
    id: "gold-miles",
    name: "GOLD MILES",
    slug: "gold-miles",
    description: "Premium corporate travel, elite events planning, and immigration assistance.",
    sector: "Travel & Hospitality",
    features: ["Corporate Travel", "Immigration Aid", "Elite Events", "Custom Itineraries"],
  },
  {
    id: "creathinks",
    name: "CREATHINKS",
    slug: "creathinks",
    description: "Digital marketing, branding, and creative agency services.",
    sector: "Creative & Marketing",
    features: ["Brand Strategy", "Content Production", "Social Media", "Performance Marketing"],
  },
  {
    id: "tala-bhojana",
    name: "TALA BHOJANA",
    slug: "tala-bhojana",
    description: "Premium food and beverage catering aggregator for corporate dining.",
    sector: "Food & Beverage",
    features: ["Event Catering", "Corporate Lunches", "Premium Dining", "Menu Customization"],
  }
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find(p => p.slug === slug);
}
