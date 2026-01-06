import fs from "fs";
import path from "path";
import { Product, PriceListing } from "@/lib/types";

export type SeedProduct = Omit<Product, "id" | "prices"> & {
  prices: Array<Omit<PriceListing, "lastCheckedAt"> & { lastCheckedAt: string }>;
};

export type SeedPayload = {
  products: SeedProduct[];
};

export function loadSeed(): SeedPayload {
  const filePath = path.join(process.cwd(), "data", "seed.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SeedPayload;
}
