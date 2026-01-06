import { loadSeed } from "@/lib/seed/load-seed";
import { PriceConnector } from "@/connector_prices/types";

export const seedPriceConnector: PriceConnector = {
  name: "SeedPricing",
  async fetchPrices() {
    const seed = loadSeed();
    const result: Record<string, any[]> = {};

    seed.products.forEach((product, index) => {
      const id = `seed-${index}`;
      result[id] = product.prices.map((price) => ({
        price: price.price,
        currency: price.currency,
        buyUrl: price.buyUrl,
        inStock: price.inStock,
        lastCheckedAt: new Date(price.lastCheckedAt),
        sourceName: "Curated",
      }));
    });

    return result;
  },
};
