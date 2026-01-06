"use server";

import { redirect } from "next/navigation";
import { config } from "@/lib/config";
import { setAdminCookie } from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!config.adminPassword) {
    redirect("/admin?error=missing-password");
  }

  if (password !== config.adminPassword) {
    redirect("/admin/login?error=invalid");
  }

  setAdminCookie();
  redirect("/admin");
}
