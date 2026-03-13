'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

function Counter({ value, suffix = "" }: { value: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/[^0-9]/g, ''));
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(num);
    }
  }, [isInView, num, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
import { Loader2, Check } from 'lucide-react';

export default function InvestorRelations() {
  const t = useTranslations('Investors');
  const [formData, setFormData] = useState({ name: '', institution: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitStatus('loading');
    
    // Simulate CRM / Email Trigger (FR-22)
    console.log("[CRM Simulation] Received Investor Deck Request:", {
      timestamp: new Date().toISOString(),
      payload: formData,
      source: "Web Frontend - Investor Relations"
    });

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div className="group">
                <div className="text-4xl font-serif text-white mb-1 group-hover:text-gold-400 transition-colors">
                  <Counter value="142" suffix="%" />
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-mono">{t('stats.growth.label')}</div>
              </div>
              <div className="group border-y sm:border-y-0 sm:border-x border-white/10 py-8 sm:py-0">
                <div className="text-4xl font-serif text-white mb-1 group-hover:text-gold-400 transition-colors">
                  <Counter value="450" suffix="+" />
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-mono">{t('stats.clients.label')}</div>
              </div>
              <div className="group">
                <div className="text-4xl font-serif text-white mb-1 group-hover:text-gold-400 transition-colors">
                  <Counter value="12" />
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-mono">{t('stats.presence.label')}</div>
              </div>
            </div>
            <a href="/KDS_Annual_Report_2025.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex text-white/70 hover:text-gold-400 transition-colors uppercase tracking-widest text-sm font-medium items-center gap-2">
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
                      className="glass-input text-sm"
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
