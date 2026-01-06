"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ShareBar({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const resolvedUrl = typeof window === "undefined" ? url : url.startsWith("http") ? url : `${window.location.origin}${url}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(resolvedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Birth-Year Liquor Picks",
        url: resolvedUrl,
      });
      return;
    }
    await handleCopy();
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm">
      <p className="text-slate-700">Share your results</p>
      <Button type="button" onClick={handleShare}>
        {copied ? "Copied" : "Share link"}
      </Button>
      <span className="text-xs text-slate-500">OG preview will include the top pick.</span>
    </div>
  );
}
