import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import Navbar from '../../src/components/layout/Navbar';
import Footer from '../../src/components/layout/Footer';
import '../globals.css';

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
    <html lang={locale}>
      <body className="antialiased font-sans bg-deepBlue-900 text-white min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
