'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { tableauSyntheseConfig } from '@/config/portfolio'

type CompKey = 'gerer_si' | 'incidents' | 'web' | 'projet' | 'deploiement' | 'dev_pro'

/* ── Mode Excel (table classique restylée dark) ──────────────── */
function ViewExcel() {
  const { competenceHeaders, sections } = tableauSyntheseConfig

  return (
    <div className="space-y-10 overflow-x-auto">
      {sections.map((section, si) => (
        <div key={si}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">{section.icon}</span>
            <h3 className="font-display font-semibold text-text-1 text-lg">
              {section.title}
            </h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/7">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/7">
                  <th className="text-left px-5 py-3.5 text-xs tracking-widest uppercase text-text-2 font-medium bg-white/[0.02] w-48">
                    Réalisation
                  </th>
                  {competenceHeaders.map((h) => (
                    <th
                      key={h.key}
                      className="px-4 py-3.5 text-xs tracking-widest uppercase text-text-2 font-medium text-center bg-white/[0.02]"
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.projects.length === 0 ? (
                  <tr className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-4 text-text-2 italic">À venir…</td>
                    {competenceHeaders.map((h) => (
                      <td key={h.key} className="px-4 py-4 text-center text-text-2 opacity-30">—</td>
                    ))}
                  </tr>
                ) : (
                  section.projects.map((project, pi) => (
                    <tr
                      key={pi}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors"
                    >
                      <td className="px-5 py-4 font-medium text-text-1">{project.nom}</td>
                      {competenceHeaders.map((h) => {
                        const isActive = project.competences[h.key as CompKey]
                        return (
                          <td key={h.key} className="px-4 py-4 text-center">
                            {isActive && project.preuve ? (
                              <a
                                href={project.preuve}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Voir la preuve"
                                className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 text-accent hover:bg-accent/25 transition-colors"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </a>
                            ) : isActive ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 text-accent/60">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                            ) : (
                              <span className="inline-block w-4 h-px bg-white/10 mx-auto" />
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Mode Stylisé (cards) ────────────────────────────────────── */
const compColors: Record<CompKey, string> = {
  gerer_si: 'from-indigo-400 to-purple-400',
  incidents: 'from-rose-400 to-pink-400',
  web: 'from-cyan-400 to-blue-400',
  projet: 'from-emerald-400 to-teal-400',
  deploiement: 'from-amber-400 to-orange-400',
  dev_pro: 'from-violet-400 to-purple-400',
}

function ViewStyled() {
  const { competenceHeaders, sections } = tableauSyntheseConfig

  // Build a flat competency coverage map
  const coverage: Record<CompKey, string[]> = {
    gerer_si: [],
    incidents: [],
    web: [],
    projet: [],
    deploiement: [],
    dev_pro: [],
  }

  sections.forEach((s) => {
    s.projects.forEach((p) => {
      competenceHeaders.forEach((h) => {
        if (p.competences[h.key as CompKey]) {
          coverage[h.key as CompKey].push(p.nom)
        }
      })
    })
  })

  return (
    <div className="space-y-10">
      {/* Competency cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {competenceHeaders.map((h, i) => {
          const projects = coverage[h.key as CompKey]
          return (
            <motion.div
              key={h.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${compColors[h.key as CompKey]} mb-3`} />
              <div className="font-medium text-sm text-text-1 mb-2">{h.label}</div>
              {projects.length > 0 ? (
                <div className="space-y-1">
                  {projects.map((p, j) => (
                    <div key={j} className={`text-xs bg-gradient-to-r ${compColors[h.key as CompKey]} bg-clip-text text-transparent font-medium truncate`}>
                      ✓ {p}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-text-2 italic">À venir</div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Timeline by section */}
      <div className="space-y-6">
        {sections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: si * 0.1 }}
            className="glass rounded-3xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">{section.icon}</span>
              <h3 className="font-display font-semibold text-text-1">
                {section.title}
              </h3>
            </div>

            {section.projects.length === 0 ? (
              <p className="text-text-2 text-sm italic">Stage de 2e année pas encore réalisé.</p>
            ) : (
              <div className="space-y-3">
                {section.projects.map((project, pi) => {
                  const activeComps = competenceHeaders.filter(h => project.competences[h.key as CompKey])
                  return (
                    <div key={pi} className="flex flex-wrap items-center gap-3 py-3 border-b border-white/5 last:border-0">
                      {project.preuve ? (
                        <a
                          href={project.preuve}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-sm text-text-1 hover:text-accent transition-colors flex items-center gap-2 group"
                        >
                          {project.nom}
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      ) : (
                        <span className="font-medium text-sm text-text-1">{project.nom}</span>
                      )}
                      <div className="flex flex-wrap gap-1.5 ml-auto">
                        {activeComps.map((h) => (
                          <span
                            key={h.key}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium text-transparent bg-clip-text border bg-gradient-to-r ${compColors[h.key as CompKey]}`}
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                          >
                            <span className={`bg-gradient-to-r ${compColors[h.key as CompKey]} bg-clip-text text-transparent`}>
                              {h.label}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────── */
export default function TableauSynthese() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [mode, setMode] = useState<'excel' | 'styled'>('styled')

  return (
    <section id="tableau" ref={sectionRef} className="section-padding relative">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-accent-3" />
          <span className="text-xs tracking-widest uppercase text-accent-3 font-medium">E5 — BTS SIO SLAM</span>
        </motion.div>

        {/* Heading + controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight"
            >
              Tableau de{' '}
              <span className="gradient-text">synthèse</span>
            </motion.h2>
          </div>

          {/* Mode toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-1 p-1 glass rounded-xl border border-white/5 self-start md:self-auto"
          >
            <button
              onClick={() => setMode('styled')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                mode === 'styled'
                  ? 'bg-accent/15 text-accent border border-accent/20'
                  : 'text-text-2 hover:text-text-1'
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Stylisé
            </button>
            <button
              onClick={() => setMode('excel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                mode === 'excel'
                  ? 'bg-accent/15 text-accent border border-accent/20'
                  : 'text-text-2 hover:text-text-1'
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                <line x1="1" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="1"/>
                <line x1="1" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1"/>
                <line x1="1" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1"/>
                <line x1="6" y1="1" x2="6" y2="15" stroke="currentColor" strokeWidth="1"/>
                <line x1="11" y1="1" x2="11" y2="15" stroke="currentColor" strokeWidth="1"/>
              </svg>
              Tableau
            </button>
          </motion.div>
        </div>

        {/* View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {mode === 'excel' ? <ViewExcel /> : <ViewStyled />}
          </motion.div>
        </AnimatePresence>

        {/* Open-in-tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          {/* PDF — opens directly in browser */}
          <a
            href={tableauSyntheseConfig.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full glass border border-accent/20 text-sm font-medium text-accent hover:bg-accent/10 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M7 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10 1h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 1L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Ouvrir le PDF
          </a>
          {/* Excel — opens in new tab (browser will handle) */}
          <a
            href={tableauSyntheseConfig.xlsxPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full glass border border-emerald-400/20 text-sm font-medium text-emerald-400 hover:bg-emerald-400/10 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1"/>
              <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1"/>
              <line x1="5" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1"/>
            </svg>
            Ouvrir le fichier Excel
          </a>
        </motion.div>
      </div>
    </section>
  )
}
