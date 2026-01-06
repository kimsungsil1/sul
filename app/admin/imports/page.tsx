import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { importCsv } from "@/app/admin/imports/actions";

export default async function ImportsPage({ searchParams }: { searchParams: { error?: string; success?: string } }) {
  const authed = isAdminAuthenticated();
  if (!authed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Please log in to view imports.</p>
        <Link href="/admin/login" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
          Go to login
        </Link>
      </div>
    );
  }

  const logs = await prisma.importLog.findMany({
    orderBy: { createdAt: "desc" },
  });
  const priceLogs = await prisma.priceCheckLog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">CSV Imports</h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload a CSV with columns: name, category, vintageYear, distilledYear, bottledYear, ageYears, abv, sizeMl,
          region, country, rating, featured, inStockOverride.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Upload CSV</h2>
        {searchParams.error && <p className="mt-2 text-sm text-rose-600">Missing file.</p>}
        {searchParams.success && <p className="mt-2 text-sm text-emerald-600">Import completed.</p>}
        <form action={importCsv} className="mt-4 flex flex-col gap-3">
          <input name="file" type="file" accept=".csv" required />
          <button type="submit" className="w-fit rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
            Import
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Import logs</h2>
        <div className="mt-4 grid gap-3 text-sm">
          {logs.map((log) => (
            <div key={log.id} className="rounded-xl border border-slate-100 p-3">
              <p className="font-semibold text-ink">{log.sourceName}</p>
              <p className="text-slate-600">Rows: {log.rows ?? 0} · {log.createdAt.toLocaleString()}</p>
              {log.notes && <p className="text-slate-500">{log.notes}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Price check logs</h2>
        <div className="mt-4 grid gap-3 text-sm">
          {priceLogs.map((log) => (
            <div key={log.id} className="rounded-xl border border-slate-100 p-3">
              <p className="font-semibold text-ink">{log.sourceName}</p>
              <p className="text-slate-600">Rows: {log.rows ?? 0} · {log.createdAt.toLocaleString()}</p>
              {log.notes && <p className="text-slate-500">{log.notes}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
