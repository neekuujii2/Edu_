import Image from "next/image";
import type { Metadata } from "next";
import {
  BadgeCheck,
  FileCheck2,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  TimerReset
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ApplyNowButton } from "@/components/apply-now-button";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Open Schooling",
  description: "Get expert support for NIOS and BOSSE 10th and 12th open schooling admissions."
};

const admissionTracks = [
  {
    title: "10th",
    subtitle: "Secondary Admission",
    description:
      "Complete your matriculation through a flexible structure with subject choices and exam schedules that work for you."
  },
  {
    title: "12th",
    subtitle: "Sr. Secondary Admission",
    description:
      "Guidance for Stream 1, 2, 3 and 4 pathways with support on eligibility, subjects, and study planning."
  },
  {
    title: "NIOS + BOSSE",
    subtitle: "Recognized Boards",
    description:
      "We help students choose the right board based on timeline, goals, prior qualification, and documentation readiness."
  }
];

const supportIncludes = [
  { icon: TimerReset, title: "Fast-track Admission Options" },
  { icon: ListChecks, title: "Subject Selection Guidance" },
  { icon: FileCheck2, title: "TMA Submission Support" },
  { icon: ShieldCheck, title: "Original Result Verification" },
  { icon: BadgeCheck, title: "Documentation Assistance" },
  { icon: GraduationCap, title: "Exam Center Selection Help" }
];

export default async function OpenSchoolingPage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHero
        eyebrow="Open Schooling"
        title="Complete schooling your way with guided NIOS and BOSSE admissions"
        description="Open schooling is the right solution for students who could not complete their education through regular modes and now need a flexible, recognized path forward."
      />
      <section className="section-padding">
        <div className="container space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
                Flexible School Completion
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">
                Trusted help for students restarting from class 10th or 12th
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                We specialize in providing comprehensive support for NIOS and BOSSE admissions, whether
                you need a second chance, a gap-year-friendly option, or a smoother route to continue
                higher studies and career planning.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {["NIOS Admission", "BOSSE Admission", "Recognized Boards", "Student Documentation Help"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { value: "10th", label: "Secondary admission support" },
                  { value: "12th", label: "Sr. secondary admission support" },
                  { value: "NIOS", label: "National open schooling pathway" },
                  { value: "BOSSE", label: "Flexible board-based progression" }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-secondary/8 p-4">
                    <p className="text-xl font-semibold text-primary">{item.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
                <Image
                  src="/OpenSchoolingHero.png"
                  alt="Open schooling guidance session"
                  width={1200}
                  height={900}
                  className="h-[280px] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                    Student-First Support
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    From board selection to final submission, every step is explained clearly so students
                    and parents can move ahead with confidence.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
                <Image
                  src="/Choose your subject.png"
                  alt="Subject selection assistance"
                  width={1200}
                  height={900}
                  className="h-[280px] w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                    Guided Subject Planning
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    We help match subject combinations with future academic goals, exam timelines, and
                    documentation requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {admissionTracks.map((track) => (
              <div key={track.subtitle} className="rounded-[2rem] border border-border bg-white p-6 shadow-card">
                <p className="text-3xl font-semibold text-primary">{track.title}</p>
                <h3 className="mt-3 text-xl font-semibold text-primary">{track.subtitle}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{track.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-border bg-white p-8 shadow-card md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
                Our Support Includes
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {supportIncludes.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-background p-4">
                    <div className="rounded-2xl bg-primary/10 p-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium leading-6 text-primary">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-primary p-8 text-primary-foreground shadow-soft md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                Admission Guidance
              </p>
              <h3 className="mt-4 text-3xl font-semibold">Ready to complete your schooling professionally and confidently?</h3>
              <p className="mt-4 text-sm leading-7 text-white/80 md:text-base">
                Aspire helps students choose the right board, prepare documents, verify previous results,
                and complete the open schooling process with less confusion and faster action.
              </p>
              <div className="mt-8 rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-sm font-medium text-white/85">
                  Best suited for students with discontinued studies, failed attempts, personal constraints,
                  working learners, and anyone needing a recognized alternative schooling path.
                </p>
              </div>
              <div className="mt-8">
                <ApplyNowButton user={user} course="Open Schooling Admission" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
