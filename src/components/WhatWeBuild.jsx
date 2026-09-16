import { useRef } from 'react'
import { whatWeBuild } from '../data/content'
import { useScrollReveal } from '../lib/useScrollReveal'

export default function WhatWeBuild() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef, '.build-row', { x: -30, y: 0, stagger: 0.08 })

  return (
    <section id="solutions" ref={sectionRef} className="relative bg-[var(--color-bg-soft)] py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
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
