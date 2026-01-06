# Ranking Logic

## Overview
The ranking model combines explicit year matches with quality signals, availability, and budget fit. Each result includes a transparent explanation object used by the UI.

## Score components
- **Exact-year match** (highest weight)
  - Vintage year for wine/champagne/port/vintage armagnac.
  - Distilled or bottled year for spirits.
- **Alternative match**
  - Age match (current year − birth year) when age statements exist.
  - Closest year within ±1–3 when exact year is unavailable.
- **Quality/rating** (optional)
  - Normalized 0–100 rating if available.
- **Availability**
  - In-stock boosts; out-of-stock reduces score.
- **Budget fit**
  - Score based on how close the price is to user’s range.
- **Featured/manual overrides**
  - Admin-configured boost for curated picks.

## Configurability
Weights can be configured via environment variables or the admin weights panel (stored in the database).

## Output explanation
Each result includes:
- match type (exact vintage, exact distilled/bottled, alternative age, alternative year)
- year delta
- score breakdown and final score
- primary reason string for “why recommended” copy
