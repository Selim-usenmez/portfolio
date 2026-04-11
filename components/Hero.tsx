'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'


/* ── Orbital rings ──────────────────────────────────────────── */
function OrbitalRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative" style={{ width: 'min(88vw, 680px)', height: 'min(88vw, 680px)' }}>

        {/* Outer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(129,140,248,0.09)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/70"
            style={{ boxShadow: '0 0 10px 3px rgba(129,140,248,0.6)' }} />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-white/15" />
        </motion.div>

        {/* Middle */}
        <motion.div
          className="absolute inset-[13%] rounded-full"
          style={{ border: '1px solid rgba(192,132,252,0.1)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-2/60"
            style={{ boxShadow: '0 0 10px 3px rgba(192,132,252,0.5)' }} />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-accent-3/40"
            style={{ boxShadow: '0 0 6px 2px rgba(34,211,238,0.4)' }} />
        </motion.div>

        {/* Inner */}
        <motion.div
          className="absolute inset-[27%] rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.04)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-3/50"
            style={{ boxShadow: '0 0 8px 2px rgba(34,211,238,0.4)' }} />
        </motion.div>

        {/* Center pulse */}
        <motion.div
          className="absolute inset-[40%] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 70%)', filter: 'blur(20px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}


/* ── Marquee tech stack ─────────────────────────────────────── */
const STACK = ['Next.js', 'TypeScript', 'PHP', 'MySQL', 'Docker', 'Swift', 'Python', 'Git', 'Linux', 'Supabase']

function TechBanner() {
  const items = [...STACK, ...STACK]
  return (
    <div className="absolute bottom-[4.5rem] left-0 right-0 overflow-hidden pointer-events-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-5 text-[10px] font-mono tracking-[0.25em] uppercase text-text-2/18">
            {s}<span className="w-px h-3 bg-white/8" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute animate-aurora-1" style={{ width: '65vw', height: '65vw', maxWidth: '700px', maxHeight: '700px', top: '-15%', left: '-10%', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.09) 50%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute animate-aurora-2" style={{ width: '55vw', height: '55vw', maxWidth: '600px', maxHeight: '600px', top: '-5%', right: '-8%', background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.12) 0%, rgba(236,72,153,0.06) 50%, transparent 70%)', filter: 'blur(90px)' }} />
        <div className="absolute animate-aurora-3" style={{ width: '50vw', height: '50vw', maxWidth: '550px', maxHeight: '550px', bottom: '-15%', left: '25%', background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.09) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <OrbitalRings />

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto w-full"
      >

        {/* ① Nom */}
        <div className="overflow-hidden mb-0">
          <motion.div
            className="flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.25 } } }}
          >
            {'Selim'.split('').map((c, i) => (
              <motion.span key={i}
                variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                className="font-display font-bold text-[clamp(3.2rem,11vw,7.5rem)] tracking-tight text-text-1 leading-[0.88]"
              >{c}</motion.span>
            ))}
          </motion.div>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.div
            className="flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.45 } } }}
          >
            {'Usenmez'.split('').map((c, i) => (
              <motion.span key={i}
                variants={{ hidden: { y: '110%', opacity: 0 }, visible: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                className="font-display font-bold text-[clamp(3.2rem,11vw,7.5rem)] tracking-tight leading-[0.88] gradient-text"
              >{c}</motion.span>
            ))}
          </motion.div>
        </div>

        {/* ② Tagline animée mot par mot */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-10"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 1.0 } } }}
        >
          {['Web', '·', 'Mobile', '·', 'Intelligence', 'Artificielle'].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
              }}
              className={
                word === '·'
                  ? 'text-white/15 text-lg font-light'
                  : 'text-sm md:text-base font-mono tracking-widest uppercase text-text-2/55'
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* ③ Stats */}
        <div className="flex items-center gap-8 sm:gap-14">
          {[
            { value: '2+', label: "Ans d'expé" },
            { value: '5+', label: 'Projets' },
            { value: '19', label: 'Ans' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 + i * 0.12 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="font-display font-bold text-3xl md:text-4xl gradient-text">{s.value}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-2/40">{s.label}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.96 }}
            className="hidden sm:flex flex-col items-center gap-1"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span className="font-display font-bold text-3xl md:text-4xl text-emerald-400">Open</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-2/40">Disponible</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech marquee */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="w-full">
        <TechBanner />
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-2/35 hover:text-text-2/70 transition-colors duration-300"
        aria-label="Défiler"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.button>
    </section>
  )
}
