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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-80"
    >
      <Link href={`/ecosystem/${platform.slug}`} className="block h-full cursor-pointer">
        <div 
          className="relative h-full bg-black/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 group hover:border-gold-500/30"
          style={{ transform: "translateZ(0px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          
          {/* Image Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-30 group-hover:opacity-50"
            style={{ 
              backgroundImage: 
                platform.slug === 'carry' ? "url('https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?q=80&w=800&auto=format&fit=crop')" :
                platform.slug === 'pasarx' ? "url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop')" :
                platform.slug === 'konekt' ? "url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop')" :
                platform.slug === 'k-secure' ? "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop')" :
                platform.slug === 'gold-lion' ? "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop')" :
                "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop')"
            }}
          />

          <div 
            className="absolute inset-0 p-8 flex flex-col justify-end z-20"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="text-gold-500 text-xs font-mono mb-3 tracking-widest uppercase transform transition-all duration-300">
              {t(`items.${platform.id}.sector`)}
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">
              {platform.name}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="text-gray-300 text-sm line-clamp-2 mt-2">
                {t(`items.${platform.id}.description`)}
              </p>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function PlatformGrid() {
  const t = useTranslations('Platforms');

  return (
    <section className="py-32 bg-deepBlue-900 relative Perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-gray-400 text-lg">
              {t('description')}
            </p>
          </div>
          <Link 
            href="/ecosystem" 
            className="hidden md:inline-flex text-gold-500 border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-medium"
            dangerouslySetInnerHTML={{ __html: t.raw('viewAll') }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.filter(p => p.slug !== 'koonang').map((platform, i) => (
            <PlatformCard key={platform.id} platform={platform} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

