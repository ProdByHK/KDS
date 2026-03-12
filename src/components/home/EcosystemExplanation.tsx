'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { platforms } from '../../lib/mock-data';

export default function EcosystemExplanation() {
  const t = useTranslations('Ecosystem');

  return (
    <section className="py-32 bg-deepBlue-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
            <p className="text-gray-300 text-lg leading-relaxed mb-8 text-balance">
              {t('description')}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl text-white font-serif mb-2">7</div>
                <div className="text-gold-500 text-xs uppercase tracking-widest font-mono">{t('platforms')}</div>
              </div>
              <div>
                <div className="text-4xl text-white font-serif mb-2">{t('reachValue')}</div>
                <div className="text-gold-500 text-xs uppercase tracking-widest font-mono">{t('reach')}</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-[600px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-8 flex items-center justify-center group"
          >
            {/* Abstract visualization of the 7 platforms orbiting */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen transition-opacity group-hover:opacity-50 duration-700" 
              style={{ backgroundImage: "url('/KDS/images/ecosystem.png')" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-100 duration-1000" />
            
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 border border-white/5 rounded-full" />
              <div className="absolute inset-8 border border-white/10 rounded-full" />
              <div className="absolute inset-16 border border-white/10 rounded-full border-dashed" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-deepBlue-900 border border-gold-500/50 rounded-full flex items-center justify-center text-gold-500 font-serif text-xl tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.2)] z-10">
                  KDS
                </div>
              </div>
              
              {/* Plotting the 7 nodes */}
              {platforms.map((p, i) => {
                const angle = (i * (360 / 7)) * (Math.PI / 180);
                const radius = 140; // Desktop radius
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                
                return (
                  <motion.div 
                    key={p.id}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute w-2 h-2 bg-gold-500 rounded-full"
                      style={{ 
                        left: `calc(50% + ${x}px - 4px)`, 
                        top: `calc(50% + ${y}px - 4px)` 
                      }}
                    >
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute w-max bg-deepBlue-900 border border-white/10 p-2 text-xs rounded -top-8 left-1/2 -translate-x-1/2 text-white font-mono whitespace-nowrap"
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
