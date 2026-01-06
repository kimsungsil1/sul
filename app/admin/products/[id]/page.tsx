import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateProduct } from "@/app/admin/products/actions";

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const authed = isAdminAuthenticated();
  if (!authed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Please log in to edit products.</p>
        <Link href="/admin/login" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
          Go to login
        </Link>
      </div>
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/products" className="text-sm text-slate-600 hover:text-ink">
        ← Back to products
      </Link>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Edit product</h1>
        <form action={updateProduct} className="mt-4 grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="id" value={product.id} />
          <label className="grid gap-2 text-sm">
            Name
            <input name="name" defaultValue={product.name} className="rounded-md border border-slate-200 px-3 py-2" required />
          </label>
          <label className="grid gap-2 text-sm">
            Category
            <select name="category" defaultValue={product.category} className="rounded-md border border-slate-200 px-3 py-2">
              {[
                "Wine",
                "Whisky",
                "Brandy",
                "Rum",
                "Champagne",
                "Other",
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Vintage Year
            <input name="vintageYear" type="number" defaultValue={product.vintageYear ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Distilled Year
            <input name="distilledYear" type="number" defaultValue={product.distilledYear ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Bottled Year
            <input name="bottledYear" type="number" defaultValue={product.bottledYear ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Age Years
            <input name="ageYears" type="number" defaultValue={product.ageYears ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            ABV
            <input name="abv" type="number" step="0.1" defaultValue={product.abv ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Size (ml)
            <input name="sizeMl" type="number" defaultValue={product.sizeMl ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Region
            <input name="region" defaultValue={product.region ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Country
            <input name="country" defaultValue={product.country ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Rating
            <input name="rating" type="number" defaultValue={product.rating ?? ""} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            In-stock override
            <select
              name="inStockOverride"
              defaultValue={product.inStockOverride === null ? "" : String(product.inStockOverride)}
              className="rounded-md border border-slate-200 px-3 py-2"
            >
              <option value="">Auto (use listings)</option>
              <option value="true">Force in-stock</option>
              <option value="false">Force out-of-stock</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Manual score boost
            <input name="manualScoreBoost" type="number" step="0.1" defaultValue={product.manualScoreBoost ?? 0} className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="featured" type="checkbox" defaultChecked={product.featured} />
            Featured
          </label>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
            Save changes
          </button>
        </form>
      </section>
    </div>
  );
}
