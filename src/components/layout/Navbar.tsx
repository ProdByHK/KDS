'use client';

import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Navbar');
  
  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-transparent hover:bg-deepBlue-900/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif text-gold-500 font-bold tracking-wider">
              KING DAVID
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-white hover:text-gold-500 transition-colors text-sm uppercase tracking-wider">{t('about')}</Link>
            <Link href="/ecosystem" className="text-white hover:text-gold-500 transition-colors text-sm uppercase tracking-wider">{t('ecosystem')}</Link>
            <Link href="/insights" className="text-white hover:text-gold-500 transition-colors text-sm uppercase tracking-wider">{t('insights')}</Link>
            <Link href="/partnership" className="text-white hover:text-gold-500 transition-colors text-sm uppercase tracking-wider">{t('partnership')}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2 text-xs font-mono">
              <Link href="/" locale="en" className="text-white hover:text-gold-500 uppercase">EN</Link>
              <span className="text-gray-500">|</span>
              <Link href="/" locale="id" className="text-white hover:text-gold-500 uppercase">ID</Link>
            </div>
            <Link href="/contact" className="hidden md:inline-flex bg-gold-600 hover:bg-gold-500 text-deepBlue-900 px-6 py-2 rounded font-medium transition-colors text-sm tracking-wide">
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
