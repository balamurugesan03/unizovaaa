import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return

    document.body.classList.add('has-cursor')

    const dot = dotRef.current
    const ring = ringRef.current

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' })
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' })
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    gsap.set([dot, ring], { opacity: 0 })
    let revealed = false

    const move = (e) => {
      setDotX(e.clientX)
      setDotY(e.clientY)
      setRingX(e.clientX)
      setRingY(e.clientY)
      if (!revealed) {
        revealed = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.3 })
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-2)] md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[998] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/60 md:block"
      />
    </>
  )
}
