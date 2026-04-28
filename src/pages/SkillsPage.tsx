import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SkillsGraph } from '../components/SkillsGraph'
import { CLUSTERS } from '../data/skills'
import type { SkillNodeData, SkillLinkData } from '../data/skills'
import type { ClusterId } from '../data/skills'

interface HoveredNode extends SkillNodeData {
  color: string
}

interface HoveredLink extends SkillLinkData {
  label?: string
}

export function SkillsPage() {
  const [hoveredNode, setHoveredNode] = useState<HoveredNode | null>(null)
  const [hoveredLink, setHoveredLink] = useState<HoveredLink | null>(null)
  const [activeCluster, setActiveCluster] = useState<ClusterId | null>(null)

  const clusterEntries = Object.entries(CLUSTERS) as [ClusterId, { name: string; color: string }][]

  const infoNode = hoveredNode
  const infoLabel = !hoveredNode && hoveredLink?.label ? hoveredLink.label : null

  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ background: '#09090b' }}>

      {/* Back link */}
      <Link
        to="/"
        className="fixed top-5 left-5 z-50 text-xs tracking-wide text-zinc-600 hover:text-zinc-300"
        style={{ transitionProperty: 'color', transitionDuration: '150ms' }}
      >
        ← Ralph Ward
      </Link>

      {/* Title */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none">
        <p className="text-xs tracking-[0.25em] uppercase text-zinc-600">
          Skills Network
        </p>
        <p className="text-[10px] text-zinc-700 mt-0.5">
          40 skills &middot; 7 clusters &middot; hover to explore
        </p>
      </div>

      {/* Cluster legend */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        {clusterEntries.map(([id, { name, color }]) => (
          <button
            key={id}
            onClick={() => setActiveCluster(activeCluster === id ? null : id)}
            className="flex items-center gap-2 text-xs text-left"
            style={{ color: activeCluster === null || activeCluster === id ? color : '#52525b' }}
          >
            <span
              className="block rounded-full flex-shrink-0"
              style={{
                width: 8,
                height: 8,
                backgroundColor: activeCluster === null || activeCluster === id ? color : '#3f3f46',
              }}
            />
            {name}
          </button>
        ))}
      </div>

      {/* Info panel */}
      <div
        className="fixed bottom-6 left-6 z-50 max-w-xs"
        style={{ opacity: infoNode || infoLabel ? 1 : 0, transition: 'opacity 150ms' }}
      >
        {infoNode && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="block w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: infoNode.color }}
              />
              <p className="text-xs text-zinc-500 uppercase tracking-wide">
                {CLUSTERS[infoNode.cluster].name}
              </p>
            </div>
            <h3
              className="text-base font-semibold mb-2"
              style={{ color: infoNode.color }}
            >
              {infoNode.name}
            </h3>
            {infoNode.tools.length > 0 && (
              <p className="text-xs text-zinc-400 leading-relaxed">
                {infoNode.tools.join(' · ')}
              </p>
            )}
          </div>
        )}

        {infoLabel && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
            <p className="text-xs text-zinc-300 leading-relaxed">{infoLabel}</p>
          </div>
        )}
      </div>

      {/* Zoom hint */}
      <p className="fixed bottom-6 right-6 z-50 text-[10px] text-zinc-700 pointer-events-none">
        scroll to zoom &middot; drag to pan
      </p>

      {/* Graph */}
      <SkillsGraph
        onNodeHover={(node) => {
          setHoveredNode(node as HoveredNode | null)
          if (node) setHoveredLink(null)
        }}
        onLinkHover={(link) => {
          setHoveredLink(link as HoveredLink | null)
          if (link) setHoveredNode(null)
        }}
      />
    </div>
  )
}
