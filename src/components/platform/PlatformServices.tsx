'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Platform } from '../../lib/mock-data';
import { useRef, useState, useEffect } from 'react';

interface PlatformServicesProps {
  platform: Platform;
}

type ServiceFeature = {
  name: string;
  description: string;
};

function TiltCard({ service, index }: { service: ServiceFeature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { if (!prefersReducedMotion) { x.set(0); y.set(0); } };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ rotateX: prefersReducedMotion ? 0 : rotateX, rotateY: prefersReducedMotion ? 0 : rotateY, transformStyle: 'preserve-3d' }}
      className="relative group h-full"
    >
      {/* Glow halo behind on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/15 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ transform: 'translateZ(-10px)' }} />

      <div className="glass-card-hover h-full p-8 flex flex-col items-start" style={{ transform: 'translateZ(20px)' }}>
        {/* Inner glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold-500/8 to-transparent rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="w-12 h-12 rounded-2xl glass-card-sm mb-6 flex items-center justify-center" style={{ transform: 'translateZ(40px)' }}>
          <div className="w-3 h-3 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.7)]" />
        </div>
        <h3 className="text-2xl font-serif text-white mb-4" style={{ transform: 'translateZ(30px)' }}>{service.name}</h3>
        <p className="text-white/40 leading-relaxed font-light" style={{ transform: 'translateZ(20px)' }}>{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function PlatformServices({ platform }: PlatformServicesProps) {
  const t = useTranslations(platform.slug);
  const servicesTitle = t('servicesTitle');
  const services = t.raw('services') as ServiceFeature[];

  return (
    <section className="py-24 bg-[#05080f] relative overflow-hidden">
      <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 top-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{servicesTitle}</h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <TiltCard key={idx} index={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
