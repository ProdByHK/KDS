export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('About');

  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-deepBlue-900 flex items-center justify-center">
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deepBlue-900/50 to-deepBlue-900 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">{t('title')}</h1>
        <p className="text-xl text-gray-300 leading-relaxed text-balance">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
