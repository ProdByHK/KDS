'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '../../../src/i18n/navigation';

const articles = [
  {
    slug: 'multimodal-freight-se-asia',
    category: 'Logistics',
    title: 'The Future of Multi-Modal Freight in SE Asia',
    date: 'February 18, 2026',
    description:
      'A deep dive into how multi-modal freight is reshaping supply chain strategy across Indonesia, Malaysia, and Vietnam — and what enterprise shippers must prepare for in 2026.',
    // TODO: Replace with real brand photography
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Container ships at a Southeast Asian port at dusk',
    accent: 'from-gold-500/25 via-gold-500/5',
  },
  {
    slug: 'ai-integration-legacy-enterprise',
    category: 'Technology',
    title: 'AI Integration Strategies for Legacy Enterprise',
    date: 'January 30, 2026',
    description:
      "Legacy enterprise systems don't have to be a liability. This piece explores practical AI integration strategies that deliver ROI without requiring a full infrastructure overhaul.",
    // TODO: Replace with real brand photography
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Abstract AI neural network visualization on dark background',
    accent: 'from-blue-500/20 via-blue-500/5',
  },
  {
    slug: 'commodity-trading-2025',
    category: 'Commodities',
    title: 'Global Commodity Trading Outlook 2025',
    date: 'January 22, 2025',
    description:
      'An in-depth look at coffee, spice, and agricultural commodity pricing dynamics heading into 2025, and what enterprise buyers need to know.',
    // TODO: Replace with real brand photography
    image: 'https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Coffee and spice commodities on a trading table',
    accent: 'from-purple-500/20 via-purple-500/5',
  },
  {
    slug: 'luxury-travel-corporate',
    category: 'Travel',
    title: 'The Rise of Bleisure: Corporate Travel Reimagined',
    date: 'January 8, 2025',
    description:
      'As executives demand more from business travel, the line between business and leisure is dissolving. How Gold Miles is redefining corporate travel programmes.',
    // TODO: Replace with real brand photography
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Business traveller in a premium airport lounge',
    accent: 'from-gold-500/25 via-gold-500/5',
  },
  {
    slug: 'supply-chain-resilience',
    category: 'Logistics',
    title: 'Building Resilient Supply Chains in Uncertain Times',
    date: 'December 12, 2024',
    description:
      'Geopolitical volatility and climate disruption are forcing enterprises to rethink single-source supply dependencies. A framework for building anti-fragile supply chains.',
    // TODO: Replace with real brand photography
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Aerial view of shipping containers at a logistics hub',
    accent: 'from-blue-500/20 via-blue-500/5',
  },
  {
    slug: 'vip-transport-expansion',
    category: 'Transportation',
    title: 'Gold Lion Expands VIP Fleet to 5 New Markets',
    date: 'November 28, 2024',
    description:
      "King David's premium transportation arm announces expansion into Singapore, Kuala Lumpur, Bangkok, Manila, and Ho Chi Minh City with an all-new luxury fleet.",
    // TODO: Replace with real brand photography
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Luxury black sedan at night for corporate transport',
    accent: 'from-purple-500/20 via-purple-500/5',
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-[#05080f] overflow-hidden">
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/6 top-0 right-0" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/5 bottom-0 left-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <span className="text-gold-400 text-xs tracking-widest uppercase font-mono">Intelligence &amp; Analysis</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif text-white mb-12"
        >
          Insights &amp; News
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <Link href={`/insights/${article.slug}`} key={article.slug}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card-hover overflow-hidden group cursor-pointer h-full flex flex-col"
              >
                {/* Cover image — IMG-01 */}
                <div className="h-48 relative overflow-hidden rounded-t-3xl shrink-0">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="glass-card-sm px-3 py-1 text-gold-400 text-xs font-mono tracking-widest uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-white/30 text-xs font-mono mb-3">{article.date}</p>
                  <h3 className="text-xl text-white font-serif mb-3 group-hover:text-gold-300 transition-colors leading-snug flex-1">
                    {article.title}
                  </h3>
                  <p className="text-white/40 text-sm line-clamp-3 mb-4">{article.description}</p>
                  <span className="text-gold-400 text-xs font-mono uppercase tracking-widest group-hover:text-gold-300 transition-colors">
                    Read Article →
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
