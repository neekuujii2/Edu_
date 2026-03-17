import { ApplyNowButton } from "@/components/apply-now-button";

export function CtaSection({ user }: { user: any }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="rounded-[2rem] bg-primary p-10 text-center text-primary-foreground shadow-soft md:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Start Today</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Start Your Admission Journey Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:text-base">
            Secure your path with expert counseling, rapid follow-up, and a process built for modern students.
          </p>
          <div className="mt-8 flex justify-center">
            <ApplyNowButton user={user} course="Admission Counseling" />
          </div>
        </div>
      </div>
    </section>
  );
}
