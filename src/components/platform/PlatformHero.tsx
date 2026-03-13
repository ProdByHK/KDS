'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Platform } from '../../lib/mock-data';
import { useEffect, useState } from 'react';
import { Link } from '../../i18n/navigation';

interface PlatformHeroProps {
  platform: Platform;
}

export default function PlatformHero({ platform }: PlatformHeroProps) {
  const tp = useTranslations('Platforms');
  const tPlatform = useTranslations(platform.slug);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);
  const translateX1 = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const translateX2 = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const checkMobile = () => setPrefersReducedMotion(window.innerWidth < 768 || mediaQuery.matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    if (!prefersReducedMotion) window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#05080f]">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : y1, x: prefersReducedMotion ? 0 : translateX1 }}
          className="ambient-blob w-[700px] h-[700px] bg-gold-500/8 top-[-10%] left-[-10%]"
        />
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : y2, x: prefersReducedMotion ? 0 : translateX2 }}
          className="ambient-blob w-[500px] h-[500px] bg-blue-600/10 bottom-0 right-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 preserve-3d"
        style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY }}
      >
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20">
          <Link href="/ecosystem" className="text-white/30 hover:text-gold-400 transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2">
            <span>←</span> {useTranslations('Footer')('links.ecosystem' as never) || 'Back to Ecosystem'}
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glass sector badge */}
          <motion.div
            style={{ translateZ: prefersReducedMotion ? 0 : 50 }}
            className="mb-8 inline-block glass-card-sm px-5 py-2 text-xs tracking-[0.2em] text-gold-400 uppercase font-medium"
          >
            {tp(`items.${platform.id}.sector`)}
          </motion.div>

          <motion.h1
            style={{ translateZ: prefersReducedMotion ? 0 : 100 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-none tracking-tight text-balance drop-shadow-2xl"
          >
            {platform.name}
          </motion.h1>

          <motion.p
            style={{ translateZ: prefersReducedMotion ? 0 : 75 }}
            className="mt-6 text-xl md:text-3xl text-white/50 max-w-4xl mx-auto font-light leading-relaxed text-balance"
          >
            {tPlatform('description')}
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 w-full flex justify-center pointer-events-none z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/20 flex flex-col items-center"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold-400/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
