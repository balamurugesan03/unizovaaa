import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FloatingOrbs({ orbs, className = '' }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const els = rootRef.current.querySelectorAll('.orb')
        const tweens = Array.from(els).map((el, i) => {
          const cfg = orbs[i] || {}
          const speed = cfg.speed ?? 0.3
          const dir = cfg.dir ?? (i % 2 === 0 ? 1 : -1)
          return gsap.to(el, {
            y: dir * speed * 260,
            x: (i % 2 === 0 ? -1 : 1) * speed * 90,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          })
        })
        return () => tweens.forEach((t) => t.scrollTrigger?.kill())
      })
    }, rootRef)
    return () => ctx.revert()
  }, [orbs])

  return (
    <div ref={rootRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {orbs.map((orb, i) => (
        <span
          key={i}
          className="orb absolute rounded-full"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur ?? 90}px)`,
            opacity: orb.opacity ?? 0.5,
            mixBlendMode: orb.blend ?? 'screen',
            animationDelay: `${orb.delay ?? 0}s`,
            animationDuration: `${orb.duration ?? 15}s`,
          }}
        />
      ))}
    </div>
  )
}
