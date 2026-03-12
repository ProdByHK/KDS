'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Loader2, Check } from 'lucide-react';

export default function InvestorRelations() {
  const t = useTranslations('Investors');
  const [formData, setFormData] = useState({ name: '', institution: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitStatus('loading');
    await new Promise(r => setTimeout(r, 1400));
    setSubmitStatus('success');
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-deepBlue-900/50 to-transparent transform skew-x-12 translate-x-32" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {t('description')}
            </p>
            
            <div className="space-y-6 mb-10">
              {[
                { label: t('stats.growth.label'), value: t('stats.growth.value') },
                { label: t('stats.clients.label'), value: t('stats.clients.value') },
                { label: t('stats.presence.label'), value: t('stats.presence.value') }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-gray-300 font-medium">{stat.label}</span>
                  <span className="text-gold-500 font-mono text-xl">{stat.value}</span>
                </div>
              ))}
            </div>

            <a href="/KDS_Investor_Presentation.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex text-white hover:text-gold-500 transition-colors uppercase tracking-widest text-sm font-medium items-center gap-2">
              {t('download')} 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-serif text-white mb-6">{t('form.title')}</h3>
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-white font-serif text-xl mb-2">Request Received</p>
                  <p className="text-gray-400 text-sm">Our IR team will reach out within 48 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder={t('form.name')}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder={t('form.institution')}
                    value={formData.institution}
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t('form.email')}
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-deepBlue-900/50 border border-white/20 rounded p-4 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-deepBlue-900 font-bold py-4 rounded transition-colors uppercase tracking-wider text-sm mt-4 flex items-center justify-center gap-2 disabled:opacity-80"
                  >
                    {submitStatus === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : t('form.submit')}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
