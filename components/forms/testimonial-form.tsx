"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitTestimonialAction } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-900">
          Share Your Journey
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Your story helps other students find their perfect path. Submissions are verified before going live.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="testimonial-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Your Name</Label>
            <Input
              id="testimonial-name"
              name="name"
              className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g. Rahul Sharma"
              defaultValue={user?.name || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial-course" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Course Studied</Label>
            <Input
              id="testimonial-course"
              name="course"
              className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g. MBA / NIOS"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testimonial-rating" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Rating (1-5)</Label>
          <Input
            id="testimonial-rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            defaultValue="5"
            className="h-12 rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Detailed Feedback</Label>
          <Textarea
            id="message"
            name="message"
            className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50/50 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20"
            placeholder="Tell us about your experience..."
            required
          />
        </div>

        {state.message && (
          <div className={cn(
            "rounded-xl p-4 text-sm font-medium animate-in fade-in slide-in-from-top-1",
            state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          )}>
            {state.message}
          </div>
        )}

        <div className="pt-2">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}