'use client';
import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { href: '/about', label: t('about') },
    { href: '/ecosystem', label: t('ecosystem') },
    { href: '/insights', label: t('insights') },
    { href: '/partnership', label: t('partnership') },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-deepBlue-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-serif text-gold-500 font-bold tracking-wider">
              KING DAVID
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-white hover:text-gold-500 transition-colors text-sm uppercase tracking-wider">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex space-x-2 text-xs font-mono">
              <Link href="/" locale="en" className="text-white hover:text-gold-500 uppercase">EN</Link>
              <span className="text-gray-500">|</span>
              <Link href="/" locale="id" className="text-white hover:text-gold-500 uppercase">ID</Link>
            </div>
            
            <Link href="/contact" className="hidden md:inline-flex bg-gold-600 hover:bg-gold-500 text-deepBlue-900 px-6 py-2 rounded font-medium transition-colors text-sm tracking-wide">
              {t('contact')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-gold-500 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-deepBlue-950 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-4">
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-gold-500 transition-colors text-lg font-serif"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gold-600 text-deepBlue-900 py-4 rounded font-bold uppercase tracking-widest text-sm"
              >
                {t('contact')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
