import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(scopeRef, selector, vars = {}, triggerOpts = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        ...vars,
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 78%',
          ...triggerOpts,
        },
      })
    }, scopeRef)
    return () => ctx.revert()
  }, [])
}
