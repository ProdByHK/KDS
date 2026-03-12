'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-deepBlue-900" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-gold-500 text-sm md:text-base tracking-[0.3em] uppercase mb-6 block font-mono">
            {t('welcome')}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight text-balance">
            {t.rich('title', {
              span: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-200">{chunks}</span>,
              br: () => <br />
            })}
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed text-balance">
            {t('description')}
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gold-600 hover:bg-gold-500 text-deepBlue-900 px-8 py-4 rounded font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm">
              {t('explore')}
            </button>
            <button className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded font-medium transition-all hover:border-gold-500 uppercase tracking-wider text-sm backdrop-blur-sm">
              {t('partner')}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center"
      >
        <span className="text-xs tracking-widest uppercase mb-2">{t('discover')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
}
