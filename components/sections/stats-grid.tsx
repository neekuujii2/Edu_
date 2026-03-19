import Image from "next/image";
import { BadgeCheck, BriefcaseBusiness, CircleHelp, Landmark, Users } from "lucide-react";
import { trustMetrics } from "@/lib/site";

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
      <div className="container space-y-12">

        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
            Why Choose Aspire
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">
            A student-first consultancy built for confident decisions
          </h2>
        </div>

        {/* 🔥 TRUST METRICS WITH LOGOS */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {trustMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-border bg-white p-6 shadow-card text-center hover:shadow-xl transition"
            >
              {/* Logo + Value */}
              <div className="flex items-center justify-center gap-3">
                {metric.icon && (
                  <Image
                    src={metric.icon}
                    alt={metric.label}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                )}

                <p className="text-3xl font-semibold text-primary">
                  {metric.value}
                </p>
              </div>

              {/* Label */}
              <h3 className="mt-3 text-lg font-semibold text-primary">
                {metric.label}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-border bg-white p-6 shadow-card"
            >
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-5 text-xl font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA STRIP */}
        <div className="rounded-[2rem] border border-border bg-primary px-6 py-5 text-primary-foreground shadow-soft md:flex md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Credibility Matters
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Recognized guidance for degrees that support real academic progression
            </h3>
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-sm font-medium md:mt-0">
            <BadgeCheck className="h-5 w-5" />
            UGC recognized degree guidance with AICTE-focused university support
          </div>
        </div>

      </div>
    </section>
  );
}