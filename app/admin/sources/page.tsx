import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { createSource, deleteSource } from "@/app/admin/sources/actions";

export default async function SourcesPage() {
  const authed = isAdminAuthenticated();
  if (!authed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Please log in to manage sources.</p>
        <Link href="/admin/login" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
          Go to login
        </Link>
      </div>
    );
  }

  const sources = await prisma.source.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Sources</h1>
        <p className="mt-2 text-sm text-slate-600">Track metadata and pricing sources.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Add source</h2>
        <form action={createSource} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Name
            <input name="name" className="rounded-md border border-slate-200 px-3 py-2" required />
          </label>
          <label className="grid gap-2 text-sm">
            Type
            <input name="type" className="rounded-md border border-slate-200 px-3 py-2" placeholder="metadata/price" />
          </label>
          <label className="grid gap-2 text-sm">
            URL
            <input name="url" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Notes
            <input name="notes" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
            Create source
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Existing sources</h2>
        <div className="mt-4 grid gap-3 text-sm">
          {sources.map((source) => (
            <div key={source.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 p-3">
              <div>
                <p className="font-semibold text-ink">{source.name}</p>
                <p className="text-slate-600">{source.type}</p>
                {source.url && <p className="text-slate-500">{source.url}</p>}
              </div>
              <form action={deleteSource}>
                <input type="hidden" name="id" value={source.id} />
                <button className="rounded-md border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600" type="submit">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
