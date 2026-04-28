import { useEffect, useRef, useState, useCallback } from 'react'
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
} from 'd3-force'
import { skillNodes, skillLinks, CLUSTERS } from '../data/skills'
import type { SkillNodeData, SkillLinkData, ClusterId } from '../data/skills'
import {
  CHAPTER_ACTIVE_NODES,
  CROSS_CUTTING_IDS,
  CROSS_SCALE_PER_CHAPTER,
} from '../data/chapterActivation'

export interface GraphNode extends SkillNodeData {
  color: string
  x?: number
  y?: number
  vx?: number
  vy?: number
  fx?: number | null
  fy?: number | null
  index?: number
}

export interface GraphLink {
  source: GraphNode | number
  target: GraphNode | number
  label?: string
  strong?: boolean
  index?: number
}

const CLUSTER_POS: Record<ClusterId, { x: number; y: number }> = {
  cross:   { x:    0, y: -155 },
  growth:  { x: -230, y:  -75 },
  ops:     { x:  275, y:  -85 },
  product: { x: -220, y:   85 },
  eng:     { x:  205, y:  125 },
  data:    { x:    0, y:    0 },
  biz:     { x:    0, y:  170 },
  impact:  { x:    0, y:  290 },
}

const CLUSTER_STR: Record<ClusterId, number> = {
  cross:   0.55,
  biz:     0.50,
  growth:  0.38,
  product: 0.38,
  ops:     0.38,
  eng:     0.38,
  data:    0.35,
  impact:  0.85,
}

function nodeR(weight: number) {
  return Math.sqrt(weight) * 3.5 + 4.5
}

interface NodeAnim {
  scale: number
  opacity: number
  labelAlpha: number
}

// Label placement direction per cluster — keeps labels out of the graph interior
const CLUSTER_LABEL_SIDE: Record<ClusterId, 'left' | 'right' | 'above' | 'below'> = {
  growth:  'left',
  product: 'left',
  ops:     'right',
  eng:     'right',
  cross:   'above',
  data:    'below',
  biz:     'below',
  impact:  'below',
}

// Per-node label side overrides — spread labels in dense clusters instead of suppressing them
const LABEL_SIDE_OVERRIDE: Partial<Record<number, 'left' | 'right' | 'above' | 'below'>> = {
  // Product cluster (default 'left') — 5 nodes, spread to 4 directions
  8:  'above',  // Agile/Scrum
  9:  'below',  // UX Research
  10: 'right',  // Roadmapping
  11: 'below',  // Stakeholder Management
  // Eng cluster (default 'right') — alt sides for the weight-3 nodes
  28: 'above',  // WordPress/CMS
  32: 'below',  // Mobile Development
  // Data cluster (default 'below') — alt sides for weight-3 nodes
  20: 'above',  // SQL & Databases
  23: 'right',  // NLP
  // Biz cluster (default 'below') — spread 5 nodes to avoid stack
  33: 'right',  // Market Research
  34: 'above',  // Partnerships & BD
  36: 'right',  // Entrepreneurial Building
  37: 'left',   // Project Management
}

function computeNodeTarget(nodeId: number, chapter: number): NodeAnim {
  // Hero state (-1): Impact node fully hidden, everything else faded
  if (chapter < 0) {
    if (nodeId === 41) return { scale: 0, opacity: 0, labelAlpha: 0 }
    return { scale: 0.3, opacity: 0.15, labelAlpha: 0 }
  }

  const activeNodes = CHAPTER_ACTIVE_NODES[chapter]
  if (activeNodes.has(nodeId)) {
    return { scale: 1.0, opacity: 1.0, labelAlpha: 0.9 }
  }
  if (CROSS_CUTTING_IDS.has(nodeId)) {
    const s = CROSS_SCALE_PER_CHAPTER[Math.min(chapter, CROSS_SCALE_PER_CHAPTER.length - 1)]
    // No label until the node is formally active — present as a coloured dot only
    return { scale: s, opacity: 0.65, labelAlpha: 0 }
  }
  return { scale: 0.25, opacity: 0.2, labelAlpha: 0 }
}

function getEdgeNodeId(endpoint: GraphNode | number): number {
  return typeof endpoint === 'object' ? endpoint.id : endpoint
}

function isEdgeActive(link: GraphLink, chapter: number): boolean {
  if (chapter < 0) return false
  const activeNodes = CHAPTER_ACTIVE_NODES[chapter]
  return (
    activeNodes.has(getEdgeNodeId(link.source)) &&
    activeNodes.has(getEdgeNodeId(link.target))
  )
}

interface Props {
  chapter?: number
  onNodeHover?: (node: GraphNode | null) => void
  onLinkHover?: (link: GraphLink | null) => void
}

