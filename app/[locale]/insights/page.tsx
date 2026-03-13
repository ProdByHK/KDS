export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function InsightsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('InsightsPage');

  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-[#05080f] overflow-hidden">
      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/6 top-0 right-0" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/5 bottom-0 left-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <article key={i} className="glass-card-hover overflow-hidden group cursor-pointer">
              {/* Thumbnail with gradient glow */}
              <div className="h-48 relative overflow-hidden rounded-t-3xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  i % 3 === 1 ? 'from-gold-500/25 via-gold-500/5' :
                  i % 3 === 2 ? 'from-blue-500/20 via-blue-500/5' :
                  'from-purple-500/20 via-purple-500/5'
                } to-transparent`} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl bg-gold-500/15 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <div className="text-gold-400 text-xs font-mono mb-3 tracking-widest uppercase">{t('category')}</div>
                <h3 className="text-xl text-white font-serif mb-3 group-hover:text-gold-300 transition-colors">{t('articleTitle')}</h3>
                <p className="text-white/40 text-sm line-clamp-3">{t('articleDescription')}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
