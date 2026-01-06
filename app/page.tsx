import { LandingForm } from "@/components/LandingForm";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-purple-50 p-8 shadow-sm">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
            Birth-Year Liquor Recommender
          </h1>
          <p className="text-base text-slate-600">
            Enter your birth year to find bottles that match your story—exact-year picks when available and curated alternatives when they are not.
          </p>
        </div>
        <LandingForm />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold text-ink">Exact-year matches</h2>
          <p className="mt-2 text-sm text-slate-600">
            We prioritize vintage wines and vintage spirits distilled or bottled in your birth year.
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-ink">Smart alternatives</h2>
          <p className="mt-2 text-sm text-slate-600">
            When exact bottles are scarce, we match age statements and nearby years (±1–3).
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold text-ink">Transparent reasoning</h2>
          <p className="mt-2 text-sm text-slate-600">
            Every recommendation includes a clear “why,” pricing timestamp, and a gift-ready note.
          </p>
        </Card>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">FAQ</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-ink">Do you sell alcohol?</span> No. We only provide recommendations and
            outbound links.
          </p>
          <p>
            <span className="font-semibold text-ink">Are there regional restrictions?</span> Availability and shipping
            rules vary by retailer and country. Please confirm local laws and retailer policies before purchase.
          </p>
        </div>
      </section>
    </div>
  );
}
