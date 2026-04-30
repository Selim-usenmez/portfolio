'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projectsConfig } from '@/config/portfolio'

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function IconCopy() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M11 5V4C11 3.17 10.33 2.5 9.5 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9.5C2.5 10.33 3.17 11 4 11H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function CredentialRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(value).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-xs text-text-2 w-16 flex-shrink-0">{label}</span>
      <span className="text-xs font-mono text-text-1 flex-1 truncate">{value}</span>
      <button onClick={copy} className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors" title="Copier">
        {copied
          ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <span className="text-text-2"><IconCopy /></span>
        }
      </button>
    </div>
  )
}

/* ── Project row — toujours visible, pas d'opacity 0 individuel ── */
function ProjectRow({
  project,
  index,
  sectionInView,
}: {
  project: (typeof projectsConfig)[0]
  index: number
  sectionInView: boolean
}) {
  const [open, setOpen] = useState(false)
  const [showCreds, setShowCreds] = useState(false)

  return (
    <motion.div
      animate={sectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      initial={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.45, delay: 0.2 + index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className={`group rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
          ${open ? 'border-white/10 bg-white/[0.04]' : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]'}`}
        onClick={() => setOpen(!open)}
      >
        {/* Row header — always visible */}
        <div className="flex items-center gap-4 px-6 py-5">
          {/* Number */}
          <span className="font-display font-bold text-2xl tabular-nums shrink-0 w-8" style={{ color: `${project.accent}60` }}>
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title + subtitle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-display font-semibold text-lg text-text-1 leading-tight">
                {project.title}
              </h3>
              <span
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0"
                style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}25` }}
              >
                {project.competence}
              </span>
            </div>
            <p className="text-xs text-text-2 mt-0.5">{project.subtitle}</p>
          </div>

          {/* Tags desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs border border-white/8 text-text-2">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs text-text-2">+{project.tags.length - 3}</span>
            )}
          </div>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-text-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Accent line */}
        <motion.div
          animate={{ scaleX: open ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className="h-px origin-left mx-6"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 pb-6 pt-4 flex flex-col gap-5">
                <p className="text-sm text-text-2 leading-relaxed">{project.description}</p>

                {/* Tags mobile */}
                <div className="flex flex-wrap gap-2 sm:hidden">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs border" style={{ borderColor: `${project.accent}30`, color: project.accent }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile badge */}
                {'mobile' in project && project.mobile && (
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
                    >
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                        <rect x="0.75" y="0.75" width="9.5" height="11.5" rx="1.75" stroke="currentColor" strokeWidth="1.2"/>
                        <circle cx="5.5" cy="10" r="0.75" fill="currentColor"/>
                        <line x1="3.5" y1="1.5" x2="7.5" y2="1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      {project.mobile.platform} Native
                    </span>
                    <span className="text-xs text-text-2">Swift + Supabase</span>
                  </div>
                )}

                {/* Demo credentials */}
                {project.demo && (
                  <div>
                    <button
                      onClick={() => setShowCreds(!showCreds)}
                      className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200"
                      style={{ borderColor: `${project.accent}30`, color: project.accent, background: `${project.accent}08` }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                        <rect x="5.5" y="7" width="5" height="4" rx="1" stroke="currentColor" strokeWidth="1.1"/>
                        <path d="M6.5 7V5.5a1.5 1.5 0 0 1 3 0V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                      </svg>
                      Accès démo invité
                      <motion.span animate={{ rotate: showCreds ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {showCreds && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 px-3 py-2 rounded-xl border border-white/7 bg-white/[0.02]">
                            {project.demo.credentials.map((c, i) => (
                              <div key={i} className={i > 0 ? 'border-t border-white/5 mt-1 pt-1' : ''}>
                                <div className="text-xs text-accent mb-1 font-medium">{c.role}</div>
                                <CredentialRow label="Login" value={c.login} />
                                <CredentialRow label="Mot de passe" value={c.password} />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  {project.demo?.url && (
                    <a href={project.demo.url} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm font-medium text-text-1 hover:text-white transition-colors">
                      Voir le projet <IconArrow />
                    </a>
                  )}
                  {'mobile' in project && project.mobile?.testflight && (
                    <a href={project.mobile.testflight} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                      style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}>
                      TestFlight
                    </a>
                  )}
                  {'mobile' in project && project.mobile && !project.mobile.testflight && (
                    <span className="text-xs text-text-2 italic flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1"/>
                        <path d="M6 4v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        <circle cx="6" cy="8.5" r="0.6" fill="currentColor"/>
                      </svg>
                      TestFlight bientôt disponible
                    </span>
                  )}
                  {project.preuve && (
                    <a href={project.preuve} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm font-medium text-text-1 hover:text-white transition-colors">
                      Voir la preuve <IconArrow />
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-text-2 hover:text-text-1 transition-colors">
                      <IconGitHub />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div
        className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-accent-3" />
          <span className="text-xs tracking-widest uppercase text-accent-3 font-medium">Projets</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight"
            >
              Réalisations{' '}
              <span className="gradient-text-shimmer">concrètes</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-text-2 max-w-xs"
          >
            Cliquez sur un projet pour voir les détails.
          </motion.p>
        </div>

        <div className="flex flex-col gap-3">
          {projectsConfig.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} sectionInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
