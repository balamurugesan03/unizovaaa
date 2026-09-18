import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTilt } from '../lib/useTilt'

export default function SpotlightCard({ children, className = '' }) {
  const glowRef = useRef(null)
  const tiltRef = useTilt(10)

  useEffect(() => {
    const el = tiltRef.current
    const glow = glowRef.current
    if (!el || !glow) return

    const move = (e) => {
      const rect = el.getBoundingClientRect()
      glow.style.setProperty('--x', `${e.clientX - rect.left}px`)
      glow.style.setProperty('--y', `${e.clientY - rect.top}px`)
    }
    const enter = () => gsap.to(glow, { opacity: 1, duration: 0.4 })
    const leave = () => gsap.to(glow, { opacity: 0, duration: 0.5 })

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [tiltRef])

  return (
    <div
      ref={tiltRef}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20 ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(49,156,58,0.18), transparent 70%)',
        }}
      />
      {children}
    </div>
  )
}
