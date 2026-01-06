import { loadSeed } from "@/lib/seed/load-seed";
import { MetadataConnector } from "@/connector_metadata/types";

export const seedMetadataConnector: MetadataConnector = {
  name: "SeedMetadata",
  async fetchProducts() {
    const seed = loadSeed();
    return seed.products.map((item, index) => ({
      id: `seed-${index}`,
      name: item.name,
      category: item.category,
      vintageYear: item.vintageYear ?? null,
      distilledYear: item.distilledYear ?? null,
      bottledYear: item.bottledYear ?? null,
      ageYears: item.ageYears ?? null,
      abv: item.abv ?? null,
      sizeMl: item.sizeMl ?? null,
      region: item.region ?? null,
      country: item.country ?? null,
      sweetness: item.sweetness ?? null,
      rating: item.rating ?? null,
      featured: item.featured ?? false,
      manualScoreBoost: item.manualScoreBoost ?? 0,
      inStockOverride: item.inStockOverride ?? null,
      prices: item.prices.map((price, priceIndex) => ({
        id: `seed-price-${index}-${priceIndex}`,
        price: price.price,
        currency: price.currency,
        buyUrl: price.buyUrl,
        inStock: price.inStock,
        lastCheckedAt: new Date(price.lastCheckedAt),
        sourceName: "Curated",
      })),
    }));
  },
};
