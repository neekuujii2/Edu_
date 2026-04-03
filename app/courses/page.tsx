import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CoursesBrowser } from "@/components/courses-browser";
import { courseStreams } from "@/lib/site";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Undergraduate & Postgraduate Courses | Admission Guide 2026",
  description: "Explore a wide range of courses including MBA, B.Tech, MCA, LLB, D Pharma, and B.Ed. Get expert admission guidance for regular and distance learning programs at Aspire Education Consultancy."
};

export default async function CoursesPage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Explore high-demand courses across leading academic streams"
        description="Choose from career-focused undergraduate and postgraduate programs with guided admissions across distance learning and regular education."
      />
      <section className="section-padding">
        <div className="container">
          <CoursesBrowser streams={courseStreams} user={user} />
        </div>
      </section>
    </>
  );
}
