import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { navLinks } from '../data/content'
import { scrollToSection } from '../lib/lenis'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-bg/80 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" onClick={(e) => handleClick(e, 'home')} className="shrink-0">
          <img src="/unizova-wordmark-light.png" alt="Unizova" className="h-7 w-auto md:h-8" />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className="group relative text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent-2)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          onClick={(e) => handleClick(e, 'cta')}
          className="hidden rounded-full border border-white/15 px-5 py-2 text-sm transition-colors hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] md:block"
        >
          Let's Talk
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-white transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className="font-[var(--font-display)] text-3xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
