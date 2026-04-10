'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/config/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="font-display font-bold text-sm gradient-text">{siteConfig.name}</span>
          <span className="w-px h-3 bg-border" />
          <span className="text-xs text-text-2">{siteConfig.role}</span>
        </motion.div>

        {/* Center — scroll to top */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 text-xs text-text-2 hover:text-text-1 transition-colors"
          aria-label="Retour en haut"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↑
          </motion.span>
          Retour en haut
        </motion.button>

        {/* Right */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs text-text-2"
        >
          © {year} — Conçu & développé avec soin
        </motion.p>
      </div>
    </footer>
  )
}
