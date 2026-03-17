import { ApplyNowButton } from "@/components/apply-now-button";

export function CourseGrid({
  stream,
  user
}: {
  stream: { title: string; courses: string[] };
  user: any;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">{stream.title}</p>
        <h2 className="mt-2 text-3xl font-semibold text-primary">{stream.title} Programs</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stream.courses.map((course) => (
          <div key={course} className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-primary">{course}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Structured admission support, documentation guidance, and counseling for the right academic fit.
            </p>
            <div className="mt-5">
              <ApplyNowButton user={user} course={course} small />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
