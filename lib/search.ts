import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { loadSeed } from "@/lib/seed/load-seed";
import { Product, RankedResult, SearchParams } from "@/lib/types";
import { scoreProduct } from "@/lib/ranking";

function mapSeedToProduct(seed: ReturnType<typeof loadSeed>["products"][number], index: number): Product {
  return {
    id: `seed-${index}`,
    name: seed.name,
    category: seed.category,
    vintageYear: seed.vintageYear ?? null,
    distilledYear: seed.distilledYear ?? null,
    bottledYear: seed.bottledYear ?? null,
    ageYears: seed.ageYears ?? null,
    abv: seed.abv ?? null,
    sizeMl: seed.sizeMl ?? null,
    region: seed.region ?? null,
    country: seed.country ?? null,
    sweetness: seed.sweetness ?? null,
    rating: seed.rating ?? null,
    featured: seed.featured ?? false,
    manualScoreBoost: seed.manualScoreBoost ?? 0,
    inStockOverride: seed.inStockOverride ?? null,
    prices: seed.prices.map((price, priceIndex) => ({
      id: `seed-price-${index}-${priceIndex}`,
      price: price.price,
      currency: price.currency,
      buyUrl: price.buyUrl,
      inStock: price.inStock,
      lastCheckedAt: new Date(price.lastCheckedAt),
      sourceName: "Curated",
    })),
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: {
        prices: {
          include: {
            source: true,
          },
          orderBy: {
            lastCheckedAt: "desc",
          },
        },
      },
    });

    return products.map((product) => ({
      ...product,
      prices: product.prices.map((price) => ({
        ...price,
        lastCheckedAt: price.lastCheckedAt,
        sourceName: price.source?.name,
      })),
    }));
  } catch (error) {
    if (!config.useSeedFallback) throw error;
    const seed = loadSeed();
    return seed.products.map(mapSeedToProduct);
  }
}

export function filterProducts(products: Product[], params: SearchParams): Product[] {
  return products.filter((product) => {
    if (params.categories.length && !params.categories.includes(product.category)) {
      return false;
    }
    if (params.sweetness && params.sweetness !== "any" && product.sweetness !== params.sweetness) {
      return false;
    }
    if (params.region && product.region && !product.region.toLowerCase().includes(params.region.toLowerCase())) {
      return false;
    }
    if (params.minBudget !== undefined || params.maxBudget !== undefined) {
      const price = product.prices[0]?.price ?? 0;
      if (params.minBudget !== undefined && price < params.minBudget) {
        return false;
      }
      if (params.maxBudget !== undefined && price > params.maxBudget) {
        return false;
      }
    }
    const inStock =
      product.inStockOverride !== null && product.inStockOverride !== undefined
        ? product.inStockOverride
        : product.prices.some((price) => price.inStock);
    if (params.availabilityOnly && !inStock) {
      return false;
    }
    return true;
  });
}

export async function getRankedResults(params: SearchParams): Promise<RankedResult[]> {
  const products = await getProducts();
  const filtered = filterProducts(products, params);
  let weights = config.rankingWeights;

  try {
    const stored = await prisma.rankingConfig.findFirst();
    if (stored) {
      weights = {
        exact: stored.exactWeight,
        age: stored.ageWeight,
        rating: stored.ratingWeight,
        availability: stored.availabilityWeight,
        budget: stored.budgetWeight,
        featured: stored.featuredWeight,
      };
    }
  } catch (error) {
    if (!config.useSeedFallback) throw error;
  }

  return filtered
    .map((product) => {
      const { score, explanation } = scoreProduct(product, params, weights);
      return {
        product,
        score,
        explanation,
        price: product.prices[0],
      };
    })
    .filter((result) => {
      if (!params.exactOnly) return true;
      return result.explanation.matchType.startsWith("exact");
    })
    .sort((a, b) => b.score - a.score);
}
