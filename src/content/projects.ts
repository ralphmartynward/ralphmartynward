export interface ProjectData {
  id: string
  name: string
  description: string
  year: string
  url: string
  archived?: boolean
  thumbnail: string
}

export const CHAPTER_PROJECTS: Record<number, ProjectData[]> = {
  0: [
    {
      id: 'cyberhacktivist',
      name: 'Cyberhacktivist',
      description: 'Tech and hacking blog — first audience, first ad revenue.',
      year: '2013',
      url: 'https://cyberhacktivist.com/',
      thumbnail: '/assets/img/portfolio/portfolio-2.png',
    },
    {
      id: 'rw-informatique',
      name: 'RW Informatique',
      description: 'Freelance web and IT support consulting',
      year: '2013–2015',
      url: 'https://ralph-ward.fr/rw-informatique',
      thumbnail: '/assets/img/portfolio/portfolio-3.png',
    },
  ],
  1: [
    {
      id: 'sneaker-store',
      name: 'The Sneaker Store',
      description: 'Online sneaker marketplace — first serious e-commerce build.',
      year: '2016',
      url: 'https://web.archive.org/web/20240424144112/https://ralph-ward.fr/thesneakerstore/',
      archived: true,
      thumbnail: '/assets/img/portfolio/portfolio-1.png',
    },
    {
      id: 'ameb',
      name: 'Amazon → eBay',
      description: 'Automated price-arbitrage: scrape Amazon deals, relist on eBay.',
      year: '2017',
      url: 'https://colab.research.google.com/drive/1tZa72hlBg994ah286mC2p9mc_q6e3Gj2',
      thumbnail: '/assets/img/portfolio/ameb.png',
    },
  ],
  2: [
    {
      id: 'bednbretzel',
      name: "Bed'n'Bretzel",
      description: "Airbnb and City Guide for Alsace.",
      year: '2020',
      url: 'https://bednbretzel.com/',
      thumbnail: '/assets/img/portfolio/portfolio-9.png',
    },
    {
      id: 'android-games',
      name: 'Android Games',
      description: 'Hyper-casual games published on Google Play, monetised via AdMob.',
      year: '2020',
      url: 'https://play.google.com/store/apps/developer?id=chaosskill&hl=en',
      thumbnail: '/assets/img/portfolio/mobileapps.png',
    },
  ],
  3: [
    {
      id: 'kit-captain',
      name: 'Kit Captain',
      description: 'Dropshipping Shopify store for football jerseys',
      year: '2023',
      url: 'https://web.archive.org/web/20250222120851/https://kit-captain.com/',
      archived: true,
      thumbnail: '/assets/img/portfolio/kitcaptain.png',
    },
    {
      id: 'la-ville-rose',
      name: 'Toulouse City Guide',
      description: 'Neighbourhood city guide and Airbnb in Toulouse.',
      year: '2023',
      url: 'https://web.archive.org/web/20250805160604/https://lavillerose.com/',
      archived: true,
      thumbnail: '/assets/img/portfolio/lavillerosemock.png',
    },
  ],
  4: [
    {
      id: 'purrposterous',
      name: 'Purrposterous',
      description: 'AI-generated cat humour on Instagram — Midjourney images and captions.',
      year: '2023',
      url: 'https://instagram.com/thepurrposterous/',
      thumbnail: '/assets/img/portfolio/portfolio-7.png',
    },
    {
      id: 'poster-atlas',
      name: 'Poster Atlas',
      description: 'Map-art print shop by AI — cities turned into graphic posters on Etsy.',
      year: '2023',
      url: 'https://www.instagram.com/posteratlas',
      thumbnail: '/assets/img/portfolio/posteratlas.png',
    },
    {
      id: 'sierra-waves',
      name: 'Sierra Waves',
      description: 'Ambient generative music project by AI — released on Spotify and streaming.',
      year: '2024',
      url: 'https://open.spotify.com/artist/5rRCHCNGh6BDC1v32YDhVr',
      thumbnail: '/assets/img/portfolio/sierrawaves.png',
    },
    {
      id: 'ouaf',
      name: 'Ouaf!',
      description: 'Novelty self-published book A/B testing FBA vs KDP unit economics.',
      year: '2024',
      url: 'https://www.amazon.fr/dp/2959459202',
      thumbnail: '/assets/img/portfolio/book.png',
    },
    {
      id: 'parallel',
      name: 'Parallel Perspectives',
      description: 'Podcast by AI — exploring technology and society through conversation.',
      year: '2025',
      url: 'https://open.spotify.com/show/2MIZjnGws1mJEMyXcB74PD',
      thumbnail: '/assets/img/portfolio/parallel.png',
    },
    {
      id: 'barkly',
      name: 'Barkly',
      description: 'Language learning app by AI — Gamification released on Google Play',
      year: '2025',
      url: 'https://play.google.com/store/apps/details?id=com.rwcreations.barkly&hl=en',
      thumbnail: '/assets/img/portfolio/barkly.png',
    },
    {
      id: 'lavillerose-map',
      name: 'La Ville Rose Map',
      description: 'Data Driven Real Estate map of Toulouse',
      year: '2026',
      url: 'https://lavillerose.com/',
      thumbnail: '/assets/img/portfolio/toulouse-map.png',
    },
    {
      id: 'aura',
      name: 'Aura',
      description: 'Holistic wellness app by AI — combining balance coaching, journaling, and habit tracking.',
      year: '2026',
      url: 'https://aurabalance.ai/',
      thumbnail: '/assets/img/portfolio/aura.png',
    },
  ],
  5: [
    {
      id: 'rw-impact',
      name: 'RW Impact',
      description: 'Non-profit for AI, connecting skills, tools, and time to mission-driven projects.',
      year: '2025',
      url: 'https://rwimpact.org',
      thumbnail: '/assets/img/portfolio/rwimpact.png',
    },
  ],
}
