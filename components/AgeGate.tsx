"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "age_verified";

export function AgeGate() {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVerified(stored === "true");
  }, []);

  if (verified === null || verified) return null;

  const handleConfirm = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVerified(true);
  };

  const handleDecline = () => {
    window.location.href = "https://www.responsibility.org/";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
      <div className="max-w-lg rounded-2xl bg-white p-6 text-center shadow-xl">
        <h2 className="text-xl font-semibold">Age Verification</h2>
        <p className="mt-2 text-sm text-slate-600">
          This experience is for adults of legal drinking age in Korea (19+). Please confirm you are 19 or older.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={handleConfirm}>I am 19+</Button>
          <button
            className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={handleDecline}
          >
            I am under 19
          </button>
        </div>
      </div>
    </div>
  );
}
