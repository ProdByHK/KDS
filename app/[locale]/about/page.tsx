'use client';

export const dynamic = 'force-static';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8 },
};

export default function AboutPage() {
  const t = useTranslations('About');

  const team = [
    { name: 'David Nathaniel', title: 'Founder & Chief Executive Officer', initial: 'D', color: 'from-gold-500/30 to-gold-700/10' },
    { name: 'Rebekah Hartono', title: 'Chief Operating Officer', initial: 'R', color: 'from-blue-500/30 to-blue-700/10' },
    { name: 'Samuel Wijaya', title: 'Chief Technology Officer', initial: 'S', color: 'from-purple-500/30 to-purple-700/10' },
    { name: 'Miriam Santoso', title: 'Chief Commercial Officer', initial: 'M', color: 'from-emerald-500/30 to-emerald-700/10' },
  ];

  const values = [
    { icon: '◆', label: t('valuesItems.excellence.label'), desc: t('valuesItems.excellence.desc') },
    { icon: '◈', label: t('valuesItems.integrity.label'), desc: t('valuesItems.integrity.desc') },
    { icon: '◉', label: t('valuesItems.innovation.label'), desc: t('valuesItems.innovation.desc') },
    { icon: '◎', label: t('valuesItems.partnership.label'), desc: t('valuesItems.partnership.desc') },
  ];

  const milestones = [
    { year: t('milestones.m1.year'), event: t('milestones.m1.event') },
    { year: t('milestones.m2.year'), event: t('milestones.m2.event') },
    { year: t('milestones.m3.year'), event: t('milestones.m3.event') },
    { year: t('milestones.m4.year'), event: t('milestones.m4.event') },
  ];

  return (
    <div className="min-h-screen bg-[#05080f] overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="ambient-blob w-[600px] h-[600px] bg-gold-500/8 top-[-10%] left-[-10%]" />
        <div className="ambient-blob w-[500px] h-[500px] bg-blue-600/6 top-[10%] right-[-10%]" />
        <motion.div {...fadeUp} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block glass-card-sm px-5 py-2 text-gold-400 text-xs tracking-[0.25em] uppercase mb-8 font-mono">
            {t('badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            {t('title').split(' ')[0]} {t('title').split(' ')[1]}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200">
              {t('title').split(' ').slice(2).join(' ')}
            </span>
          </h1>
          <p className="text-xl text-white/50 leading-relaxed max-w-3xl mx-auto">
            {t('heroDesc')}
          </p>
        </motion.div>
      </section>

      {/* ── Company Story — FR-08 ── */}
      <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
        <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 bottom-0 right-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('storySubtitle')}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
                {t('storyTitle')}
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-6 text-white/60 text-lg leading-relaxed">
              <p>{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
              <p>{t('storyP3')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision — FR-09 ── */}
      <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-blue-600/5 top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('purposeSubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t('purposeTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-card p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-transparent" />
              <div className="w-12 h-12 glass-card-sm flex items-center justify-center mb-6">
                <span className="text-gold-400 text-xl font-serif">M</span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{t('missionTitle')}</h3>
              <p className="text-white/55 text-lg leading-relaxed">{t('missionDesc')}</p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent" />
              <div className="w-12 h-12 glass-card-sm flex items-center justify-center mb-6">
                <span className="text-blue-400 text-xl font-serif">V</span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{t('visionTitle')}</h3>
              <p className="text-white/55 text-lg leading-relaxed">{t('visionDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Leadership Team — FR-10 ── */}
      <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
        <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 bottom-0 right-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('leadershipSubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t('leadershipTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white font-serif text-3xl font-bold">{member.initial}</span>
                </div>
                <h4 className="text-white font-serif text-lg mb-1">{member.name}</h4>
                <p className="text-white/40 text-xs font-mono tracking-wider uppercase leading-relaxed">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Values — FR-11 ── */}
      <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
        <div className="ambient-blob w-[500px] h-[500px] bg-blue-600/5 top-1/2 left-0 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('valuesSubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t('valuesTitle')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card-hover p-8 group relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl bg-gold-500/10 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="text-gold-400 text-3xl mb-5">{v.icon}</div>
                <h4 className="text-white font-serif text-xl mb-3">{v.label}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline / Milestones — FR-12 ── */}
      <section className="py-24 border-t border-white/[0.04] relative overflow-hidden">
        <div className="ambient-blob w-[400px] h-[400px] bg-gold-500/5 top-0 right-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-gold-400 text-xs tracking-widest uppercase mb-4 block font-mono">{t('journeySubtitle')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t('journeyTitle')}</h2>
          </motion.div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-8 items-start"
                >
                  <div className="shrink-0 w-14 h-14 rounded-full glass-card-sm flex items-center justify-center z-10">
                    <span className="text-gold-400 font-mono text-xs font-bold">{m.year}</span>
                  </div>
                  <div className="pt-3">
                    <p className="text-white/65 text-lg leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
