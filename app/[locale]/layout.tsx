import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import Navbar from '../../src/components/layout/Navbar';
import Footer from '../../src/components/layout/Footer';
import SentinelAI from '../../src/components/layout/SentinelAI';
import SentinelChatWidget from '../../src/components/layout/SentinelChatWidget';
import { GlassBackground } from '../../src/components/GlassBackground';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'id' }];
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <GlassBackground />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <SentinelAI />
        <SentinelChatWidget />
      </div>
    </NextIntlClientProvider>
  );
}

