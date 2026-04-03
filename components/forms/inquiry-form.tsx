"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitInquiryAction } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState = {
  success: false,
  message: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Submitting..." : "Submit Inquiry"}
    </Button>
  );
}

export function InquiryForm({
  user,
  defaultCourse
}: {
  user?: any;
  defaultCourse?: string;
}) {
  const [state, formAction] = useFormState(
    submitInquiryAction,
    initialState
  );

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold text-primary">
        Student Inquiry Form
      </h2>

      <p className="mt-3 text-sm text-muted-foreground">
        Your inquiry will be saved and our team will contact you shortly.
      </p>

      <form action={formAction} className="mt-8 space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            defaultValue={user?.name || ""}
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Course */}
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            name="course"
            defaultValue={defaultCourse || ""}
            placeholder="MBA / B.Tech / NIOS / etc."
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