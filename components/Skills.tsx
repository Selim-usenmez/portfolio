'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillsConfig } from '@/config/portfolio'

function SkillCard({
  category,
  index,
  sectionInView,
}: {
  category: (typeof skillsConfig.categories)[0]
  index: number
  sectionInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative glass rounded-3xl p-7 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
    >
      {/* Glow */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br ${category.color}`}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">{category.icon}</span>
        <h3 className={`font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
          {category.name}
        </h3>
      </div>

      {/* Skills as usage chips + description */}
      <div className="space-y-4">
        {category.items.map((skill) => (
          <div key={skill.name}>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium border"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: '#f1f5f9',
                }}
              >
                {skill.name}
              </span>
            </div>
            <p className="text-xs text-text-2 leading-relaxed">{skill.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-8 h-px bg-accent-2" />
          <span className="text-xs tracking-widest uppercase text-accent-2 font-medium">Compétences</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-1 leading-tight"
            >
              Mon{' '}
              <span className="gradient-text-shimmer">stack</span>
              {' '}technique
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsConfig.categories.map((cat, i) => (
            <SkillCard key={cat.name} category={cat} index={i} sectionInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
