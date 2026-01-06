# Birth-Year Liquor Recommender

A production-ready Next.js app that helps users discover bottles matching a birth year, with transparent alternatives when exact-year bottles are scarce.

## Product spec (Phase 1: Deconstruct)

### Goal
Users enter a birth year and preferences to receive ranked bottle recommendations, plus curated alternatives when exact-year matches are not available.

### Assumptions
- The site is a recommender only (no direct alcohol sales).
- Seed data must be sufficient for meaningful results without API keys.
- Year semantics vary by category (see below).

### Year semantics by category
- **Wine / Champagne / Vintage Port**: vintage year is the primary year.
- **Whisky / Rum / Brandy / Cognac / Armagnac**: distilled year or bottled year; age statement can be used for alternatives.
- **Other**: best available year field; otherwise age-based matching.

## Phase 2: Diagnose (Research)
See:
- [`docs/data-sources.md`](docs/data-sources.md)
- [`docs/legal-and-disclaimers.md`](docs/legal-and-disclaimers.md)
- [`docs/ranking.md`](docs/ranking.md)

## Features
- Landing form with birth year input, category filters, budget range, and exact-year toggle.
- Results page with exact matches vs alternatives, “why recommended” explanations, and shareable links.
- Age gate (KR 19+), disclaimers, and accessible UI.
- Admin area (password-protected) with CRUD, CSV import, and ranking weights.
- Pluggable metadata/price connectors with a job runner.
- Postgres + Prisma for structured storage.

## Tech stack
- Next.js (App Router) + TypeScript
- TailwindCSS
- Postgres + Prisma
- Vitest + Playwright

## Getting started

### 1) Install dependencies
```bash
npm install
```

### 2) Start Postgres
```bash
docker compose up -d
```

### 3) Configure env
Create `.env` (see `.env.example`).

### 4) Run migrations + seed
```bash
npm run prisma:migrate
npm run db:seed
```

### 5) Run dev server
```bash
npm run dev
```

## Admin access
Set `ADMIN_PASSWORD` in `.env`. Visit `/admin` and log in.

## Background jobs
Run:
```bash
npm run jobs:run
```
Schedule via cron (example):
```bash
0 */6 * * * /usr/bin/node /path/to/app/node_modules/.bin/tsx /path/to/app/scripts/jobs.ts
```

## Deployment
- Vercel (serverless) or VPS with Node + Postgres.
- Set environment variables in the hosting provider.
- Ensure `DATABASE_URL` points to your Postgres instance.

## Accessibility checklist
- Keyboard navigation and focus states
- Semantic HTML and labels for all inputs
- Skip-to-content link
- ARIA labels for interactive controls

## Acceptance criteria checklist
- Seed data yields results for years 1989, 1995, 2000 with no API keys.
- Exact/Alternative logic verified with ranking tests.
- Admin CSV import updates product list.
- Vitest + Playwright smoke tests pass.
