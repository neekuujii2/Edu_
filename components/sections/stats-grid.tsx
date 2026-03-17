import { BriefcaseBusiness, CircleHelp, Landmark, Users } from "lucide-react";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Admission Experts",
    description: "Counselors who align course options with career outcomes."
  },
  {
    icon: Landmark,
    title: "Trusted Universities",
    description: "Guidance across recognized institutions and credible boards."
  },
  {
    icon: Users,
    title: "Student Support",
    description: "Clear communication from shortlisting to final documentation."
  },
  {
    icon: CircleHelp,
    title: "Fast Application Process",
    description: "Streamlined intake and follow-up so students move faster."
  }
];

export function StatsGrid() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">Why Choose Aspire</p>
          <h2 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">A student-first consultancy built for confident decisions</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-border bg-white p-6 shadow-card">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-5 text-xl font-semibold text-primary">{feature.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
