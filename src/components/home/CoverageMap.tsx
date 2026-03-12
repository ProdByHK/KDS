'use client';
import { motion } from 'framer-motion';

export default function CoverageMap() {
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
            {/* Interactive map placeholder */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-center bg-contain mix-blend-screen" />
            
            {/* Ping points */}
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-gold-500 rounded-full animate-ping" />
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-gold-500 rounded-full" />
            
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-1000" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-500 rounded-full" />

            <div className="relative text-gray-500 font-mono text-sm">(Mapbox Global Integration)</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2"
          >
            <span className="text-gold-500 text-xs tracking-widest uppercase mb-4 block font-mono">
              Global Infrastructure
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Boundless <br /> Coverage
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              From international freight lanes managed by CARRY, to global commodity sourcing via PASARX, our infrastructure operates beyond borders. 
              Our map provides interactive visibility across all logistics, supply chain, and deployment nodes worldwide.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="border-l-2 border-gold-500 pl-4 py-1">
                <div className="text-2xl text-white font-medium mb-1">120+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Trading Ports Available</div>
              </div>
              <div className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="text-2xl text-white font-medium mb-1">50+</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Tech Deploys Active</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
