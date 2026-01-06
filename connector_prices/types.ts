import { PriceListing } from "@/lib/types";

export type PriceConnector = {
  name: string;
  fetchPrices: (productIds: string[]) => Promise<Record<string, PriceListing[]>>;
};
