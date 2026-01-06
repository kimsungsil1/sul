import { Product } from "@/lib/types";

export function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function getPrimaryYear(product: Product): number | undefined {
  return (
    product.vintageYear ??
    product.distilledYear ??
    product.bottledYear ??
    undefined
  );
}
