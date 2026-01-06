import { Metadata } from "next";
import { getRankedResults } from "@/lib/search";
import { ResultsSection } from "@/components/results/ResultsSection";
import { ShareBar } from "@/components/results/ShareBar";
import { Badge } from "@/components/ui/Badge";
import { SearchParams } from "@/lib/types";

function parseParams(searchParams: Record<string, string | string[] | undefined>): SearchParams {
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];

  return {
    birthYear: Number(searchParams.year ?? 1989),
    country: (searchParams.country as string) || "KR",
    minBudget: searchParams.minBudget ? Number(searchParams.minBudget) : undefined,
    maxBudget: searchParams.maxBudget ? Number(searchParams.maxBudget) : undefined,
    categories: categories.length
      ? (categories as SearchParams["categories"])
      : ["Wine", "Whisky", "Brandy", "Rum", "Champagne", "Other"],
    sweetness: (searchParams.sweetness as SearchParams["sweetness"]) ?? "any",
    exactOnly: searchParams.exactOnly === "true",
    availabilityOnly: searchParams.availabilityOnly === "true",
    region: (searchParams.region as string) || undefined,
  };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<Metadata> {
  const params = parseParams(searchParams);
  const results = await getRankedResults(params);
  const topPick = results[0]?.product?.name ?? "Birth-Year Picks";

  const query = new URLSearchParams({
    year: String(params.birthYear),
    bottle: topPick,
  });

  return {
    title: `Birth-Year Picks for ${params.birthYear}`,
    description: `Top bottles for ${params.birthYear} with exact and alternative matches.`,
    openGraph: {
      title: `Birth-Year Picks for ${params.birthYear}`,
      description: topPick,
      images: [`/api/og?${query.toString()}`],
    },
  };
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = parseParams(searchParams);
  const results = await getRankedResults(params);

  const exactMatches = results.filter((item) => item.explanation.matchType.startsWith("exact"));
  const alternatives = results.filter((item) => !item.explanation.matchType.startsWith("exact"));

  const shareUrl = `/results?${new URLSearchParams({
    year: String(params.birthYear),
    country: params.country,
  }).toString()}`;

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold text-ink">Results for {params.birthYear}</h1>
          {params.exactOnly && <Badge tone="info">Exact-year only</Badge>}
          {params.availabilityOnly && <Badge tone="info">In-stock only</Badge>}
        </div>
        <p className="text-sm text-slate-600">
          Showing curated recommendations for {params.country}. Prices are estimates unless otherwise noted.
        </p>
        <div className="text-xs text-slate-500">
          <p>Exact match: vintage year (wine/champagne) or distilled/bottled year (spirits).</p>
          <p>Alternatives: age statements or closest available year within ±1–3.</p>
        </div>
      </header>

      <ShareBar url={shareUrl} />
      <p className="sr-only">Open Graph preview image contains the birth year and top pick text.</p>

      <ResultsSection title="Exact matches" results={exactMatches} />
      <ResultsSection title="Alternatives when exact bottles are scarce" results={alternatives} />

      {exactMatches.length === 0 && (
        <section className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          <h2 className="text-lg font-semibold text-ink">No exact matches found</h2>
          <p className="mt-2">
            Try expanding your budget or choosing a neighboring year. Age-statement bottles and vintage Armagnacs are often great alternatives.
          </p>
        </section>
      )}
    </div>
  );
}
