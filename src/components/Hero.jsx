import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroCanvas from './HeroCanvas'
import SplitText from './SplitText'
import { useMagnetic } from '../lib/useMagnetic'
import { scrollToSection } from '../lib/lenis'

export default function Hero({ ready }) {
  const rootRef = useRef(null)
  const primaryRef = useMagnetic(0.3)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.7 })
        .from('.split-word', { yPercent: 120, stagger: 0.03, duration: 1.1 }, '-=0.4')
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .from('.hero-canvas-wrap', { opacity: 0, duration: 1.4 }, '-=1.2')
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.3')

      gsap.to('.hero-scroll-cue', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: 'sine.inOut',
        delay: 2,
      })

      timelineRef.current = tl
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (ready) timelineRef.current?.play()
  }, [ready])

  const goServices = (e) => {
    e.preventDefault()
    scrollToSection('services')
  }
  const goSolutions = (e) => {
    e.preventDefault()
    scrollToSection('solutions')
  }

  return (
    <section id="home" ref={rootRef} className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-bg)]">
      <div className="hero-canvas-wrap pointer-events-none absolute inset-0 opacity-90">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-bg)_85%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 md:px-10">
        <p className="hero-eyebrow mb-6 text-sm uppercase tracking-[0.3em] text-[var(--color-accent-2)]">
          AI Software &amp; Automation Studio
        </p>

        <h1 className="max-w-4xl font-[var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          <SplitText text="Build Smarter." className="block" />
          <SplitText text="Automate Faster." className="block" />
          <SplitText text="Grow with AI." className="block bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent" />
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-lg text-[var(--color-muted)]">
          Unizova builds AI-powered software, intelligent automation and scalable digital products for ambitious businesses.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            ref={primaryRef}
            href="#services"
            onClick={goServices}
            data-cursor="hover"
            className="hero-cta inline-flex items-center rounded-full bg-[var(--color-fg)] px-7 py-3.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
          >
            Build with AI
          </a>
          <a
            href="#solutions"
            onClick={goSolutions}
            data-cursor="hover"
            className="hero-cta inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium transition-colors hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)]"
          >
            Explore Solutions
          </a>
        </div>
      </div>

      <div className="hero-scroll-cue absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
        Scroll
      </div>
    </section>
  )
}
