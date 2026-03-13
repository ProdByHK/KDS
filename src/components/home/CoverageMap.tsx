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
    { id: 1, top: '50%', left: '33%', color: 'bg-gold-500', city: 'Jakarta Hub', data: `Vol: ${formatters.formatCompactNumber(metrics.transactions)}` },
    { id: 2, top: '33%', left: '75%', color: 'bg-blue-500', city: 'Singapore Node', data: `Latency: 45ms` },
    { id: 3, top: '25%', left: '48%', color: 'bg-green-500', city: 'Euro Freight', data: `Status: Optimal` },
    { id: 4, top: '65%', left: '20%', color: 'bg-gold-500', city: 'LatAm Route', data: `Vol: 4.2M Tons` },
    { id: 5, top: '45%', left: '60%', color: 'bg-purple-500', city: 'Middle East', data: `Secure: 100%` }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 lg:order-1 h-[500px] w-full bg-deepBlue-900 border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden"
          >
            {/* Interactive map background removed */}
            <div className="absolute inset-0 opacity-20 mix-blend-screen" />
            
            {/* Interactive Nodes */}
            {nodes.map(node => (
              <div 
                key={node.id}
                className="absolute w-4 h-4 cursor-pointer"
                style={{ top: node.top, left: node.left }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`absolute inset-0 ${node.color} rounded-full animate-ping opacity-75`} />
                <div className={`absolute inset-1 ${node.color} rounded-full`} />
                
                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#111827] border border-[#1f2937] p-3 rounded-lg shadow-xl shadow-black/50 z-20 whitespace-nowrap"
                    >
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111827] border-b border-r border-[#1f2937] rotate-45" />
                      <div className="text-white font-serif text-sm relative z-10">{node.city}</div>
                      <div className="text-gold-500 font-mono text-xs mt-1 relative z-10">{node.data}</div>
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
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2"
          >
            <span className="text-gold-500 text-xs tracking-widest uppercase mb-4 block font-mono">
              {t('subtitle')}
            </span>
            <h2 
              className="text-4xl md:text-5xl font-serif text-white mb-6"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }} 
            />
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t('description')}
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-gold-500 pl-4 py-1">
                <div className="text-2xl text-white font-medium mb-1">120+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{t('stats.ports')}</div>
              </div>
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="text-2xl text-white font-medium mb-1">50+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{t('stats.tech')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
