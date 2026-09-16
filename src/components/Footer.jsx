import { navLinks } from '../data/content'
import { scrollToSection } from '../lib/lenis'

const social = ['LinkedIn', 'X', 'GitHub']

export default function Footer() {
  const handleClick = (e, id) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <footer id="career" className="relative border-t border-white/10 bg-[var(--color-bg)] pt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/unizova-wordmark-light.png" alt="Unizova" className="h-8 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-[var(--color-muted)]">
              We build AI-powered software, intelligent automation and scalable digital products for ambitious businesses.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Company</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleClick(e, link.id)}
                    className="text-sm text-[var(--color-fg)]/80 transition-colors hover:text-[var(--color-accent-2)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Connect</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:hello@unizova.com" className="text-sm text-[var(--color-fg)]/80 transition-colors hover:text-[var(--color-accent-2)]">
                  hello@unizova.com
                </a>
              </li>
              {social.map((s) => (
                <li key={s}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-[var(--color-fg)]/80 transition-colors hover:text-[var(--color-accent-2)]">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-[var(--color-muted)]">
              Hiring soon — reach out to be first in line.
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <span className="block select-none whitespace-nowrap text-center font-[var(--font-display)] text-[20vw] font-semibold leading-none tracking-tight text-white/[0.04] md:text-[11vw]">
            UNIZOVA
          </span>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-[var(--color-muted)] md:flex-row">
          <span>© 2026 Unizova. All rights reserved.</span>
          <span>Build Smarter. Automate Faster. Grow with AI.</span>
        </div>
      </div>
    </footer>
  )
}
