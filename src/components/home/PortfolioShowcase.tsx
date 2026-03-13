'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PortfolioShowcase() {
  const t = useTranslations('Portfolio');

  const projects = [
    { title: t('projects.p1.title'), client: t('projects.p1.client'), img: "" },
    { title: t('projects.p2.title'), client: t('projects.p2.client'), img: "" },
    { title: t('projects.p3.title'), client: t('projects.p3.client'), img: "" }
  ];

  return (
    <section className="py-32 bg-deepBlue-900 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex-1 group cursor-pointer ${i === 1 ? 'md:-translate-y-12' : ''}`}
            >
              <div className={`w-full aspect-[4/5] rounded-2xl bg-white/5 border border-white/10 mb-6 overflow-hidden relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-deepBlue-900 via-transparent to-transparent transition-opacity duration-500" />
              </div>
              <div className="px-2 border-l border-gold-500/0 group-hover:border-gold-500/100 pl-4 transition-all duration-300">
                <div className="text-gold-500 text-xs font-mono mb-2 tracking-widest uppercase">{p.client}</div>
                <h3 className="text-xl text-white font-serif">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
