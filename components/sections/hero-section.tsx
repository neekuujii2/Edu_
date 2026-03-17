"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplyNowButton } from "@/components/apply-now-button";

export function HeroSection({ user }: { user: any }) {
  return (
    <section className="bg-hero-glow bg-grid overflow-hidden">
      <div className="container grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">Premium Admission Support</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-primary md:text-6xl">
            Your Gateway to Top Universities
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Admission guidance for Distance and Regular courses, designed for students who want clarity, speed, and trusted support.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <ApplyNowButton user={user} course="Admission Guidance" />
            <Button asChild variant="secondary" size="lg">
              <a href="#courses">Explore Courses</a>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, text: "Trusted Universities" },
              { icon: TrendingUp, text: "Faster Applications" },
              { icon: Sparkles, text: "Premium Support" }
            ].map((item) => (
              <div key={item.text} className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-card">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-medium text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/50 blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
              alt="Aspire education students"
              width={1200}
              height={960}
              priority
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
