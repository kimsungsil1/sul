"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/Button";

const categories = [
  "Wine",
  "Whisky",
  "Brandy",
  "Rum",
  "Champagne",
  "Other",
];

export function LandingForm() {
  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => current - i);
  }, []);

  return (
    <form
      action="/results"
      className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Birth year (YYYY)
          <select
            name="year"
            className="w-full rounded-md border border-slate-200 px-3 py-2"
            defaultValue="1989"
            required
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Country (shipping preference)
          <input
            name="country"
            className="w-full rounded-md border border-slate-200 px-3 py-2"
            defaultValue="KR"
            aria-describedby="country-help"
          />
          <span id="country-help" className="text-xs font-normal text-slate-500">
            Used to prioritize retailers or styles aligned with your region.
          </span>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Min budget (USD)
          <input
            type="number"
            name="minBudget"
            min={0}
            defaultValue={50}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Max budget (USD)
          <input
            type="number"
            name="maxBudget"
            min={0}
            defaultValue={300}
            className="w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Region (optional)
        <input
          name="region"
          className="w-full rounded-md border border-slate-200 px-3 py-2"
          placeholder="e.g., Bordeaux, Speyside"
        />
      </label>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium text-slate-700">Categories</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" name="category" value={category} defaultChecked />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium text-slate-700">Wine sweetness</legend>
        <div className="grid gap-2 sm:grid-cols-4">
          {[
            { value: "any", label: "Any" },
            { value: "dry", label: "Dry" },
            { value: "off-dry", label: "Off-dry" },
            { value: "sweet", label: "Sweet" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 text-sm text-slate-600">
              <input type="radio" name="sweetness" value={option.value} defaultChecked={option.value === "any"} />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="exactOnly" value="true" />
          Exact-year only
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="availabilityOnly" value="true" />
          Only show in-stock
        </label>
      </div>

      <Button type="submit">Find recommendations</Button>
    </form>
  );
}
