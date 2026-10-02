"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { CourseCard } from "@/features/academics/components/course-card";
import { tabCategories } from "@/features/academics/data/categories.data";
import { academicCategories } from "@/features/academics/data/categories.data";
import { getCoursesByCategory } from "@/features/academics/services/course.service";
import type { CourseCategorySlug } from "@/features/academics/types/course.types";
import { paginateItems } from "@/lib/pagination";

const COURSES_PER_CATEGORY_PAGE = 6;

export function CoursesByCategory() {
  const [active, setActive] = useState<CourseCategorySlug>(tabCategories[0]);
  const [page, setPage] = useState(1);
  const courses = useMemo(() => getCoursesByCategory(active), [active]);
  const paginated = useMemo(() => paginateItems(courses, page, COURSES_PER_CATEGORY_PAGE), [courses, page]);
  const labels = academicCategories.filter((category) =>
    (tabCategories as readonly string[]).includes(category.slug),
  );

  const activeLabel = labels.find((category) => category.slug === active)?.name ?? "Courses";

  return (
    <section aria-labelledby="courses-by-category-title">
      <div className="border-b border-[#DCE6F3] pb-5">
        <p className="text-xs font-black uppercase text-[#1B519F]">Explore Academics</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="courses-by-category-title" className="text-2xl font-black text-[#0B1F3A] sm:text-[30px]">Courses by Category</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Choose a subject and discover practical courses built for your next career step.</p>
          </div>
          <Link href={`/academics/search?category=${active}`} className="hidden shrink-0 text-sm font-bold text-[#1B519F] underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] sm:inline">View all {activeLabel} courses</Link>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 lg:hidden" role="tablist" aria-label="Course categories">
        {labels.map((category) => {
          const selected = category.slug === active;
          return (
            <button
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => { setActive(category.slug); setPage(1); }}
              className={`shrink-0 rounded-lg border px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${
                selected ? "border-[#1B519F] bg-[#1B519F] text-white" : "border-[#DCE6F3] bg-white text-[#0B1F3A] hover:border-[#1B519F] hover:bg-[#F7FAFF]"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-start gap-7 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="sticky top-24 hidden overflow-hidden rounded-lg border border-[#DCE6F3] bg-white lg:block" aria-label="Course category navigation">
          <div className="bg-[#0B1F3A] px-4 py-4 text-sm font-black text-white">Browse subjects</div>
          <div className="p-2" role="tablist" aria-orientation="vertical">
            {labels.map((category) => {
              const selected = category.slug === active;
              const count = getCoursesByCategory(category.slug).length;
              return <button key={category.slug} type="button" role="tab" aria-selected={selected} onClick={() => { setActive(category.slug); setPage(1); }} className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] ${selected ? "bg-[#EAF2FF] font-bold text-[#1B519F]" : "font-semibold text-[#334155] hover:bg-[#F7F9FC] hover:text-[#1B519F]"}`}>
                <span>{category.name}</span><span className={`text-xs ${selected ? "text-[#1B519F]" : "text-slate-400"}`}>{count}</span>
              </button>;
            })}
          </div>
        </aside>

        <div className="min-w-0" role="tabpanel">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div><h3 className="text-xl font-black text-[#0B1F3A]">{activeLabel}</h3><p className="mt-1 text-xs font-medium text-slate-500">{courses.length} available {courses.length === 1 ? "course" : "courses"}</p></div>
            <Link href={`/academics/search?category=${active}`} className="shrink-0 text-sm font-bold text-[#1B519F] underline underline-offset-4 sm:hidden">See More</Link>
          </div>
          <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
            {paginated.items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          {paginated.totalPages > 1 ? <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-[#E5EAF1] pt-6 [&>nav]:mt-0"><p className="text-sm font-bold text-slate-500">Current {paginated.items.length} / {courses.length}</p><Pagination currentPage={paginated.page} totalPages={paginated.totalPages} onPageChange={setPage} ariaLabel="Courses by category pagination" /></div> : null}
        </div>
      </div>
    </section>
  );
}
