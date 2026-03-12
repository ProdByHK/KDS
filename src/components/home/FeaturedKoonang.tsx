'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function FeaturedKoonang() {
  const t = useTranslations('Koonang');

  return (
    <section className="py-32 bg-black relative border-t border-white/5 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1600&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-deepBlue-900/40 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-gold-500 text-xs tracking-widest uppercase mb-4 block font-mono">
            {t('featured')}
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tight">
            KOONANG
          </h2>
          <p className="mt-6 text-xl text-gray-400 font-light max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: t('features.enterprise.title'), desc: t('features.enterprise.desc') },
            { title: t('features.ai.title'), desc: t('features.ai.desc') },
            { title: t('features.mobile.title'), desc: t('features.mobile.desc') }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-deepBlue-900 p-8 rounded-2xl border border-white/10 hover:border-gold-500/30 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 bg-black border border-white/10 rounded-full mb-6 flex items-center justify-center text-gold-500 font-mono text-sm group-hover:scale-110 transition-transform">
                0{i+1}
              </div>
              <h3 className="text-xl text-white font-medium mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <button 
            className="text-white border-b border-gold-500 pb-1 hover:text-gold-500 transition-colors uppercase tracking-widest text-sm font-medium"
            dangerouslySetInnerHTML={{ __html: t.raw('discover') }} 
          />
        </motion.div>
      </div>
    </section>
  );
}
