import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { createProduct, deleteProduct } from "@/app/admin/products/actions";

export default async function ProductsPage() {
  const authed = isAdminAuthenticated();
  if (!authed) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Please log in to view products.</p>
        <Link href="/admin/login" className="mt-4 inline-flex rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
          Go to login
        </Link>
      </div>
    );
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Products</h1>
        <p className="mt-2 text-sm text-slate-600">Add or edit bottles and mark featured picks.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Add new product</h2>
        <form action={createProduct} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Name
            <input name="name" className="rounded-md border border-slate-200 px-3 py-2" required />
          </label>
          <label className="grid gap-2 text-sm">
            Category
            <select name="category" className="rounded-md border border-slate-200 px-3 py-2">
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
            <input name="vintageYear" type="number" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Distilled Year
            <input name="distilledYear" type="number" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Bottled Year
            <input name="bottledYear" type="number" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Age Years
            <input name="ageYears" type="number" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            ABV
            <input name="abv" type="number" step="0.1" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Size (ml)
            <input name="sizeMl" type="number" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Region
            <input name="region" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Country
            <input name="country" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            Rating
            <input name="rating" type="number" className="rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="grid gap-2 text-sm">
            In-stock override
            <select name="inStockOverride" className="rounded-md border border-slate-200 px-3 py-2">
              <option value="">Auto (use listings)</option>
              <option value="true">Force in-stock</option>
              <option value="false">Force out-of-stock</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input name="featured" type="checkbox" />
            Featured
          </label>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white">
            Create product
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Existing products</h2>
        <div className="mt-4 grid gap-3">
          {products.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 p-3 text-sm">
              <div>
                <p className="font-semibold text-ink">{product.name}</p>
                <p className="text-slate-600">
                  {product.category} · {product.vintageYear ?? product.distilledYear ?? product.bottledYear ?? "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link href={`/admin/products/${product.id}`} className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">
                  Edit
                </Link>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={product.id} />
                  <button className="rounded-md border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
