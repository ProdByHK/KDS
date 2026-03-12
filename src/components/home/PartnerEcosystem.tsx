'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PartnerEcosystem() {
  const t = useTranslations('Partner');

  const partners = [
    { name: "Global Bank Corp", tierKey: "Strategic" },
    { name: "Ocean Freight Ltd", tierKey: "Logistics" },
    { name: "Tech Innovators", tierKey: "Technology" },
    { name: "Luxury Motors", tierKey: "Transportation" },
    { name: "AgriTrade Global", tierKey: "Commodities" },
    { name: "Premium Hotels", tierKey: "Hospitality" },
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-1/3"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t('description')}
            </p>
            <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded font-medium transition-colors text-sm uppercase tracking-wider">
              {t('cta')}
            </button>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-deepBlue-900/50 border border-white/5 hover:border-gold-500/30 p-6 rounded-xl flex flex-col items-center justify-center text-center group transition-colors h-40"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 mb-4 group-hover:bg-gold-500/10 transition-colors flex items-center justify-center">
                  <span className="text-gold-500 font-serif font-bold">{partner.name[0]}</span>
                </div>
                <h4 className="text-white font-medium text-sm mb-1">{partner.name}</h4>
                <span className="text-gray-500 text-xs font-mono uppercase">
                  {t(`tiers.${partner.tierKey}` as Parameters<typeof t>[0])}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
