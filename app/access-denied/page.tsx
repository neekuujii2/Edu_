import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccessDeniedPage() {
  return (
    <div className="section-padding">
      <div className="container max-w-2xl">
        <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-card">
          <h1 className="text-3xl font-semibold text-primary">Access denied</h1>
          <p className="mt-4 text-muted-foreground">
            This admin area is restricted to the configured admin email only.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
