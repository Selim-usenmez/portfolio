'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { siteConfig } from '@/config/portfolio'

/* ── Magnetic button ────────────────────────────────────────── */
function MagneticButton({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }

  const handleMouseEnter = () => {
    if (!ref.current) return
    ref.current.style.transition = 'transform 0.1s ease'
  }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </button>
  )
}

/* ── Typewriter roles ───────────────────────────────────────── */
function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length)
    }, 2800)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 gradient-text font-display font-bold text-lg md:text-xl tracking-wide"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ── Floating particles ─────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => i)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full"
          style={{
            background: i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#c084fc' : '#22d3ee',
            left: `${5 + (i * 37) % 90}%`,
            top: `${10 + (i * 53) % 80}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            opacity: 0.3 + (i % 4) * 0.1,
          }}
          animate={{
            y: [0, -30 - (i % 20), 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 5 + (i % 5),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ── Hero main component ────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const nameChars = siteConfig.name.split('')

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Aurora background ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 — indigo/violet */}
        <div
          className="absolute animate-aurora-1"
          style={{
            width: '70vw',
            height: '70vw',
            maxWidth: '800px',
            maxHeight: '800px',
            top: '-20%',
            left: '-15%',
            background:
              'radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.12) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Blob 2 — pink/purple */}
        <div
          className="absolute animate-aurora-2"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: '700px',
            maxHeight: '700px',
            top: '-10%',
            right: '-10%',
            background:
              'radial-gradient(ellipse at center, rgba(236,72,153,0.15) 0%, rgba(192,132,252,0.1) 50%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />
        {/* Blob 3 — cyan */}
        <div
          className="absolute animate-aurora-3"
          style={{
            width: '55vw',
            height: '55vw',
            maxWidth: '650px',
            maxHeight: '650px',
            bottom: '-20%',
            left: '20%',
            background:
              'radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      {/* ── Floating particles ─────────────────────── */}
      <Particles />

      {/* ── Main content ───────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/20 text-sm text-text-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
          Disponible pour de nouveaux projets
        </motion.div>

        {/* Name — character stagger */}
        <div className="overflow-hidden mb-3">
          <motion.div
            className="flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
            }}
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: '120%', opacity: 0 },
                  visible: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
                className={`font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-text-1 ${char === ' ' ? 'mr-4' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Role cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-6"
        >
          <RoleCycler roles={siteConfig.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="max-w-lg text-base md:text-lg text-text-2 leading-relaxed mb-10"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <MagneticButton
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 rounded-full font-medium text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-300"
          >
            Voir mes projets
          </MagneticButton>

          <MagneticButton
            href={`mailto:${siteConfig.email}`}
            className="px-7 py-3.5 rounded-full font-medium text-sm glass border border-white/10 text-text-1 hover:border-accent/30 transition-colors duration-300"
          >
            Me contacter
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-2 hover:text-text-1 transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.button>
    </section>
  )
}
