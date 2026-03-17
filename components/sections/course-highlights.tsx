import { ApplyNowButton } from "@/components/apply-now-button";

export function CourseHighlights({
  courses,
  user
}: {
  courses: string[];
  user: any;
}) {
  return (
    <section id="courses" className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">Course Highlights</p>
          <h2 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">Career-led programs students ask for most</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course} className="rounded-3xl border border-border bg-background p-6 shadow-card transition hover:-translate-y-1">
              <h3 className="text-xl font-semibold text-primary">{course}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Expert course selection, eligibility guidance, and streamlined application support.
              </p>
              <div className="mt-5">
                <ApplyNowButton user={user} course={course} small />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
