import { ApplyNowButton } from "@/components/apply-now-button";

export function CourseGrid({
  stream,
  user
}: {
  stream: {
    title: string;
    description?: string;
    courses: { name: string; modes: ("distance" | "regular")[] }[];
  };
  user: any;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">{stream.title}</p>
        <h2 className="mt-2 text-3xl font-semibold text-primary">{stream.title} Programs</h2>
        {stream.description ? (
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{stream.description}</p>
        ) : null}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stream.courses.map((course) => (
          <div key={course.name} className="rounded-3xl border border-border bg-white p-6 shadow-card">
            <div className="flex flex-wrap gap-2">
              {course.modes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full bg-secondary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary"
                >
                  {mode === "distance" ? "Distance Learning" : "Regular Education"}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-primary">{course.name}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Structured admission support, documentation guidance, and counseling for the right academic fit.
            </p>
            <div className="mt-5">
              <ApplyNowButton user={user} course={course.name} small />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
