"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  user: any;
  defaultCourse?: string;
}) {
  const [state, formAction] = useFormState(submitInquiryAction, initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token || !!user);
    setLoading(false);
  }, [user]);

  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <Card className="p-8">
        <h2 className="text-2xl font-semibold text-primary">Sign in required</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Please sign in securely with email OTP before submitting your inquiry.
        </p>
        <Button asChild className="mt-6">
          <Link href={`/auth?redirect=${encodeURIComponent(`/contact${defaultCourse ? `?course=${defaultCourse}` : ""}`)}`}>
            Secure Sign In
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold text-primary">Student Inquiry Form</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Your lead will be saved in Supabase and synced to Google Sheets for fast follow-up.
      </p>
      <form action={formAction} className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Enter your full name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="Enter your phone number" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Input id="course" name="course" defaultValue={defaultCourse} placeholder="MBA / B.Tech / NIOS / etc." required />
        </div>
        {state.message ? (
          <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
        ) : null}
        <SubmitButton />
      </form>
    </Card>
  );
}
