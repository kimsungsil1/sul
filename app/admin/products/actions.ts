"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const category = String(formData.get("category") ?? "Other");
  const vintageYear = formData.get("vintageYear") ? Number(formData.get("vintageYear")) : null;
  const distilledYear = formData.get("distilledYear") ? Number(formData.get("distilledYear")) : null;
  const bottledYear = formData.get("bottledYear") ? Number(formData.get("bottledYear")) : null;
  const ageYears = formData.get("ageYears") ? Number(formData.get("ageYears")) : null;
  const abv = formData.get("abv") ? Number(formData.get("abv")) : null;
  const sizeMl = formData.get("sizeMl") ? Number(formData.get("sizeMl")) : null;
  const region = String(formData.get("region") ?? "");
  const country = String(formData.get("country") ?? "");
  const rating = formData.get("rating") ? Number(formData.get("rating")) : null;
  const featured = formData.get("featured") === "on";
  const inStockOverrideValue = formData.get("inStockOverride");
  const inStockOverride =
    inStockOverrideValue === "true" ? true : inStockOverrideValue === "false" ? false : null;

  await prisma.product.create({
    data: {
      name,
      category,
      vintageYear,
      distilledYear,
      bottledYear,
      ageYears,
      abv,
      sizeMl,
      region,
      country,
      rating,
      featured,
      inStockOverride,
    },
  });

  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.product.delete({ where: { id } });
  }
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) redirect("/admin/products");

  await prisma.product.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? "Other"),
      vintageYear: formData.get("vintageYear") ? Number(formData.get("vintageYear")) : null,
      distilledYear: formData.get("distilledYear") ? Number(formData.get("distilledYear")) : null,
      bottledYear: formData.get("bottledYear") ? Number(formData.get("bottledYear")) : null,
      ageYears: formData.get("ageYears") ? Number(formData.get("ageYears")) : null,
      abv: formData.get("abv") ? Number(formData.get("abv")) : null,
      sizeMl: formData.get("sizeMl") ? Number(formData.get("sizeMl")) : null,
      region: String(formData.get("region") ?? ""),
      country: String(formData.get("country") ?? ""),
      rating: formData.get("rating") ? Number(formData.get("rating")) : null,
      featured: formData.get("featured") === "on",
      manualScoreBoost: formData.get("manualScoreBoost") ? Number(formData.get("manualScoreBoost")) : 0,
      inStockOverride:
        formData.get("inStockOverride") === "true"
          ? true
          : formData.get("inStockOverride") === "false"
          ? false
          : null,
    },
  });

  redirect(`/admin/products/${id}`);
}
