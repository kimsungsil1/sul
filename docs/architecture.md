# Architecture

## Overview
The Birth-Year Liquor Recommender is a Next.js (App Router) application backed by Postgres and Prisma. The app provides:

- Public landing and results pages for users to discover bottles by birth year.
- Admin area protected by an environment password for product CRUD, CSV import, and ranking controls.
- Pluggable data connectors for metadata and price sources.
- Background job runner to refresh metadata/prices on a schedule.

## High-level components

- **Web app (Next.js)**
  - `app/page.tsx`: landing form and age gate.
  - `app/results/page.tsx`: server-rendered results page.
  - `app/api/og/route.ts`: dynamic OG image generation.
  - `app/admin/*`: admin CRUD, imports, weights.

- **Data access & ranking**
  - `lib/search.ts`: product search, filters, ranking.
  - `lib/ranking.ts`: scoring and explanation logic with configurable weights.
  - `lib/prisma.ts`: Prisma client.
  - `lib/seed/load-seed.ts`: seed fallback for offline mode.

- **Connectors**
  - `connector_metadata/*`: metadata/ratings connectors.
  - `connector_prices/*`: price/availability connectors.
  - `scripts/jobs.ts`: orchestrates connector runs.

- **Database**
  - `prisma/schema.prisma`: schema for products, price listings, sources, logs, ranking config.

## Runtime flow
1. User lands on `/`, passes age gate, and submits a birth year and preferences.
2. Results page uses `lib/search.ts` to load products and compute scores.
3. Results are grouped into exact matches and alternatives with ranking explanations.
4. The UI shows product details, badges, and shareable links.

## Security & compliance
- Admin protected by `ADMIN_PASSWORD` and a signed cookie.
- Site is informational only; all purchases happen via outbound links.
- Disclaimers and responsible-drinking messaging appear in the UI and legal docs.

## Background jobs
Use `npm run jobs:run` to refresh data via connectors. Schedule via cron or a hosted scheduler.
