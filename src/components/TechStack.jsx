import { useRef } from 'react'
import { techStack } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import SpotlightCard from './SpotlightCard'
import FloatingOrbs from './FloatingOrbs'
import WaveBackground from './WaveBackground'

export default function TechStack() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.tech-card', {
    y: 40,
    opacity: 0,
    scale: 0.82,
    filter: 'blur(14px)',
    stagger: 0.08,
    duration: 0.9,
  })

  return (
    <section id="technologies" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg-soft)] py-28 md:py-36">
      <WaveBackground colorA="#22d3ee" colorB="#5ed66e" opacity={0.4} fillOpacity={0.04} tilt={0.55} />
      <FloatingOrbs
        orbs={[
          { top: '2%', right: '8%', size: '360px', color: 'var(--color-accent-cyan)', opacity: 0.16, blur: 120, speed: 0.3, duration: 18 },
          { bottom: '4%', left: '6%', size: '320px', color: 'var(--color-accent-2)', opacity: 0.14, blur: 110, speed: 0.25, duration: 20 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
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
