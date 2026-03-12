'use client';
import { motion } from 'framer-motion';

export default function CallToAction() {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-deepBlue-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/20 via-deepBlue-900 to-deepBlue-900" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center border border-gold-500/30 mb-8">
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            Ready to Elevate <br/> Your Operations?
          </h2>
          <p className="text-xl text-gray-300 font-light mb-12 max-w-2xl mx-auto text-balance">
            Connect with our executive team to explore how the King David ecosystem can integrate with and accelerate your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="w-full sm:w-auto bg-white hover:bg-gray-200 text-deepBlue-900 px-10 py-5 rounded font-bold transition-all hover:scale-105 active:scale-95 uppercase tracking-wider text-sm">
              Schedule Consultation
            </button>
            <span className="text-gray-500 font-serif italic">or</span>
            <button className="w-full sm:w-auto bg-transparent border border-white/20 hover:bg-white/5 text-white px-10 py-5 rounded font-medium transition-all hover:border-gold-500 uppercase tracking-wider text-sm">
              View Capabilities Deck
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
