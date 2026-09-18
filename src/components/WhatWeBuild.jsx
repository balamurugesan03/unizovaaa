import { useRef } from 'react'
import { whatWeBuild } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'
import FloatingOrbs from './FloatingOrbs'
import WaveBackground from './WaveBackground'

export default function WhatWeBuild() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.build-row', {
    x: (i) => (i % 2 === 0 ? -80 : 80),
    y: 0,
    opacity: 0,
    stagger: 0.08,
    duration: 1,
  })

  return (
    <section id="solutions" ref={sectionRef} className="relative overflow-hidden bg-[var(--color-bg-soft)] py-28 md:py-36">
      <WaveBackground colorA="#a855f7" colorB="#ec4899" opacity={0.4} fillOpacity={0.04} tilt={0.55} />
      <FloatingOrbs
        orbs={[
          { top: '4%', right: '10%', size: '380px', color: 'var(--color-accent-purple)', opacity: 0.16, blur: 130, speed: 0.3, duration: 18 },
          { bottom: '2%', left: '4%', size: '340px', color: 'var(--color-accent-pink)', opacity: 0.15, blur: 120, speed: 0.35, duration: 21 },
        ]}
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[var(--color-accent-2)]">Solutions</p>
            <h2 className="max-w-xl font-[var(--font-display)] text-4xl leading-tight md:text-5xl">
              What We Build
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--color-muted)]">
            Real products, shipped end-to-end — not slideware. Every build is scoped to move a real business metric.
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {whatWeBuild.map((item, i) => (
            <div
              key={item.title}
              className="build-row group flex flex-col gap-2 py-7 transition-colors md:flex-row md:items-center md:gap-10 md:py-8"
            >
              <span className="font-[var(--font-display)] text-sm text-[var(--color-muted)] md:w-12">
                0{i + 1}
              </span>
              <h3 className="font-[var(--font-display)] text-2xl transition-colors group-hover:text-[var(--color-accent-2)] md:w-72">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)] md:flex-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
