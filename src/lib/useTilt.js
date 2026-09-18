import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useTilt(strength = 12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return

    gsap.set(el, { transformPerspective: 700, transformStyle: 'preserve-3d' })
    const setRotateX = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3.out' })
    const setRotateY = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3.out' })
    const setScale = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power3.out' })

    const move = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setRotateX(-py * strength)
      setRotateY(px * strength)
    }
    const enter = () => setScale(1.03)
    const leave = () => {
      setRotateX(0)
      setRotateY(0)
      setScale(1)
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return ref
}
