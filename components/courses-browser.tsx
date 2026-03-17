"use client";

import { useMemo, useState } from "react";
import { CourseGrid } from "@/components/course-grid";

type CourseMode = "all" | "distance" | "regular";

type Stream = {
  title: string;
  description?: string;
  courses: { name: string; modes: ("distance" | "regular")[] }[];
};

const filters: { value: CourseMode; label: string; description: string }[] = [
  {
    value: "all",
    label: "All Programs",
    description: "View the full course catalog across all available learning formats."
  },
  {
    value: "distance",
    label: "Distance Learning",
    description: "Flexible options suited for working professionals and remote learners."
  },
  {
    value: "regular",
    label: "Regular Education",
    description: "Campus-oriented programs with standard classroom-based pathways."
  }
];

export function CoursesBrowser({ streams, user }: { streams: Stream[]; user: any }) {
  const [activeFilter, setActiveFilter] = useState<CourseMode>("all");

  const filteredStreams = useMemo(
    () =>
      streams
        .map((stream) => ({
          ...stream,
          courses:
            activeFilter === "all"
              ? stream.courses
              : stream.courses.filter((course) => course.modes.includes(activeFilter))
        }))
        .filter((stream) => stream.courses.length > 0),
    [activeFilter, streams]
  );

  const currentFilter = filters.find((filter) => filter.value === activeFilter);

  return (
    <div className="space-y-10">
      <div className="rounded-[2rem] border border-border bg-white p-6 shadow-card md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">Course Filters</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary">Choose the learning format that matches your plan</h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{currentFilter?.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const isActive = filter.value === activeFilter;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "border border-border bg-background text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredStreams.length > 0 ? (
        filteredStreams.map((stream) => <CourseGrid key={`${activeFilter}-${stream.title}`} stream={stream} user={user} />)
      ) : (
        <div className="rounded-[2rem] border border-dashed border-border bg-white p-10 text-center shadow-card">
          <h3 className="text-2xl font-semibold text-primary">No programs found for this format</h3>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Try another filter to explore more UG, PG, and professional admission options.
          </p>
        </div>
      )}
    </div>
  );
}
