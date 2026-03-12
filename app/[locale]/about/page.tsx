export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('About');

  return (
    <div className="min-h-screen bg-deepBlue-900 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">{t('title')}</h1>
        <p className="text-xl text-gray-300 leading-relaxed text-balance">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
