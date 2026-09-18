import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/content'
import { scrollToSection } from '../lib/lenis'
import { useScrollReveal } from '../lib/useScrollReveal'
import FloatingOrbs from './FloatingOrbs'
import WaveBackground from './WaveBackground'

gsap.registerPlugin(ScrollTrigger)

const social = ['LinkedIn', 'X', 'GitHub']

export default function Footer() {
  const rootRef = useRef(null)
  const wordmarkRef = useRef(null)
  useScrollReveal(rootRef, '.footer-col', { y: 30, stagger: 0.1 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { xPercent: 4, opacity: 0.02 },
        {
          xPercent: -4,
          opacity: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <footer id="career" ref={rootRef} className="relative overflow-hidden border-t border-white/10 bg-[var(--color-bg)] pt-20">
      <WaveBackground colorA="#319c3a" colorB="#5ed66e" opacity={0.3} fillOpacity={0.03} tilt={0.5} />
      <FloatingOrbs
        orbs={[
          { top: '5%', left: '10%', size: '380px', color: 'var(--color-accent)', opacity: 0.12, blur: 130, speed: 0.2, duration: 20 },
          { bottom: '0%', right: '8%', size: '320px', color: 'var(--color-accent-2)', opacity: 0.14, blur: 120, speed: 0.25, duration: 23 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="footer-col">
            <img src="/unizova-wordmark-light.png" alt="Unizova" className="h-8 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-[var(--color-muted)]">
              We build AI-powered software, intelligent automation and scalable digital products for ambitious businesses.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Company</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleClick(e, link.id)}
                    className="text-sm text-[var(--color-fg)]/80 transition-colors hover:text-[var(--color-accent-2)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Connect</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:hello@unizova.com" className="text-sm text-[var(--color-fg)]/80 transition-colors hover:text-[var(--color-accent-2)]">
                  hello@unizova.com
                </a>
              </li>
              {social.map((s) => (
                <li key={s}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-[var(--color-fg)]/80 transition-colors hover:text-[var(--color-accent-2)]">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-[var(--color-muted)]">
              Hiring soon — reach out to be first in line.
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <span
            ref={wordmarkRef}
            className="block select-none whitespace-nowrap text-center font-[var(--font-display)] text-[20vw] font-semibold leading-none tracking-tight text-white md:text-[11vw]"
          >
            UNIZOVA
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-[var(--color-muted)] md:flex-row">
          <span>© 2026 Unizova. All rights reserved.</span>
          <span>Build Smarter. Automate Faster. Grow with AI.</span>
        </div>
      </div>
    </footer>
  )
}
