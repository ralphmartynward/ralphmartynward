import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../content/chapters'
import { ChapterNav } from '../components/ChapterNav'
import { ChapterSection } from '../components/ChapterSection'
import { SkillsGraph } from '../components/SkillsGraph'
import type { GraphNode, GraphLink } from '../components/SkillsGraph'
import { CLUSTERS } from '../data/skills'
import { useActiveChapter } from '../hooks/useActiveChapter'

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 py-20">
      <p className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-8">Portfolio</p>
      <h1
        className="text-5xl font-bold text-white leading-tight mb-6"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Ralph Ward
      </h1>
      <p className="text-zinc-400 text-lg leading-relaxed max-w-sm">
        Twelve years building across growth, product, operations, and AI.
        A chapter-by-chapter account.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
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
        <span className="text-zinc-700">·</span>
        <Link
          to="/skills"
          className="text-xs tracking-wide text-zinc-600 hover:text-zinc-300"
          style={{ transitionProperty: 'color', transitionDuration: '150ms' }}
        >
          Explore skills
        </Link>
      </div>
    </section>
  )
}

export function HomePage() {
  const activeChapter = useActiveChapter(chapters.length)
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [hoveredLink, setHoveredLink] = useState<GraphLink | null>(null)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b' }}>

      {/* ── Left panel: sticky graph ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '58%',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <SkillsGraph
          chapter={activeChapter}
          onNodeHover={n => { setHoveredNode(n); if (n) setHoveredLink(null) }}
          onLinkHover={l => { setHoveredLink(l); if (l) setHoveredNode(null) }}
        />

        {/* Chapter nav dots — right edge of graph panel */}
        <div
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <ChapterNav chapters={chapters} activeChapter={activeChapter} />
        </div>

        {/* Tooltip — bottom-left of graph panel (node or annotated edge) */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            zIndex: 10,
            maxWidth: 260,
            opacity: hoveredNode || hoveredLink?.label ? 1 : 0,
            transition: 'opacity 150ms',
            pointerEvents: 'none',
          }}
        >
          {hoveredNode && (
            <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ fontSize: 10, color: CLUSTERS[hoveredNode.cluster].color, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                {CLUSTERS[hoveredNode.cluster].name}
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: CLUSTERS[hoveredNode.cluster].color, marginBottom: hoveredNode.tools.length > 0 ? 8 : 0 }}>
                {hoveredNode.name}
              </p>
              {hoveredNode.tools.length > 0 && (
                <p style={{ fontSize: 11, color: '#a1a1aa', lineHeight: 1.65 }}>
                  {hoveredNode.tools.slice(0, 8).join(' · ')}
                  {hoveredNode.tools.length > 8 ? ` · +${hoveredNode.tools.length - 8} more` : ''}
                </p>
              )}
            </div>
          )}
          {!hoveredNode && hoveredLink?.label && (
            <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ fontSize: 11, color: '#e4e4e7', lineHeight: 1.7 }}>{hoveredLink.label}</p>
            </div>
          )}
        </div>

        {/* Back to explore link */}
        <Link
          to="/skills"
          style={{
            position: 'absolute',
            bottom: 24,
            right: 24,
            zIndex: 10,
            fontSize: 10,
            color: '#3f3f46',
            textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#71717a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#3f3f46')}
        >
          explore all skills &rarr;
        </Link>
      </div>

      {/* ── Right panel: scrolling content ── */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Hero />
        {chapters.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} />
        ))}
        <footer
          style={{
            padding: '64px 32px',
            borderTop: '1px solid #27272a',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: '#52525b' }}>
              Ralph Ward &middot; v2.ralph-ward.com
            </p>
            <Link
              to="/skills"
              style={{ fontSize: 12, color: '#52525b', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
              onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}
            >
              Skills network &rarr;
            </Link>
          </div>
        </footer>
      </div>

    </div>
  )
}
