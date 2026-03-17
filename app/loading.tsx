export default function Loading() {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="rounded-3xl border border-border bg-white p-10 shadow-card">
          <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
          <div className="mt-6 h-4 w-full animate-pulse rounded-full bg-muted" />
          <div className="mt-3 h-4 w-3/4 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
