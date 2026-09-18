import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import WaveBackground from './WaveBackground'

gsap.registerPlugin(ScrollTrigger)

const words = ['Build Smarter', 'Automate Faster', 'Grow with AI', 'AI-Native Software']

export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })
      tl.to(trackRef.current, { xPercent: -50, duration: 18, ease: 'none' })

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = gsap.utils.clamp(-4, 4, self.getVelocity() / -400)
          if (Math.abs(velocity) > 0.15) {
            gsap.to(tl, { timeScale: velocity, duration: 0.4, overwrite: true, ease: 'power2.out' })
          }
        },
      })

      let idle
      const onScroll = () => {
        clearTimeout(idle)
        idle = setTimeout(() => {
          gsap.to(tl, { timeScale: 1, duration: 1.2, ease: 'power3.out' })
        }, 120)
      }
      window.addEventListener('scroll', onScroll)

      return () => {
        st.kill()
        tl.kill()
        window.removeEventListener('scroll', onScroll)
        clearTimeout(idle)
      }
    }, trackRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[var(--color-bg-soft)] py-6">
      <WaveBackground colorA="#5ed66e" colorB="#22d3ee" opacity={0.25} fillOpacity={0.02} amplitude={0.3} speed={0.6} />
      <div ref={trackRef} className="relative flex w-max items-center gap-10 whitespace-nowrap will-change-transform">
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
