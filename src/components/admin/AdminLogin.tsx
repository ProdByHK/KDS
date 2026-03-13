'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (passcode === 'KDS2026') {
        onLogin();
      } else {
        setError(true);
        setLoading(false);
        setPasscode('');
      }
    }, 800);
  };

  return (
    <div className={`${inter.className} min-h-screen bg-[#05080f] flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      {/* Ambient blobs */}
      <div className="ambient-blob w-[500px] h-[500px] bg-gold-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-blob w-[300px] h-[300px] bg-blue-600/6 top-0 right-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/80 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 glass-card-sm flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 border border-gold-500/20 rounded-2xl animate-pulse" />
            <ShieldAlert className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">KDS Sentinel Console</h1>
          <p className="text-sm text-white/40">Restricted Enterprise Access</p>
        </div>

        <div className="glass-card p-8 relative overflow-hidden">
          {/* Inner glow accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gold-500/6 to-transparent rounded-b-3xl" />

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-6">
              <label className="block text-xs font-medium text-white/40 tracking-wider uppercase mb-2">
                Authentication Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/25" />
                </div>
                <input
                  type="password"
                  value={passcode}
                  onChange={e => { setPasscode(e.target.value); setError(false); }}
                  className={`block w-full pl-10 pr-3 py-3 glass-card-sm rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-all text-sm ${error ? 'border-red-500/50' : ''}`}
                  placeholder="Enter passcode (KDS2026)"
                  disabled={loading}
                  autoFocus
                />
              </div>
              {error && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2 text-xs text-red-400">
                  Access denied. Invalid credentials.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !passcode}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-medium text-deepBlue-950 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (<>Initialize Connection<ArrowRight className="ml-2 w-4 h-4" /></>)}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/20 tracking-wider uppercase">Protocol: SECURE-9X // Node: JKT-01</p>
        </div>
      </motion.div>
    </div>
  );
}
