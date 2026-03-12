'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Activity, TrendingUp, Box } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: React.ReactNode;
};

export default function SentinelAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Welcome to King David Service. I am Sentinel. How can I assist you with your enterprise logistics or commodity sourcing today?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSuggestionClick = (action: string) => {
    // Add user message
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: action }]);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse: React.ReactNode = "I'm analyzing that request across the KDS ecosystem. One moment...";
      
      if (action === "Check Cargo Status") {
        aiResponse = (
          <div className="space-y-3">
            <p>CARRY is currently tracking 1,240 active shipments across SE Asia.</p>
            <div className="bg-deepBlue-900/50 p-3 rounded-lg border border-gold-500/20">
              <div className="flex justify-between text-xs mb-1 text-gold-200">
                <span>Vessels in Transit</span>
                <span>842</span>
              </div>
              <div className="w-full bg-deepBlue-950 rounded-full h-1.5 mb-3">
                <div className="bg-gold-500 h-1.5 rounded-full" style={{ width: '68%' }}></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white">
                <Activity className="w-3 h-3 text-green-400" /> All systems operational
              </div>
            </div>
          </div>
        );
      } else if (action === "Market Trends") {
        aiResponse = (
          <div className="space-y-3">
            <p>Coffee prices in PasarX are up 2.4% this morning.</p>
            <div className="bg-deepBlue-900/50 p-3 rounded-lg border border-gold-500/20 flex items-end gap-2 h-24">
              <div className="w-1/4 bg-blue-500/40 hover:bg-blue-500/60 transition-colors h-1/3 rounded-t-sm relative group"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100">Q1</span></div>
              <div className="w-1/4 bg-blue-500/60 hover:bg-blue-500/80 transition-colors h-1/2 rounded-t-sm relative group"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100">Q2</span></div>
              <div className="w-1/4 bg-gold-500/60 hover:bg-gold-500/80 transition-colors h-3/4 rounded-t-sm relative group"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100">Q3</span></div>
              <div className="w-1/4 bg-gold-400 hover:bg-gold-300 transition-colors h-full rounded-t-sm relative group"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100">Q4</span></div>
            </div>
          </div>
        );
      } else if (action === "Analyze Portfolio") {
        aiResponse = (
          <div className="space-y-3">
            <p>Portfolio Risk Analysis Complete.</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-deepBlue-900/50 p-2 rounded border border-gold-500/20 text-center">
                <div className="text-gray-400 mb-1">Exposure</div>
                <div className="font-semibold text-green-400">Low</div>
              </div>
              <div className="bg-deepBlue-900/50 p-2 rounded border border-gold-500/20 text-center">
                <div className="text-gray-400 mb-1">Efficiency</div>
                <div className="font-semibold text-gold-400">+14%</div>
              </div>
            </div>
          </div>
        );
      }

      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'ai', text: aiResponse }]);
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-deepBlue-950/95 backdrop-blur-xl border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden z-[100] flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-deepBlue-900 to-deepBlue-800 p-4 border-b border-gold-500/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 flex items-center justify-center p-0.5">
                    <div className="w-full h-full bg-deepBlue-950 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-gold-400" />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-deepBlue-950"></div>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">KDS Sentinel</h3>
                  <p className="text-gold-200/70 text-[10px]">Enterprise Intelligence AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px] scrollbar-thin scrollbar-thumb-gold-500/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-gold-600/20 border border-gold-500/30 text-white rounded-tr-sm'
                        : 'bg-deepBlue-900/60 border border-blue-500/20 text-blue-50 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-deepBlue-900/60 border border-blue-500/20 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-gold-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-gold-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-gold-400 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="p-3 bg-deepBlue-900/30 border-t border-gold-500/10">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => handleSuggestionClick("Check Cargo Status")}
                  disabled={isTyping}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-deepBlue-800 hover:bg-deepBlue-700 border border-deepBlue-600 rounded-full text-xs text-blue-200 transition-colors disabled:opacity-50"
                >
                  <Box className="w-3 h-3" /> Cargo Status
                </button>
                <button
                  onClick={() => handleSuggestionClick("Market Trends")}
                  disabled={isTyping}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-deepBlue-800 hover:bg-deepBlue-700 border border-deepBlue-600 rounded-full text-xs text-blue-200 transition-colors disabled:opacity-50"
                >
                  <TrendingUp className="w-3 h-3" /> Market Trends
                </button>
                <button
                  onClick={() => handleSuggestionClick("Analyze Portfolio")}
                  disabled={isTyping}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-deepBlue-800 hover:bg-deepBlue-700 border border-deepBlue-600 rounded-full text-xs text-blue-200 transition-colors disabled:opacity-50"
                >
                  <Activity className="w-3 h-3" /> Analyze Portfolio
                </button>
              </div>
              <div className="mt-2 text-center">
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">Demo Mode - Responses are Simulated</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center p-0.5"
        aria-label="Toggle AI Assistant"
      >
        <div className="w-full h-full bg-deepBlue-950 rounded-full flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          {isOpen ? (
            <X className="w-6 h-6 text-gold-400 relative z-10" />
          ) : (
            <MessageSquare className="w-6 h-6 text-gold-400 relative z-10 group-hover:animate-pulse" />
          )}
        </div>
      </motion.button>
    </>
  );
}
