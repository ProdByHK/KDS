'use client';

import { useState, useEffect, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Save, ChevronRight, FileJson, Globe, CheckCircle2, Loader2, ChevronLeft } from 'lucide-react';
import { getContent, updateContent, getMessageFiles } from '../../lib/actions';

export default function ContentEditor() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [originalContent, setOriginalContent] = useState<Record<string, any> | null>(null);
  const [, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [activePath, setActivePath] = useState<string[]>([]);

  useEffect(() => {
    getMessageFiles().then(setFiles);
  }, []);

  useEffect(() => {
    if (selectedFile) {
      loadContent(selectedFile);
    }
  }, [selectedFile]);

  const loadContent = async (filename: string) => {
    try {
      const data = await getContent(filename);
      setContent(data);
      setOriginalContent(JSON.parse(JSON.stringify(data)));
      setActivePath([]);
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentLevel = activePath.reduce((acc: any, curr: string) => acc?.[curr], content as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateValue = (key: string, value: any) => {
    if (!content) return;
    const newContent = JSON.parse(JSON.stringify(content));
    let target = newContent;
    for (const p of activePath) {
      target = target[p];
    }
    target[key] = value;
    setContent(newContent);
  };

  const handleSave = () => {
    if (!content) return;
    startTransition(async () => {
      setSaveStatus('saving');
      const result = await updateContent(selectedFile, content as Record<string, unknown>);
      if (result.success) {
        setSaveStatus('success');
        setOriginalContent(JSON.parse(JSON.stringify(content)));
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    });
  };

  const isDirty = JSON.stringify(content) !== JSON.stringify(originalContent);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <button
          key={key}
          onClick={() => setActivePath([...activePath, key])}
          className="w-full flex items-center justify-between p-4 glass-card-sm hover:border-gold-500/30 transition-all mb-3 text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-white/20 text-xs">{Object.keys(value).length} items</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
        </button>
      );
    }

    const isLongText = typeof value === 'string' && value.length > 50;

    return (
      <div key={key} className="mb-6">
        <label className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2 px-1">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        {isLongText ? (
          <textarea
            value={value}
            onChange={(e) => updateValue(key, e.target.value)}
            className="w-full glass-card-sm border-white/5 rounded-2xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-all text-sm min-h-[100px] resize-none"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => updateValue(key, e.target.value)}
            className="w-full glass-card-sm border-white/5 rounded-2xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 transition-all text-sm"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Content Editor</h2>
          <p className="text-sm text-white/40 mt-1">Directly manage all text and translations across the platform.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500/30 transition-all appearance-none cursor-pointer w-full"
            >
              <option value="" disabled className="bg-[#05080f]">Select Locale File</option>
              {files.map((f: string) => (
                <option key={f} value={f} className="bg-[#05080f]">{f}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={!isDirty || saveStatus === 'saving'}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-[#05080f] text-sm font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.15)] whitespace-nowrap"
          >
            {saveStatus === 'saving' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {!selectedFile ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 glass-card-sm flex items-center justify-center mb-6 text-white/10">
            <FileJson className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No File Selected</h3>
          <p className="text-white/30 max-w-sm mb-8 italic">Choose a translation file from the dropdown above to start editing your content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card p-4">
              <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4 px-1">Navigation</h4>
              <button 
                onClick={() => setActivePath([])}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 text-sm ${activePath.length === 0 ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                Root Directory
              </button>
              {activePath.map((p: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => setActivePath(activePath.slice(0, i + 1))}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 text-sm ${i === activePath.length - 1 ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                  style={{ marginLeft: `${(i + 1) * 12}px` }}
                >
                  <ChevronRight className="w-3 h-3 opacity-50" />
                  <span className="capitalize">{p}</span>
                </button>
              ))}
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-4 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Live Preview Status</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed italic">Changes saved here will automatically refresh all active customer sessions on the frontend.</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              layout
              className="glass-card p-8 min-h-[600px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none select-none">
                <FileJson className="w-48 h-48 -mr-16 -mt-16 rotate-12" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  {activePath.length > 0 && (
                    <button 
                      onClick={() => setActivePath(activePath.slice(0, -1))}
                      className="p-2 glass-card-sm hover:border-gold-500/30 transition-all text-white/40 hover:text-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div>
                    <h3 className="text-2xl font-serif text-white capitalize">
                      {activePath.length > 0 ? activePath[activePath.length - 1].replace(/([A-Z])/g, ' $1').trim() : 'Root Content'}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-white/20">path:</span>
                      <span className="text-xs font-mono text-gold-500/60 lowercase">/{activePath.join('/')}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  {currentLevel && Object.keys(currentLevel).map(key => renderField(key, currentLevel[key]))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
