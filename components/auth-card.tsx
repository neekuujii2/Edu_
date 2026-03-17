"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ShieldCheck } from "lucide-react";
import { signInWithOtpAction } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending link..." : "Send OTP Link"}
    </Button>
  );
}

export function AuthCard({ redirectTo, initialMessage }: { redirectTo: string; initialMessage?: string }) {
  const [state, formAction] = useFormState(signInWithOtpAction, initialState);
  const message = state.message || initialMessage;
  const isSuccess = state.message ? state.success : false;

  return (
    <Card className="p-8 md:p-10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary p-3 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-primary">Secure authentication</h1>
          <p className="mt-1 text-sm text-muted-foreground">Email OTP via Supabase Auth</p>
        </div>
      </div>
      <form action={formAction} className="mt-8 space-y-5">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Enter your email" required />
        </div>
        {message ? (
          <p className={`text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>{message}</p>
        ) : null}
        <SubmitButton />
      </form>
      {/*<p className="mt-6 text-sm text-muted-foreground">
        Admin access is automatically restricted to the email in <code>ADMIN_EMAIL</code>.
      </p>*/}
    </Card>
  );
}
