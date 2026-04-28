import type { Chapter } from '../content/chapters'

interface Props {
  chapters: Chapter[]
  activeChapter: number
}

export function ChapterNav({ chapters, activeChapter }: Props) {
  return (
    <nav
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      aria-label="Chapter navigation"
    >
      {chapters.map((chapter, i) => {
        const isActive = i === activeChapter
        return (
          <a
            key={chapter.id}
            href={`#ch-${chapter.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            aria-label={`Chapter ${chapter.id}: ${chapter.title}`}
            aria-current={isActive ? 'step' : undefined}
          >
            {/* Chapter title — left of dot, right-aligned */}
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                color: chapter.accent,
                opacity: isActive ? 0.9 : 0.2,
                fontWeight: isActive ? 500 : 400,
                transition: 'opacity 200ms',
              }}
            >
              {chapter.title}
            </span>

            {/* Dot */}
            <span
              style={{
                display: 'block',
                flexShrink: 0,
                borderRadius: '50%',
                width: isActive ? 8 : 5,
                height: isActive ? 8 : 5,
                backgroundColor: chapter.accent,
                opacity: isActive ? 1 : 0.3,
                transition: 'width 200ms, height 200ms, opacity 200ms',
              }}
            />
          </a>
        )
      })}
    </nav>
  )
}
