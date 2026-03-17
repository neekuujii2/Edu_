import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aspire Education Consultancy for admissions, course guidance, and open schooling support.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const user = await getCurrentUser();
  const params = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to admission experts who understand your goals"
        description="Submit your inquiry to receive course guidance, eligibility support, and next-step planning."
      />

      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white p-8 shadow-card">
              <h2 className="text-2xl font-semibold text-primary">
                Contact Details
              </h2>

              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  9711104179
                </p>

                <p>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  consultancyaspireeducation@gmail.com
                </p>

                <p>
                  <span className="font-semibold text-foreground">Location:</span>{" "}
                  Mohan Garden, Uttam Nagar
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-card">
              <iframe
                title="Aspire Education Consultancy Location"
                src="https://www.google.com/maps?q=Mohan%20Garden%2C%20Uttam%20Nagar&z=14&output=embed"
                width="100%"
                height="340"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full border-0"
              />
            </div>
          </div>

          {/* Inquiry Form */}
          <InquiryForm user={user} defaultCourse={params.course} />

        </div>
      </section>
    </>
  );
}