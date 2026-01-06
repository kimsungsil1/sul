import { ReactNode } from "react";
import clsx from "clsx";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "info" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        tone === "success" && "bg-emerald-100 text-emerald-700",
        tone === "info" && "bg-purple-100 text-purple-700",
        tone === "neutral" && "bg-slate-100 text-slate-700"
      )}
    >
      {children}
    </span>
  );
}
