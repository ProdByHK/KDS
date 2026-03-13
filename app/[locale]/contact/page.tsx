'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Valid email is required.';
    if (!form.message.trim() || form.message.length < 10) newErrors.message = 'Message must be at least 10 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1600));
    setStatus('success');
  };

  return (
    <div className="min-h-screen relative pt-32 pb-16 bg-[#05080f] overflow-hidden">
      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/8 top-0 left-0 -translate-x-1/4 -translate-y-1/4" />
      <div className="ambient-blob w-[400px] h-[400px] bg-blue-600/6 bottom-0 right-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 text-center">Contact Us</h1>
          <p className="text-xl text-white/50 leading-relaxed text-center mb-12">
            Reach out to King David Service for general inquiries, support, or direct communication with our executive team.
          </p>
        </motion.div>

        {/* FR-20: Direct contact details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: '📞', label: 'Phone', value: '+62 21 3000 7788' },
            { icon: '✉️', label: 'Email', value: 'enquiries@kingdavidservice.com' },
            { icon: '📍', label: 'Office', value: 'Sudirman Central Business District, Jakarta 12930' },
          ].map((item, i) => (
            <div key={i} className="glass-card-sm p-5 flex items-start gap-4">
              <span className="text-xl mt-0.5">{item.icon}</span>
              <div>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white/80 text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-8 relative overflow-hidden"
        >
          {/* Inner glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gold-500/6 to-transparent rounded-b-3xl" />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center relative z-10">
                <div className="w-20 h-20 glass-card-sm flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-serif text-white mb-3">Message Received</h2>
                <p className="text-white/40 mb-8">Our team will respond within 24 business hours.</p>
                <button
                  onClick={() => { setForm({ name: '', company: '', email: '', message: '' }); setStatus('idle'); }}
                  className="text-gold-400 hover:text-white transition-colors border-b border-gold-500/50 hover:border-white/50 pb-1 text-sm uppercase tracking-widest"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
                    <input
                      type="text" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={`w-full glass-card-sm rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors text-sm ${errors.name ? 'border-red-500/50' : 'border-white/[0.09]'}`}
                      placeholder="David Kingsley"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={`w-full glass-card-sm rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors text-sm ${errors.email ? 'border-red-500/50' : 'border-white/[0.09]'}`}
                      placeholder="contact@company.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                {/* FR-17: Company Name field */}
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Company Name</label>
                  <input
                    type="text" value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full glass-card-sm rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors text-sm border-white/[0.09]"
                    placeholder="Your Organisation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                  <textarea
                    rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className={`w-full glass-card-sm rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-colors text-sm resize-none ${errors.message ? 'border-red-500/50' : 'border-white/[0.09]'}`}
                    placeholder="Tell us about your business needs..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit" disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-deepBlue-950 font-bold py-4 rounded-xl transition-all text-lg tracking-wide flex items-center justify-center gap-3 disabled:opacity-80 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></>) : (<><Send className="w-5 h-5" /><span>Send Message</span></>)}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
