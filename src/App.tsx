import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

const SkillsPage = lazy(() =>
  import('./pages/SkillsPage').then((m) => ({ default: m.SkillsPage })),
)

function GraphFallback() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{ background: '#0d0d0d' }}
    >
      <p className="text-xs text-zinc-600 tracking-[0.3em] uppercase">Loading</p>
    </div>
  )
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/skills"
          element={
            <Suspense fallback={<GraphFallback />}>
              <SkillsPage />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  )
}
