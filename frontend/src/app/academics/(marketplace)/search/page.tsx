import type { Metadata } from "next";
import { Suspense } from "react";
import { CourseCard } from "@/features/academics/components/course-card";
import { CourseFiltersPanel } from "@/features/academics/components/course-filters";
import { EmptyState } from "@/features/academics/components/empty-state";
import { SearchBar } from "@/features/academics/components/search-bar";
import { searchCourses } from "@/features/academics/services/course.service";
import type { CourseCategorySlug, CourseFilters, CourseLevel, CourseSortOption } from "@/features/academics/types/course.types";

export const metadata: Metadata = {
  title: "Search Courses",
  description: "Search and filter Smartera Hub Academics courses by topic, category, level, and more.",
};

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AcademicsSearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const filters: CourseFilters = {
    q: first(params.q),
    category: (first(params.category) as CourseCategorySlug | "all" | undefined) ?? "all",
    level: (first(params.level) as CourseLevel | "all" | undefined) ?? "all",
    language: first(params.language) ?? "all",
    minRating: first(params.rating) && first(params.rating) !== "all" ? Number(first(params.rating)) : undefined,
    duration: (first(params.duration) as CourseFilters["duration"]) ?? "all",
    price: (first(params.price) as CourseFilters["price"]) ?? "all",
    sort: (first(params.sort) as CourseSortOption | undefined) ?? "relevant",
  };

  const results = searchCourses(filters);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-5 xl:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight text-[#0B1F3A]">Search results</h1>
        <p className="mt-2 text-sm text-slate-600">
          {results.length} course{results.length === 1 ? "" : "s"}
          {filters.q ? ` for “${filters.q}”` : ""}
        </p>
        <div className="mt-5">
          <SearchBar initialQuery={filters.q ?? ""} />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <Suspense fallback={<div className="h-80 animate-pulse rounded-xl bg-slate-100" />}>
          <CourseFiltersPanel />
        </Suspense>
        <div>
          {results.length === 0 ? (
            <EmptyState
              title="We couldn't find courses matching your search."
              description="Try another keyword, clear filters, or browse featured courses on the Academics home page."
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
