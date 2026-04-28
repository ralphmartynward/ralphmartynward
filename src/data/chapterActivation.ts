// Cross-cutting nodes: always rendered (never tiny dots), scale grows each chapter.
// Edit this set to change which nodes get the "always present" treatment.
export const CROSS_CUTTING_IDS = new Set([6, 13, 27, 35, 36, 37, 40])

// Scale multiplier applied to cross-cutting nodes before they are formally active.
// Index = chapter number 0–5.
export const CROSS_SCALE_PER_CHAPTER: readonly number[] = [0.45, 0.55, 0.65, 0.75, 0.88, 1.0]

// Cumulative active node sets per chapter (all previous chapters' nodes remain active).
// Edit these arrays to tune which nodes light up in each chapter.
// Node IDs match src/data/skills.ts.

const CH0 = new Set([
  1,  // SEO
  2,  // Content & Storytelling
  3,  // Paid Acquisition (intro)
  27, // Web Development
  28, // WordPress / CMS
  33, // Market Research
  36, // Entrepreneurial Building
  39, // Communication EN/FR
  40, // Self-directed Learning
])

const CH1 = new Set([
  ...CH0,
  4,  // Affiliate Marketing
  5,  // Email & CRM
  6,  // Analytics & KPIs (formally active)
  18, // Data Analysis
  19, // Data Visualisation & BI
  22, // Machine Learning (faint at BIME/Visual Meta)
  23, // NLP (faint)
  26, // Web Scraping & APIs
  29, // E-commerce Platforms (intro)
  35, // Monetisation Strategy
  37, // Project Management
])

const CH2 = new Set([
  ...CH1,
  7,  // Product Management
  8,  // Agile / Scrum
  9,  // UX Research
  10, // Roadmapping
  11, // Stakeholder Management
  32, // Mobile Development (hyper-casual games)
  34, // Partnerships & BD
  38, // Cross-functional Translation
])

const CH3 = new Set([
  ...CH2,
  12, // ERP / WMS Integration
  13, // Process Automation (formally active)
  14, // Supply Chain
  15, // Demand Planning
  16, // DevOps Basics
  17, // Compliance / Algorithmic Logic
  20, // SQL & Databases
])

const CH4 = new Set([
  ...CH3,
  21, // Python
  24, // Generative AI
  25, // Prompt Engineering
  30, // React / Modern Frontend
  31, // Full-Stack Development
])

// Ch5: all nodes including the Impact convergence node (41)
const CH5 = new Set(Array.from({ length: 41 }, (_, i) => i + 1))

export const CHAPTER_ACTIVE_NODES: readonly Set<number>[] = [CH0, CH1, CH2, CH3, CH4, CH5]
