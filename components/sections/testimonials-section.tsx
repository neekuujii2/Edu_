"use client";

import { TestimonialForm } from "@/components/forms/testimonial-form";
import { TestimonialCarousel } from "./testimonial-components";
import { motion } from "framer-motion";

export function TestimonialsSection({
  testimonials,
  user
}: {
  testimonials: any[];
  user: any;
}) {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <div className="h-[600px] w-[600px] rounded-full bg-blue-600 blur-[100px]" />
      </div>

      <div className="container relative space-y-16">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5"
          >
             <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Success Stories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl"
          >
            What Our Students Say
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-slate-600"
          >
            Real experiences from verified students who secured their future through Aspire.
          </motion.p>
        </div>

        {/* Testimonials Grid / Carousel */}
        <TestimonialCarousel testimonials={testimonials} />

        {/* Testimonial Form Section */}
        <div className="mx-auto mt-24 max-w-4xl rounded-3xl bg-slate-50 p-1 lg:p-2">
          <div className="rounded-[22px] bg-white p-8 shadow-sm lg:p-12">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  Share Your Journey With Us
                </h3>
                <p className="mt-4 text-base text-slate-500">
                  Your story could be the inspiration someone needs to take their next big step. Tell us about your admission experience!
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Verified student submissions",
                    "Reviewed by experts",
                    "Helps fellow learners"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <TestimonialForm user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
