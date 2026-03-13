'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Platform, platforms } from '../../lib/mock-data';
import { Link } from '../../i18n/navigation';
import { useRef, useState, useEffect } from 'react';

// Platform background images — IMG-02
// TODO: Replace all Unsplash URLs with real KDS brand photography per platform
const platformImages: Record<string, { src: string; alt: string }> = {
  koonang: {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    alt: 'Dark server room with glowing enterprise technology infrastructure',
  },
  carry: {
    src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    alt: 'Shipping containers stacked at a busy logistics port',
  },
  'gold-lion': {
    src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    alt: 'Luxury black sedan for VIP corporate transportation',
  },
  pasareu: {
    src: 'https://images.unsplash.com/photo-1595665593673-bf1ad72905c0?auto=format&fit=crop&w=800&q=80',
    alt: 'Export hub facilitating trade from Indonesia to Europe',
  },
  'gold-miles': {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    alt: 'Premium airport lounge for business travel and hospitality',
  },
  'customized-service': {
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    alt: 'Creative design studio with branding and marketing workspace',
  },
  'kds-kitchen': {
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    alt: 'Premium corporate catering and fine dining setup',
  },
};

function PlatformCard({ platform, index }: { platform: Platform; index: number }) {
  const t = useTranslations('Platforms');
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  };

  const img = platformImages[platform.id];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="h-80"
    >
      <Link href={`/ecosystem/${platform.slug}`} className="block h-full cursor-pointer">
        {/* IMG-02: Background image with glass overlay */}
        <div className="relative h-full rounded-3xl overflow-hidden group transition-all duration-500 border border-white/[0.08] hover:border-white/[0.15]">
          {/* Background image */}
          {img && (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {/* Glass overlay — keeps text legible */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] group-hover:bg-black/40 transition-all duration-300" />
          {/* Bottom gradient glow spotlight */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Card content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
            <div className="text-amber-400 text-xs font-mono mb-3 tracking-widest uppercase">
              {t(`items.${platform.id}.sector`)}
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">{platform.name}</h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="text-white/70 text-sm line-clamp-2 mt-2">
                {t(`items.${platform.id}.description`)}
              </p>
            </div>
          </div>

          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function PlatformGrid() {
  const t = useTranslations('Platforms');

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden">
      {/* Section ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/5 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/5 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-white/50 text-lg">{t('description')}</p>
          </div>
          <Link
            href="/ecosystem"
            className="hidden md:inline-flex text-gold-400 border-b border-gold-500/50 pb-1 hover:text-white hover:border-white/50 transition-colors uppercase tracking-widest text-sm font-medium"
            dangerouslySetInnerHTML={{ __html: t.raw('viewAll') }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.filter(p => p.slug !== 'koonang').map((platform, i) => (
            <PlatformCard key={platform.id} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
