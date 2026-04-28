import { useEffect, useState } from 'react'

// Returns -1 when at the hero (before Ch0), or 0–N for the active chapter.
// Chapter sections must have id="ch-{index}" in the DOM.
export function useActiveChapter(count: number): number {
  const [active, setActive] = useState(-1)

  useEffect(() => {
    // Detect hero state: Ch0 hasn't entered the viewport yet
    const checkHero = () => {
      const ch0El = document.getElementById('ch-0')
      if (!ch0El) return
      if (ch0El.getBoundingClientRect().top > window.innerHeight * 0.5) {
        setActive(-1)
      }
    }
    checkHero() // evaluate immediately on mount
    window.addEventListener('scroll', checkHero, { passive: true })

    // Chapter observers — fire when a chapter enters the active zone
    const observers = Array.from({ length: count }, (_, i) => {
      const el = document.getElementById(`ch-${i}`)
      if (!el) return null
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' },
      )
      o.observe(el)
      return o
    })

    return () => {
      window.removeEventListener('scroll', checkHero)
      observers.forEach(o => o?.disconnect())
    }
  }, [count])

  return active
}
