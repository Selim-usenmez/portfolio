'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ── Main cursor ────────────────────────────────────────────── */
export default function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 900, mass: 0.5 }
  const ringSpringConfig = { damping: 22, stiffness: 220, mass: 0.8 }

  const dotXSpring = useSpring(dotX, springConfig)
  const dotYSpring = useSpring(dotY, springConfig)
  const ringXSpring = useSpring(dotX, ringSpringConfig)
  const ringYSpring = useSpring(dotY, ringSpringConfig)

  const isHovering = useRef(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX - 4)
      dotY.set(e.clientY - 4)
    }

    const onEnterLink = () => {
      isHovering.current = true
      if (dotRef.current) {
        dotRef.current.style.transform = 'scale(2)'
        dotRef.current.style.opacity = '0.6'
      }
      if (ringRef.current) {
        ringRef.current.style.width = '56px'
        ringRef.current.style.height = '56px'
        ringRef.current.style.borderColor = 'rgba(192, 132, 252, 0.7)'
        ringRef.current.style.transform = 'translate(-24px, -24px)'
      }
    }

    const onLeaveLink = () => {
      isHovering.current = false
      if (dotRef.current) {
        dotRef.current.style.transform = 'scale(1)'
        dotRef.current.style.opacity = '1'
      }
      if (ringRef.current) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.borderColor = 'rgba(129, 140, 248, 0.5)'
        ringRef.current.style.transform = 'translate(-14px, -14px)'
      }
    }

    const addHoverListeners = () => {
      const interactables = document.querySelectorAll('a, button, [data-cursor-hover]')
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    window.addEventListener('mousemove', onMove)
    addHoverListeners()

    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [dotX, dotY])

  return (
    <>
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{ x: dotXSpring, y: dotYSpring }}
        transition={{ duration: 0 }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringXSpring, y: ringYSpring }}
        transition={{ duration: 0 }}
      />
    </>
  )
}
