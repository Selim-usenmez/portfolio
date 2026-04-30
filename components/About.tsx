'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { aboutConfig, siteConfig } from '@/config/portfolio'
import MagneticButton from '@/components/MagneticButton'

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

/* ── Word-by-word reveal on scroll ──────────────────────────── */
function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')

  return (
    <p ref={ref} className={`flex flex-wrap gap-x-[0.32em] gap-y-0 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  )
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

/* ── Timeline item ──────────────────────────────────────────── */
function TimelineItem({
  period,
  title,
  subtitle,
  missions,
  dotColor,
  index,
  isCurrent,
}: {
  period: string
  title: string
  subtitle?: string
  missions?: string[]
  dotColor?: string
  index: number
  isCurrent?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative pl-7"
    >
      {/* Animated dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.35, delay: index * 0.08 + 0.1, type: 'spring', stiffness: 350, damping: 18 }}
        className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-[#030303] bg-gradient-to-br ${dotColor ?? 'from-accent to-accent-2'}`}
        style={{ marginLeft: '1px' }}
      />

      <div className="glass rounded-2xl p-4 border border-white/5 hover:border-accent/15 transition-colors duration-300 group">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-text-1 text-sm group-hover:text-white transition-colors leading-snug">{title}</p>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent whitespace-nowrap">{period}</span>
            {isCurrent && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400">En cours</span>
            )}
          </div>
        </div>
        {subtitle && <p className="text-xs text-text-2 mt-0.5">{subtitle}</p>}
        {missions && missions.length > 0 && (
          <ul className="mt-2 space-y-0.5">
            {missions.map((m, j) => (
              <li key={j} className="text-xs text-text-2 flex items-start gap-1.5">
                <span className="text-accent mt-0.5 flex-shrink-0">›</span>
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

/* ── Timeline section with animated line ────────────────────── */
function TimelineGroup({
  label,
  children,
  startDelay = 0,
}: {
  label: string
  children: React.ReactNode
  startDelay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: startDelay }}
        className="flex items-center gap-2 mb-4"
      >
        <span className="w-4 h-px bg-white/20" />
        <span className="text-[10px] tracking-widest uppercase text-text-2/60 font-medium">{label}</span>
      </motion.div>

      <div className="relative">
        {/* Static line (bg) */}
        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-white/6" />
        {/* Animated line (fg) */}
        <motion.div
          className="absolute left-[6px] top-2 w-px bg-gradient-to-b from-accent/50 to-accent-2/30 origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.0, delay: startDelay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ height: 'calc(100% - 1rem)' }}
        />
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ── Langues & Loisirs (collapsible) ────────────────────────── */
function LanguesLoisirs() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 glass rounded-xl border border-white/5 hover:border-accent/20 transition-colors text-sm text-text-2 hover:text-text-1"
      >
        <div className="flex items-center gap-2">
          <span>🌍</span>
          <span className="text-xs tracking-widest uppercase font-medium">Langues &amp; Loisirs</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3 space-y-4">
              {/* Langues */}
              <div className="space-y-2">
                {aboutConfig.langues.map((l, i) => (
                  <div key={i} className="glass rounded-xl p-3.5 border border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 text-sm font-medium text-text-1">
                        <span>{l.flag}</span>{l.langue}
                      </div>
                      <span className="text-xs text-accent">{l.niveau}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
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

              {/* Loisirs */}
              <div className="flex flex-wrap gap-2">
                {aboutConfig.loisirs.map((l, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/7 text-xs text-text-2 hover:text-text-1 hover:border-accent/20 transition-colors"
                  >
                    <span>{l.icon}</span>{l.label}
                    {l.detail && <span className="text-[10px] text-text-2">({l.detail})</span>}
                  </span>
                ))}
              </div>

              {/* Voyages */}
              <div className="flex flex-wrap gap-2">
                {aboutConfig.voyages.map((v, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/7 text-xs text-text-2">
                    {v.flag} {v.pays}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Section About ──────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Pre-compute stable indices for timeline stagger
  const formationItems = aboutConfig.formations.map((f, i) => ({ ...f, timelineIdx: i }))
  const experienceItems = aboutConfig.experiences.map((e, i) => ({
    ...e,
    timelineIdx: aboutConfig.formations.length + i,
  }))

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
                <WordReveal
                  key={i}
                  text={p}
                  delay={0.1 + i * 0.08}
                  className="text-text-2 text-base md:text-lg leading-relaxed"
                />
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

            {/* CV — magnetic button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8"
            >
              <MagneticButton strength={0.4}>
                <a
                  href={siteConfig.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-accent/20 text-sm font-medium text-accent hover:bg-accent/10 transition-colors duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 1h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 1L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Voir mon CV
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── Right: vertical timeline ──────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Formations */}
              <TimelineGroup label="Formation" startDelay={0}>
                {formationItems.map((f) => (
                  <TimelineItem
                    key={f.timelineIdx}
                    index={f.timelineIdx}
                    period={f.periode}
                    title={f.diplome}
                    subtitle={f.etablissement}
                    dotColor="from-accent to-accent-2"
                    isCurrent={f.current}
                  />
                ))}
              </TimelineGroup>

              {/* Expériences */}
              <div className="mt-8">
                <TimelineGroup label="Expériences" startDelay={0.1}>
                  {experienceItems.map((e) => (
                    <TimelineItem
                      key={e.timelineIdx}
                      index={e.timelineIdx}
                      period={e.periode}
                      title={e.poste}
                      missions={e.missions}
                      dotColor={e.color}
                    />
                  ))}
                </TimelineGroup>
              </div>

              {/* Langues & Loisirs (collapsible) */}
              <LanguesLoisirs />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
