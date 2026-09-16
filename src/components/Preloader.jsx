import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const counter = { val: 0 }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        setHidden(true)
        onComplete?.()
      },
    })

    tl.to(counter, {
      val: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.floor(counter.val)).padStart(3, '0')
        }
      },
    })
      .to('.preloader-bar', { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, '<')
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '+=0.2')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  if (hidden) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <img src="/unizova-wordmark-light.png" alt="Unizova" className="h-9 w-auto" />
      <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
        <div className="preloader-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]" />
      </div>
      <span ref={countRef} className="mt-4 font-[var(--font-display)] text-xs tracking-[0.3em] text-[var(--color-muted)]">
        000
      </span>
    </div>
  )
}
