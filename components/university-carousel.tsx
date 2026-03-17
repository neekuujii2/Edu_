"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function UniversityCarousel({
  items
}: {
  items: { name: string; image: string }[];
}) {
  const loopItems = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="flex min-w-max gap-4"
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex min-h-[126px] min-w-[220px] items-center gap-4 rounded-[1.75rem] border border-border bg-background px-5 py-4 shadow-card"
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
