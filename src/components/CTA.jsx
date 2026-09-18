import { useRef } from 'react'
import { useScrollReveal } from '../lib/useScrollReveal'
import { useMagnetic } from '../lib/useMagnetic'
import FloatingOrbs from './FloatingOrbs'
import WaveBackground from './WaveBackground'

export default function CTA() {
  const sectionRef = useRef(null)
  const btnRef = useMagnetic(0.3)
  useScrollReveal(sectionRef, '.cta-reveal', {
    y: 30,
    opacity: 0,
    scale: 0.96,
    stagger: 0.1,
    ease: 'back.out(1.6)',
  })

  return (
    <section id="cta" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg)] py-32 md:py-44">
      <WaveBackground colorA="#319c3a" colorB="#3b82f6" opacity={0.5} fillOpacity={0.05} amplitude={0.7} />
      <FloatingOrbs
        orbs={[
          { top: '10%', left: '18%', size: '560px', color: 'var(--color-accent)', opacity: 0.22, blur: 140, speed: 0.3, duration: 17 },
          { bottom: '-5%', right: '15%', size: '440px', color: 'var(--color-accent-blue)', opacity: 0.18, blur: 130, speed: 0.35, duration: 20 },
          { top: '30%', right: '30%', size: '320px', color: 'var(--color-accent-purple)', opacity: 0.16, blur: 110, speed: 0.4, duration: 15 },
        ]}
      />

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
