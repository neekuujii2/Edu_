import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CourseGrid } from "@/components/course-grid";
import { courseStreams } from "@/lib/site";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore UG, PG, law, pharmacy, engineering, management, and education courses with Aspire Education Consultancy."
};

export default async function CoursesPage() {
  const user = await getCurrentUser();

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Explore high-demand courses across leading academic streams"
        description="Choose from career-focused undergraduate and postgraduate programs with guided admissions."
      />
      <section className="section-padding">
        <div className="container space-y-12">
          {courseStreams.map((stream) => (
            <CourseGrid key={stream.title} stream={stream} user={user} />
          ))}
        </div>
      </section>
    </>
  );
}
