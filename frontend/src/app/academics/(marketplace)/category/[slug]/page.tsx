import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseCard } from "@/features/academics/components/course-card";
import { EmptyState } from "@/features/academics/components/empty-state";
import {
  getCategoryBySlug,
  getCoursesByCategory,
  getFeaturedCourses,
} from "@/features/academics/services/course.service";
import type { CourseCategorySlug } from "@/features/academics/types/course.types";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category" };
  return {
    title: `${category.name} Courses`,
    description: category.description,
  };
}

export default async function AcademicsCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const courses = getCoursesByCategory(category.slug as CourseCategorySlug);
  const featured = getFeaturedCourses().filter((course) => course.category === category.slug).slice(0, 4);
  const topics = Array.from(new Set(courses.flatMap((course) => course.skills))).slice(0, 8);

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-5 xl:px-6">
      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/academics" className="hover:text-[#1B519F]">Academics</Link>
        <span className="mx-2">/</span>
        <span className="text-[#0B1F3A]">{category.name}</span>
      </nav>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-base text-slate-600">{category.description}</p>

      {topics.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link
              key={topic}
              href={`/academics/search?q=${encodeURIComponent(topic)}&category=${category.slug}`}
              className="rounded-full border border-[#E5EAF1] bg-white px-3 py-1.5 text-xs font-semibold text-[#0B1F3A] hover:border-[#1B519F]"
            >
              {topic}
            </Link>
          ))}
        </div>
      ) : null}

      {featured.length > 0 ? (
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-black text-[#0B1F3A]">Featured in {category.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-black text-[#0B1F3A]">All {category.name} courses</h2>
        {courses.length === 0 ? (
          <EmptyState title="No courses in this category yet." description="Browse other Academics categories while this collection grows." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

