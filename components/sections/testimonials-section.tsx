import { TestimonialForm } from "@/components/forms/testimonial-form";

export function TestimonialsSection({
  testimonials,
  user
}: {
  testimonials: any[];
  user: any;
}) {
  return (
    <section className="section-padding bg-white">
      <div className="container space-y-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">Student Stories</p>
          <h2 className="mt-4 text-3xl font-semibold text-primary md:text-4xl">Approved testimonials from guided admissions</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.length ? testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-3xl border border-border bg-background p-6 shadow-card">
                <p className="text-sm leading-7 text-muted-foreground">&ldquo;{testimonial.message}&rdquo;</p>
                <p className="mt-5 font-semibold text-primary">{testimonial.name}</p>
              </div>
            )) : (
              <div className="rounded-3xl border border-dashed border-border bg-background p-10 text-sm text-muted-foreground md:col-span-2">
                Approved student feedback will appear here after admin review.
              </div>
            )}
          </div>
          <TestimonialForm user={user} />
        </div>
      </div>
    </section>
  );
}
