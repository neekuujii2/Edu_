import type { Metadata } from "next";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Secure Sign In",
  description: "Sign in with email OTP to apply, submit inquiries, and manage student feedback."
};

export default function AuthPage({
  searchParams
}: {
  searchParams: { redirect?: string; message?: string };
}) {
  return (
    <div className="section-padding bg-hero-glow">
      <div className="container max-w-2xl">
        <AuthCard redirectTo={searchParams.redirect ?? "/"} initialMessage={searchParams.message} />
      </div>
    </div>
  );
}
