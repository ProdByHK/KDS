export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('About');

  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-[#05080f] flex items-center justify-center overflow-hidden">
      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/8 top-1/2 left-1/4 -translate-y-1/2" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/6 top-0 right-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">{t('title')}</h1>
        <p className="text-xl text-white/50 leading-relaxed text-balance">{t('description')}</p>
      </div>
    </div>
  );
}
