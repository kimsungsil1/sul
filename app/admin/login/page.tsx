import { loginAdmin } from "@/app/admin/login/actions";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold text-ink">Admin Login</h1>
      {searchParams.error && (
        <p className="mt-2 text-sm text-rose-600">Invalid password.</p>
      )}
      <form action={loginAdmin} className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            name="password"
            className="w-full rounded-md border border-slate-200 px-3 py-2"
            required
          />
        </label>
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
