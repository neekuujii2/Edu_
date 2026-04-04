"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  course?: string;
  message: string;
  rating?: number;
  status?: string;
  approved?: boolean;
}

// Simple useWindowSize hook to handle responsive pages
function useItemsPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerPage;
}

export function TestimonialCard({ testimonial, index }: { testimonial: Testimonial, index?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rating = testimonial.rating || 5;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index ? (index % 4) * 0.1 : 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/10 ring-1 ring-slate-200/50 transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 hover:ring-blue-100"
    >
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.3 }}
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-100 text-slate-200"
                  )}
                />
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
            <CheckCircle2 className="h-3 w-3" />
            <span className="uppercase tracking-wide">Verified Student</span>
          </div>
        </div>

        <div className="relative">
          <p className={cn(
            "text-sm leading-relaxed text-slate-600 transition-all duration-300",
            !isExpanded && "line-clamp-4"
          )}>
            &ldquo;{testimonial.message}&rdquo;
          </p>
          {testimonial.message.length > 140 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-slate-50 pt-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-inner">
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <h4 className="truncate text-sm font-bold text-slate-900">{testimonial.name}</h4>
          {testimonial.course && (
            <p className="truncate text-[11px] font-medium text-slate-500">{testimonial.course}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  
  const itemsPerPage = useItemsPerPage();

  // Group testimonials into pages based on current itemsPerPage
  const pages = useMemo(() => {
    const p = [];
    for (let i = 0; i < testimonials.length; i += itemsPerPage) {
      p.push(testimonials.slice(i, i + itemsPerPage));
    }
    return p;
  }, [testimonials, itemsPerPage]);

  const totalPages = pages.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (isHovered || totalPages <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, totalPages]);

  // Handle page out of bounds when resizing
  useEffect(() => {
      if (currentPage >= totalPages && totalPages > 0) {
        setCurrentPage(totalPages - 1);
      }
  }, [currentPage, totalPages]);

  if (!testimonials.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex min-h-[300px] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md ring-8 ring-slate-100">
          <Star className="h-10 w-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Be the first to share your experience</h3>
        <p className="mx-auto mt-3 max-w-sm text-base text-slate-500">
          Your feedback helps other students find the right path. Submissions are verified by our team.
        </p>
      </motion.div>
    );
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98
    })
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative min-h-[420px] w-full overflow-x-hidden p-1">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
            }}
            className={cn(
              "grid w-full gap-6",
              itemsPerPage === 1 ? "grid-cols-1" : 
              itemsPerPage === 2 ? "grid-cols-2" : "grid-cols-4"
            )}
          >
            {pages[currentPage]?.map((testimonial, i) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="mt-14 flex flex-col items-center gap-10">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 1 : -1);
                  setCurrentPage(i);
                }}
                className={cn(
                  "group relative h-1.5 rounded-full transition-all duration-300",
                  currentPage === i 
                    ? "w-8 bg-blue-600" 
                    : "w-1.5 bg-slate-200 hover:bg-slate-300 hover:w-3"
                )}
                aria-label={`Go to page ${i + 1}`}
              >
                {currentPage === i && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-blue-600 ring-2 ring-blue-100"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-5">
            <Button
              variant="outline"
              onClick={prevSlide}
              className="group h-11 w-11 p-0 rounded-full border-slate-200 bg-white transition-all hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600"
            >
              <ChevronLeft className="h-5 w-5 text-slate-500 group-hover:text-blue-600" />
            </Button>
            <div className="text-xs font-bold tabular-nums text-slate-400">
              <span className="text-slate-900">{currentPage + 1}</span>
              <span className="mx-1">/</span>
              <span>{totalPages}</span>
            </div>
            <Button
              variant="outline"
              onClick={nextSlide}
              className="group h-11 w-11 p-0 rounded-full border-slate-200 bg-white transition-all hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600"
            >
              <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-blue-600" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
