export const config = {
  adminPassword: process.env.ADMIN_PASSWORD || "",
  useSeedFallback: process.env.USE_SEED_FALLBACK !== "false",
  rankingWeights: {
    exact: Number(process.env.RANKING_EXACT_WEIGHT ?? 50),
    age: Number(process.env.RANKING_AGE_WEIGHT ?? 20),
    rating: Number(process.env.RANKING_RATING_WEIGHT ?? 10),
    availability: Number(process.env.RANKING_AVAILABILITY_WEIGHT ?? 10),
    budget: Number(process.env.RANKING_BUDGET_WEIGHT ?? 5),
    featured: Number(process.env.RANKING_FEATURED_WEIGHT ?? 5),
  },
};
