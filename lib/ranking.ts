import { config } from "@/lib/config";
import { MatchType, Product, RankingExplanation, SearchParams } from "@/lib/types";

export type RankingWeights = typeof config.rankingWeights;

export function determineMatch(product: Product, birthYear: number): {
  matchType: MatchType;
  yearDelta?: number;
} {
  if (product.vintageYear) {
    const delta = Math.abs(product.vintageYear - birthYear);
    if (delta === 0) return { matchType: "exact-vintage" };
    return { matchType: "alt-year", yearDelta: delta };
  }

  const spiritYear = product.distilledYear ?? product.bottledYear;
  if (spiritYear) {
    const delta = Math.abs(spiritYear - birthYear);
    if (delta === 0) {
      return {
        matchType: product.distilledYear ? "exact-distilled" : "exact-bottled",
      };
    }
    return { matchType: "alt-year", yearDelta: delta };
  }

  if (product.ageYears) {
    const ageTarget = new Date().getFullYear() - birthYear;
    const delta = Math.abs(product.ageYears - ageTarget);
    return { matchType: "alt-age", yearDelta: delta };
  }

  return { matchType: "no-match" };
}

export function scoreProduct(
  product: Product,
  params: SearchParams,
  weights: RankingWeights = config.rankingWeights
): { score: number; explanation: RankingExplanation } {
  const { matchType, yearDelta } = determineMatch(product, params.birthYear);
  const scoreBreakdown: Record<string, number> = {};

  let score = 0;

  if (matchType.startsWith("exact")) {
    scoreBreakdown.exact = weights.exact;
    score += weights.exact;
  } else if (matchType === "alt-age" || matchType === "alt-year") {
    const deltaPenalty = yearDelta ? Math.max(0, 1 - yearDelta / 5) : 0.5;
    scoreBreakdown.age = weights.age * deltaPenalty;
    score += scoreBreakdown.age;
  }

  if (product.rating) {
    const ratingScore = (product.rating / 100) * weights.rating;
    scoreBreakdown.rating = ratingScore;
    score += ratingScore;
  }

  const inStock =
    product.inStockOverride !== null && product.inStockOverride !== undefined
      ? product.inStockOverride
      : product.prices.some((price) => price.inStock);
  const availabilityScore = inStock ? weights.availability : weights.availability * 0.2;
  scoreBreakdown.availability = availabilityScore;
  score += availabilityScore;

  const price = product.prices[0]?.price ?? 0;
  if (params.minBudget || params.maxBudget) {
    const min = params.minBudget ?? 0;
    const max = params.maxBudget ?? Number.MAX_SAFE_INTEGER;
    const midpoint = (min + max) / 2;
    const distance = Math.abs(price - midpoint);
    const range = Math.max(1, max - min);
    const budgetScore = Math.max(0, 1 - distance / range) * weights.budget;
    scoreBreakdown.budget = budgetScore;
    score += budgetScore;
  }

  if (product.featured) {
    scoreBreakdown.featured = weights.featured;
    score += weights.featured;
  }

  if (product.manualScoreBoost) {
    scoreBreakdown.manual = product.manualScoreBoost;
    score += product.manualScoreBoost;
  }

  const why = buildWhy(matchType, yearDelta, product);

  return {
    score,
    explanation: { matchType, yearDelta, scoreBreakdown, why },
  };
}

function buildWhy(matchType: MatchType, yearDelta: number | undefined, product: Product): string {
  if (matchType === "exact-vintage") {
    return `Exact vintage match for ${product.vintageYear}.`;
  }
  if (matchType === "exact-distilled") {
    return `Distilled in ${product.distilledYear}, matching the birth year.`;
  }
  if (matchType === "exact-bottled") {
    return `Bottled in ${product.bottledYear}, matching the birth year.`;
  }
  if (matchType === "alt-age") {
    return `Age statement is within ${yearDelta} years of the target age.`;
  }
  if (matchType === "alt-year") {
    return `Closest available year is ${yearDelta} years from the target.`;
  }
  return "Curated pick based on style and availability.";
}
