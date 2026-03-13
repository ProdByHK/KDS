import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

const articles = [
  {
    slug: 'multimodal-freight-se-asia',
    category: 'Logistics',
    title: 'The Future of Multi-Modal Freight in SE Asia',
    date: 'Mar 5, 2025',
    author: 'KDS Intelligence Division',
    description: 'How shifting trade winds and port infrastructure investment are reshaping multi-modal corridors across Southeast Asia\'s $2.4 trillion logistics sector.',
    accent: 'from-gold-500/25',
    body: [
      'Southeast Asia\'s logistics landscape is undergoing a fundamental transformation. The growth of e-commerce, combined with major infrastructure investments from the ASEAN Connectivity Master Plan, is creating new multi-modal freight corridors that bypass traditional bottlenecks.',
      'King David CARRY has been at the forefront of this shift, integrating sea, air, and road freight under a single operational dashboard. This unified visibility allows corporate clients to dynamically route shipments based on real-time cost and speed data.',
      'Key trends driving this transformation include the rapid expansion of cold-chain logistics for agricultural exports, the digitisation of customs procedures at major ports, and the emergence of inland container depots reducing port congestion. For enterprise shippers, the winners will be those who invest in multi-modal visibility now, before the market fully matures.',
    ],
    related: ['commodity-trading-2025', 'supply-chain-resilience'],
  },
  {
    slug: 'ai-integration-legacy-enterprise',
    category: 'Technology',
    title: 'AI Integration Strategies for Legacy Enterprise',
    date: 'Feb 18, 2025',
    author: 'KDS Intelligence Division',
    description: 'Legacy ERP systems represent 60% of enterprise software spend. We examine proven migration frameworks for embedding AI without disrupting operations.',
    accent: 'from-blue-500/20',
    body: [
      'The promise of AI in enterprise operations has been discussed for years, but most organisations still run mission-critical workflows on systems built in the early 2000s. The challenge is not whether to integrate AI — it is how to do so without destabilising the systems entire supply chains depend on.',
      "Koonang's approach has been to develop middleware AI layers that sit between legacy ERPs and modern interfaces. This allows intelligent automation of purchase orders, invoice matching, and demand forecasting without requiring a full system replacement.",
      'The business case is compelling: clients implementing this approach have reported a 35% reduction in manual data entry errors and an average 22-day reduction in accounts receivable cycles. The key lesson is that AI adoption does not have to be revolutionary — it can be evolutionary, building capability incrementally while protecting operational continuity.',
    ],
    related: ['multimodal-freight-se-asia', 'luxury-travel-corporate'],
  },
  {
    slug: 'commodity-trading-2025',
    category: 'Commodities',
    title: 'Global Commodity Trading Outlook 2025',
    date: 'Jan 22, 2025',
    author: 'KDS Intelligence Division',
    description: 'An in-depth look at coffee, spice, and agricultural commodity pricing dynamics heading into 2025, and what enterprise buyers need to know.',
    accent: 'from-purple-500/20',
    body: [
      'The global commodity markets entered 2025 with significant uncertainty following two consecutive years of climate-driven supply disruptions. For buyers of coffee, spices, and agricultural products, the era of predictable spot pricing is over.',
      "PASARX, King David Service's B2B commodity trading platform, has observed a 40% increase in long-term supply contracts as buyers seek to reduce exposure to spot market volatility. The shift represents a fundamental change in procurement strategy across the food and beverage, hospitality, and manufacturing sectors.",
      'For Indonesian coffee and Sumatran spice exporters, this demand for contract certainty is an opportunity. Producers with certification, consistent quality control, and digital traceability are commanding 18-24% price premiums over uncertified equivalents. The message is clear: invest in quality assurance infrastructure now to capture premium pricing in an increasingly risk-averse global market.',
    ],
    related: ['multimodal-freight-se-asia', 'supply-chain-resilience'],
  },
  {
    slug: 'luxury-travel-corporate',
    category: 'Travel',
    title: 'The Rise of Bleisure: Corporate Travel Reimagined',
    date: 'Jan 8, 2025',
    author: 'KDS Intelligence Division',
    description: 'As executives demand more from business travel, the line between business and leisure is dissolving. How Gold Miles is redefining corporate travel programmes.',
    accent: 'from-gold-500/25',
    body: [
      "The post-pandemic enterprise traveller is not the same person who spent three days in an airport Marriott attending back-to-back meetings. Today's C-suite executive expects business travel to be an extension of their personal brand — and they are willing to allocate budget accordingly.",
      "Gold Miles has responded by redesigning its corporate travel programmes around the concept of 'bleisure' — intelligence-driven itineraries that blend high-productivity meeting schedules with curated lifestyle experiences. This includes private airport transfers, access to premium lounges, personalised hotel recommendations, and post-meeting cultural programming.",
      'The ROI argument for premium corporate travel is shifting. Companies that position executive travel as an investment in relationship quality — rather than a cost to be minimised — report higher close rates on enterprise deals that involve in-person negotiation. In a world of commoditised video calls, the executive who shows up in style makes a different impression.',
    ],
    related: ['ai-integration-legacy-enterprise', 'vip-transport-expansion'],
  },
  {
    slug: 'supply-chain-resilience',
    category: 'Logistics',
    title: 'Building Resilient Supply Chains in Uncertain Times',
    date: 'Dec 12, 2024',
    author: 'KDS Intelligence Division',
    description: 'Geopolitical volatility and climate disruption are forcing enterprises to rethink single-source supply dependencies. A framework for building anti-fragile supply chains.',
    accent: 'from-blue-500/20',
    body: [
      "The phrase 'supply chain resilience' has become a boardroom staple since 2020, but most enterprises are still far from achieving it. True resilience requires more than safety stock — it demands structural diversification of supply sources, real-time visibility across multi-tier supplier networks, and the organisational agility to re-route shipments within hours, not days.",
      "King David CARRY's network intelligence platform aggregates route performance data across sea, air, and road freight in real time. When disruptions occur — whether from weather events, port congestion, or customs delays — the system automatically surfaces alternative routing options with cost-to-delay trade-off analysis.",
      'For enterprise procurement teams, the lesson from recent disruptions is that resilience is an infrastructure investment, not an insurance policy. The companies that built multi-source supplier relationships and invested in logistics visibility before disruptions hit outperformed their peers by an average of 34% in delivery reliability during peak disruption periods.',
    ],
    related: ['multimodal-freight-se-asia', 'commodity-trading-2025'],
  },
  {
    slug: 'vip-transport-expansion',
    category: 'Transportation',
    title: 'Gold Lion Expands VIP Fleet to 5 New Markets',
    date: 'Nov 28, 2024',
    author: 'KDS Intelligence Division',
    description: "King David's premium transportation arm announces expansion into Singapore, Kuala Lumpur, Bangkok, Manila, and Ho Chi Minh City with an all-new luxury fleet.",
    accent: 'from-purple-500/20',
    body: [
      'Gold Lion Premium Transportation has completed a significant operational expansion, establishing dedicated fleets in five major Southeast Asian business capitals. The move positions King David Service to offer seamless VIP ground transportation across the region\'s highest-value corporate corridors.',
      'The expansion fleet includes the latest Mercedes-Benz S-Class, BMW 7 Series, and Lexus LM MPV configurations, all operated by professionally trained chauffeurs with corporate protocol training. Every vehicle is equipped with in-car Wi-Fi, privacy screens, and integrated booking interfaces for real-time route optimisation.',
      'For corporate clients operating across multiple ASEAN markets, the expansion means a single contracted provider can now handle executive ground transportation across their entire regional footprint. The logistics coordination benefit — a unified billing system, consistent service standards, and 24/7 regional dispatch support — has already attracted three Fortune 500 companies to regional framework agreements in the first quarter of operations.',
    ],
    related: ['luxury-travel-corporate', 'supply-chain-resilience'],
  },
];

