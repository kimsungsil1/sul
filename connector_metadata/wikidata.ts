import { MetadataConnector } from "@/connector_metadata/types";
import { Product } from "@/lib/types";

export const wikidataMetadataConnector: MetadataConnector = {
  name: "Wikidata",
  async fetchProducts(): Promise<Product[]> {
    // Placeholder connector. Implement SPARQL queries once API access is configured.
    return [];
  },
};
