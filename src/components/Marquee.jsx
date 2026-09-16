const words = ['Build Smarter', 'Automate Faster', 'Grow with AI', 'AI-Native Software']

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[var(--color-bg-soft)] py-6">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex items-center gap-10">
            {words.map((w) => (
              <span
                key={w}
                className="flex items-center gap-10 font-[var(--font-display)] text-3xl text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] md:text-4xl md:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.35)]"
              >
                {w}
                <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent-2)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
