'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PortfolioShowcase() {
  const t = useTranslations('Portfolio');

  const projects = [
    { title: t('projects.p1.title'), client: t('projects.p1.client') },
    { title: t('projects.p2.title'), client: t('projects.p2.client') },
    { title: t('projects.p3.title'), client: t('projects.p3.client') },
  ];

  const glows = [
    'from-gold-500/20 via-gold-500/5',
    'from-blue-500/20 via-blue-500/5',
    'from-gold-500/15 via-purple-500/5',
  ];

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden border-y border-white/[0.04]">
      <div className="ambient-blob w-[600px] h-[600px] bg-gold-500/5 top-1/2 left-1/4 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{t('title')}</h2>
          <p className="text-white/40 max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
              className={`flex-1 group cursor-pointer ${i === 1 ? 'md:-translate-y-10' : ''}`}
            >
              {/* Glass card thumbnail with gradient glow */}
              <div className="w-full aspect-[4/5] glass-card mb-6 overflow-hidden relative flex items-end">
                <div className={`absolute inset-0 bg-gradient-to-t ${glows[i]} to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-700`} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl bg-gold-500/20 opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
              </div>
              <div className="px-2 border-l border-gold-500/0 group-hover:border-gold-500/60 pl-4 transition-all duration-300">
                <div className="text-gold-400 text-xs font-mono mb-2 tracking-widest uppercase">{p.client}</div>
                <h3 className="text-xl text-white font-serif">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
