import { describe, expect, it } from "vitest";
import { scoreProduct } from "@/lib/ranking";
import { Product, SearchParams } from "@/lib/types";

const baseProduct: Product = {
  id: "test-1",
  name: "Test Vintage",
  category: "Wine",
  vintageYear: 1989,
  distilledYear: null,
  bottledYear: null,
  ageYears: null,
  abv: 13,
  sizeMl: 750,
  region: "Bordeaux",
  country: "France",
  sweetness: "dry",
  rating: 95,
  featured: false,
  manualScoreBoost: 0,
  prices: [
    {
      price: 200,
      currency: "USD",
      inStock: true,
      lastCheckedAt: new Date(),
    },
  ],
};

const params: SearchParams = {
  birthYear: 1989,
  country: "KR",
  categories: ["Wine"],
  sweetness: "any",
  exactOnly: false,
  availabilityOnly: false,
};

describe("scoreProduct", () => {
  it("prioritizes exact vintage matches", () => {
    const result = scoreProduct(baseProduct, params, {
      exact: 50,
      age: 20,
      rating: 10,
      availability: 10,
      budget: 5,
      featured: 5,
    });

    expect(result.explanation.matchType).toBe("exact-vintage");
    expect(result.score).toBeGreaterThan(50);
  });

  it("downgrades non-exact matches", () => {
    const altProduct = { ...baseProduct, vintageYear: 1991 };
    const result = scoreProduct(altProduct, params, {
      exact: 50,
      age: 20,
      rating: 10,
      availability: 10,
      budget: 5,
      featured: 5,
    });

    expect(result.explanation.matchType).toBe("alt-year");
    expect(result.score).toBeLessThan(50 + 10 + 10 + 5 + 5);
  });
});
