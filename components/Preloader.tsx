'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Barre de progression fluide
    const start = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(Math.floor(p * 100))
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => setVisible(false), 300)
    }

    requestAnimationFrame(tick)
  }, [])

  const letters = ['S', 'E', 'L', 'I', 'M']

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Nom lettre par lettre */}
          <div className="flex items-end gap-1 mb-10">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="font-display font-bold text-5xl md:text-7xl tracking-tight gradient-text"
              >
                {l}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-bold text-5xl md:text-7xl tracking-tight text-text-1 ml-3"
            >
              U
            </motion.span>
          </div>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-xs font-mono tracking-[0.35em] uppercase text-text-2/40 mb-12"
          >
            Portfolio · BTS SIO SLAM
          </motion.p>

          {/* Barre de progression */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '180px' }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative h-px bg-white/8 overflow-hidden"
            style={{ width: 180 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-accent-2 to-accent-3"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </motion.div>

          {/* Pourcentage */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-[11px] font-mono text-text-2/30 tabular-nums"
          >
            {progress}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
