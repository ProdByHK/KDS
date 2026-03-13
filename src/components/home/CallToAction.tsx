'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function CallToAction() {
  const t = useTranslations('CTA');

  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-[60vh] bg-[#05080f]">
      {/* Multi-blob ambient background */}
      <div className="ambient-blob w-[600px] h-[600px] bg-gold-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/6 top-0 right-0" />
      <div className="ambient-blob w-[300px] h-[300px] bg-gold-500/5 bottom-0 left-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-20 relative overflow-hidden"
        >
          {/* Inner glow accent */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,_var(--tw-gradient-stops))] from-gold-500/10 to-transparent" />

          <div className="relative z-10">
            <div className="w-14 h-14 mx-auto glass-card-sm flex items-center justify-center mb-8">
              <div className="w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            </div>
            <h2
              className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }}
            />
            <p className="text-xl text-white/50 font-light mb-12 max-w-2xl mx-auto text-balance">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-deepBlue-950 px-10 py-5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(212,175,55,0.25)]">
                  {t('buttons.schedule')}
                </button>
              </Link>
              <span className="text-white/30 font-serif italic">{t('buttons.or')}</span>
              <Link href="/ecosystem">
                <button className="w-full sm:w-auto glass-card-sm hover:border-gold-500/40 text-white px-10 py-5 font-medium transition-all uppercase tracking-wider text-sm">
                  {t('buttons.deck')}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
