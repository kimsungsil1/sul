import { RankedResult } from "@/lib/types";
import { ResultCard } from "@/components/results/ResultCard";

export function ResultsSection({ title, results }: { title: string; results: RankedResult[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {results.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          No bottles found in this section.
        </p>
      ) : (
        <div className="grid gap-4">
          {results.map((result) => (
            <ResultCard key={result.product.id} result={result} />
          ))}
        </div>
      )}
    </section>
  );
}
