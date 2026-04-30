'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteConfig, socialLinks } from '@/config/portfolio'
import MagneticButton from '@/components/MagneticButton'

/* ── Canvas confetti ────────────────────────────────────────── */
function fireConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) { canvas.remove(); return }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  type Particle = {
    x: number; y: number; vx: number; vy: number
    color: string; w: number; h: number
    rotation: number; rotSpeed: number
    gravity: number; life: number; decay: number
  }

  const COLORS = ['#818cf8', '#c084fc', '#22d3ee', '#f472b6', '#4ade80', '#fbbf24']
  const particles: Particle[] = []

  // Burst from bottom-center
  const cx = canvas.width / 2
  const cy = canvas.height * 0.75

  for (let i = 0; i < 100; i++) {
    const angle = (Math.random() * Math.PI * 1.4) - Math.PI * 0.7 - Math.PI / 2
    const speed = Math.random() * 14 + 6
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.35 + Math.random() * 0.2,
      life: 1,
      decay: Math.random() * 0.012 + 0.008,
    })
  }

  let rafId: number
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += p.gravity
      p.vx *= 0.99
      p.rotation += p.rotSpeed
      p.life -= p.decay
      if (p.life > 0) {
        alive = true
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
    }
    if (alive) {
      rafId = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(rafId)
      canvas.remove()
    }
  }
  animate()
}

/* ── Ripple on click ────────────────────────────────────────── */
function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget
  const existing = btn.querySelector('.ripple-wave')
  if (existing) existing.remove()

  const circle = document.createElement('span')
  const diameter = Math.max(btn.clientWidth, btn.clientHeight)
  const radius = diameter / 2
  const rect = btn.getBoundingClientRect()

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${e.clientX - rect.left - radius}px`
  circle.style.top = `${e.clientY - rect.top - radius}px`
  circle.classList.add('ripple-wave')
  btn.appendChild(circle)
}

/* ── Social icon map ────────────────────────────────────────── */
function SocialIcon({ name }: { name: string }) {
  switch (name.toLowerCase()) {
    case 'github':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    default:
      return null
  }
}

/* ── Magnetic social link ───────────────────────────────────── */
function MagneticSocial({
  link,
  delay,
}: {
  link: { name: string; url: string; icon: string }
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <MagneticButton strength={0.3}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-5 py-3 glass rounded-xl border border-white/5 hover:border-accent/30 text-text-2 hover:text-text-1 transition-colors duration-300"
          aria-label={link.name}
        >
          <span className="text-accent group-hover:text-accent-2 transition-colors duration-200">
            <SocialIcon name={link.icon} />
          </span>
          <span className="text-sm">{link.name}</span>
        </a>
      </MagneticButton>
    </motion.div>
  )
}

/* ── Contact form ───────────────────────────────────────────── */
type FormStatus = 'idle' | 'sending' | 'success' | 'error'

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-text-2 uppercase tracking-wider pl-1">
        {label}
      </label>
      {children}
    </div>
  )
}

function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [loadedAt, setLoadedAt] = useState<number>(0)

  useEffect(() => {
    setLoadedAt(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          website: '',
          _t: loadedAt,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        fireConfetti()
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputBase =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-text-1 placeholder-text-2/30 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all duration-200'

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-10">
      <div className="glass rounded-2xl border border-white/5 p-6 sm:p-8 space-y-5 shadow-xl shadow-black/20">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none' }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Nom">
            <input
              type="text"
              placeholder="Selim Usenmez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              className={inputBase}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              placeholder="toi@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={200}
              className={inputBase}
            />
          </Field>
        </div>

        <Field label={`Message${message.length > 0 ? ` — ${message.length}/2000` : ''}`}>
          <textarea
            placeholder="Dis-moi tout…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={2000}
            rows={5}
            className={`${inputBase} resize-none`}
          />
        </Field>

        {/* Submit — ripple + magnetic */}
        <MagneticButton strength={0.15} className="w-full">
          <button
            type="submit"
            disabled={status === 'sending'}
            onClick={createRipple}
            className="ripple-container group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 bg-accent/15 border border-accent/25 text-accent hover:bg-accent/25 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Envoi en cours…
              </>
            ) : (
              <>
                Envoyer le message
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 16 16" fill="none"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </MagneticButton>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Message envoyé ! Je te répondrai très bientôt.
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
              <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            Erreur lors de l&apos;envoi. Réessaie ou écris-moi directement.
          </motion.div>
        )}
      </div>
    </form>
  )
}

/* ── Section principale ─────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-accent" />
          <span className="text-xs tracking-widest uppercase text-accent font-medium">Contact</span>
          <span className="w-8 h-px bg-accent" />
        </motion.div>

        {/* Big heading */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-text-1 leading-tight"
          >
            Parlons{' '}
            <span className="gradient-text-shimmer">ensemble</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-2 text-base md:text-lg max-w-lg mx-auto mb-12"
        >
          Une idée de projet, une opportunité ou juste envie d&apos;échanger ?<br />
          Je suis toujours ouvert à de nouvelles conversations.
        </motion.p>

        {/* Email button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 group">
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-display font-bold text-xl md:text-3xl gradient-text hover:opacity-80 transition-opacity"
            >
              {siteConfig.email}
            </a>
            <MagneticButton strength={0.5}>
              <button
                onClick={copyEmail}
                className="p-2 glass rounded-lg border border-white/5 hover:border-accent/30 text-text-2 hover:text-accent transition-all duration-200"
                title="Copier l'email"
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M11 5V4C11 3.17 10.33 2.5 9.5 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9.5C2.5 10.33 3.17 11 4 11H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ContactForm />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex items-center gap-4 my-10 max-w-xl mx-auto"
        >
          <span className="flex-1 h-px bg-white/5" />
          <span className="text-xs text-text-2/40 uppercase tracking-widest">ou</span>
          <span className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {socialLinks.map((link, i) => (
            <MagneticSocial key={link.name} link={link} delay={0.8 + i * 0.08} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
