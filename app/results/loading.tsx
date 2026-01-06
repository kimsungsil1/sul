export default function LoadingResults() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-40 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
