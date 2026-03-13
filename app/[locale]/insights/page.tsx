'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const articles = [
  {
    slug: 'multimodal-freight-se-asia',
    category: 'Logistics',
    title: 'The Future of Multi-Modal Freight in SE Asia',
    date: 'Mar 5, 2025',
    description: 'How shifting trade winds and port infrastructure investment are reshaping multi-modal corridors across Southeast Asia\'s $2.4 trillion logistics sector.',
    accent: 'from-gold-500/25 via-gold-500/5',
  },
  {
    slug: 'ai-integration-legacy-enterprise',
    category: 'Technology',
    title: 'AI Integration Strategies for Legacy Enterprise',
    date: 'Feb 18, 2025',
    description: 'Legacy ERP systems represent 60% of enterprise software spend. We examine proven migration frameworks for embedding AI without disrupting operations.',
    accent: 'from-blue-500/20 via-blue-500/5',
  },
  {
    slug: 'commodity-trading-2025',
    category: 'Commodities',
    title: 'Global Commodity Trading Outlook 2025',
    date: 'Jan 22, 2025',
    description: 'An in-depth look at coffee, spice, and agricultural commodity pricing dynamics heading into 2025, and what enterprise buyers need to know.',
    accent: 'from-purple-500/20 via-purple-500/5',
  },
  {
    slug: 'luxury-travel-corporate',
    category: 'Travel',
    title: 'The Rise of Bleisure: Corporate Travel Reimagined',
    date: 'Jan 8, 2025',
    description: 'As executives demand more from business travel, the line between business and leisure is dissolving. How Gold Miles is redefining corporate travel programmes.',
    accent: 'from-gold-500/25 via-gold-500/5',
  },
  {
    slug: 'supply-chain-resilience',
    category: 'Logistics',
    title: 'Building Resilient Supply Chains in Uncertain Times',
    date: 'Dec 12, 2024',
    description: 'Geopolitical volatility and climate disruption are forcing enterprises to rethink single-source supply dependencies. A framework for building anti-fragile supply chains.',
    accent: 'from-blue-500/20 via-blue-500/5',
  },
  {
    slug: 'vip-transport-expansion',
    category: 'Transportation',
    title: 'Gold Lion Expands VIP Fleet to 5 New Markets',
    date: 'Nov 28, 2024',
    description: "King David's premium transportation arm announces expansion into Singapore, Kuala Lumpur, Bangkok, Manila, and Ho Chi Minh City with an all-new luxury fleet.",
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
                <div className="h-48 relative overflow-hidden rounded-t-3xl shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${article.accent} to-transparent`} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl bg-gold-500/15 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
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
