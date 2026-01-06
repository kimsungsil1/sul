import { prisma } from "@/lib/prisma";
import { loadSeed } from "@/lib/seed/load-seed";

async function main() {
  const seed = loadSeed();

  await prisma.priceListing.deleteMany();
  await prisma.product.deleteMany();
  await prisma.source.deleteMany();

  const source = await prisma.source.create({
    data: {
      name: "Curated",
      type: "seed",
      url: "",
      notes: "Curated seed dataset",
    },
  });

  for (const product of seed.products) {
    const created = await prisma.product.create({
      data: {
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
        prices: {
          create: product.prices.map((price) => ({
            price: price.price,
            currency: price.currency,
            buyUrl: price.buyUrl,
            inStock: price.inStock,
            lastCheckedAt: new Date(price.lastCheckedAt),
            sourceId: source.id,
          })),
        },
      },
    });

    console.log(`Seeded ${created.name}`);
  }

  const existing = await prisma.rankingConfig.findFirst();
  if (!existing) {
    await prisma.rankingConfig.create({
      data: {
        exactWeight: 50,
        ageWeight: 20,
        ratingWeight: 10,
        availabilityWeight: 10,
        budgetWeight: 5,
        featuredWeight: 5,
      },
    });
  }
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
