import { useRef } from 'react'
import { useScrollReveal } from '../lib/useScrollReveal'
import { useMagnetic } from '../lib/useMagnetic'

export default function CTA() {
  const sectionRef = useRef(null)
  const btnRef = useMagnetic(0.3)
  useScrollReveal(sectionRef, '.cta-reveal', { stagger: 0.1 })

  return (
    <section id="cta" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg)] py-32 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[var(--color-accent-2)]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p className="cta-reveal mb-6 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">
          Let&apos;s build
        </p>
        <h2 className="cta-reveal font-[var(--font-display)] text-4xl leading-tight md:text-6xl">
          Have a business problem?
          <br />
          Let&apos;s build the AI solution.
        </h2>

        <a
          ref={btnRef}
          href="mailto:hello@unizova.com"
          data-cursor="hover"
          className="cta-reveal mt-12 inline-flex items-center rounded-full bg-[var(--color-fg)] px-9 py-4 text-sm font-medium text-bg transition-transform hover:scale-105"
        >
          Start a project
        </a>
      </div>
    </section>
  )
}
