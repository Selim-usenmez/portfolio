'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { aboutConfig, siteConfig } from '@/config/portfolio'

/* ── Counter animé ──────────────────────────────────────────── */
function Counter({ target, duration = 1400 }: { target: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) return
    if (isNaN(parseInt(target))) { setDisplayed(target); return }
    const end = parseInt(target.replace(/\D/g, ''))
    const suffix = target.replace(/[0-9]/g, '')
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplayed(`${Math.floor(eased * end)}${suffix}`)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{displayed}</span>
}

/* ── Reveal line ────────────────────────────────────────────── */
function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── Tab panel ──────────────────────────────────────────────── */
const TABS = [
  { id: 'formations', label: 'Formation', icon: '🎓' },
  { id: 'experiences', label: 'Expériences', icon: '💼' },
  { id: 'langues', label: 'Langues & Loisirs', icon: '🌍' },
]

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('formations')

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-xs tracking-widest uppercase text-accent font-medium">À propos</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Left: bio + stats ──────────────────── */}
          <div>
            <RevealLine>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight mb-8">
                Construire des choses{' '}
                <span className="gradient-text-warm">belles</span>
                {' & '}
                <span className="gradient-text">utiles</span>
              </h2>
            </RevealLine>

            <div className="space-y-4 mb-8">
              {aboutConfig.bio.map((p, i) => (
                <RevealLine key={i} delay={0.15 * (i + 1)}>
                  <p className="text-text-2 text-base md:text-lg leading-relaxed">{p}</p>
                </RevealLine>
              ))}
            </div>

            {/* Disponibilité */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="flex items-center gap-2 text-sm text-text-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {siteConfig.location}
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {siteConfig.school}
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {aboutConfig.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.65 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  className="glass rounded-2xl p-4 border border-white/5 hover:border-accent/20 transition-colors duration-300 group text-center"
                >
                  <div className="font-display font-bold text-2xl gradient-text mb-1">
                    <Counter target={stat.value} />
                  </div>
                  <div className="text-xs text-text-2 group-hover:text-text-1 transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CV — open in new tab */}
            <motion.a
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full glass border border-accent/20 text-sm font-medium text-accent hover:bg-accent/10 transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 1h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 1L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Voir mon CV
            </motion.a>
          </div>

          {/* ── Right: tabs (formations / expériences / langues) ── */}
          <div>
            {/* Tab nav */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-1 p-1 glass rounded-xl border border-white/5 mb-6"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-accent/15 text-accent border border-accent/20'
                      : 'text-text-2 hover:text-text-1'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'formations' && (
                <motion.div
                  key="formations"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {aboutConfig.formations.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -24, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="glass rounded-2xl p-5 border border-white/5 hover:border-accent/15 transition-colors duration-300 group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="font-medium text-text-1 group-hover:text-white transition-colors">{f.diplome}</div>
                          <div className="text-sm text-text-2 mt-0.5">{f.etablissement}</div>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end gap-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{f.periode}</span>
                          {f.current && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">En cours</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'experiences' && (
                <motion.div
                  key="experiences"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {aboutConfig.experiences.map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -24, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors duration-300 group"
                    >
                      <div className={`inline-block w-2 h-2 rounded-full mb-2 bg-gradient-to-br ${e.color}`} />
                      <div className="text-xs text-text-2 mb-1">{e.periode}</div>
                      <div className="font-medium text-text-1 group-hover:text-white transition-colors mb-2">{e.poste}</div>
                      <ul className="space-y-1">
                        {e.missions.map((m, j) => (
                          <li key={j} className="text-sm text-text-2 flex items-start gap-2">
                            <span className="text-accent mt-0.5">›</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'langues' && (
                <motion.div
                  key="langues"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Langues */}
                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-text-2 mb-3">Langues</h3>
                    <div className="space-y-3">
                      {aboutConfig.langues.map((l, i) => (
                        <div key={i} className="glass rounded-xl p-4 border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-text-1">
                              <span>{l.flag}</span>{l.langue}
                            </div>
                            <span className="text-xs text-accent">{l.niveau}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${l.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loisirs */}
                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-text-2 mb-3">Loisirs</h3>
                    <div className="flex flex-wrap gap-2">
                      {aboutConfig.loisirs.map((l, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/7 text-sm text-text-2 hover:text-text-1 hover:border-accent/20 transition-colors">
                          <span>{l.icon}</span>{l.label}{l.detail && <span className="text-xs text-text-2">({l.detail})</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Voyages */}
                  <div>
                    <h3 className="text-xs tracking-widest uppercase text-text-2 mb-3">Voyages</h3>
                    <div className="flex flex-wrap gap-2">
                      {aboutConfig.voyages.map((v, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/7 text-sm text-text-2">
                          {v.flag} {v.pays}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
