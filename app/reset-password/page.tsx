"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      setMessage("Invalid or missing reset link. Please request a new one.");
      setTokenValid(false);
    } else {
      setToken(resetToken);
      setTokenValid(true);
    }
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!password || !confirmPassword) {
      setMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
          confirmPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to reset password");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setMessage("✓ " + data.message);
      
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="section-padding bg-hero-glow">
      <div className="container max-w-2xl">
        <Card className="p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary p-3 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-primary">Reset Password</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Create a new password for your account
              </p>
            </div>
          </div>

          {!tokenValid ? (
            <div className="mt-8">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Invalid Reset Link</h3>
                <p className="text-sm text-red-700 mb-4">{message}</p>
                <Button
                  onClick={() => router.push("/auth")}
                  className="w-full"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          ) : success ? (
            <div className="mt-8">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Password Reset Successful! ✓</h3>
                <p className="text-sm text-green-700 mb-4">{message}</p>
                <p className="text-sm text-green-600">Redirecting to login in a moment...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600">
                  Enter your new password below. Make sure it's at least 6 characters long.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {message && (
                <p className={`text-sm ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/auth")}
              >
                Back to Login
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
