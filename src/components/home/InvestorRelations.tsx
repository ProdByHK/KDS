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
    <section className="py-32 bg-[#05080f] relative overflow-hidden">
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/6 top-1/2 left-1/4 -translate-y-1/2" />
      <div className="ambient-blob w-[350px] h-[350px] bg-blue-600/5 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">{t('title')}</h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">{t('description')}</p>
            <div className="space-y-4 mb-10">
              {[
                { label: t('stats.growth.label'), value: t('stats.growth.value') },
                { label: t('stats.clients.label'), value: t('stats.clients.value') },
                { label: t('stats.presence.label'), value: t('stats.presence.value') },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between glass-card-sm px-5 py-4">
                  <span className="text-white/60 font-medium">{stat.label}</span>
                  <span className="text-gold-400 font-mono text-xl">{stat.value}</span>
                </div>
              ))}
            </div>
            <a href="/KDS_Investor_Presentation.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex text-white/70 hover:text-gold-400 transition-colors uppercase tracking-widest text-sm font-medium items-center gap-2">
              {t('download')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="glass-card p-10 relative overflow-hidden"
          >
            {/* Gold glow accent inside card */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gold-500/8 to-transparent rounded-b-3xl" />
            <h3 className="text-2xl font-serif text-white mb-6 relative z-10">{t('form.title')}</h3>
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center relative z-10">
                  <div className="w-16 h-16 rounded-full glass-card-sm flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-white font-serif text-xl mb-2">Request Received</p>
                  <p className="text-white/40 text-sm">Our IR team will reach out within 48 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  {[
                    { type: 'text', required: true, placeholder: t('form.name'), key: 'name' },
                    { type: 'text', required: false, placeholder: t('form.institution'), key: 'institution' },
                    { type: 'email', required: true, placeholder: t('form.email'), key: 'email' },
                  ].map(field => (
                    <input
                      key={field.key}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full glass-card-sm border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/25 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                    />
                  ))}
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-deepBlue-950 font-bold py-4 rounded-xl transition-all uppercase tracking-wider text-sm mt-4 flex items-center justify-center gap-2 disabled:opacity-70 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    {submitStatus === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : t('form.submit')}
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
