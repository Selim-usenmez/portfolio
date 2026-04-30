'use client'

import { useRef } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength * 80
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength * 80
    ref.current.style.transform = `translate(${x}px, ${y}px) scale(1.04)`
    ref.current.style.transition = 'transform 0.1s ease'
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0) scale(1)'
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  )
}
