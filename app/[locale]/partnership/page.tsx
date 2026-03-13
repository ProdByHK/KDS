export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function PartnershipPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Partnership');

  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-[#05080f] overflow-hidden">
      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/8 top-0 right-0 translate-x-1/4 -translate-y-1/4" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/5 bottom-0 left-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 text-center">{t('title')}</h1>
        <p className="text-xl text-white/50 leading-relaxed text-center mb-16">{t('description')}</p>

        <div className="glass-card p-8 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold-500/6 to-transparent rounded-b-3xl" />
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">{t('form.company')}</label>
                <input type="text" className="w-full glass-card-sm rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">{t('form.email')}</label>
                <input type="email" className="w-full glass-card-sm rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">{t('form.platform')}</label>
              <select className="w-full glass-card-sm rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm bg-transparent">
                <option className="bg-[#05080f]">KOONANG DIGITAL</option>
                <option className="bg-[#05080f]">CARRY LOGISTICS</option>
                <option className="bg-[#05080f]">GOLD LION PREMIUM</option>
                <option className="bg-[#05080f]">PASAREU EXPORT</option>
                <option className="bg-[#05080f]">GOLD MILES TRAVEL</option>
                <option className="bg-[#05080f]">CUSTOMIZED SERVICE</option>
                <option className="bg-[#05080f]">KDS KITCHEN</option>
              </select>
            </div>
            <button type="button" className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-deepBlue-950 font-bold py-4 rounded-xl transition-all text-lg tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              {t('form.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
