"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitTestimonialAction } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Submit Testimonial"}
    </Button>
  );
}

export function TestimonialForm({ user }: { user?: any }) {
  const [state, formAction] = useFormState(
    submitTestimonialAction,
    initialState
  );

  return (
    <Card className="p-8">
      <h3 className="text-2xl font-semibold text-primary">
        Share your experience
      </h3>

      <p className="mt-3 text-sm text-muted-foreground">
        Your testimonial will be reviewed by admin before publishing.
      </p>

      <form action={formAction} className="mt-6 space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="testimonial-name">Name</Label>
          <Input
            id="testimonial-name"
            name="name"
            placeholder="Your name"
            defaultValue={user?.name || ""}
            required
          />
        </div>

        {/* Course */}
        <div className="space-y-2">
          <Label htmlFor="testimonial-course">Course</Label>
          <Input
            id="testimonial-course"
            name="course"
            placeholder="MBA / B.Tech / NIOS / etc."
            required
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <Label htmlFor="testimonial-rating">Rating</Label>
          <Input
            id="testimonial-rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue="5"
            required
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Feedback</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your admission journey..."
            required
          />
        </div>

        {/* Response Message */}
        {state.message && (
          <p
            className={`text-sm ${
              state.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>
    </Card>
  );
}