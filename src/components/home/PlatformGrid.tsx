'use client';
import { motion } from 'framer-motion';
import { platforms } from '../../lib/mock-data';
import { Link } from '../../i18n/navigation';

export default function PlatformGrid() {
  return (
    <section className="py-32 bg-deepBlue-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:flex justify-between items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">The Platforms</h2>
            <p className="text-gray-400 text-lg">
              Explore the seven specialized divisions powering the King David ecosystem.
            </p>
          </div>
          <Link href="/ecosystem" className="hidden md:inline-flex text-gold-500 border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-medium">
            View All Platforms &rarr;
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.filter(p => p.slug !== 'koonang').map((platform, i) => (
            <Link key={platform.id} href={`/ecosystem/${platform.slug}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative h-80 bg-black/50 border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gray-800 group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-40 group-hover:opacity-60" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="text-gold-500 text-xs font-mono mb-3 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {platform.sector}
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                    {platform.name}
                  </h3>
                  <div className="h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    <p className="text-gray-300 text-sm line-clamp-2 mt-2">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
