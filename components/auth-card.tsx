"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type AuthStep = "login-signup" | "signup" | "otp-verify" | "forgot-password";

export function AuthCard({ redirectTo, initialMessage }: { redirectTo: string; initialMessage?: string }) {
  const [step, setStep] = useState<AuthStep>("login-signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(initialMessage || "");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to send reset link");
        setLoading(false);
        return;
      }

      setMessage("✓ " + data.message);
      setTimeout(() => {
        setStep("login-signup");
        setEmail("");
      }, 3000);
      setLoading(false);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      setMessage("OTP sent to your email. Check your inbox.");
      setStep("otp-verify");
      setLoading(false);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "OTP verification failed");
        setLoading(false);
        return;
      }

      setMessage("✓ Email verified! You can now log in.");
      setTimeout(() => {
        setStep("login-signup");
        setPassword("");
        setOtp("");
      }, 2000);
      setLoading(false);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store token and redirect based on role
      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }
      
      // Redirect based on user role
      const redirectPath = data.user.role === "admin" ? "/admin" : redirectTo;
      window.location.href = redirectPath;
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 md:p-10">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary p-3 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-primary">Secure authentication</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Email & Password with OTP
          </p>
        </div>
      </div>

      {step === "login-signup" && (
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setStep("forgot-password");
                setMessage("");
                setEmail("");
                setPassword("");
              }}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {message && (
            <p className={`text-sm ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setStep("signup");
              setMessage("");
              setPassword("");
            }}
          >
            Create New Account
          </Button>
        </form>
      )}

      {step === "signup" && (
        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes("sent") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setStep("login-signup");
              setMessage("");
              setPassword("");
            }}
          >
            Back to Login
          </Button>
        </form>
      )}

      {step === "otp-verify" && (
        <form onSubmit={handleOtpVerify} className="mt-8 space-y-5">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600">
              We sent a 6-digit OTP to <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              maxLength={6}
              required
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full text-sm"
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch("/api/auth/resend-otp", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email })
                });
                
                const data = await res.json();
                if (res.ok) {
                  setMessage("New OTP sent to your email");
                } else {
                  setMessage(data.error || "Failed to resend OTP");
                }
              } catch (error) {
                setMessage("An error occurred");
              }
              setLoading(false);
            }}
          >
            Resend OTP
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setStep("signup");
              setOtp("");
              setMessage("");
            }}
          >
            Back
          </Button>
        </form>
      )}

      {step === "forgot-password" && (
        <form onSubmit={handleForgotPassword} className="mt-8 space-y-5">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-600">
              Enter your email address to receive a password reset link.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="forgot-email">Email Address</Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setStep("login-signup");
              setMessage("");
              setEmail("");
            }}
          >
            Back to Login
          </Button>
        </form>
      )}
    </Card>
  );
}
