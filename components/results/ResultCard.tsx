"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RankedResult } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useFavorites } from "@/components/results/useFavorites";

export function ResultCard({ result }: { result: RankedResult }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { product, explanation, price } = result;
  const isFavorite = favorites.includes(product.id);
  const inStock =
    product.inStockOverride !== null && product.inStockOverride !== undefined
      ? product.inStockOverride
      : product.prices.some((item) => item.inStock);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">{product.name}</h3>
          <p className="text-sm text-slate-600">
            {product.category} · {product.region} · {product.country}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={explanation.matchType.startsWith("exact") ? "success" : "info"}>
            {explanation.matchType.startsWith("exact") ? "Exact match" : "Alternative"}
          </Badge>
          <Badge tone={inStock ? "success" : "neutral"}>{inStock ? "In stock" : "Out of stock"}</Badge>
          {product.featured ? <Badge>Featured</Badge> : null}
        </div>
      </div>

      <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <div>
          <p>Vintage/Distilled/Bottled: {product.vintageYear ?? product.distilledYear ?? product.bottledYear ?? "N/A"}</p>
          <p>Age: {product.ageYears ? `${product.ageYears} years` : "N/A"}</p>
          <p>ABV: {product.abv ? `${product.abv}%` : "N/A"}</p>
        </div>
        <div>
          <p>Size: {product.sizeMl ? `${product.sizeMl}ml` : "N/A"}</p>
          <p>Rating: {product.rating ?? "N/A"}</p>
          <p>Sweetness: {product.sweetness ?? "N/A"}</p>
        </div>
      </div>

      <p className="text-sm text-slate-700">
        <span className="font-semibold">Why recommended:</span> {explanation.why}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <div>
          <p className="font-semibold text-ink">
            {price ? formatCurrency(price.price, price.currency) : "Price unavailable"}
          </p>
          {price ? (
            <p>
              Last checked: {formatDate(price.lastCheckedAt)} · {price.sourceName === "Curated" ? "Curated estimate" : "Live"}
            </p>
          ) : (
            <p>Curated estimate</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {price?.buyUrl ? (
            <a
              href={price.buyUrl}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
            >
              Buy link
            </a>
          ) : (
            <span className="text-xs text-slate-500">No link available</span>
          )}
          <Button
            type="button"
            className={isFavorite ? "bg-accent2" : "bg-accent"}
            onClick={() => toggleFavorite(product.id)}
            aria-pressed={isFavorite}
          >
            {isFavorite ? "Saved" : "Save"}
          </Button>
        </div>
      </div>

      <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
        Gift-ready note: “Celebrating a {product.vintageYear ?? product.distilledYear ?? product.bottledYear ?? ""} birth year with a bottle that fits your style.”
      </p>
    </div>
  );
}
