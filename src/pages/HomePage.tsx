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
    <section className="min-h-screen flex flex-col justify-center px-8 py-20 relative">

      {/* Meta line — top of hero for returning visitors */}
      <div style={{
        position: 'absolute', top: 24, left: 32, right: 32,
        display: 'flex', gap: 20, fontSize: 10,
        letterSpacing: '0.18em', textTransform: 'uppercase', color: '#52525b',
      }}>
        <span>Portfolio</span>
        <span style={{ color: '#27272a' }}>·</span>
        <span>Toulouse</span>
        <span style={{ color: '#27272a' }}>·</span>
        <a href="https://cutt.ly/atLkiHpm" target="_blank" rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
          onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}>
          CV ↓
        </a>
        <span style={{ color: '#27272a' }}>·</span>
        <a href="https://www.linkedin.com/in/ralphmartynward" target="_blank" rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
          onMouseLeave={e => (e.currentTarget.style.color = '#52525b')}>
          LinkedIn ↑
        </a>
      </div>

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
      </div>
      <Link
        to="/skills"
        className="hero-skills-cta mt-8 items-center gap-2 text-xs tracking-[0.12em] text-zinc-500 border border-zinc-800 rounded-full px-4 py-2 hover:text-zinc-300 hover:border-zinc-600"
        style={{ transitionProperty: 'color, border-color', transitionDuration: '150ms' }}
      >
        View skills network &rarr;
      </Link>
    </section>
  )
}

export function HomePage() {
  const activeChapter = useActiveChapter(chapters.length)
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [hoveredLink, setHoveredLink] = useState<GraphLink | null>(null)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#09090b' }}>

      {/* ── Left panel: sticky graph (hidden on mobile) ── */}
      <div
        className="home-graph-panel"
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

      </div>

      {/* ── Right panel: scrolling content ── */}
      <div className="home-content-panel" style={{ flex: 1, minWidth: 0 }}>
        <Hero />
        {chapters.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} />
        ))}
        <footer style={{ padding: '64px 32px', borderTop: '1px solid #27272a' }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <img
              src="/assets/img/profile.png"
              alt="Ralph Ward"
              style={{
                width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
                flexShrink: 0, filter: 'grayscale(40%) brightness(0.75)',
              }}
            />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 32, fontSize: 12 }}>
              <span style={{ color: '#3f3f46', minWidth: 80 }}>contact</span>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="mailto:ralphmartynward@gmail.com" style={{ color: '#71717a', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>
                  ralphmartynward@gmail.com
                </a>
                <span style={{ color: '#3f3f46' }}>·</span>
                <a href="https://www.linkedin.com/in/ralphmartynward" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#71717a', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>
                  LinkedIn
                </a>
                <span style={{ color: '#3f3f46' }}>·</span>
                <a href="https://github.com/ralphmartynward/" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#71717a', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>
                  GitHub
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 32, fontSize: 12 }}>
              <span style={{ color: '#3f3f46', minWidth: 80 }}>download</span>
              <a href="https://cutt.ly/atLkiHpm" target="_blank" rel="noopener noreferrer"
                style={{ color: '#71717a', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
                onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>
                CV (PDF)
              </a>
            </div>
            <div style={{ display: 'flex', gap: 32, fontSize: 12 }}>
              <span style={{ color: '#3f3f46', minWidth: 80 }}>location</span>
              <span style={{ color: '#71717a' }}>Toulouse, France</span>
            </div>
          </div>
          </div>
        </footer>
      </div>

    </div>
  )
}
