import "./globals.css";
import { ReactNode } from "react";
import { AgeGate } from "@/components/AgeGate";

export const metadata = {
  title: "Birth-Year Liquor Recommender",
  description: "Find bottles that match your birth year with curated alternatives.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AgeGate />
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-accent">Birth-Year Liquor Recommender</p>
              <p className="text-xs text-slate-500">Informational picks · No direct sales</p>
            </div>
            <nav className="text-sm text-slate-600">
              <a href="/admin" className="hover:text-ink">Admin</a>
            </nav>
          </div>
        </header>
        <main id="main" className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-600">
            <p>Informational recommendations only. Prices and availability may vary.</p>
            <p>Drink responsibly. 19+ only in Korea.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
