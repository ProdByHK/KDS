import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'id'];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const platformMessages = (await import(`../../messages/platforms-${locale}.json`)).default;

  return {
    messages: {
      ...messages,
      ...platformMessages,
    }
  };
});
