export type ClusterId = 'growth' | 'product' | 'ops' | 'data' | 'eng' | 'biz' | 'cross' | 'impact'

export interface SkillNodeData {
  id: number
  name: string
  cluster: ClusterId
  weight: number
  tools: string[]
}

export interface SkillLinkData {
  source: number
  target: number
  label?: string
  strong?: boolean
}

export const CLUSTERS: Record<ClusterId, { name: string; color: string }> = {
  growth:  { name: 'Growth & Marketing', color: '#d4a017' },
  product: { name: 'Product',            color: '#14b8a6' },
  ops:     { name: 'Operations',         color: '#94a3b8' },
  data:    { name: 'Data & AI',          color: '#60a5fa' },
  eng:     { name: 'Engineering',        color: '#a78bfa' },
  biz:     { name: 'Business',           color: '#d4915a' },
  cross:   { name: 'Cross-cutting',      color: '#c2a882' },
  impact:  { name: 'Impact',             color: '#4ade80' },
}

export const skillNodes: SkillNodeData[] = [
  // Growth & Marketing
  { id: 1,  name: 'SEO',                        cluster: 'growth',  weight: 4,
    tools: ['Ahrefs','Sistrix','SimilarWeb','Searchmetrics','SEMrush','Moz','SpyFu','Audisto','Majestic','Yoast','ProductsUp'] },
  { id: 2,  name: 'Content & Storytelling',     cluster: 'growth',  weight: 4,
    tools: ['WordPress','Squarespace','Buffer','Hootsuite','Later','Mojo','Stripo','Tweetdeck','Mention','Quora','Reddit','YouTube','Disqus'] },
  { id: 3,  name: 'Paid Acquisition',           cluster: 'growth',  weight: 3,
    tools: ['Google Ads','Facebook Ads','Criteo','Bing Ads','Tag Manager','RTB House','Sociomantic','Yieldkit','Adgoal','Taboola','Adspy'] },
  { id: 4,  name: 'Affiliate Marketing',        cluster: 'growth',  weight: 4,
    tools: ['TradeTracker','Awin','Affilinet','Tradedoubler','CJ.com','Webgains','Yieldkit','Kelkoo','ProductsUp','Booking.com affiliate','Digidip','Amazon affiliate','Feedrocket','NinjaOutreach'] },
  { id: 5,  name: 'Email & CRM',               cluster: 'growth',  weight: 3,
    tools: ['Mailchimp','HubSpot','Sendinblue','Klaviyo','Mailjet','MailerLite','ExactTarget','SendGrid','Pipedrive','Salesforce','Zendesk','Yotpo','Tidio','Aircall'] },
  { id: 6,  name: 'Analytics & KPIs',          cluster: 'growth',  weight: 5,
    tools: ['Google Analytics','Looker','Tableau','TIBCO Spotfire','Periscope','Power BI','BIME','Hotjar','Mixpanel','Amplitude','FullStory','Smartlook','Data Studio'] },

  // Product
  { id: 7,  name: 'Product Management',        cluster: 'product', weight: 4,
    tools: ['Productboard','Marvelapp','Notion','Postman','ITA Matrix','Amadeus'] },
  { id: 8,  name: 'Agile / Scrum',             cluster: 'product', weight: 4,
    tools: ['Jira','Confluence','Trello','Asana','Monday.com','Funretro','Mavenlink','Linear','Workday'] },
  { id: 9,  name: 'UX Research',               cluster: 'product', weight: 3,
    tools: ['Marvelapp','Hotjar','Typeform','Figma','Whimsical','Miro','Lucid','Tally','TestApic'] },
  { id: 10, name: 'Roadmapping',               cluster: 'product', weight: 3,
    tools: ['Productboard','Notion','Trello','Whimsical'] },
  { id: 11, name: 'Stakeholder Management',    cluster: 'product', weight: 4,
    tools: ['Slack','Zoom','Loom','Aircall','Zadarma','Skype'] },

  // Operations & Systems
  { id: 12, name: 'ERP / WMS Integration',     cluster: 'ops',     weight: 4,
    tools: ['Brightpearl','Mintsoft','Khaos Control','Anvyl','Xero','Sage','SellerDeck','MS SQL Server'] },
  { id: 13, name: 'Process Automation',        cluster: 'ops',     weight: 5,
    tools: ['Zapier','Make','IFTTT','Airflow','Heroku scheduler','Discord bot','Cron jobs','n8n','PhantomBuster','ScraperAPI','Stitch','Kaspr','Apiworx'] },
  { id: 14, name: 'Supply Chain',              cluster: 'ops',     weight: 4,
    tools: ['Helium10','JungleScout','ShipStation','Amazon Seller Central','Shippo','Flexport','DHL','DPD','UPS','ParcelForce','GFS','GS1','Mintsoft','Sostocked'] },
  { id: 15, name: 'Demand Planning',           cluster: 'ops',     weight: 4,
    tools: ['Sostocked','SellerBoard','SellerToolKit','Keepa','Power BI','MS SharePoint','Brightpearl forecasting'] },
  { id: 16, name: 'DevOps Basics',             cluster: 'ops',     weight: 3,
    tools: ['Cloudflare','GoDaddy','Namecheap','Gandi','OVH','GitHub','GitLab','Docker Hub','Azure (basic)'] },
  { id: 17, name: 'Compliance / Algorithms',   cluster: 'ops',     weight: 3,
    tools: ['Treezor','Mastercard','CNTR','data.gouv','SerpAPI','Stitch','Redshift'] },

  // Data & AI
  { id: 18, name: 'Data Analysis',             cluster: 'data',    weight: 5,
    tools: ['Excel','Google Sheets','Pandas','NumPy','DBeaver','Stitch','Looker','Tableau','BIME','Power BI','Notion DBs'] },
  { id: 19, name: 'Data Visualisation & BI',   cluster: 'data',    weight: 4,
    tools: ['Tableau','BIME','Power BI','Looker','TIBCO Spotfire','Plotly','Seaborn','Matplotlib','Streamlit','Periscope'] },
  { id: 20, name: 'SQL & Databases',           cluster: 'data',    weight: 3,
    tools: ['MS SQL Server','MySQL','PostgreSQL','MongoDB','DBeaver','Redshift','Datadog','Prisma'] },
  { id: 21, name: 'Python',                    cluster: 'data',    weight: 4,
    tools: ['Pandas','NumPy','Scikit-learn','Flask','FastAPI','Streamlit','BeautifulSoup','Requests','PyTorch','TensorFlow'] },
  { id: 22, name: 'Machine Learning',          cluster: 'data',    weight: 4,
    tools: ['Scikit-learn','Supervised classification','KMeans','DBSCAN','Zero-shot classification','PCA','Decision trees','KNN','Cross-validation'] },
  { id: 23, name: 'NLP',                       cluster: 'data',    weight: 3,
    tools: ['BERT','Sentiment analysis','Tokenization','Hugging Face Transformers','spaCy'] },
  { id: 24, name: 'Generative AI',             cluster: 'data',    weight: 5,
    tools: ['OpenAI APIs','Anthropic APIs','Midjourney','Krea','Leonardo','Flux','ElevenLabs','Aiva','Suno','Runway','HeyGen','RAG architecture','LangChain','Descript','Podcastle'] },
  { id: 25, name: 'Prompt Engineering',        cluster: 'data',    weight: 4,
    tools: ['DeepLearning.AI cert','Humanloop','Claude','ChatGPT','Midjourney prompt design'] },
  { id: 26, name: 'Web Scraping & APIs',       cluster: 'data',    weight: 4,
    tools: ['Python scrapers','REST APIs','ScraperAPI','PhantomBuster','Reddit API','Sistrix API','Amazon API','eBay API','Shopify API','Stripe API','OpenAI API','Anthropic API','MapLibre APIs','Postman'] },

  // Engineering & Build
  { id: 27, name: 'Web Development',           cluster: 'eng',     weight: 4,
    tools: ['HTML','CSS','JavaScript','TypeScript','Vite','Static site architecture','GSAP'] },
  { id: 28, name: 'WordPress / CMS',           cluster: 'eng',     weight: 3,
    tools: ['WordPress','WooCommerce','Squarespace','Wix','Matrixify','Ghost','Webflow'] },
  { id: 29, name: 'E-commerce Platforms',      cluster: 'eng',     weight: 4,
    tools: ['Shopify','Etsy','eBay','Amazon Seller Central','Stripe Connect','WaveApps','Amazon FBA','Amazon KDP','Lulu','ISBN registration'] },
  { id: 30, name: 'React / Frontend',          cluster: 'eng',     weight: 4,
    tools: ['React','TypeScript','Vite','Tailwind CSS','Zustand','GSAP','Capacitor','Vercel','Next.js'] },
  { id: 31, name: 'Full-Stack',                cluster: 'eng',     weight: 4,
    tools: ['Node.js','Express','PostgreSQL','Prisma','Heroku','Docker','Firebase','Supabase','Render','MapLibre','Stripe','GitHub Actions'] },
  { id: 32, name: 'Mobile Development',        cluster: 'eng',     weight: 3,
    tools: ['Capacitor','Android Studio','Firebase','Admob','Gradle','TTS','STT'] },

  // Business & Entrepreneurship
  { id: 33, name: 'Market Research',           cluster: 'biz',     weight: 4,
    tools: ['SimilarWeb','AirDNA','Glassdoor','LinkedIn','DVF/INSEE databases','Sphinx','Skift'] },
  { id: 34, name: 'Partnerships & BD',         cluster: 'biz',     weight: 3,
    tools: ['Pipedrive','GetYourGuide','TheFork','LinkedIn outreach','Awin','TradeTracker','Booking.com'] },
  { id: 35, name: 'Monetisation Strategy',     cluster: 'biz',     weight: 5,
    tools: ['Stripe','WaveApps','Lemonsqueezy','Gumroad','Affiliate clicks','Price arbitrage','Ad revenue (Admob)','Streaming royalties','Print margins (Etsy)','Freemium','Premium PDF reports'] },
  { id: 36, name: 'Entrepreneurial Building',  cluster: 'biz',     weight: 5,
    tools: ['RW Informatique','CyberHacktivist','The Sneaker Store','Amazon-to-eBay','Bed\'n\'Bretzel','Hyper-casual games','RW Creations','Sierra Waves','Poster Atlas','Ouaf!','La Ville Rose','Barkly','Aura','RW Impact'] },
  { id: 37, name: 'Project Management',        cluster: 'biz',     weight: 5,
    tools: ['Jira','Notion','Mavenlink','Lucca','Trello','Asana','Monday.com','Confluence','GitHub Projects'] },

  // Cross-cutting
  { id: 38, name: 'Cross-functional Translation', cluster: 'cross',  weight: 5, tools: [] },
  { id: 39, name: 'Communication EN/FR',           cluster: 'cross',  weight: 5, tools: [] },
  { id: 40, name: 'Self-directed Learning',        cluster: 'cross',  weight: 5, tools: [] },

  // Impact — convergence node, activates in Ch5 only
  { id: 41, name: 'Impact',                        cluster: 'impact', weight: 7, tools: [] },
]

