import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminPage({ searchParams }: { searchParams: { error?: string } }) {
  const authed = isAdminAuthenticated();

  if (!authed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Admin Access</h1>
        {searchParams.error === "missing-password" && (
          <p className="mt-2 text-sm text-rose-600">Set ADMIN_PASSWORD in .env to enable admin access.</p>
        )}
        <p className="mt-2 text-sm text-slate-600">Please log in to manage products.</p>
        <Link href="/admin/login" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Manage products, imports, and ranking weights.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-4">
        <Link href="/admin/products" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-ink shadow-sm">
          Products
        </Link>
        <Link href="/admin/imports" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-ink shadow-sm">
          CSV Imports
        </Link>
        <Link href="/admin/weights" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-ink shadow-sm">
          Ranking Weights
        </Link>
        <Link href="/admin/sources" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-ink shadow-sm">
          Sources
        </Link>
      </div>
    </div>
  );
}
