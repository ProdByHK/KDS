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
    <section className="py-24 relative overflow-hidden bg-deepBlue-900">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-12 md:p-20 rounded-3xl backdrop-blur-sm relative overflow-hidden"
        >
          {/* Decorative Corner Flairs */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-500/10 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <Sparkles className="w-8 h-8 text-gold-500 mx-auto mb-8 opacity-80" />
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
            {t('ctaTitle')}
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {t('ctaDesc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href={`/${locale}/contact`}
              className="group relative inline-flex items-center justify-center bg-gold-600 hover:bg-gold-500 text-deepBlue-900 px-8 py-4 rounded font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm w-full sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href={`/${locale}/about`}
              className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded font-medium transition-all hover:border-gold-500 uppercase tracking-wider text-sm backdrop-blur-sm w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
