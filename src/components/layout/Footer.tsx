import { Link } from '../../i18n/navigation';

export default function Footer() {
  return (
    <footer className="bg-deepBlue-900 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-serif text-gold-500 font-bold tracking-wider block mb-4">
              KING DAVID SERVICE
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Elevating corporate standards through an integrated ecosystem of luxury services, logistics, digital innovation, and commodity trading.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/ecosystem/koonang" className="hover:text-gold-500 transition-colors">Koonang Digital</Link></li>
              <li><Link href="/ecosystem/carry" className="hover:text-gold-500 transition-colors">Carry Logistics</Link></li>
              <li><Link href="/ecosystem/gold-lion" className="hover:text-gold-500 transition-colors">Gold Lion Premium</Link></li>
              <li><Link href="/ecosystem/pasarx" className="hover:text-gold-500 transition-colors">PasarX Commodities</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link href="/insights" className="hover:text-gold-500 transition-colors">Insights & News</Link></li>
              <li><Link href="/partnership" className="hover:text-gold-500 transition-colors">Partner With Us</Link></li>
              <li><Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} King David Service. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-500 text-xs text-center">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
