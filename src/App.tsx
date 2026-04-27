import { chapters } from './content/chapters'
import { ChapterNav } from './components/ChapterNav'
import { ChapterSection } from './components/ChapterSection'

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24 lg:pl-24">
      <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-16 xl:ml-32">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-8">
          Portfolio
        </p>
        <h1
          className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ralph Ward
        </h1>
        <p className="text-zinc-400 text-lg lg:text-xl leading-relaxed max-w-md">
          Twelve years of building across growth, product, operations, and AI.
          A chapter-by-chapter account.
        </p>
        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-2">
          {chapters.map((ch) => (
            <a
              key={ch.id}
              href={`#ch-${ch.id}`}
              className="text-xs tracking-wide text-zinc-600 hover:text-zinc-300"
              style={{ transitionProperty: 'color', transitionDuration: '150ms' }}
            >
              {ch.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function App() {
  return (
    <>
      <ChapterNav chapters={chapters} />
      <main>
        <Hero />
        {chapters.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} />
        ))}
        <footer className="px-6 lg:pl-24 py-16 border-t border-zinc-800">
          <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-16 xl:ml-32">
            <p className="text-xs text-zinc-600">
              Ralph Ward &middot; v2.ralph-ward.com
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
