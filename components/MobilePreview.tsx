'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ── Ajoute tes screenshots ici ──────────────────────────────────
// Place les images dans /public/assets/screenshots/
// et renseigne les chemins ci-dessous.
// Si vide, le placeholder animé s'affiche.
const SCREENSHOTS: string[] = [
  '/assets/screenshots/IMG_2582.jpg',
  '/assets/screenshots/IMG_2584.jpg',
  '/assets/screenshots/IMG_2586.jpg',
  '/assets/screenshots/IMG_2587.jpg',
  '/assets/screenshots/IMG_2588.jpg',
  '/assets/screenshots/IMG_2589.jpg',
  '/assets/screenshots/IMG_2590.jpg',
]

/* ── Placeholder UI (tant qu'il n'y a pas de screenshots) ─────── */
function AppPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col bg-[#0a0a0f] overflow-hidden select-none">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span className="text-[9px] font-semibold text-white/80">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="11" height="8" viewBox="0 0 11 8" fill="white" opacity="0.8">
            <rect x="0" y="4" width="2" height="4" rx="0.5"/>
            <rect x="3" y="2.5" width="2" height="5.5" rx="0.5"/>
            <rect x="6" y="1" width="2" height="7" rx="0.5"/>
            <rect x="9" y="0" width="2" height="8" rx="0.5"/>
          </svg>
          <svg width="13" height="8" viewBox="0 0 13 8" fill="white" opacity="0.8">
            <rect x="0.5" y="0.5" width="10" height="7" rx="1.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5"/>
            <rect x="1.5" y="1.5" width="7" height="5" rx="1" fill="white"/>
            <path d="M11.5 2.5v3a1.5 1.5 0 0 0 0-3z" fill="white" opacity="0.5"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-2 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[9px] text-white/40">Bonjour,</p>
            <p className="text-[13px] font-bold text-white">Selim 👋</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">S</span>
          </div>
        </div>
      </div>

      {/* Feature card */}
      <div className="mx-4 mb-3 rounded-2xl overflow-hidden relative h-[72px]">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400" />
        <div className="absolute inset-0 flex flex-col justify-center px-4">
          <p className="text-[8px] text-white/70 font-medium uppercase tracking-wide">Programme du jour</p>
          <p className="text-[12px] font-bold text-white">Entraînement Force</p>
          <p className="text-[8px] text-white/80 mt-0.5">45 min · 6 exercices</p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
          </svg>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 mb-3 grid grid-cols-3 gap-2">
        {[
          { label: 'Séances', value: '24', icon: '🔥' },
          { label: 'Km', value: '87', icon: '🏃' },
          { label: 'Pts', value: '1.2k', icon: '⭐' },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
            <div className="text-[11px] mb-0.5">{s.icon}</div>
            <div className="text-[12px] font-bold text-white">{s.value}</div>
            <div className="text-[8px] text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activity list */}
      <div className="px-4 flex-1">
        <p className="text-[9px] font-semibold text-white/40 uppercase tracking-wide mb-2">Activité récente</p>
        {[
          { name: 'Course matinale', time: '7:30', dist: '5.2 km', color: '#fb923c' },
          { name: 'Muscu — Haut du corps', time: '18:00', dist: '52 min', color: '#818cf8' },
        ].map((a) => (
          <div key={a.name} className="flex items-center gap-3 mb-2.5">
            <div className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${a.color}25` }}>
              <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-white truncate">{a.name}</p>
              <p className="text-[8px] text-white/40">{a.time}</p>
            </div>
            <span className="text-[9px] font-medium" style={{ color: a.color }}>{a.dist}</span>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex items-center justify-around px-2 py-2 border-t border-white/5 bg-white/[0.02]">
        {[
          { icon: '🏠', label: 'Accueil', active: true },
          { icon: '📊', label: 'Stats', active: false },
          { icon: '🏋️', label: 'Sport', active: false },
          { icon: '👤', label: 'Profil', active: false },
        ].map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-0.5">
            <span className="text-[12px]">{t.icon}</span>
            <span className={`text-[7px] font-medium ${t.active ? 'text-orange-400' : 'text-white/30'}`}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-1.5 pt-1">
        <div className="w-20 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  )
}

/* ── Screenshot carousel ──────────────────────────────────────── */
function ScreenshotCarousel({ screenshots }: { screenshots: string[] }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="w-full h-full relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={screenshots[current]}
          alt={`NexusSport screenshot ${current + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {screenshots.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length)}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white text-xs"
          >‹</button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % screenshots.length)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-white text-xs"
          >›</button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${i === current ? 'w-3 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── iPhone frame ─────────────────────────────────────────────── */
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 220, height: 470 }}>
      {/* Outer shell */}
      <div
        className="absolute inset-0 rounded-[42px] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #111114 100%)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)',
        }}
      />

      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[90px] w-[3px] h-8 rounded-l bg-[#2a2a2e]" />
      <div className="absolute -left-[3px] top-[135px] w-[3px] h-12 rounded-l bg-[#2a2a2e]" />
      <div className="absolute -left-[3px] top-[195px] w-[3px] h-12 rounded-l bg-[#2a2a2e]" />
      <div className="absolute -right-[3px] top-[120px] w-[3px] h-16 rounded-r bg-[#2a2a2e]" />

      {/* Screen bezel */}
      <div
        className="absolute rounded-[38px] overflow-hidden bg-black"
        style={{ inset: '4px' }}
      >
        {/* Screen content */}
        <div className="absolute inset-0">
          {children}
        </div>

        {/* Dynamic island */}
        <div
          className="absolute top-[10px] left-1/2 -translate-x-1/2 rounded-full bg-black z-10"
          style={{ width: 90, height: 28 }}
        />
      </div>

      {/* Shine overlay */}
      <div
        className="absolute inset-0 rounded-[42px] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────────── */
export default function MobilePreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const hasScreenshots = SCREENSHOTS.length > 0

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(251,146,60,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: text ──────────────────────────────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px" style={{ background: '#fb923c' }} />
              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#fb923c' }}>
                PPE2 — Client Mobile
              </span>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight"
              >
                Nexus<span style={{ backgroundImage: 'linear-gradient(135deg, #fb923c, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sport</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-text-2 text-base md:text-lg leading-relaxed mb-8"
            >
              Application iOS native de gestion sportive. Suivi des entraînements, statistiques de performance et synchronisation en temps réel via Supabase.
            </motion.p>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {['Swift', 'SwiftUI', 'Supabase', 'Xcode', 'TestFlight'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs border" style={{ borderColor: '#fb923c40', color: '#fb923c' }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://github.com/Selim-usenmez/PPE_Client_Mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full glass border border-white/10 text-sm font-medium text-text-1 hover:border-white/20 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full glass border text-sm font-medium text-text-2" style={{ borderColor: '#fb923c20' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#fb923c" strokeWidth="1"/>
                  <path d="M8 5v3" stroke="#fb923c" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="8" cy="10.5" r="0.7" fill="#fb923c"/>
                </svg>
                <span style={{ color: '#fb923c' }}>TestFlight bientôt disponible</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right: iPhone mockup ────────────────────────── */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.82, rotate: -3 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(251,146,60,0.2) 0%, transparent 70%)',
                    transform: 'scale(0.8) translateY(20px)',
                  }}
                />
                <IPhoneFrame>
                  {hasScreenshots
                    ? <ScreenshotCarousel screenshots={SCREENSHOTS} />
                    : <AppPlaceholder />
                  }
                </IPhoneFrame>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
