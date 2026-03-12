import { notFound } from 'next/navigation';
import { getPlatformBySlug, platforms } from '../../../../src/lib/mock-data';
import { unstable_setRequestLocale } from "next-intl/server";

import PlatformHero from '../../../../src/components/platform/PlatformHero';
import PlatformServices from '../../../../src/components/platform/PlatformServices';
import PlatformCTA from '../../../../src/components/platform/PlatformCTA';
import { AnimatePresence } from 'framer-motion';

const locales = ['en', 'id'];

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    platforms.map((platform) => ({
      locale,
      platform: platform.slug,
    }))
  );
}

export default function PlatformPage({ params: { locale, platform: slug } }: { params: { locale: string, platform: string } }) {
  unstable_setRequestLocale(locale);
  const platform = getPlatformBySlug(slug);

  if (!platform) {
    notFound();
  }

  return (
    <AnimatePresence mode="popLayout">
      <main className="min-h-screen bg-deepBlue-900 overflow-hidden" key={slug}>
        {/* Render animated sections with staggered scrolling effects */}
        <PlatformHero platform={platform} />
        <PlatformServices platform={platform} />
        <PlatformCTA platform={platform} locale={locale} />
      </main>
    </AnimatePresence>
  );
}
