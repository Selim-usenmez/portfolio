'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { certificationsConfig } from '@/config/portfolio'

export default function Certifications() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="certifications" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-px bg-accent" />
              <span className="text-xs tracking-widest uppercase text-accent font-medium">Certifications</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight"
              >
                Mes <span className="gradient-text-shimmer">badges</span>
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative glass rounded-2xl border border-white/5 overflow-hidden px-8 py-14 flex flex-col items-center gap-5"
        >
          {/* Glow de fond */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)' }}
          />

          {/* Icône animée */}
          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
            </svg>
          </motion.div>

          {/* Texte */}
          <div className="text-center">
            <p className="font-display font-semibold text-text-1 mb-1">Certifications à venir</p>
            <p className="text-sm text-text-2/50">
              Cette section sera complétée très bientôt.
            </p>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/15">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-xs font-mono text-accent/70 tracking-widest uppercase">Bientôt disponible</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
