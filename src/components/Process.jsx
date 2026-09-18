import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import FloatingOrbs from './FloatingOrbs'
import WaveBackground from './WaveBackground'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  useScrollReveal(sectionRef, '.process-step', {
    y: 40,
    opacity: 0,
    scale: 0.9,
    stagger: 0.1,
  })
  useScrollReveal(sectionRef, '.process-dot', {
    scale: 0,
    rotate: 180,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg)] py-28 md:py-36">
      <WaveBackground colorA="#ec4899" colorB="#319c3a" opacity={0.35} fillOpacity={0.035} />
      <FloatingOrbs
        orbs={[
          { top: '0%', left: '10%', size: '340px', color: 'var(--color-accent-pink)', opacity: 0.14, blur: 120, speed: 0.25, duration: 19 },
          { bottom: '0%', right: '8%', size: '320px', color: 'var(--color-accent)', opacity: 0.16, blur: 110, speed: 0.3, duration: 21 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Process</p>
        <h2 className="max-w-2xl font-[var(--font-display)] text-4xl leading-tight md:text-5xl">
          From Idea → AI Product
        </h2>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 md:block" />
          <div
            ref={lineRef}
            className="absolute left-0 top-5 hidden h-px w-full origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] md:block"
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5 md:gap-6">
            {processSteps.map((s) => (
              <div key={s.step} className="process-step relative">
                <div className="process-dot mb-6 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-2)] md:mb-8" />
                <span className="font-[var(--font-display)] text-xs text-[var(--color-muted)]">{s.step}</span>
                <h3 className="mt-2 font-[var(--font-display)] text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
