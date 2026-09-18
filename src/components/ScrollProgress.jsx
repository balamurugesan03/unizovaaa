import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    )
    return () => tween.scrollTrigger?.kill()
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-white/5">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent-cyan)]"
      />
    </div>
  )
}
