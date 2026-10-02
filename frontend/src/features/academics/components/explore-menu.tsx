"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon } from "@/features/academics/components/icons";
import { exploreCategories } from "@/features/academics/data/categories.data";
import { getCategoryCourseCount } from "@/features/academics/services/course.service";

export function ExploreMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-semibold text-[#0B1F3A] transition hover:text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
      >
        Explore <ChevronIcon open={open} />
      </button>
      {open ? (
        <div
          id={menuId}
          className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(92vw,520px)] rounded-2xl border border-[#E5EAF1] bg-white p-3 shadow-[0_24px_50px_rgba(11,31,58,0.14)]"
        >
          <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Categories</p>
          <div className="grid gap-1 sm:grid-cols-2">
            {exploreCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/academics/category/${category.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 transition hover:bg-[#F7F9FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                <span className="block text-sm font-bold text-[#0B1F3A]">{category.name}</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {getCategoryCourseCount(category.slug)} courses
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

