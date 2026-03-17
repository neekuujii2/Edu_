import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="container max-w-2xl">
        <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-primary">Page not found</h1>
          <p className="mt-4 text-muted-foreground">
            The page you requested does not exist or may have moved.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
