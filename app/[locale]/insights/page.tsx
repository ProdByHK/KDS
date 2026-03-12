export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { unstable_setRequestLocale } from "next-intl/server";

export default function InsightsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-deepBlue-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          Insights & News
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          {[1,2,3,4,5,6].map(i => (
            <article key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group cursor-pointer hover:border-gold-500/50 transition-colors">
              <div className="h-48 bg-gray-800" />
              <div className="p-6">
                <div className="text-gold-500 text-xs font-mono mb-3 tracking-widest uppercase">Corporate</div>
                <h3 className="text-xl text-white font-serif mb-3 group-hover:text-gold-500 transition-colors">Expanding the Global Logistics Network</h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
