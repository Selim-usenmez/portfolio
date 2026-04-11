'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-bg flex flex-col items-center justify-center overflow-hidden px-6">

      {/* Aurora */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-aurora-1" style={{ width: '60vw', height: '60vw', maxWidth: '600px', maxHeight: '600px', top: '-10%', left: '-10%', background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute animate-aurora-2" style={{ width: '50vw', height: '50vw', maxWidth: '500px', maxHeight: '500px', bottom: '-10%', right: '-5%', background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.12) 0%, transparent 70%)', filter: 'blur(90px)' }} />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6"
        >
          <span className="font-display font-bold text-[clamp(6rem,20vw,12rem)] leading-none gradient-text-shimmer">
            404
          </span>
        </motion.div>

        {/* Message */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-display font-bold text-2xl md:text-3xl text-text-1 mb-3"
        >
          Page introuvable
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-sm text-text-2/60 leading-relaxed mb-10"
        >
          Cette page n&apos;existe pas ou a été déplacée.<br />
          Retourne à l&apos;accueil pour explorer le portfolio.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-shadow duration-300"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M6 3.5L2.5 7 6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l&apos;accueil
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-xs font-mono text-text-2/25 tracking-widest uppercase"
        >
          Selim Usenmez · Portfolio
        </motion.p>
      </div>
    </main>
  )
}
