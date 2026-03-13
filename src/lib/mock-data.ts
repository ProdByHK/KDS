export interface Platform {
  id: string;
  name: string;
  slug: string;
  description: string;
  sector: string;
  features: string[];
  instagram: string;
}

export const platforms: Platform[] = [
  {
    id: "koonang",
    name: "KOONANG",
    slug: "koonang",
    description: "Digital Integration Hub providing ERP, CRM, POS, mobile apps, and AI automation.",
    sector: "Technology & Digital",
    features: ["Enterprise Resource Planning", "Customer Relationship Management", "Custom App Development", "AI Automation"],
    instagram: "koonang.digital",
  },
  {
    id: "carry",
    name: "CARRY",
    slug: "carry",
    description: "Multi-modal logistics aggregator handling courier, cargo, sea, and air freight.",
    sector: "Logistics & Supply Chain",
    features: ["Real-time Tracking", "Multi-modal Freight", "Dynamic Rate Calculator", "Customs Clearance"],
    instagram: "carry_logistics",
  },
  {
    id: "gold-lion",
    name: "GOLD LION",
    slug: "gold-lion",
    description: "Premium transportation locking luxury vehicles and corporate VIP rides.",
    sector: "Transportation",
    features: ["Luxury Fleet", "Corporate Accounts", "Fixed Pricing", "Professional Chauffeurs"],
    instagram: "goldlion.official",
  },
  {
    id: "pasareu",
    name: "PASAREU",
    slug: "pasareu",
    description: "Export aggregator facilitating seamless trade from Indonesia to the European market.",
    sector: "Export & Trade",
    features: ["European Compliance", "Trade Facilitation", "Logistics Integration", "Market Access"],
    instagram: "pasareu.official",
  },
  {
    id: "gold-miles",
    name: "GOLD MILES",
    slug: "gold-miles",
    description: "Premium corporate travel, elite events planning, and immigration assistance.",
    sector: "Travel & Hospitality",
    features: ["Corporate Travel", "Immigration Aid", "Elite Events", "Custom Itineraries"],
    instagram: "goldmiles_",
  },
  {
    id: "customized-service",
    name: "CUSTOMIZED SERVICE",
    slug: "customized-service",
    description: "Creative agency services including branding, marketing, and bespoke corporate solutions.",
    sector: "Creative & Professional Services",
    features: ["Brand Strategy", "Content Production", "Marketing Solutions", "Bespoke Consulting"],
    instagram: "crea.thinks",
  },
  {
    id: "kds-kitchen",
    name: "KDS KITCHEN",
    slug: "kds-kitchen",
    description: "Premium catering and culinary services for corporate events and fine dining.",
    sector: "F&B & Hospitality",
    features: ["Corporate Catering", "Event Dining", "Menu Curation", "Premium Service"],
    instagram: "talabhojana",
  }
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find(p => p.slug === slug);
}
