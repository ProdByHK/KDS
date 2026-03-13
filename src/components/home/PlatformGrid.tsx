'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Platform, platforms } from '../../lib/mock-data';
import { Link } from '../../i18n/navigation';
import { useRef, useState, useEffect } from 'react';

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
        <div className="relative h-full glass-card overflow-hidden group transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.07]">
          {/* Bottom gradient glow spotlight */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Corner accent */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

          <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
            <div className="text-gold-400 text-xs font-mono mb-3 tracking-widest uppercase">
              {t(`items.${platform.id}.sector`)}
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">{platform.name}</h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="text-white/50 text-sm line-clamp-2 mt-2">
                {t(`items.${platform.id}.description`)}
              </p>
            </div>
          </div>

          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
