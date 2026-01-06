-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "vintageYear" INTEGER,
    "distilledYear" INTEGER,
    "bottledYear" INTEGER,
    "ageYears" INTEGER,
    "abv" DOUBLE PRECISION,
    "sizeMl" INTEGER,
    "region" TEXT,
    "country" TEXT,
    "sweetness" TEXT,
    "rating" DOUBLE PRECISION,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "manualScoreBoost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "inStockOverride" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceListing" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sourceId" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "buyUrl" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "lastCheckedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportLog" (
    "id" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "rows" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "ImportLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceCheckLog" (
    "id" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "rows" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "PriceCheckLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RankingConfig" (
    "id" TEXT NOT NULL,
    "exactWeight" DOUBLE PRECISION NOT NULL,
    "ageWeight" DOUBLE PRECISION NOT NULL,
    "ratingWeight" DOUBLE PRECISION NOT NULL,
    "availabilityWeight" DOUBLE PRECISION NOT NULL,
    "budgetWeight" DOUBLE PRECISION NOT NULL,
    "featuredWeight" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RankingConfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceListing" ADD CONSTRAINT "PriceListing_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceListing" ADD CONSTRAINT "PriceListing_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;
