import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApplyNowButton } from "@/components/apply-now-button";

export function OpenSchoolingHighlight({ user }: { user: any }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="rounded-[2rem] bg-secondary p-8 text-secondary-foreground shadow-soft md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Open Schooling</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Flexible admissions for NIOS and BOSSE learners</h2>
              <p className="mt-4 max-w-2xl text-sm text-white/75 md:text-base">
                Aspire supports 10th and 12th admissions for students who need recognized, flexible pathways without losing momentum.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <ApplyNowButton user={user} course="Open Schooling" />
              <Button asChild variant="secondary">
                <Link href="/open-schooling">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
