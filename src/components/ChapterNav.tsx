import { useEffect, useState } from 'react'
import type { Chapter } from '../content/chapters'

interface Props {
  chapters: Chapter[]
}

export function ChapterNav({ chapters }: Props) {
  const [activeId, setActiveId] = useState(`ch-0`)

  useEffect(() => {
    const observers = chapters.map((ch) => {
      const el = document.getElementById(`ch-${ch.id}`)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(`ch-${ch.id}`)
        },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' },
      )

      observer.observe(el)
      return observer
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [chapters])

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-5"
      aria-label="Chapter navigation"
    >
      {chapters.map((chapter) => {
        const id = `ch-${chapter.id}`
        const isActive = activeId === id
        return (
          <a
            key={chapter.id}
            href={`#${id}`}
            className="group flex items-center gap-3"
            aria-label={`Chapter ${chapter.id}: ${chapter.title}`}
          >
            <span
              className="block rounded-full"
              style={{
                width: isActive ? '8px' : '6px',
                height: isActive ? '8px' : '6px',
                backgroundColor: chapter.accent,
                opacity: isActive ? 1 : 0.3,
              }}
            />
            <span
              className="text-xs tracking-wide whitespace-nowrap"
              style={{
                color: chapter.accent,
                opacity: isActive ? 0.9 : 0,
              }}
            >
              {chapter.title}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
