import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateWeights } from "@/app/admin/weights/actions";

export default async function WeightsPage({ searchParams }: { searchParams: { success?: string } }) {
  const authed = isAdminAuthenticated();
  if (!authed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Please log in to manage weights.</p>
        <Link href="/admin/login" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
          Go to login
        </Link>
      </div>
    );
  }

  const config = await prisma.rankingConfig.findFirst();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Ranking Weights</h1>
        <p className="mt-2 text-sm text-slate-600">Adjust the scoring weights for recommendations.</p>
        {searchParams.success && <p className="mt-2 text-sm text-emerald-600">Weights saved.</p>}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form action={updateWeights} className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Exact match weight
            <input name="exactWeight" type="number" defaultValue={config?.exactWeight ?? 50} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Age/alternative weight
            <input name="ageWeight" type="number" defaultValue={config?.ageWeight ?? 20} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Rating weight
            <input name="ratingWeight" type="number" defaultValue={config?.ratingWeight ?? 10} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Availability weight
            <input name="availabilityWeight" type="number" defaultValue={config?.availabilityWeight ?? 10} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Budget fit weight
            <input name="budgetWeight" type="number" defaultValue={config?.budgetWeight ?? 5} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Featured weight
            <input name="featuredWeight" type="number" defaultValue={config?.featuredWeight ?? 5} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
            Save weights
          </button>
        </form>
      </section>
    </div>
  );
}
