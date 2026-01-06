"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createSource(formData: FormData) {
  await prisma.source.create({
    data: {
      name: String(formData.get("name") ?? ""),
      type: String(formData.get("type") ?? "manual"),
      url: String(formData.get("url") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    },
  });

  redirect("/admin/sources");
}

export async function deleteSource(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.source.delete({ where: { id } });
  }
  redirect("/admin/sources");
}
