'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Platform } from '../../lib/mock-data';
import { useEffect, useState } from 'react';

const platformThemes: Record<string, { image: string; accent: string }> = {
  koonang:      { image: 'https://images.unsplash.com/photo-1655720033654-a4239dd42d10?q=80&w=2000&auto=format&fit=crop', accent: 'bg-blue-500/15' },
  carry:        { image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=2000&auto=format&fit=crop', accent: 'bg-indigo-500/15' },
  'gold-lion':  { image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop', accent: 'bg-gold-500/10' },
  pasarx:       { image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2000&auto=format&fit=crop', accent: 'bg-amber-500/15' },
  'gold-miles': { image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop', accent: 'bg-gold-500/10' },
  creathinks:   { image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop', accent: 'bg-purple-500/15' },
  'tala-bhojana': { image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop', accent: 'bg-orange-500/15' },
};

const defaultTheme = { image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop', accent: 'bg-blue-500/10' };

interface PlatformHeroProps {
  platform: Platform;
}

export default function PlatformHero({ platform }: PlatformHeroProps) {
  const tp = useTranslations('Platforms');
  const tPlatform = useTranslations(platform.slug);
  const theme = platformThemes[platform.slug] ?? defaultTheme;
  
  // Parallax on scroll
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  
  // 3D Parallax on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseX, springConfig);

  // Map mouse position to rotation and translation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const translateX1 = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const translateY1 = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const translateX2 = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const translateY2 = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setPrefersReducedMotion(true); // Degrade gracefully on mobile
      } else {
        setPrefersReducedMotion(mediaQuery.matches);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden perspective-1000">
      <div className="absolute inset-0 z-0 bg-deepBlue-900 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-screen transition-opacity duration-1000"
          style={{ backgroundImage: `url('${theme.image}')` }}
        />
        {/* Animated Background Layers */}
        <motion.div 
          style={{ 
            y: prefersReducedMotion ? 0 : y1,
            x: prefersReducedMotion ? 0 : translateX1,
            translateY: prefersReducedMotion ? 0 : translateY1,
          }}
          className={`absolute top-1/4 -left-1/4 w-[600px] h-[600px] ${theme.accent} rounded-full blur-3xl opacity-50 mix-blend-screen`}
        />
        <motion.div 
          style={{ 
            y: prefersReducedMotion ? 0 : y2,
            x: prefersReducedMotion ? 0 : translateX2,
            translateY: prefersReducedMotion ? 0 : translateY2,
          }}
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-40 mix-blend-screen"
        />
        
        {/* Subtle grid pattern for depth perspective */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 preserve-3d"
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="preserve-3d"
        >
          <motion.div 
            style={{ translateZ: prefersReducedMotion ? 0 : 50 }} 
            className="mb-8 inline-block bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs tracking-[0.2em] text-gold-500 uppercase font-medium backdrop-blur-md shadow-lg"
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
            className="mt-6 text-xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed text-balance"
          >
            {tPlatform('description')}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 w-full flex justify-center pointer-events-none z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-500 flex flex-col items-center"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold-500 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
