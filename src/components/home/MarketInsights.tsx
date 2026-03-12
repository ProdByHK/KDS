'use client';
import { motion } from 'framer-motion';

export default function MarketInsights() {
  const articles = [
    { category: "Logistics", title: "The Future of Multi-Modal Freight in SE Asia", date: "Oct 24, 2026" },
    { category: "Technology", title: "AI Integration Strategies for Legacy Enterprise", date: "Oct 18, 2026" }
  ];

  return (
    <section className="py-32 bg-deepBlue-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-between items-end mb-16"
        >
          <div>
            <span className="text-gold-500 text-xs tracking-widest uppercase mb-4 block font-mono">
              Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Market Insights</h2>
          </div>
          <button className="hidden md:block text-gold-500 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium border-b border-gold-500 hover:border-white pb-1">
            Read All Intelligence &rarr;
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group cursor-pointer flex flex-col sm:flex-row gap-6 bg-black/30 p-6 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors"
            >
              <div className="w-full sm:w-48 h-48 sm:h-auto bg-gray-800 rounded-xl overflow-hidden shrink-0">
                <div className="w-full h-full bg-white/5 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="flex flex-col justify-center py-4">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gold-500 text-xs font-mono tracking-widest uppercase">{article.category}</span>
                  <span className="text-gray-500 text-xs">{article.date}</span>
                </div>
                <h3 className="text-2xl text-white font-serif mb-4 group-hover:text-gold-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  Analysis and strategic perspectives from the King David proprietary intelligence division on global market shifts.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
