import { useRef } from 'react'
import { aiCapabilities } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import SpotlightCard from './SpotlightCard'
import FloatingOrbs from './FloatingOrbs'
import WaveBackground from './WaveBackground'

export default function AICapabilities() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.cap-card', {
    y: 70,
    opacity: 0,
    rotateX: -30,
    transformPerspective: 900,
    transformOrigin: 'top center',
    stagger: 0.12,
    duration: 1.1,
  })

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg)] py-28 md:py-36">
      <WaveBackground colorA="#3b82f6" colorB="#a855f7" opacity={0.4} fillOpacity={0.04} />
      <FloatingOrbs
        orbs={[
          { top: '-5%', left: '8%', size: '360px', color: 'var(--color-accent-blue)', opacity: 0.18, blur: 120, speed: 0.3, duration: 17 },
          { bottom: '0%', right: '6%', size: '320px', color: 'var(--color-accent-purple)', opacity: 0.16, blur: 110, speed: 0.4, duration: 20 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Services</p>
        <h2 className="max-w-2xl font-[var(--font-display)] text-4xl leading-tight md:text-5xl">
          AI that works for your business
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiCapabilities.map((item, i) => (
            <SpotlightCard key={item.title} className="cap-card p-8">
              <span className="font-[var(--font-display)] text-sm text-[var(--color-muted)]">
                0{i + 1}
              </span>
              <h3 className="mt-6 font-[var(--font-display)] text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
