"use client";

import { motion } from "framer-motion";

export function UniversityCarousel({ items }: { items: string[] }) {
  const loopItems = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex min-w-max gap-4"
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="min-w-[180px] rounded-full border border-border bg-background px-6 py-4 text-center text-sm font-medium text-primary shadow-card"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
