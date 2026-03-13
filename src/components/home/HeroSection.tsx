'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const textX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const { innerWidth, innerHeight } = window;
      x.set((e.clientX / innerWidth) - 0.5);
      y.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, x, y]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080f]">
      {/* Ambient glow blobs */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0">
        <div className="ambient-blob w-[700px] h-[700px] bg-gold-500/10 top-[-10%] left-[-15%]" />
        <div className="ambient-blob w-[600px] h-[600px] bg-blue-600/10 bottom-[-10%] right-[-10%]" />
        <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 top-[40%] left-[50%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05080f]/40 to-[#05080f]" />
      </motion.div>

      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Glass badge */}
          <motion.span
            className="inline-block glass-card-sm px-5 py-2 text-gold-400 text-xs md:text-sm tracking-[0.25em] uppercase mb-8 font-mono"
          >
            {t('welcome')}
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight text-balance drop-shadow-2xl"
          >
            {t.rich('title', {
              span: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200">{chunks}</span>,
              br: () => <br />,
            })}
          </motion.h1>

          <motion.p className="mt-6 text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed text-balance">
            {t('description')}
          </motion.p>

          <motion.div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-deepBlue-950 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm w-full sm:w-auto shadow-[0_0_30px_rgba(212,175,55,0.25)]">
              {t('explore')}
            </button>
            <button className="glass-card-sm hover:glass-card text-white px-8 py-4 font-medium transition-all hover:border-gold-500/40 uppercase tracking-wider text-sm w-full sm:w-auto">
              {t('partner')}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 sm:bottom-12 w-full flex justify-center z-10">
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/30 flex flex-col items-center hover:text-white/60 transition-colors cursor-pointer group"
          aria-label="Scroll to next section"
          onClick={() => {
            const next = document.querySelector('section:nth-of-type(2)') as HTMLElement | null;
            if (next) next.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] sm:text-xs tracking-widest uppercase mb-2">{t('discover')}</span>
          <div className="w-[1px] h-6 sm:h-12 bg-gradient-to-b from-white/30 group-hover:from-white/60 to-transparent transition-colors" />
        </motion.button>
      </div>
    </section>
  );
}
