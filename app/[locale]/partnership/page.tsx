export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default function PartnershipPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Partnership');

  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-deepBlue-900">
      <div 
        className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deepBlue-900/40 via-deepBlue-900/80 to-deepBlue-900 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 text-center">{t('title')}</h1>
        <p className="text-xl text-gray-300 leading-relaxed text-center mb-16">
          {t('description')}
        </p>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('form.company')}</label>
                <input type="text" className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('form.email')}</label>
                <input type="email" className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-gold-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('form.platform')}</label>
              <select className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-gold-500 transition-colors">
                <option>KOONANG</option>
                <option>CARRY</option>
                <option>GOLD LION</option>
                <option>PASARX</option>
              </select>
            </div>
            <button type="button" className="w-full bg-gold-600 hover:bg-gold-500 text-deepBlue-900 font-bold py-4 rounded transition-colors text-lg tracking-wide">
              {t('form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
