'use client'

import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let animId: number
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      cx += (tx - cx) * 0.055
      cy += (ty - cy) * 0.055
      el.style.transform = `translate(${cx - 350}px, ${cy - 350}px)`
      animId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        width: 700,
        height: 700,
        background:
          'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.05) 35%, transparent 65%)',
        willChange: 'transform',
      }}
    />
  )
}
