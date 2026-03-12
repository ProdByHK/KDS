export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

import { platforms } from '../../../src/lib/mock-data';
import { Link } from '../../../src/i18n/navigation';

export default function EcosystemOverview() {
  return (
    <div className="min-h-screen bg-deepBlue-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">The KDS Ecosystem</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Seven interconnected platforms powering the future of global enterprise operations, lifestyle, and trade.
          </p>
        </div>

        {/* Mapbox Placeholder */}
        <div className="w-full h-[500px] bg-white/5 border border-white/10 rounded-2xl mb-24 flex items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <div className="text-center">
            <h3 className="text-2xl font-serif text-gold-500 mb-2">Global Coverage</h3>
            <p className="text-gray-400 font-mono text-sm">[Mapbox GL JS Map Component]</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {platforms.map((platform, i) => (
            <Link key={platform.id} href={`/ecosystem/${platform.slug}`} className={`group block bg-white/5 border border-white/10 p-8 rounded-xl hover:border-gold-500/50 hover:bg-white/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8`} style={{ animationDelay: `${(i % 3) * 150}ms` }}>
              <div className="text-gold-500 text-xs font-mono mb-4 tracking-widest uppercase">{platform.sector}</div>
              <h2 className="text-2xl font-serif text-white mb-4 group-hover:text-gold-500 transition-colors">{platform.name}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {platform.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {platform.features.slice(0, 2).map((feature, j) => (
                  <span key={j} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
