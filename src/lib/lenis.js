let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return

  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -72, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
