import { approveTestimonialAction, unapproveTestimonialAction } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TestimonialsManager({ testimonials }: { testimonials: any[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border p-6">
        <h2 className="text-2xl font-semibold text-primary">Testimonials Approval</h2>
        <p className="text-sm text-muted-foreground">Approve or hide student feedback before it appears on the homepage.</p>
      </div>
      <div className="divide-y divide-border">
        {testimonials.length ? testimonials.map((testimonial) => {
          const isApproved = testimonial.status === "approved" || testimonial.approved === true;
          return (
            <div key={testimonial.id} className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
                {testimonial.course && (
                   <p className="mt-1 text-xs font-medium text-muted-foreground">Course: {testimonial.course}</p>
                )}
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{testimonial.message}</p>
              </div>
              <div className="flex items-center gap-2">
                {!isApproved ? (
                  <form action={approveTestimonialAction}>
                    <input type="hidden" name="id" value={testimonial.id} />
                    <Button type="submit" size="sm">Approve</Button>
                  </form>
                ) : (
                  <form action={unapproveTestimonialAction}>
                    <input type="hidden" name="id" value={testimonial.id} />
                    <Button type="submit" variant="outline" className="text-destructive hover:bg-destructive/10" size="sm">Hide / Remove</Button>
                  </form>
                )}
              </div>
            </div>
          );
        }) : (
          <div className="p-6 text-sm text-muted-foreground">No testimonials submitted yet.</div>
        )}
      </div>
    </Card>
  );
}
