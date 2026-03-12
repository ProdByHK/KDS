import { notFound } from 'next/navigation';
import { getPlatformBySlug, platforms } from '../../../../src/lib/mock-data';

const locales = ['en', 'id'];

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    platforms.map((platform) => ({
      locale,
      platform: platform.slug,
    }))
  );
}

export default function PlatformPage({ params }: { params: { platform: string } }) {
  const platform = getPlatformBySlug(params.platform);

  if (!platform) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-deepBlue-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8 p-1 inline-block bg-white/5 border border-white/10 rounded-full px-4 py-1 text-xs tracking-widest text-gold-500 uppercase font-medium">
            {platform.sector}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            {platform.name}
          </h1>
          <p className="text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
            {platform.description}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <h2 className="text-2xl font-serif text-gold-500 mb-6">Core Features</h2>
            <ul className="space-y-4">
              {platform.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mr-4" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex items-center justify-center min-h-[300px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <span className="text-gray-500 font-mono text-sm">(Interactive Component Placeholder)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
