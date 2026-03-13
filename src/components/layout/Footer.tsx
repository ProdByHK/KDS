import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-serif text-gold-500 font-bold tracking-wider block mb-4">
              KING DAVID SERVICE
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">{t('ecosystem')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/ecosystem/koonang" className="hover:text-gold-500 transition-colors">Koonang Digital</Link></li>
              <li><Link href="/ecosystem/carry" className="hover:text-gold-500 transition-colors">Carry Logistics</Link></li>
              <li><Link href="/ecosystem/gold-lion" className="hover:text-gold-500 transition-colors">Gold Lion Premium</Link></li>
              <li><Link href="/ecosystem/pasareu" className="hover:text-gold-500 transition-colors">Pasareu Export</Link></li>
              <li><Link href="/ecosystem/gold-miles" className="hover:text-gold-500 transition-colors">Gold Miles Travel</Link></li>
              <li><Link href="/ecosystem/customized-service" className="hover:text-gold-500 transition-colors">Customized Service</Link></li>
              <li><Link href="/ecosystem/kds-kitchen" className="hover:text-gold-500 transition-colors">KDS Kitchen</Link></li>
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">{t('company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-gold-500 transition-colors">{t('links.about')}</Link></li>
              <li><Link href="/insights" className="hover:text-gold-500 transition-colors">{t('links.insights')}</Link></li>
              <li><Link href="/partnership" className="hover:text-gold-500 transition-colors">{t('links.partnership')}</Link></li>
              <li><Link href="/contact" className="hover:text-gold-500 transition-colors">{t('links.contact')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} King David Service. {t('rights')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-500 text-xs text-center">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('links.privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t('links.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
