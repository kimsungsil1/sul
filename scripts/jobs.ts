import { prisma } from "@/lib/prisma";
import { seedMetadataConnector } from "@/connector_metadata/seed";
import { seedPriceConnector } from "@/connector_prices/seed";

async function main() {
  console.log("Running refresh jobs...");

  const metadata = await seedMetadataConnector.fetchProducts();
  const priceMap = await seedPriceConnector.fetchPrices(metadata.map((item) => item.id));
  let priceRows = 0;

  for (const product of metadata) {
    const created = await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        category: product.category,
        vintageYear: product.vintageYear ?? null,
        distilledYear: product.distilledYear ?? null,
        bottledYear: product.bottledYear ?? null,
        ageYears: product.ageYears ?? null,
        abv: product.abv ?? null,
        sizeMl: product.sizeMl ?? null,
        region: product.region ?? null,
        country: product.country ?? null,
        sweetness: product.sweetness ?? null,
        rating: product.rating ?? null,
        featured: product.featured ?? false,
        manualScoreBoost: product.manualScoreBoost ?? 0,
        inStockOverride: product.inStockOverride ?? null,
      },
      create: {
        id: product.id,
        name: product.name,
        category: product.category,
        vintageYear: product.vintageYear ?? null,
        distilledYear: product.distilledYear ?? null,
        bottledYear: product.bottledYear ?? null,
        ageYears: product.ageYears ?? null,
        abv: product.abv ?? null,
        sizeMl: product.sizeMl ?? null,
        region: product.region ?? null,
        country: product.country ?? null,
        sweetness: product.sweetness ?? null,
        rating: product.rating ?? null,
        featured: product.featured ?? false,
        manualScoreBoost: product.manualScoreBoost ?? 0,
        inStockOverride: product.inStockOverride ?? null,
      },
    });

    const prices = priceMap[product.id] ?? [];
    for (const price of prices) {
      await prisma.priceListing.create({
        data: {
          productId: created.id,
          price: price.price,
          currency: price.currency,
          buyUrl: price.buyUrl ?? null,
          inStock: price.inStock,
          lastCheckedAt: price.lastCheckedAt,
        },
      });
      priceRows += 1;
    }
  }

  await prisma.importLog.create({
    data: {
      sourceName: "Seed",
      rows: metadata.length,
      notes: "Seed refresh",
    },
  });

  await prisma.priceCheckLog.create({
    data: {
      sourceName: "SeedPricing",
      rows: priceRows,
      notes: "Seed pricing refresh",
    },
  });

  console.log("Jobs complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
