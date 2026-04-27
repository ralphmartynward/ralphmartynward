import type { Chapter } from '../content/chapters'

interface Props {
  chapter: Chapter
}

export function ChapterSection({ chapter }: Props) {
  return (
    <section
      id={`ch-${chapter.id}`}
      className="min-h-screen px-6 py-28 lg:py-36 lg:pl-24"
    >
      <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-16 xl:ml-32">

        {/* Chapter marker */}
        <div className="relative mb-10">
          <span
            className="absolute -top-6 -left-2 text-[10rem] lg:text-[14rem] font-bold leading-none select-none pointer-events-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: chapter.accent,
              opacity: 0.06,
            }}
            aria-hidden="true"
          >
            {chapter.id}
          </span>

          <p
            className="text-xs tracking-[0.25em] uppercase mb-4"
            style={{ color: chapter.accent, opacity: 0.7 }}
          >
            Chapter {chapter.id}
          </p>

          <h2
            className="text-4xl lg:text-5xl font-bold leading-tight mb-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: chapter.accent,
            }}
          >
            {chapter.title}
          </h2>

          <p className="text-sm text-zinc-500 tabular-nums">{chapter.period}</p>
        </div>

        {/* Divider */}
        <div
          className="w-12 h-px mb-8"
          style={{ backgroundColor: chapter.accent, opacity: 0.4 }}
        />

        {/* Tagline */}
        <p
          className="text-xl lg:text-2xl leading-relaxed mb-12"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            color: chapter.accent,
          }}
        >
          {chapter.tagline}
        </p>

        {/* Body */}
        <div className="space-y-7">
          {chapter.paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-zinc-300 text-base lg:text-lg leading-[1.85]"
              dangerouslySetInnerHTML={{ __html: para }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
