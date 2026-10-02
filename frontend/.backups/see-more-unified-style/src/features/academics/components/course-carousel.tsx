"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CourseCard } from "@/features/academics/components/course-card";
import type { Course } from "@/features/academics/types/course.types";

export function CourseCarousel({ title, courses, viewAllHref }: { title: string; courses: Course[]; viewAllHref?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const update = () => {
      setCanScrollBack(node.scrollLeft > 2);
      setCanScrollForward(node.scrollLeft + node.clientWidth < node.scrollWidth - 2);
    };
    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      node.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [courses]);

  const scrollBy = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.85, 632), behavior: "smooth" });
  };

  const controlClass = "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5EAF1] bg-white text-lg text-[#0B1F3A] transition hover:border-[#1B519F] hover:text-[#1B519F] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]";

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-[28px]">{title}</h2>
        <div className="flex shrink-0 items-center gap-2">
          {viewAllHref ? <Link href={viewAllHref} className="hidden text-sm font-bold text-[#1B519F] hover:underline sm:inline">See More...</Link> : null}
          <button type="button" onClick={() => scrollBy(-1)} disabled={!canScrollBack} className={controlClass} aria-label={`Scroll ${title} left`}>&lsaquo;</button>
          <button type="button" onClick={() => scrollBy(1)} disabled={!canScrollForward} className={controlClass} aria-label={`Scroll ${title} right`}>&rsaquo;</button>
        </div>
      </div>
      <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]" role="list" aria-label={title}>
        {courses.map((course) => <div key={course.id} role="listitem" className="w-[280px] shrink-0 snap-start sm:w-[300px]"><CourseCard course={course} /></div>)}
      </div>
    </section>
  );
}
