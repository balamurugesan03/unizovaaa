import { useRef } from 'react'
import { aiCapabilities } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import SpotlightCard from './SpotlightCard'

export default function AICapabilities() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.cap-card', { stagger: 0.12 })

  return (
    <section id="services" ref={sectionRef} className="relative bg-[var(--color-bg)] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
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
