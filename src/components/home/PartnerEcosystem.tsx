'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function PartnerEcosystem() {
  const t = useTranslations('Partner');

  const partners = [
    { name: 'Global Bank Corp', tierKey: 'Strategic' },
    { name: 'Ocean Freight Ltd', tierKey: 'Logistics' },
    { name: 'Tech Innovators', tierKey: 'Technology' },
    { name: 'Luxury Motors', tierKey: 'Transportation' },
    { name: 'AgriTrade Global', tierKey: 'Commodities' },
    { name: 'Premium Hotels', tierKey: 'Hospitality' },
  ];

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden">
      <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 bottom-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="md:w-1/3"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">{t('description')}</p>
            <Link href="/partnership">
              <button className="glass-card-sm hover:border-gold-500/40 text-white px-6 py-3 font-medium transition-all text-sm uppercase tracking-wider inline-block">
                {t('cta')}
              </button>
            </Link>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner, i) => {
              const colors: Record<string, string> = {
                Strategic: 'border-gold-500/20 bg-gold-500/5 text-gold-400',
                Logistics: 'border-blue-500/20 bg-blue-500/5 text-blue-400',
                Technology: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400',
                Transportation: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
                Commodities: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
                Hospitality: 'border-rose-500/20 bg-rose-500/5 text-rose-400',
              };
              const accentColor = colors[partner.tierKey] || 'border-white/10 bg-white/5 text-white/50';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="glass-card-hover p-6 flex flex-col items-center justify-center text-center group h-44 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-[0.03] ${accentColor.split(' ')[2]}`} />
                  <div className={`w-14 h-14 rounded-xl border ${accentColor.split(' ')[0]} ${accentColor.split(' ')[1]} mb-4 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <span className={`text-xl font-serif font-bold ${accentColor.split(' ')[2]}`}>{partner.name[0]}</span>
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1 z-10">{partner.name}</h4>
                  <span className={`text-xs font-mono uppercase tracking-widest ${accentColor.split(' ')[2]} z-10`}>
                    {t(`tiers.${partner.tierKey}` as Parameters<typeof t>[0])}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