export const skillLinks: SkillLinkData[] = [
  // Ch0 — freelance starter pack
  { source: 27, target: 28 },
  { source: 28, target: 1 },
  { source: 1,  target: 2,  strong: true },
  { source: 2,  target: 36 },

  // Ch1 — Growth
  { source: 1,  target: 3 },
  { source: 2,  target: 5 },
  { source: 3,  target: 6 },
  { source: 6,  target: 4,  strong: true },
  { source: 4,  target: 26, label: 'The Sneaker Store, Amazon-to-eBay' },
  { source: 22, target: 4,  strong: true },
  { source: 6,  target: 19 },
  { source: 6,  target: 13, label: 'Twitter bot at BIME' },
  { source: 1,  target: 6,  strong: true },

  // Ch2 — Product
  { source: 7,  target: 6,  strong: true },
  { source: 7,  target: 4,  label: 'Holiday Pirates white labels' },
  { source: 7,  target: 8 },
  { source: 7,  target: 10 },
  { source: 7,  target: 11 },
  { source: 9,  target: 10 },
  { source: 8,  target: 11 },
  { source: 34, target: 38 },
  { source: 27, target: 34, label: "Bed'n'Bretzel" },
  { source: 32, target: 35, label: 'Hyper-casual games / Admob' },
  { source: 7,  target: 33 },

  // Ch3 — Operations
  { source: 12, target: 29, label: 'Cinchona Brightpearl-Shopify integration' },
  { source: 29, target: 14, label: 'Football jersey store (side)' },
  { source: 14, target: 15 },
  { source: 12, target: 15 },
  { source: 17, target: 20 },
  { source: 20, target: 26 },
  { source: 17, target: 26, label: 'Swile merchant algorithm' },
  { source: 13, target: 26 },
  { source: 16, target: 27 },
  { source: 37, target: 14 },
  { source: 37, target: 12 },
  { source: 37, target: 11 },
  { source: 37, target: 38 },

  // Ch4 — Data & AI
  { source: 24, target: 2,  label: 'RW Creations: Sierra Waves, Poster Atlas, Ouaf!, AI Podcasts' },
  { source: 22, target: 6 },
  { source: 21, target: 26, label: 'Purrposterous, La Ville Rose data pipelines' },
  { source: 21, target: 13 },
  { source: 31, target: 7,  label: 'Aura, La Ville Rose' },
  { source: 31, target: 9 },
  { source: 30, target: 27 },
  { source: 30, target: 31 },
  { source: 32, target: 31 },
  { source: 32, target: 24, label: 'Barkly (TTS/STT)' },
  { source: 35, target: 29, label: 'Ouaf! FBA vs KDP A/B test' },
  { source: 24, target: 22, strong: true },
  { source: 22, target: 23, label: 'Purrposterous (bootcamp final project)' },
  { source: 24, target: 23 },
  { source: 25, target: 24, strong: true },
  { source: 25, target: 21 },

  // Natural / always-on connections
  { source: 18, target: 6 },
  { source: 18, target: 19 },
  { source: 18, target: 22, strong: true },
  { source: 20, target: 18 },
  { source: 21, target: 22, strong: true },
  { source: 21, target: 23 },
  { source: 27, target: 30 },
  { source: 30, target: 31, strong: true },
  { source: 36, target: 35 },
  { source: 40, target: 36 },
  { source: 40, target: 21 },
  { source: 40, target: 24 },
  { source: 38, target: 7 },
  { source: 38, target: 37 },
  { source: 39, target: 38 },
  { source: 39, target: 11 },
  { source: 39, target: 7 },
  { source: 35, target: 36 },

  // Patch: missing technical combinations (normal tier, no strong/label)
  { source: 7,  target: 9  },  // Product Management ↔ UX Research        (first active Ch2)
  { source: 12, target: 20 },  // ERP / WMS Integration ↔ SQL & Databases  (first active Ch3)
  { source: 21, target: 18 },  // Python ↔ Data Analysis                   (first active Ch4)
]
