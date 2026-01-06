"use server";

import { parse } from "csv-parse/sync";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function importCsv(formData: FormData) {
  const file = formData.get("file") as File | null;

  if (!file) {
    redirect("/admin/imports?error=missing");
  }

  const text = await file.text();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Array<Record<string, string>>;

  let count = 0;
  for (const record of records) {
    await prisma.product.create({
      data: {
        name: record.name,
        category: record.category || "Other",
        vintageYear: record.vintageYear ? Number(record.vintageYear) : null,
        distilledYear: record.distilledYear ? Number(record.distilledYear) : null,
        bottledYear: record.bottledYear ? Number(record.bottledYear) : null,
        ageYears: record.ageYears ? Number(record.ageYears) : null,
        abv: record.abv ? Number(record.abv) : null,
        sizeMl: record.sizeMl ? Number(record.sizeMl) : null,
        region: record.region || null,
        country: record.country || null,
        rating: record.rating ? Number(record.rating) : null,
        featured: record.featured === "true",
        inStockOverride:
          record.inStockOverride === "true"
            ? true
            : record.inStockOverride === "false"
            ? false
            : null,
      },
    });
    count += 1;
  }

  await prisma.importLog.create({
    data: {
      sourceName: "CSV",
      rows: count,
      notes: "Manual CSV import",
    },
  });

  redirect("/admin/imports?success=true");
}
