export interface Chapter {
  id: number
  title: string
  period: string
  tagline: string
  paragraphs: string[]
  accent: string
}

export const chapters: Chapter[] = [
  {
    id: 0,
    title: 'Before',
    period: '2009–2013',
    tagline: 'Already building.',
    accent: '#a8a29e',
    paragraphs: [
      `I came to the internet around 2009, later than most of my generation, but I caught up fast and went deep. By the time I was at university I was already freelancing on the side, helping small businesses build their first websites at the moment the world started demanding they have one.`,
      `The studies were deliberately practical: business administration, then applied economics and statistics, then management of new technologies. Each one a step closer to the place I wanted to be. The real education though was happening alongside the curriculum. CyberHacktivist, a tech and life-hacking blog, eventually pulled in 325,000 video views with no marketing budget. RW Informatique, the freelance practice, paid for textbooks and beer.`,
      `Neither was career strategy. They were the same instinct showing up in different shapes. By the time I left university I'd been writing about technology for years, building websites for paying clients, and teaching myself whatever the next problem demanded. The work life that came after didn't start the building. It just gave it a salary.`,
    ],
  },
  {
    id: 1,
    title: 'Growth',
    period: '2013–2018',
    tagline: 'Learning how attention works.',
    accent: '#d4a017',
    paragraphs: [
      `BIME Analytics was the first real laboratory. A small team in Montpellier, a cloud business intelligence product genuinely ahead of its time. Growth marketing covered everything: blog posts, landing pages, A/B testing, AdWords campaigns, email sequences, backlink strategies. I built a Twitter bot that pulled four thousand followers in three months, automated the social calendar, and ran the company's KPI dashboards in BIME's own tool. The job taught me that the channels look separate from the outside but underneath they're all the same machine. You write something, you put it somewhere people will find it, you watch what happens, you adjust.`,
      `Then Berlin, because the startup scene there was pulling everyone in those years and I wanted to be inside it. Visual Meta gave me two and a half years across two roles. Thirty million products from seven thousand fashion and furniture shops, machine learning classification handling the catalog, affiliate networks across multiple markets. At that scale, data quality stops being a nice to have and becomes the product itself. As Quality Manager I worked with supervised classification and built a blueprint for an entirely new product category from scratch. Market research, data scraping, taxonomy design, frontend implementation, three months of work that generated thirty thousand sessions on a test market alone. Then as Affiliate Marketing Manager I took over a network of four hundred publishers, built a cross-departmental KPI dashboard, and negotiated partnerships with TradeTracker, Awin, Criteo and others.`,
      `On the side, I was applying everything I learned to projects I owned outright. The Sneaker Store: a WordPress affiliate site combining product data pipelines, ProductsUp feeds, Facebook Ads, and canonical SEO techniques. Zero marketing budget. Peaked at ten thousand monthly visitors and nine thousand euros in revenue from affiliate clicks at twenty cents apiece. Then an Amazon to eBay dropshipping operation, automating product sourcing through Sistrix and Amazon APIs, running cron jobs on Heroku, listing automatically through eBay's API, with margins coming from price arbitrage between the two platforms.`,
      `The day job paid for the experiments. The experiments taught me things the day job never could.`,
    ],
  },
  {
    id: 2,
    title: 'Product',
    period: '2018–2020',
    tagline: 'The bigger picture becomes the job.',
    accent: '#14b8a6',
    paragraphs: [
      `Three years at Visual Meta working across data, marketing, affiliate, and tech simultaneously did something to how I saw a business. I kept gravitating toward the orchestration layer: not which campaign to run, but what the product itself should become next. That pull, plus the affiliate experience already in my pocket, made the next move obvious.`,
      `Holiday Pirates was the natural step. Still in the broader affiliate world, but now from the partner side, and at a level where I was responsible for outcomes rather than execution. Managing a portfolio of white label travel partnerships that represented seventy percent of company revenue. Coordinating across legal, dev, editorial, and finance toward shared commercial goals. First proper Scrum environment, first real cross-functional team. The Kayak deeplink project came from a simple observation: the data showed one thing, the editorial team was publishing toward another. Closing that gap added twenty-five percent to revenue, and Kayak adopted the pattern across all their white label partners afterwards.`,
      `Then a step up in scale. Veepee, one of France's largest e-commerce platforms, forty-five million monthly visitors, a structured product team that did things by the book. Proper UX research, user testing, MVP discipline, backlog grooming with intent. Owning the travel section's frontend revamp meant defining vision and roadmap, building a Marvelapp prototype, running surveys, working in real Scrum cycles with a team of seven. Big company rigour after years of startup improvisation.`,
      `Two years in travel, plus the affiliate background, plus the build instinct, so I started an Airbnb project of my own. A custom booking engine, partnerships with local museums and tour operators, full PMS integration with multi-calendar management, automated CRM through HubSpot and Sendinblue connected by Zapier, billing automation through Stripe. Same product thinking, applied to something entirely mine, monetised directly through bookings.`,
      `In parallel, briefly: four hyper-casual Android games. Mobile development and ad-revenue monetisation through Admob, both gaps I wanted to close.`,
    ],
  },
  {
    id: 3,
    title: 'Operations',
    period: '2020–2023',
    tagline: 'The wiring that holds everything together.',
    accent: '#94a3b8',
    paragraphs: [
      `So product teaches you to orchestrate. But there's a layer underneath that rarely gets the credit it deserves. The operational infrastructure, the systems integrations, the wiring that holds a company together regardless of how good the product is. Great products stall inside broken organisations. I wanted to be the person who fixed the wiring.`,
      `Swile first: a French fintech unicorn working in employee benefits. The role was technical and high-stakes, building a merchant compliance algorithm that ran against every transaction the company processed, partnering with Mastercard and Treezor, connecting to public databases through APIs. Six months of pressure, fast deadlines, real consequences if it broke.`,
      `Then Cinchona, deliberately at the opposite end of maturity. A young e-commerce business buying up small Amazon brands and running them under one roof, where almost nothing was in place yet. Two consecutive roles let me design the entire operational backbone. Supply chain processes from sourcing to fulfilment, freight forwarding, three-PL relationships, demand planning across two hundred and fifty SKUs with a traffic-light system, automated reporting for sales and supply, a PIM mastersheet tracking cost-of-goods. Then implementing the ERP that connected sales channels to warehouse management to finance to production. Migrating the CMS to Shopify in two months when an agency had quoted six. Teaching myself whatever the situation needed, most of the tools I'd never touched on day one.`,
      `The pleasure was architectural. Seeing how the pieces could connect, then making them.`,
      `Outside work, the building never stopped. A football jersey store on Shopify combining dropshipping with product data work, monetising through retail margin on incoming orders. A Toulouse property listing site testing the same architectural instincts on a smaller surface. The same operational logic, applied to whatever caught my attention.`,
    ],
  },
  {
    id: 4,
    title: 'Data & AI',
    period: '2023–present',
    tagline: 'Going to the source.',
    accent: '#60a5fa',
    paragraphs: [
      `Every previous role had touched data. Every previous side project had used it. But I wanted to go further: not consume outputs, but build the systems that produced them. I did an intensive bootcamp in 2023 to lock in the foundations. Python, machine learning, NLP, neural networks, proper statistical reasoning. Solid technical ground. I won the final project, a fully automated content pipeline scraping Reddit, classifying with machine learning, generating images and posting to Instagram without human intervention. More importantly I finally had a name for what I'd been doing intuitively the whole time.`,
      `The timing wasn't accidental. Generative AI had just become genuinely capable, and I wanted to understand it the only way I know how, by building with it. Everything that came after went under one umbrella: RW Creations, registered as a trademark.`,
      `Sierra Waves, a fully AI-generated music artist released on Spotify, monetised through streaming royalties. Poster Atlas, vintage-style AI posters sold on Etsy at a margin per print. Ouaf, a humorous novelty book launched on Amazon, testing both inventory-based fulfilment and print-on-demand royalties to compare unit economics. An AI-generated podcast doing deep dives on bestseller books through retrieval-augmented generation. The pattern across all of them was the same: understand a different modality of generative AI, text, image, audio, retrieval, by shipping a real product with it.`,
      `Then the projects that mattered most started landing.`,
      `La Ville Rose: an end-to-end geospatial decision platform for Toulouse real estate. Combining transaction data, demographics, transport networks and urban planning datasets through MapLibre into an interactive parcel-level map, with neighbourhood-level SEO landing pages on top and premium PDF reports as the monetisation layer. The core value isn't data access, it's data interpretation. Surfacing non-obvious patterns, helping users see what they gain and what they sacrifice when choosing one neighbourhood over another. Built with a low-cost static architecture and automated content pipelines so the unit economics actually work.`,
      `Aura: an adaptive fitness and health app born from tracking my own data through a difficult period. Mental health is no longer a private struggle, it's a cultural conversation, long overdue. The tools available treat body and mind as separate problems. Aura treats them as one system. Daily inputs across sleep, energy, pain, nutrition and activity feed into AI-driven analysis that produces a Daily Directive, what to actually do today. Built full-stack, designed around a tight feedback loop: input, decision, execution, feedback, learning. Freemium model with deeper insights and personalised plans on the paid tier.`,
      `And Barkly, a German learning app I built because the existing options weren't good enough.`,
      `These aren't experiments anymore. They're products.`,
    ],
  },
  {
    id: 5,
    title: 'Impact',
    period: 'now',
    tagline: 'Same toolkit, redirected.',
    accent: '#e07a5f',
    paragraphs: [
      `There's a Japanese concept, <em>ikigai</em>. The intersection of what you're good at, what the world needs, what you love, and what sustains you. Twelve years of building, professionally and otherwise. A practice of teaching myself whatever the next problem demands. And finally, a clear answer to a question I used to leave for later: what is all of this <em>for</em>.`,
      `What I love is building clever systems. Automation, AI as a horizontal layer across everything, the flow state of solving real problems. Learning across domains, being useful in ways that actually matter. What I'm good at is systems thinking and translation, spotting inefficiencies, designing elegant solutions, bridging the technical and the human. What the world needs, in my reading of it, is technology that's human-centered rather than extractive. Tools that foster connection and dignity. Climate action that's pragmatic rather than performative. A counterweight to the burnout culture that nearly broke me, and that I now know how to recognise.`,
      `The intersection points somewhere specific. Mission-driven organisations where being a generalist is an asset rather than a liability. Real missions, climate, well-being, circular economy, ethical AI, inclusive education, not slogans. High autonomy, low corporate friction, international and bilingual by default.`,
      `RW Impact is the early form of that, a non-profit initiative focused on building and promoting ethical, open-source AI with real social impact. The work is taking shape. The direction is clear.`,
      `I'm not starting over. I'm pointing the same skills somewhere they've never been pointed before.`,
    ],
  },
]
