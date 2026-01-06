import { Product } from "@/lib/types";

export type MetadataConnector = {
  name: string;
  fetchProducts: () => Promise<Product[]>;
};
