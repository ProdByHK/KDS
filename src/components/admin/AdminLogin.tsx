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
    
    // Simulate network delay for demo
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
    <div className={`${inter.className} min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/90 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#111827] border border-[#1f2937] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
            <div className="absolute inset-0 border border-gold-500/20 rounded-2xl animate-pulse" />
            <ShieldAlert className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase mb-2">KDS Sentinel Console</h1>
          <p className="text-sm text-slate-400">Restricted Enterprise Access</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111827]/80 backdrop-blur-xl border border-[#1f2937] rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <label className="block text-xs font-medium text-slate-400 tracking-wider uppercase mb-2">
              Authentication Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                className={`block w-full pl-10 pr-3 py-3 bg-[#0a0f1c] border ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1f2937] focus:border-gold-500 focus:ring-gold-500/20'} rounded-lg text-white placeholder-slate-600 focus:outline-none focus:ring-2 sm:text-sm transition-all`}
                placeholder="Enter passcode (KDS2026)"
                disabled={loading}
                autoFocus
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-xs text-red-400"
              >
                Access denied. Invalid credentials.
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !passcode}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-[#0a0f1c] bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111827] focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Connection
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 tracking-wider uppercase">
            Protocol: SECURE-9X // Node: JKT-01
          </p>
        </div>
      </motion.div>
    </div>
  );
}
