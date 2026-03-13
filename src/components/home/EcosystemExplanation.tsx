'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { platforms } from '../../lib/mock-data';

export default function EcosystemExplanation() {
  const t = useTranslations('Ecosystem');

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden">
      <div className="ambient-blob w-[500px] h-[500px] bg-blue-600/8 top-0 right-0" />
      <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/6 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
            <p className="text-white/50 text-lg leading-relaxed mb-8 text-balance">{t('description')}</p>
            <div className="grid grid-cols-2 gap-8">
              <div className="glass-card-sm p-6">
                <div className="text-4xl text-white font-serif mb-2">7</div>
                <div className="text-gold-400 text-xs uppercase tracking-widest font-mono">{t('platforms')}</div>
              </div>
              <div className="glass-card-sm p-6">
                <div className="text-4xl text-white font-serif mb-2">{t('reachValue')}</div>
                <div className="text-gold-400 text-xs uppercase tracking-widest font-mono">{t('reach')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative h-[600px] glass-card flex items-center justify-center group overflow-hidden"
          >
            {/* Inner glow spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/12 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 border border-white/[0.05] rounded-full" />
              <div className="absolute inset-8 border border-white/[0.08] rounded-full" />
              <div className="absolute inset-16 border border-white/[0.08] rounded-full border-dashed" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 glass-card-sm flex items-center justify-center text-gold-400 font-serif text-xl tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.15)] z-10">
                  KDS
                </div>
              </div>

              {platforms.map((p, i) => {
                const angle = (i * (360 / 7)) * (Math.PI / 180);
                const radius = 140;
                const px = radius * Math.cos(angle);
                const py = radius * Math.sin(angle);
                return (
                  <motion.div
                    key={p.id}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute w-2.5 h-2.5 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                      style={{ left: `calc(50% + ${px}px - 5px)`, top: `calc(50% + ${py}px - 5px)` }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute w-max glass-card-sm p-2 text-xs -top-8 left-1/2 -translate-x-1/2 text-white font-mono whitespace-nowrap"
                      >
                        {p.name}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
