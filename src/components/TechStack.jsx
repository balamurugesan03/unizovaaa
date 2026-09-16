import { useRef } from 'react'
import { techStack } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import SpotlightCard from './SpotlightCard'

export default function TechStack() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.tech-card', { stagger: 0.08, scale: 0.94 })

  return (
    <section id="technologies" ref={sectionRef} className="relative bg-[var(--color-bg-soft)] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Technology</p>
        <h2 className="max-w-2xl font-[var(--font-display)] text-4xl leading-tight md:text-5xl">
          Our AI Technology
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4">
          {techStack.map((item) => (
            <SpotlightCard key={item.title} className="tech-card p-6 md:p-7">
              <h3 className="font-[var(--font-display)] text-lg md:text-xl">{item.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)] md:text-sm">{item.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
