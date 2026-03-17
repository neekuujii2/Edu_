import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Aspire Education Consultancy, our mission, counseling experience, and student-first approach."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Aspire"
        title="Personalized counseling backed by trusted admission guidance"
        description="We support students and working professionals with course discovery, application strategy, documentation, and university shortlisting."
      />
      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-card">
              <h2 className="text-2xl font-semibold text-primary">Who We Are</h2>
              <p className="mt-4 text-muted-foreground">
                Aspire Education Consultancy helps students secure admissions in UG, PG, distance learning, and open schooling programs through a transparent, high-support process.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our counselors focus on matching learners with the right university, board, and career path while keeping timelines, affordability, and long-term outcomes in view.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
                <h3 className="text-xl font-semibold text-primary">Mission</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  To simplify quality education access with trustworthy guidance and streamlined admissions.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
                <h3 className="text-xl font-semibold text-primary">Vision</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  To become the most dependable student advisory partner for academic progression across India.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-8 shadow-card">
              <h3 className="text-xl font-semibold text-primary">Location</h3>
              <p className="mt-3 text-muted-foreground">
                Mohan Garden, Uttam Nagar, New Delhi. We support both in-person consultations and guided digital admissions.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {[
              "students celebrating graduation",
              "modern university campus",
              "education consultancy office"
            ].map((alt, index) => (
              <div key={alt} className="overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={`https://images.unsplash.com/photo-${[
                    "1523050854058-8df90110c9f1",
                    "1562774053-701939374585",
                    "1497366754035-f200968a6e72"
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
