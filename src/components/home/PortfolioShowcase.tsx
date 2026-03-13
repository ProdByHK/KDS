'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';

// Portfolio project images — IMG-03
// TODO: Replace with real project screenshots or mockups
const projectImages = [
  {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    alt: 'Government data center infrastructure for national logistics hub',
  },
  {
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    alt: 'Premium fintech mobile banking application interface',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    alt: 'Enterprise resource dashboard with real-time operational data',
  },
];

export default function PortfolioShowcase() {
  const t = useTranslations('Portfolio');

  const projects = [
    { title: t('projects.p1.title'), client: t('projects.p1.client'), description: t('projects.p1.description'), link: '/ecosystem/gold-lion' },
    { title: t('projects.p2.title'), client: t('projects.p2.client'), description: t('projects.p2.description'), link: '/ecosystem/carry' },
    { title: t('projects.p3.title'), client: t('projects.p3.client'), description: t('projects.p3.description'), link: '/ecosystem/pasarx' },
  ];

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden border-y border-white/[0.04]">
      <div className="ambient-blob w-[600px] h-[600px] bg-gold-500/5 top-1/2 left-1/4 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{t('title')}</h2>
          <p className="text-white/40 max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
          {projects.map((p, i) => (
            <Link href={p.link} key={i} className={`flex-1 group cursor-pointer ${i === 1 ? 'md:-translate-y-10' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true, margin: '-100px' }}
                className="h-full"
              >
                {/* Project image — top of card — IMG-03 */}
                <div className="relative h-52 overflow-hidden rounded-t-3xl shrink-0">
                  <Image
                    src={projectImages[i].src}
                    alt={projectImages[i].alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Sector badge overlay */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-gold-400 text-xs uppercase tracking-widest font-mono">
                    {p.client}
                  </span>
                </div>
                <div className="px-2 border-l border-gold-500/0 group-hover:border-gold-500/60 pl-4 transition-all duration-300">
                  <div className="text-gold-400 text-xs font-mono mb-2 tracking-widest uppercase">{p.client}</div>
                  <h3 className="text-2xl text-white font-serif mb-3 group-hover:text-gold-300 transition-colors">{p.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-white/60 transition-colors">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-2 text-gold-500/60 text-xs font-mono uppercase tracking-widest group-hover:text-gold-400 transition-colors">
                    <span>View Project</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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
