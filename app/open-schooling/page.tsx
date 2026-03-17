import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ApplyNowButton } from "@/components/apply-now-button";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Open Schooling",
  description: "Get expert support for NIOS and BOSSE 10th and 12th open schooling admissions."
};

const blocks = [
  {
    title: "Benefits",
    points: ["Flexible learning", "Recognized boards", "Ideal for career restarts"]
  },
  {
    title: "Eligibility",
    points: ["10th admission support", "12th admission support", "Gap year friendly options"]
  },
  {
    title: "Process",
    points: ["Counseling", "Documentation", "Board registration and follow-up"]
  }
];

export default async function OpenSchoolingPage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHero
        eyebrow="Open Schooling"
        title="Flexible 10th and 12th admissions through NIOS and BOSSE"
        description="Ideal for students seeking second chances, schedule flexibility, or alternative academic pathways."
      />
      <section className="section-padding">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-foreground">
                Boards Covered
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {["NIOS", "BOSSE"].map((board) => (
                  <span
                    key={board}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-primary"
                  >
                    {board}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {blocks.map((block) => (
                <div key={block.title} className="rounded-3xl border border-border bg-white p-6 shadow-card">
                  <h2 className="text-lg font-semibold text-primary">{block.title}</h2>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-soft">
              <h3 className="text-2xl font-semibold">Ready to continue your education confidently?</h3>
              <p className="mt-3 max-w-2xl text-sm text-white/80">
                Aspire helps students choose the right board, prepare documents, and complete the process smoothly.
              </p>
              <div className="mt-6">
                <ApplyNowButton user={user} course="Open Schooling Admission" />
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {[
              "student writing exam notes",
              "group of happy students",
              "student with mentor"
            ].map((alt, index) => (
              <div key={alt} className="overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={`https://images.unsplash.com/photo-${[
                    "1503676260728-1c00da094a0b",
                    "1522202176988-66273c2fd55f",
                    "1529156069898-49953e39b3ac"
                  ][index]}?auto=format&fit=crop&w=1200&q=80`}
                  alt={alt}
                  width={900}
                  height={700}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
