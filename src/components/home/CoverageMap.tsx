'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useLiveData } from '../../hooks/useLiveData';

export default function CoverageMap() {
  const t = useTranslations('Coverage');
  const { metrics, formatters } = useLiveData();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    { id: 1, top: '50%', left: '33%', color: 'bg-gold-400', glow: 'rgba(212,175,55,0.6)', city: 'Jakarta Hub', data: `Vol: ${formatters.formatCompactNumber(metrics.transactions)}` },
    { id: 2, top: '33%', left: '75%', color: 'bg-blue-400', glow: 'rgba(96,165,250,0.6)', city: 'Singapore Node', data: `Latency: 45ms` },
    { id: 3, top: '25%', left: '48%', color: 'bg-emerald-400', glow: 'rgba(52,211,153,0.6)', city: 'Euro Freight', data: `Status: Optimal` },
    { id: 4, top: '65%', left: '20%', color: 'bg-gold-400', glow: 'rgba(212,175,55,0.6)', city: 'LatAm Route', data: `Vol: 4.2M Tons` },
    { id: 5, top: '45%', left: '60%', color: 'bg-purple-400', glow: 'rgba(167,139,250,0.6)', city: 'Middle East', data: `Secure: 100%` },
  ];

  return (
    <section className="py-32 bg-[#05080f] relative overflow-hidden">
      <div className="ambient-blob w-[500px] h-[500px] bg-blue-600/6 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="order-2 lg:order-1 h-[500px] w-full glass-card flex items-center justify-center relative overflow-hidden"
          >
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {nodes.map(node => (
              <div
                key={node.id}
                className="absolute w-5 h-5 cursor-pointer group/node"
                style={{ top: node.top, left: node.left }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setHoveredNode(hoveredNode === node.id ? null : node.id)}
                aria-label={node.city}
              >
                <div className={`absolute inset-0 ${node.color} rounded-full animate-ping opacity-40`} />
                <div className={`absolute inset-1 ${node.color} rounded-full shadow-lg`} style={{ boxShadow: `0 0 12px ${node.glow}` }} />

                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 glass-card-sm p-3 shadow-xl z-20 whitespace-nowrap"
                    >
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/[0.05] border-b border-r border-white/[0.09] rotate-45" />
                      <div className="text-white font-serif text-sm relative z-10">{node.city}</div>
                      <div className="text-gold-400 font-mono text-xs mt-1 relative z-10">{node.data}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="order-1 lg:order-2"
          >
            <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('subtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
            <p className="text-white/50 text-lg leading-relaxed mb-8">{t('description')}</p>
            <div className="flex flex-col gap-4">
              <div className="glass-card-sm p-4 pl-5 border-l-2 border-gold-500">
                <div className="text-2xl text-white font-medium mb-1">120+</div>
                <div className="text-sm text-white/40 uppercase tracking-wider">{t('stats.ports')}</div>
              </div>
              <div className="glass-card-sm p-4 pl-5 border-l-2 border-blue-500">
                <div className="text-2xl text-white font-medium mb-1">50+</div>
                <div className="text-sm text-white/40 uppercase tracking-wider">{t('stats.tech')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
