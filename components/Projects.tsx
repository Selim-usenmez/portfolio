'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
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

function ProjectCard({ project, index }: { project: (typeof projectsConfig)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => { x.set(0); y.set(0); setIsHovered(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ perspective: '1000px' }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60`} />

        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}20 0%, transparent 60%)` }}
        />

        <div className="relative p-8 md:p-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-xs tracking-widest uppercase mb-2 block font-medium" style={{ color: project.accent }}>
                {project.subtitle}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-text-1">{project.title}</h3>
            </div>
            <span className="font-display font-bold text-5xl opacity-5 text-text-1 leading-none select-none">
              0{index + 1}
            </span>
          </div>

          <p className="text-text-2 text-sm md:text-base leading-relaxed mb-6">{project.description}</p>

          {/* Compétence badge */}
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
              Compétence : {project.competence}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs border" style={{ borderColor: `${project.accent}30`, color: project.accent }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={project.preuve}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium text-text-1 hover:text-white transition-colors"
            >
              Voir la preuve <IconArrow />
            </a>
            {project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-2 hover:text-text-1 transition-colors"
              >
                <IconGitHub />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        <motion.div
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div
        className="absolute left-0 top-1/3 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-accent-3" />
          <span className="text-xs tracking-widest uppercase text-accent-3 font-medium">Projets</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight"
            >
              Réalisations{' '}
              <span className="gradient-text">concrètes</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-text-2 max-w-xs"
          >
            Projets réalisés en formation et en milieu professionnel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsConfig.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
