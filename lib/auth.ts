import { cookies } from "next/headers";
import { config } from "@/lib/config";

const COOKIE_NAME = "admin_auth";

export function isAdminAuthenticated(): boolean {
  const cookie = cookies().get(COOKIE_NAME);
  return Boolean(cookie?.value && cookie.value === config.adminPassword);
}

export function setAdminCookie() {
  cookies().set(COOKIE_NAME, config.adminPassword, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE_NAME);
}
