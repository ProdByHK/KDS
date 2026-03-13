'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

export default function FeaturedKoonang() {
  const t = useTranslations('Koonang');

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden border-t border-white/[0.04]">
      {/* Ambient glow */}
      <div className="ambient-blob w-[600px] h-[600px] bg-gold-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">
            {t('featured')}
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">KOONANG</h2>
          <p className="mt-6 text-xl text-white/50 font-light max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: t('features.enterprise.title'), desc: t('features.enterprise.desc') },
            { title: t('features.ai.title'), desc: t('features.ai.desc') },
            { title: t('features.mobile.title'), desc: t('features.mobile.desc') },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, margin: '-100px' }}
              className="glass-card-hover p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* Inner glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl" />
              <div className="w-12 h-12 glass-card-sm mb-6 flex items-center justify-center text-gold-400 font-mono text-sm group-hover:scale-110 transition-transform">
                0{i + 1}
              </div>
              <h3 className="text-xl text-white font-medium mb-4">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-16 text-center"
        >
          <Link href="/ecosystem/koonang">
            <button
              className="text-white border-b border-gold-500/50 pb-1 hover:text-gold-400 transition-colors uppercase tracking-widest text-sm font-medium"
              dangerouslySetInnerHTML={{ __html: t.raw('discover') }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
