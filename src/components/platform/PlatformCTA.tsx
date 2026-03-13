'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Platform } from '../../lib/mock-data';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PlatformCTAProps {
  platform: Platform;
  locale: string;
}

export default function PlatformCTA({ platform, locale }: PlatformCTAProps) {
  const t = useTranslations(platform.slug);

  return (
    <section className="py-24 relative overflow-hidden bg-[#05080f]">
      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 md:p-20 relative overflow-hidden"
        >
          {/* Inner glow radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,_var(--tw-gradient-stops))] from-gold-500/10 to-transparent" />

          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-8 opacity-80" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">{t('ctaTitle')}</h2>
            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed">{t('ctaDesc')}</p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href={`/${locale}/contact`}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-deepBlue-950 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm w-full sm:w-auto shadow-[0_0_25px_rgba(212,175,55,0.25)]"
              >
                <span className="flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href={`/${locale}/about`}
                className="glass-card-sm hover:border-white/20 text-white px-8 py-4 font-medium transition-all hover:border-gold-500/40 uppercase tracking-wider text-sm w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
