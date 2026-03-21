"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/button";

interface DecodedToken {
  role?: string;
  email?: string;
  user_id?: string;
}

export function Header() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        // Decode JWT token without verification (client-side only)
        const parts = token.split(".");
        if (parts.length === 3) {
          const decoded = JSON.parse(atob(parts[1]));
          setUser(decoded);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    window.location.href = "/";
  };

  if (loading) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-background/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Aspire Education Consultancy"
            width={45}
            height={45}
            className="rounded-md"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Aspire
            </p>
            <p className="text-lg font-semibold text-primary">
              Education Consultancy
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          {/* Admin Link - Only for admins */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-sm text-muted-foreground transition hover:text-primary font-semibold"
            >
              📊 Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Apply Now Button */}
          <Button asChild size="sm" className="bg-primary text-white hover:opacity-90">
            <Link href="/contact">Apply Now</Link>
          </Button>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {user.role === "admin" ? "🔐 Admin" : "👤 User"}
              </span>
              <Button size="sm" variant="outline" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="border-t border-border/60 lg:hidden">
        <nav className="container flex gap-5 overflow-x-auto py-3 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap">
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="whitespace-nowrap font-semibold">
              📊 Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}