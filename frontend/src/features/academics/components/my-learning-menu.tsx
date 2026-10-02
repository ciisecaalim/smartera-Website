"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { getCoursesByIds } from "@/features/academics/services/course.service";
import { getProgressPercent } from "@/features/academics/services/store.service";
import { cn } from "@/lib/cn";

const MAX_ITEMS = 4;

/**
 * Header “My Learning” dropdown listing enrolled courses with progress.
 * Opens on hover/focus for desktop (Udemy-style), with keyboard support.
 */
export function MyLearningMenu() {
  const { state } = useAcademicsStore();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const courses = getCoursesByIds(state.enrolledIds)
    .map((course) => {
      const progress = state.progress.find((item) => item.courseId === course.id);
      const total = course.sections.reduce((sum, section) => sum + section.lectures.length, 0);
      const percent = getProgressPercent(progress?.completedLectureIds.length ?? 0, total);
      return {
        course,
        percent,
        lastAccessedAt: progress?.lastAccessedAt ?? "",
      };
    })
    .sort((a, b) => {
      if (a.lastAccessedAt === b.lastAccessedAt) return 0;
      if (!a.lastAccessedAt) return 1;
      if (!b.lastAccessedAt) return -1;
      return a.lastAccessedAt < b.lastAccessedAt ? 1 : -1;
    })
    .slice(0, MAX_ITEMS);

  function clearCloseTimer() {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  }

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
      clearCloseTimer();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative hidden lg:block"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <Link
        href="/academics/my-learning"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onFocus={openMenu}
        className={cn(
          "inline-flex rounded-lg px-2.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]",
          open ? "bg-[#EEF5FF] font-semibold text-[#1B519F]" : "text-[#2D2F31] hover:bg-[#EEF5FF] hover:text-[#1B519F]",
        )}
      >
        My learning
      </Link>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(92vw,360px)] overflow-hidden rounded-xl border border-[#E5EAF1] bg-white shadow-[0_20px_48px_rgba(11,31,58,0.16)]"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          {courses.length === 0 ? (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-bold text-[#0B1F3A]">No courses yet</p>
              <p className="mt-1 text-xs text-slate-500">Enroll in a course to see it here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#E5EAF1]">
              {courses.map(({ course, percent }) => (
                <li key={course.id}>
                  <Link
                    href={`/academics/learn/${course.id}`}
                    role="menuitem"
                    className="flex gap-3 px-4 py-3 transition hover:bg-[#F7F9FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F59223]"
                    onClick={() => setOpen(false)}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <Image src={course.thumbnail} alt="" fill className="object-cover" sizes="48px" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-sm font-bold leading-snug text-[#0B1F3A]">
                        {course.title}
                      </span>
                      <span className="mt-2 block h-1 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                        <span className="block h-full rounded-full bg-[#1B519F]" style={{ width: `${percent}%` }} />
                      </span>
                      <span className="sr-only">{percent}% complete</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-[#E5EAF1] p-3">
            <Link
              href="/academics/my-learning"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              Go to My learning
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}


