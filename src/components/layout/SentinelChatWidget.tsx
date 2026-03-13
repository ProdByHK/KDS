'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'system';
  text: string;
  timestamp: string;
}

const SENTINEL_RESPONSES: Record<string, string> = {
  default: 'KDS Sentinel AI processing your query. All systems nominal. How may I assist with network operations?',
  shipping: 'Tracking Container X192 via Carry Network... ETA Jakarta Port: 3 days, 14 hours. Current status: In Transit - Sulawesi Sea passage. Cargo integrity: 100%.',
  volume: 'Current commodity volume (24h): $84.2M USD. Top movers — Coffee: +18.4%, Palm Oil: +6.2%, Nickel: -2.1%. Market sentiment: Bullish on agricultural.',
  status: 'All 7 KDS platforms reporting OPTIMAL. K-Secure: 0 threats detected. Konekt latency: 45ms avg. Koonang Pay: 124k Tx/hr processing.',
  help: 'Available commands: shipping, volume, status, security, partners, latency, uptime. Or ask a free-form question about our ecosystem.',
  security: 'K-Secure Intelligence Report [LIVE]: 0 active threats. 14 preemptive blocks in last 24h. Firewall integrity: 99.99%. Last audit: 06:00 UTC.',
  partners: 'Active enterprise partners: 1,240 verified clients. Top tiers — Platinum: 124, Gold: 387, Silver: 729. New onboarding: 8 this week.',
  latency: 'Konekt Network latency report: Singapore Node: 42ms, Jakarta Hub: 51ms, Dubai Gateway: 67ms, Frankfurt: 72ms. Global average: 58ms.',
  uptime: 'KDS Platform uptime (30-day rolling): 99.99%. Last incident: 47 days ago. SLA compliance: 100% across all enterprise accounts.',
  koonang: 'Koonang B2B Marketplace — Active sellers: 1,245. Listings today: 3,847. Top category: Agricultural commodities. GMV (7 days): $12.4M.',
  carry: 'Carry Logistics Network — Active shipments: 8,432 tons. Routes: 47 active corridors. On-time delivery: 98.5%. Next departure: 00:30 UTC.',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(SENTINEL_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) {
      return SENTINEL_RESPONSES[key];
    }
  }
  return SENTINEL_RESPONSES.default;
}

function now(): string {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function SentinelChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: 'Sentinel AI online. Monitoring 7 active platforms. Type "help" for available commands.', timestamp: now() }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input, timestamp: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const responseText = getResponse(userMsg.text);
    setLoading(false);
    setMessages(prev => [...prev, { role: 'system', text: responseText, timestamp: now() }]);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0a1628] border border-blue-500/40 hover:border-blue-400 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 transition-all hover:scale-110 group"
        aria-label="Open Sentinel AI"
      >
        <div className="absolute inset-0 rounded-full bg-blue-500/10" />
        {open ? (
          <X className="w-5 h-5 text-blue-400 relative z-10" />
        ) : (
          <Terminal className="w-5 h-5 text-blue-400 relative z-10 group-hover:text-blue-300" />
        )}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#060d1a] border border-[#1f2937] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1f2937] flex items-center gap-3 bg-[#0a1628]">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div>
                <div className="text-white font-semibold text-sm">Sentinel AI</div>
                <div className="text-green-400 text-xs font-mono">System Online · 7 Platforms Active</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 scrollbar-thin scrollbar-thumb-[#1f2937]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-100'
                      : 'bg-[#111827] border border-[#1f2937] text-slate-300'
                  }`}>
                    {msg.role === 'system' && (
                      <div className="text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-1">◆ sentinel</div>
                    )}
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className="text-slate-600 text-[10px] mt-1.5 text-right font-mono">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span className="text-xs font-mono">Processing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Commands */}
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {['status', 'shipping', 'volume', 'security'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => { setInput(cmd); }}
                  className="text-xs bg-[#1f2937] hover:bg-[#374151] text-slate-400 hover:text-white px-2 py-1 rounded font-mono transition-colors border border-[#374151]"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#1f2937] flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Query the network..."
                className="flex-1 bg-[#111827] border border-[#1f2937] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 font-mono"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-9 h-9 bg-blue-600 hover:bg-blue-500 disabled:bg-[#1f2937] disabled:text-slate-600 rounded-lg flex items-center justify-center transition-colors text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
