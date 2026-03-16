# Chord Companion

Interactive guitar chord sheet with inline fingering diagrams and an AI music theory companion.

## Features

- **Chord Detection** — Paste any chord sheet; chord lines are detected automatically via position-based heuristics
- **Voicing Configuration** — Multiple fingering options per chord; pick your preferred voicing once per song
- **Inline Diagrams** — SVG chord diagrams render directly above chord names for hands-free playing
- **Theory Companion** — Chat panel powered by Claude for real-time music theory discussion about your loaded song

## Setup

```bash
npm install
cp .env.local.example .env.local
# Add your Anthropic API key to .env.local
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo in Vercel dashboard
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Anthropic Claude API (server-side proxy)
