import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { getCurrentUser } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | Education Consultant in Uttam Nagar, Delhi",
  description: "Get in touch with Aspire Education Consultancy for expert admission guidance. Visit our office in Mohan Garden, Uttam Nagar, or call us at 9711104179 for UG, PG, and NIOS admissions."
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.126929191331!2d77.03708807393866!3d28.625957684382083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0509ed8e8181%3A0x27be3b146bd115e1!2sAspire%20Education%20Consultancy%20%26%20Career%20Solution!5e0!3m2!1sen!2sin!4v1775325232637!5m2!1sen!2sin"
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