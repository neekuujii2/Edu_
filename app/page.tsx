import { getApprovedTestimonials, getCurrentUser } from "@/lib/data";
import { featuredCourses, partnerUniversities } from "@/lib/site";
import { HeroSection } from "@/components/sections/hero-section";
import { StatsGrid } from "@/components/sections/stats-grid";
import { CourseHighlights } from "@/components/sections/course-highlights";
import { OpenSchoolingHighlight } from "@/components/sections/open-schooling-highlight";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { UniversityCarousel } from "@/components/university-carousel";
import { TrustSection } from "@/components/trust-section";
export default async function HomePage() {
  const [testimonials, user] = await Promise.all([
    getApprovedTestimonials(),
    getCurrentUser()
  ]);

  return (
    <>
      <HeroSection user={user} />
      <section className="border-y border-border bg-white py-6">
        <div className="container space-y-4">
          <p className="text-center text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Trusted Admission Network
          </p>
          <UniversityCarousel items={partnerUniversities} />
        </div>
      </section>
      {/*<TrustSection />*/}
      <StatsGrid />
      <CourseHighlights courses={featuredCourses} user={user} />
      <OpenSchoolingHighlight user={user} />
      <TestimonialsSection testimonials={testimonials} user={user} />
      <CtaSection user={user} />
    </>
  );
}
