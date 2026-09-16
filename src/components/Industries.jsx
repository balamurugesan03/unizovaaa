import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { industries } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Industries() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const distance = track.scrollWidth - window.innerWidth
        if (distance <= 0) return

        const tween = gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        })

        return () => tween.scrollTrigger?.kill()
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="industries" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="flex min-h-screen flex-col justify-center py-28 md:min-h-0 md:py-0">
        <div className="px-6 md:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Industries</p>
          <h2 className="max-w-2xl font-[var(--font-display)] text-4xl leading-tight md:text-6xl">
            AI solutions by industry
          </h2>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 will-change-transform md:snap-none md:overflow-visible md:pb-0 md:pl-16 md:pr-16"
        >
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="flex h-[340px] w-[78vw] shrink-0 snap-start flex-col justify-end rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 sm:w-[280px] md:w-[360px]"
            >
              <span className="mb-4 h-8 w-8 rounded-full border border-[var(--color-accent-2)]/50" />
              <h3 className="font-[var(--font-display)] text-2xl">{ind.name}</h3>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{ind.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