export function generateStaticParams() {
  const locales = ['en', 'id'];
  const slugs = articles.map(a => a.slug);
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — KDS Insights`,
    description: article.description,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  unstable_setRequestLocale(params.locale);
  const article = articles.find(a => a.slug === params.slug);
  if (!article) notFound();

  const relatedArticles = article.related
    .map(slug => articles.find(a => a.slug === slug))
    .filter(Boolean) as typeof articles;

  return (
    <div className="min-h-screen bg-[#05080f] overflow-hidden">
      {/* Ambient */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/6 top-0 right-0" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/5 bottom-1/3 left-0" />

      {/* Hero */}
      <div className={`relative pt-40 pb-20 border-b border-white/[0.04] overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${article.accent} via-transparent to-transparent opacity-30`} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/30 text-xs font-mono mb-8">
            <Link href="/insights" className="hover:text-gold-400 transition-colors">
              ← Back to Insights
            </Link>
          </div>

          <span className="inline-block glass-card-sm px-3 py-1 text-gold-400 text-xs font-mono tracking-widest uppercase mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <span className="font-mono">{article.date}</span>
            <span className="w-[1px] h-4 bg-white/20" />
            <span>{article.author}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <p className="text-xl text-white/60 leading-relaxed mb-12 font-light italic border-l-2 border-gold-500/40 pl-6">
          {article.description}
        </p>
        <div className="space-y-8">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-white/65 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif text-white mb-8">Related Intelligence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(related => (
                <Link key={related.slug} href={`/insights/${related.slug}`}>
                  <div className="glass-card-hover p-6 group cursor-pointer">
                    <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">
                      {related.category}
                    </span>
                    <h3 className="text-white font-serif text-lg group-hover:text-gold-300 transition-colors mb-2 leading-snug">
                      {related.title}
                    </h3>
                    <p className="text-white/30 text-xs font-mono">{related.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/insights"
            className="inline-block text-white/50 hover:text-gold-400 transition-colors text-sm font-mono uppercase tracking-widest border-b border-white/20 hover:border-gold-500/50 pb-1"
          >
            ← View All Insights
          </Link>
        </div>
      </div>
    </div>
  );
}
