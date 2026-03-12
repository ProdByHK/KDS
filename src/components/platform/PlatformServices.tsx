'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Platform } from '../../lib/mock-data';
import { useRef, useState, useEffect } from 'react';

interface PlatformServicesProps {
  platform: Platform;
}

// Ensure the type matches the structure in messages
type ServiceFeature = {
  name: string;
  description: string;
}

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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group perspective-1000 h-full"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-blue-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ transform: "translateZ(-10px)" }}
      />
      
      <div 
        className="h-full border border-white/5 bg-white/5 backdrop-blur-md p-8 rounded-2xl flex flex-col items-start transition-all duration-300 group-hover:border-gold-500/30 group-hover:bg-white/10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div 
          className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-6"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="w-4 h-4 rounded-full bg-gold-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        </div>
        
        <h3 
          className="text-2xl font-serif text-white mb-4"
          style={{ transform: "translateZ(30px)" }}
        >
          {service.name}
        </h3>
        
        <p 
          className="text-gray-400 leading-relaxed font-light"
          style={{ transform: "translateZ(20px)" }}
        >
          {service.description}
        </p>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-2xl" />
      </div>
    </motion.div>
  );
}

export default function PlatformServices({ platform }: PlatformServicesProps) {
  const t = useTranslations(platform.slug);
  
  // Note: Since we are using an array from messages, we can type cast this
  // It relies on the shape defined in messages/platforms-en.json
  const servicesTitle = t('servicesTitle');
  // Hack to correctly type the array from next-intl, typically it might be better handled explicitly
  const services = t.raw('services') as ServiceFeature[];

  return (
    <section className="py-24 bg-deepBlue-950 relative z-10 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-deepBlue-900 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            {servicesTitle}
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full opacity-50" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, idx) => (
            <TiltCard key={idx} index={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
