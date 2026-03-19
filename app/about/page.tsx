import Image from "next/image";
import type { Metadata } from "next";
import { BadgeCheck, Building2, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { trustMetrics } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aspire Education Consultancy, our mission, counseling experience, and student-first approach."
};

const values = [
  {
    icon: Users,
    title: "Student-Centered Counseling",
    description: "Every recommendation starts with the student’s goals, budget, background, and timeline."
  },
  {
    icon: BadgeCheck,
    title: "Transparent Guidance",
    description: "We focus on recognized universities, clear processes, and realistic admission pathways."
  },
  {
    icon: Building2,
    title: "Strong University Network",
    description: "Our support spans UG, PG, distance learning, open schooling, and professional programs."
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Aspire"
        title="Professional admission guidance built on trust, clarity, and long-term student success"
        description="We support students and working professionals with course discovery, application strategy, documentation, university shortlisting, and flexible progression planning."
      />
      <section className="section-padding">
        <div className="container space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
              <Image
                src="/AboutHero.png"
                alt="Aspire education counseling team"
                width={1400}
                height={1000}
                className="h-[320px] w-full object-cover md:h-[420px]"
              />
            </div>
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
                Who We Are
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">
                A trusted consultancy helping students move ahead with confidence
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Aspire Education Consultancy helps students secure admissions in UG, PG, distance
                learning, and open schooling programs through a transparent, high-support process.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Our counselors focus on matching learners with the right university, board, and career
                path while keeping affordability, recognition, timelines, and future opportunities in view.
              </p>
              <div className="mt-6 flex items-start gap-3 rounded-[1.5rem] bg-secondary/10 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-primary">
                  Based in Mohan Garden, Uttam Nagar, New Delhi with support for both in-person
                  consultations and guided online admissions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {trustMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.75rem] border border-border bg-white p-5 shadow-card text-center hover:shadow-xl transition"
              >
                {/* 🔥 Logo + Value */}
                <div className="flex items-center justify-center gap-3">
                  {metric.icon && (
                    <Image
                      src={metric.icon}
                      alt={metric.label}
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  )}

                  <p className="text-3xl font-semibold text-primary">
                    {metric.value}
                  </p>
                </div>

                {/* Label */}
                <h3 className="mt-2 text-base font-semibold text-primary">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-border bg-white p-6 shadow-card">
                <div className="inline-flex rounded-2xl bg-primary/10 p-3">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-primary">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
                <Image
                  src="/office.png"
                  alt="Aspire office consultation"
                  width={1200}
                  height={900}
                  className="h-[280px] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
                <Image
                  src="/ExpertiseSection.png"
                  alt="Education expertise presentation"
                  width={1200}
                  height={900}
                  className="h-[280px] w-full object-cover"
                />
              </div>
            </div>
            <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground shadow-soft md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                Mission & Vision
              </p>
              <h3 className="mt-4 text-3xl font-semibold">Make quality education access simpler, clearer, and more trustworthy</h3>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
                Our mission is to simplify quality education access with trustworthy guidance and
                streamlined admissions. Our vision is to become the most dependable advisory partner for
                students and professionals seeking the right academic progression across India.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-white/10 p-5">
                  <p className="text-lg font-semibold">Course Discovery</p>
                  <p className="mt-2 text-sm text-white/80">Right-fit shortlisting based on goals, eligibility, and future scope.</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 p-5">
                  <p className="text-lg font-semibold">Documentation Support</p>
                  <p className="mt-2 text-sm text-white/80">Closer follow-up on forms, approvals, and admission timelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
