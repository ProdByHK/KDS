import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | King David Service',
    default: 'King David Service | Integrated Enterprise Ecosystem',
  },
  description: 'King David Service is a premier ecosystem of luxury services, enterprise technology, and global logistics tailored for discerning corporate clientele.',
  keywords: ['enterprise service', 'logistics', 'commodity trading', 'luxury corporate services', 'Southeast Asia business'],
  authors: [{ name: 'KDS Intelligence Division' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-deepBlue-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}


