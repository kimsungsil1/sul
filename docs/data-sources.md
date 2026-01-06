# Data Sources (Research)

This document summarizes candidate data sources for metadata/ratings and price/availability feeds. The MVP defaults to a curated seed dataset and supports pluggable connectors for future integration.

## Metadata & ratings sources (candidates)

### 1) Wikidata + SPARQL
- **What it provides:** Open, structured metadata for wines and spirits (producer, region, bottle, year). Some ratings exist but coverage is uneven.
- **Access:** Public SPARQL endpoint.
- **Licensing:** CC0; permissive for commercial use.
- **Rate limits:** Fair use; heavy queries should be cached.
- **Pros:** Open license, easy to enrich with manual curation.
- **Cons:** Coverage varies by category; ratings are inconsistent.

### 2) Global Wine Score (GWS) API
- **What it provides:** Normalized critic scores, wine metadata.
- **Access:** Paid API keys.
- **Licensing:** Commercial license; rate limits based on plan.
- **Pros:** High-quality rating signal.
- **Cons:** Paid, wine-only, may not cover spirits.

### 3) Open Wine Data / Open Cellar datasets (public datasets)
- **What it provides:** Wine metadata and vintages from open datasets.
- **Access:** CSV/JSON downloads (licenses vary; typically CC-BY or similar).
- **Pros:** Easy to seed; good for MVP coverage.
- **Cons:** Data freshness and coverage vary; not spirits-focused.

**Chosen for MVP:**
- **Curated seed dataset + optional Wikidata connector**.
- Rationale: zero-key startup, permissive licensing, easy to expand with manual curation. Wikidata serves as a legal, open metadata source for future expansion.

## Price & availability sources (candidates)

### 1) Wine-Searcher API
- **What it provides:** Retail offers, pricing, and availability.
- **Access:** Paid API key with regional availability.
- **Licensing:** Commercial license; usage limits per plan.
- **Pros:** Strong wine coverage, structured pricing.
- **Cons:** Paid; may not cover all spirits.

### 2) Affiliate network feeds (CJ, Rakuten, Awin)
- **What it provides:** Retail product feeds, prices, deep links.
- **Access:** Requires retailer approval and affiliate accounts.
- **Licensing:** Affiliate terms; must follow each retailer policy.
- **Pros:** Legal outbound links; pricing data if feed is supported.
- **Cons:** Setup time; coverage depends on partners and region.

### 3) Retailer official APIs (e.g., LCBO, SAQ)
- **What it provides:** Inventory and prices for a specific region.
- **Access:** Public or partner APIs; rate limits vary.
- **Pros:** Reliable availability data.
- **Cons:** Regional restrictions; may not include all categories.

**Chosen for MVP:**
- **Curated seed pricing + placeholder affiliate feed connector.**
- Rationale: guarantees meaningful results without API keys, while allowing later integration with affiliate feeds or paid price APIs.

## Risks & mitigations

- **Coverage gaps:** seed dataset curated for core years and categories; add CSV import and admin CRUD.
- **Freshness:** price data is timestamped and marked as curated/estimated without live feeds.
- **ToS compliance:** connectors only target official APIs or affiliate feeds; no scraping.
