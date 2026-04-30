import { useState } from 'react'
import { CHAPTER_PROJECTS } from '../content/projects'
import type { ProjectData } from '../content/projects'

interface CardProps {
  project: ProjectData
  accent: string
}

function ExternalLinkIcon({ color }: { color: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({ project, accent }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  const cardStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'hidden',
    background: '#18181b',
    border: `1px solid ${hovered ? accent + '55' : '#27272a'}`,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.45)' : 'none',
    transition: 'border-color 200ms ease, transform 200ms ease, box-shadow 200ms ease',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
  }

  const inner = (
    <>
      {/* Thumbnail — 16:7 aspect ratio */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '44%', background: accent + '18' }}>
        {!imgError ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: accent + '99',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {project.name[0]}
          </div>
        )}
      </div>

      {/* Content strip */}
      <div style={{ padding: '8px 10px 10px' }}>
        {/* Project name */}
        <p
          style={{
            fontSize: 10,
            fontVariant: 'small-caps',
            fontWeight: 600,
            letterSpacing: '0.08em',
            color: '#e4e4e7',
            marginBottom: 3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {project.name}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 11,
            color: '#71717a',
            lineHeight: 1.45,
            marginBottom: 8,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        {/* Footer: year + link/archived */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: '#52525b' }}>{project.year}</span>
          {project.archived ? (
            <span
              style={{
                fontSize: 9,
                color: '#71717a',
                background: '#27272a',
                borderRadius: 3,
                padding: '1px 5px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              archived
            </span>
          ) : (
            <ExternalLinkIcon color={hovered ? '#a1a1aa' : '#52525b'} />
          )}
        </div>
      </div>
    </>
  )

  if (project.url) {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="chapter-project-card"
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`${project.name} — ${project.description}`}
      >
        {inner}
      </a>
    )
  }

  return (
    <div
      className="chapter-project-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </div>
  )
}

interface Props {
  chapterId: number
  accent: string
}

export function ChapterProjects({ chapterId, accent }: Props) {
  const projects = CHAPTER_PROJECTS[chapterId] ?? []
  if (projects.length === 0) return null

  return (
    <div style={{ position: 'relative' }}>
      <div className="chapter-projects-grid">
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} accent={accent} />
        ))}
      </div>

      {/* Right-edge fade — visible only in mobile scroll mode via CSS */}
      <div
        aria-hidden="true"
        className="chapter-projects-fade"
        style={{
          position: 'absolute',
          right: 0,
          top: 32,
          bottom: 40,
          width: 64,
          background: 'linear-gradient(to right, transparent, #111111)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
