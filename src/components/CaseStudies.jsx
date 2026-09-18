import { useRef } from 'react'
import { caseStudies } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import FloatingOrbs from './FloatingOrbs'
import TiltCard from './TiltCard'
import WaveBackground from './WaveBackground'

export default function CaseStudies() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.case-card', {
    y: 80,
    opacity: 0,
    scale: 0.92,
    rotateZ: (i) => (i % 2 === 0 ? -3 : 3),
    stagger: 0.15,
    duration: 1.1,
  })

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg-soft)] py-28 md:py-36">
      <WaveBackground colorA="#3b82f6" colorB="#319c3a" opacity={0.4} fillOpacity={0.04} tilt={0.55} />
      <FloatingOrbs
        orbs={[
          { top: '4%', left: '6%', size: '360px', color: 'var(--color-accent-blue)', opacity: 0.14, blur: 130, speed: 0.25, duration: 18 },
          { bottom: '2%', right: '4%', size: '320px', color: 'var(--color-accent)', opacity: 0.16, blur: 110, speed: 0.3, duration: 20 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Our Works</p>
            <h2 className="max-w-xl font-[var(--font-display)] text-4xl leading-tight md:text-5xl">
              Selected work
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            This is becoming our strongest sales asset. Here&apos;s the kind of AI work we build — full case studies coming soon.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {caseStudies.map((c) => (
            <TiltCard
              key={c.title}
              strength={6}
              className="case-card group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div
                className="relative h-56 overflow-hidden"
                style={{ background: 'linear-gradient(to bottom right, #10261a, #0f1a14, #0a0a0f)' }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{ background: 'radial-gradient(circle at 30% 20%, rgba(49,156,58,0.4), transparent 60%)' }}
                />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur-sm">
                  {c.tag}
                </span>
                <span className="absolute bottom-5 right-5 flex h-9 w-9 -translate-x-2 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-[var(--font-display)] text-xl leading-snug">{c.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{c.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
