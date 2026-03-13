'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function MarketInsights() {
  const t = useTranslations('Insights');

  const articles = [
    { category: t('articles.a1.category'), title: t('articles.a1.title'), date: t('articles.a1.date') },
    { category: t('articles.a2.category'), title: t('articles.a2.title'), date: t('articles.a2.date') },
  ];

  const glows = ['from-gold-500/15', 'from-blue-500/15'];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, i) => (
            <Link href="/insights" key={i} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: '-50px' }}
                className="glass-card-hover cursor-pointer flex flex-col sm:flex-row gap-6 p-6 h-full"
              >
                {/* Thumbnail with gradient glow */}
                <div className="w-full sm:w-48 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${glows[i]} via-transparent to-transparent`} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl bg-gold-500/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                </div>
                <div className="flex flex-col justify-center py-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold-400 text-xs font-mono tracking-widest uppercase">{article.category}</span>
                    <span className="text-white/30 text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-2xl text-white font-serif mb-4 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-white/40 text-sm line-clamp-2">{t('description')}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
