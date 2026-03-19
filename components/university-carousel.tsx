"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export function UniversityCarousel({
  items
}: {
  items: { name: string; image: string }[];
}) {
  const controls = useAnimation();

  const loopItems = [...items, ...items];

  // Start animation
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 24,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => controls.stop()}   // 🔥 hover pe stop
      onMouseLeave={() => controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 24,
          repeat: Infinity,
          ease: "linear"
        }
      })}
    >
      <motion.div
        animate={controls}
        className="flex min-w-max gap-4"
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex min-h-[126px] min-w-[220px] items-center gap-4 rounded-[1.75rem] border border-border bg-background px-5 py-4 shadow-card hover:shadow-lg transition cursor-pointer"
            
            onClick={() => controls.stop()} // 🔥 click pe bhi stop
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-border/70">
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="h-12 w-12 object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/55">
                Partner University
              </p>
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-primary">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}