export function SkillsGraph({ chapter, onNodeHover, onLinkHover }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const transformRef = useRef({ tx: 0, ty: 0, k: 1 })
  const nodesRef = useRef<GraphNode[]>([])
  const linksRef = useRef<GraphLink[]>([])
  const hovNodeRef = useRef<GraphNode | null>(null)
  const hovLinkRef = useRef<GraphLink | null>(null)
  const isPanRef = useRef(false)
  const panOriginRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const [isDragging, setIsDragging] = useState(false)

  // Animation state — mutated directly in RAF loop, never triggers re-render
  const nodeAnimCurr = useRef(new Map<number, NodeAnim>())
  const nodeAnimTgt = useRef(new Map<number, NodeAnim>())
  const edgeCurr = useRef(new Map<number, number>())  // edge index → draw progress 0-1
  const edgeTgt = useRef(new Map<number, number>())

  // Keep a ref to chapter so the RAF closure can always read the latest value
  const chapterRef = useRef<number | undefined>(chapter)
  const prevChapterRef = useRef<number | undefined>(undefined)
  chapterRef.current = chapter  // sync on every render (ref mutation, no re-render)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctxOrNull = canvas.getContext('2d')
    if (!ctxOrNull) return
    const ctx = ctxOrNull

    const W = canvas.offsetWidth || window.innerWidth
    const H = canvas.offsetHeight || window.innerHeight
    canvas.width = W
    canvas.height = H
    transformRef.current = { tx: W / 2, ty: H / 2, k: 1 }

    const nodes: GraphNode[] = skillNodes.map(n => {
      const pos = CLUSTER_POS[n.cluster]
      return {
        ...n,
        color: CLUSTERS[n.cluster].color,
        x: pos.x + (Math.random() - 0.5) * 80,
        y: pos.y + (Math.random() - 0.5) * 80,
      }
    })

    const links: GraphLink[] = skillLinks.map((l: SkillLinkData) => ({
      source: l.source as unknown as GraphNode,
      target: l.target as unknown as GraphNode,
      label: l.label,
      strong: l.strong,
    }))

    nodesRef.current = nodes
    linksRef.current = links

    // Create link force first so d3 sets link.index values
    const linkForce = forceLink<GraphNode, GraphLink>(links)
      .id(d => d.id)
      .distance(75)
      .strength(0.25)

    // Initialize animation state
    const initChapter = chapterRef.current
    for (const node of nodes) {
      const tgt = initChapter !== undefined
        ? computeNodeTarget(node.id, initChapter)
        : { scale: 1, opacity: 1, labelAlpha: 1 }
      nodeAnimCurr.current.set(node.id, { ...tgt })
      nodeAnimTgt.current.set(node.id, { ...tgt })
    }
    links.forEach((link, i) => {
      link.index = i
      const active = initChapter === undefined || isEdgeActive(link, initChapter)
      edgeCurr.current.set(i, active ? 1 : 0)
      edgeTgt.current.set(i, active ? 1 : 0)
    })
    prevChapterRef.current = initChapter

    const sim = forceSimulation<GraphNode>(nodes)
      .force('link', linkForce)
      .force('charge', forceManyBody<GraphNode>().strength(-320))
      .force('center', forceCenter(0, 0).strength(0.03))
      .force('x', forceX<GraphNode>(d => CLUSTER_POS[d.cluster].x).strength(d => CLUSTER_STR[d.cluster]))
      .force('y', forceY<GraphNode>(d => CLUSTER_POS[d.cluster].y).strength(d => CLUSTER_STR[d.cluster]))
      .force('collide', forceCollide<GraphNode>(d => nodeR(d.weight) + 14))
      .alphaDecay(0.018)
      .velocityDecay(0.35)

    function applyChapterTargets(ch: number | undefined) {
      if (ch === undefined) {
        for (const node of nodesRef.current) {
          nodeAnimTgt.current.set(node.id, { scale: 1, opacity: 1, labelAlpha: 1 })
        }
        for (const [i] of edgeTgt.current) edgeTgt.current.set(i, 1)
      } else {
        for (const node of nodesRef.current) {
          nodeAnimTgt.current.set(node.id, computeNodeTarget(node.id, ch))
        }
        for (const link of linksRef.current) {
          edgeTgt.current.set(link.index!, isEdgeActive(link, ch) ? 1 : 0)
        }
      }
    }

    function updateAnim() {
      const LERP = 0.08
      for (const [id, curr] of nodeAnimCurr.current) {
        const tgt = nodeAnimTgt.current.get(id)
        if (!tgt) continue
        curr.scale += (tgt.scale - curr.scale) * LERP
        curr.opacity += (tgt.opacity - curr.opacity) * LERP
        curr.labelAlpha += (tgt.labelAlpha - curr.labelAlpha) * LERP
      }
      for (const [i, curr] of edgeCurr.current) {
        const tgt = edgeTgt.current.get(i) ?? 0
        edgeCurr.current.set(i, curr + (tgt - curr) * LERP)
      }
    }

    function draw() {
      const { tx, ty, k } = transformRef.current
      ctx.clearRect(0, 0, W, H)
      ctx.save()
      ctx.translate(tx, ty)
      ctx.scale(k, k)

      const storyMode = chapterRef.current !== undefined

      // — Links (3-tier: annotated > strong > normal) —
      for (const link of linksRef.current) {
        const s = link.source as GraphNode
        const t = link.target as GraphNode
        if (s.x == null || t.x == null) continue

        const progress = storyMode ? (edgeCurr.current.get(link.index!) ?? 0) : 1
        if (progress < 0.01) continue

        const isHov = hovLinkRef.current === link
        const dx = t.x - s.x
        const dy = t.y! - s.y!
        const len = Math.sqrt(dx * dx + dy * dy)

        ctx.beginPath()
        ctx.moveTo(s.x, s.y!)
        ctx.lineTo(t.x, t.y!)

        // Draw-on animation via dash offset
        if (progress < 0.99) {
          ctx.setLineDash([len * progress, len + 1])
          ctx.lineDashOffset = 0
        } else {
          ctx.setLineDash([])
        }

        if (link.label) {
          ctx.strokeStyle = isHov ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.55)'
          ctx.lineWidth = 2 / k
        } else if (link.strong) {
          ctx.strokeStyle = isHov ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.22)'
          ctx.lineWidth = 1.2 / k
        } else {
          ctx.strokeStyle = 'rgba(255,255,255,0.06)'
          ctx.lineWidth = 0.5 / k
        }
        ctx.stroke()
        ctx.setLineDash([])
      }

      // — Ch5: convergence web from all nodes to Impact (node 41) —
      if (storyMode) {
        const impactNode = nodesRef.current.find(n => n.id === 41)
        if (impactNode && impactNode.x != null) {
          const impactOpacity = nodeAnimCurr.current.get(41)?.opacity ?? 0
          const lineAlpha = impactOpacity * 0.09
          if (lineAlpha > 0.003) {
            ctx.lineWidth = 0.5 / k
            ctx.setLineDash([])
            for (const node of nodesRef.current) {
              if (node.id === 41 || node.x == null) continue
              const nodeOpacity = nodeAnimCurr.current.get(node.id)?.opacity ?? 0
              if (nodeOpacity < 0.15) continue
              ctx.strokeStyle = `rgba(248,250,252,${(lineAlpha * nodeOpacity).toFixed(3)})`
              ctx.beginPath()
              ctx.moveTo(impactNode.x, impactNode.y!)
              ctx.lineTo(node.x, node.y!)
              ctx.stroke()
            }
          }
        }
      }

      // — Nodes + labels —
      for (const node of nodesRef.current) {
        if (node.x == null) continue

        const anim = nodeAnimCurr.current.get(node.id)
        const scale = anim?.scale ?? 1
        const opacity = anim?.opacity ?? 1
        const labelAlpha = anim?.labelAlpha ?? 1

        if (opacity < 0.01) continue

        const isHov = hovNodeRef.current === node
        const r = nodeR(node.weight) * scale

        const isImpact = node.id === 41
        ctx.globalAlpha = opacity
        ctx.shadowBlur = isImpact ? (isHov ? 32 : 20) : (isHov ? 18 : 4)
        ctx.shadowColor = node.color
        ctx.beginPath()
        ctx.arc(node.x, node.y!, isHov ? r * 1.4 : r, 0, 2 * Math.PI)
        ctx.fillStyle = isHov ? node.color : node.color + 'cc'
        ctx.fill()
        ctx.shadowBlur = 0

        const showLabel = labelAlpha > 0.05 && scale > 0.3

        if (showLabel) {
          const fontSize = Math.max(9 / k, 2.5)
          ctx.font = `${fontSize}px Inter, sans-serif`
          ctx.globalAlpha = opacity * labelAlpha
          ctx.fillStyle = isHov ? 'rgba(255,255,255,0.95)' : 'rgba(228,228,231,0.65)'

          const side = LABEL_SIDE_OVERRIDE[node.id] ?? CLUSTER_LABEL_SIDE[node.cluster]
          let lx = node.x, ly = node.y!
          if (side === 'left') {
            lx = node.x - r - 4; ly = node.y!
            ctx.textAlign = 'right'; ctx.textBaseline = 'middle'
          } else if (side === 'right') {
            lx = node.x + r + 4; ly = node.y!
            ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
          } else if (side === 'above') {
            lx = node.x; ly = node.y! - r - 3
            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
          } else {
            lx = node.x; ly = node.y! + r + 2
            ctx.textAlign = 'center'; ctx.textBaseline = 'top'
          }
          ctx.fillText(node.name, lx, ly)
        }

        ctx.globalAlpha = 1
      }

      ctx.restore()
    }

    function loop() {
      const ch = chapterRef.current
      if (ch !== prevChapterRef.current) {
        applyChapterTargets(ch)
        prevChapterRef.current = ch
      }
      updateAnim()
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // Zoom to fit once simulation cools
    sim.on('end', () => {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
      for (const n of nodes) {
        if (n.x == null) continue
        minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x)
        minY = Math.min(minY, n.y!); maxY = Math.max(maxY, n.y!)
      }
      const isStory = chapterRef.current !== undefined
      const padL = isStory ? 40 : 70
      const padR = isStory ? 140 : 210
      const padT = isStory ? 45 : 55
      const padB = isStory ? 55 : 70
      const graphW = maxX - minX || 1
      const graphH = maxY - minY || 1
      const scaleK = Math.min(
        (W - padL - padR) / graphW,
        (H - padT - padB) / graphH,
        isStory ? 1.3 : 1.15,
      )
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      const availCx = padL + (W - padL - padR) / 2
      const availCy = padT + (H - padT - padB) / 2
      transformRef.current = {
        tx: availCx - cx * scaleK,
        ty: availCy - cy * scaleK,
        k: scaleK,
      }
    })

    const handleResize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth
      canvas.height = canvas.offsetHeight || window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      sim.stop()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, []) // mount only — simulation runs once, animation driven by chapterRef

  // — Interaction helpers —

  function toSim(sx: number, sy: number) {
    const { tx, ty, k } = transformRef.current
    return { x: (sx - tx) / k, y: (sy - ty) / k }
  }

  function findNode(sx: number, sy: number): GraphNode | null {
    const p = toSim(sx, sy)
    for (const n of nodesRef.current) {
      if (n.x == null) continue
      const anim = nodeAnimCurr.current.get(n.id)
      const scale = anim?.scale ?? 1
      const r = nodeR(n.weight) * scale * 1.5
      if ((n.x - p.x) ** 2 + (n.y! - p.y) ** 2 <= r * r) return n
    }
    return null
  }

  function findLink(sx: number, sy: number): GraphLink | null {
    const p = toSim(sx, sy)
    for (const link of linksRef.current) {
      if (!link.label) continue
      const s = link.source as GraphNode
      const t = link.target as GraphNode
      if (s.x == null || t.x == null) continue
      // Skip invisible edges in story mode
      if (chapterRef.current !== undefined && (edgeCurr.current.get(link.index!) ?? 0) < 0.5) continue
      const dx = t.x - s.x, dy = t.y! - s.y!
      const len2 = dx * dx + dy * dy
      if (len2 === 0) continue
      const tt = Math.max(0, Math.min(1, ((p.x - s.x) * dx + (p.y - s.y!) * dy) / len2))
      const ex = s.x + tt * dx - p.x
      const ey = s.y! + tt * dy - p.y
      if (ex * ex + ey * ey < 64) return link
    }
    return null
  }

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.12 : 0.9
    const { tx, ty, k } = transformRef.current
    const newK = Math.max(0.15, Math.min(10, k * factor))
    const rect = canvasRef.current!.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    transformRef.current = {
      tx: mx - (mx - tx) * (newK / k),
      ty: my - (my - ty) * (newK / k),
      k: newK,
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return
    isPanRef.current = true
    setIsDragging(true)
    panOriginRef.current = {
      x: e.clientX - transformRef.current.tx,
      y: e.clientY - transformRef.current.ty,
    }
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanRef.current) {
        transformRef.current = {
          ...transformRef.current,
          tx: e.clientX - panOriginRef.current.x,
          ty: e.clientY - panOriginRef.current.y,
        }
        return
      }
      const rect = canvasRef.current!.getBoundingClientRect()
      const sx = e.clientX - rect.left
      const sy = e.clientY - rect.top
      const node = findNode(sx, sy)
      if (node !== hovNodeRef.current) {
        hovNodeRef.current = node
        onNodeHover?.(node)
        if (node) { hovLinkRef.current = null; onLinkHover?.(null) }
      }
      if (!node) {
        const link = findLink(sx, sy)
        if (link !== hovLinkRef.current) {
          hovLinkRef.current = link
          onLinkHover?.(link)
        }
      }
    },
    [onNodeHover, onLinkHover],
  )

  const onMouseUp = useCallback(() => {
    isPanRef.current = false
    setIsDragging(false)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    />
  )
}
