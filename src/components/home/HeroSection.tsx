'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const [isMobile, setIsMobile] = useState(false);

  // Mouse tracking for 3D parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Background layers transforms
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  
  // Text layers transforms
  const textX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-deepBlue-900 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" 
          style={{ backgroundImage: "url('/KDS/images/hero_bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deepBlue-900/50 to-deepBlue-900" />
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
      </motion.div>

      <motion.div 
        style={{ x: textX, y: textY, transformStyle: "preserve-3d" }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="preserve-3d"
        >
          <motion.span 
            style={{ translateZ: 50 }}
            className="text-gold-500 text-sm md:text-base tracking-[0.3em] uppercase mb-6 block font-mono"
          >
            {t('welcome')}
          </motion.span>
          <motion.h1 
            style={{ translateZ: 100 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight text-balance drop-shadow-2xl"
          >
            {t.rich('title', {
              span: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-yellow-200">{chunks}</span>,
              br: () => <br />
            })}
          </motion.h1>
          <motion.p 
            style={{ translateZ: 80 }}
            className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed text-balance"
          >
            {t('description')}
          </motion.p>
          
          <motion.div 
            style={{ translateZ: 60 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button className="bg-gold-600 hover:bg-gold-500 text-deepBlue-900 px-8 py-4 rounded font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm w-full sm:w-auto shadow-xl">
              {t('explore')}
            </button>
            <button className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded font-medium transition-all hover:border-gold-500 uppercase tracking-wider text-sm backdrop-blur-sm w-full sm:w-auto">
              {t('partner')}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 sm:bottom-12 w-full flex justify-center pointer-events-none">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 flex flex-col items-center"
        >
          <span className="text-[10px] sm:text-xs tracking-widest uppercase mb-2">{t('discover')}</span>
          <div className="w-[1px] h-6 sm:h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

