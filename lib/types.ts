export type Category =
  | "Wine"
  | "Whisky"
  | "Brandy"
  | "Rum"
  | "Champagne"
  | "Other";

export type Sweetness = "dry" | "off-dry" | "sweet";

export type PriceListing = {
  id?: string;
  price: number;
  currency: string;
  buyUrl?: string | null;
  inStock: boolean;
  lastCheckedAt: Date;
  sourceName?: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  vintageYear?: number | null;
  distilledYear?: number | null;
  bottledYear?: number | null;
  ageYears?: number | null;
  abv?: number | null;
  sizeMl?: number | null;
  region?: string | null;
  country?: string | null;
  sweetness?: Sweetness | null;
  rating?: number | null;
  featured?: boolean;
  manualScoreBoost?: number;
  inStockOverride?: boolean | null;
  prices: PriceListing[];
};

export type SearchParams = {
  birthYear: number;
  country: string;
  minBudget?: number;
  maxBudget?: number;
  categories: Category[];
  sweetness?: Sweetness | "any";
  exactOnly: boolean;
  availabilityOnly: boolean;
  region?: string;
};

export type MatchType =
  | "exact-vintage"
  | "exact-distilled"
  | "exact-bottled"
  | "alt-age"
  | "alt-year"
  | "no-match";

export type RankingExplanation = {
  matchType: MatchType;
  yearDelta?: number;
  scoreBreakdown: Record<string, number>;
  why: string;
};

export type RankedResult = {
  product: Product;
  score: number;
  explanation: RankingExplanation;
  price?: PriceListing;
};
