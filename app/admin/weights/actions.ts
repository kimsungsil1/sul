"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateWeights(formData: FormData) {
  const data = {
    exactWeight: Number(formData.get("exactWeight") ?? 50),
    ageWeight: Number(formData.get("ageWeight") ?? 20),
    ratingWeight: Number(formData.get("ratingWeight") ?? 10),
    availabilityWeight: Number(formData.get("availabilityWeight") ?? 10),
    budgetWeight: Number(formData.get("budgetWeight") ?? 5),
    featuredWeight: Number(formData.get("featuredWeight") ?? 5),
  };

  const existing = await prisma.rankingConfig.findFirst();
  if (existing) {
    await prisma.rankingConfig.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.rankingConfig.create({ data });
  }

  redirect("/admin/weights?success=true");
}
