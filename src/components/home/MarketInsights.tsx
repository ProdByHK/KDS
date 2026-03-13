'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

// Article images: TODO: Replace with real brand photography
const articleImages = [
  {
    src: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80',
    alt: 'Container ships at a Southeast Asian port at dusk',
  },
  {
    src: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    alt: 'Abstract AI neural network visualization on dark background',
  },
];

export default function MarketInsights() {
  const t = useTranslations('Insights');

  const articles = [
    { category: t('articles.a1.category'), title: t('articles.a1.title'), date: t('articles.a1.date'), slug: t('articles.a1.slug'), description: t('articles.a1.description') },
    { category: t('articles.a2.category'), title: t('articles.a2.title'), date: t('articles.a2.date'), slug: t('articles.a2.slug'), description: t('articles.a2.description') },
  ];

  return (
    <section className="py-32 bg-[#05080f] border-t border-white/[0.04] relative overflow-hidden">
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/6 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('subtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t('title')}</h2>
          </div>
          <Link href="/insights" className="hidden md:block">
            <button
              className="text-gold-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium border-b border-gold-500/50 hover:border-white/50 pb-1"
              dangerouslySetInnerHTML={{ __html: t.raw('readAll') }}
            />
          </Link>
        </motion.div>

        {/* IMG-04: Horizontal card layout with thumbnail image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <Link href={`/insights/${article.slug}`} key={i} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: '-50px' }}
                className="glass-card-hover cursor-pointer flex flex-col sm:flex-row overflow-hidden h-full"
              >
                {/* Thumbnail — left on desktop, top on mobile — IMG-04 */}
                <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={articleImages[i].src}
                    alt={articleImages[i].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                  {/* TODO: Replace with real brand photography */}
                </div>
                <div className="flex flex-col justify-center py-5 px-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold-400 text-xs font-mono tracking-widest uppercase">{article.category}</span>
                    <span className="text-white/30 text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-xl text-white font-serif mb-3 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-white/40 text-sm line-clamp-2 mb-4">{article.description}</p>
                  <span className="text-gold-400 text-xs font-mono uppercase tracking-widest group-hover:text-gold-300 transition-colors self-start">
                    Read Article →
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
