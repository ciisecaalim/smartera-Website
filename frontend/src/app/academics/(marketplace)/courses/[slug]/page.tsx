import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@/features/academics/components/icons";
import { CourseCard } from "@/features/academics/components/course-card";
import { CourseCurriculum } from "@/features/academics/components/course-curriculum";
import { CoursePurchaseCard } from "@/features/academics/components/course-purchase-card";
import { StarRating } from "@/features/academics/components/star-rating";
import {
  getCategoryBySlug,
  getCourseBySlug,
  getCourseInstructor,
  getCourseReviews,
  getRelatedCourses,
} from "@/features/academics/services/course.service";
import { fetchPublishedCourse, fetchPublishedCourses } from "@/features/academics/services/public-courses.service";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  let course;
  try { const apiCourses = await fetchPublishedCourses(); course = apiCourses.length ? await fetchPublishedCourse(slug) : getCourseBySlug(slug); } catch { return { title: "Courses unavailable | Smartera Hub" }; }
  if (!course) return { title: "Course" };
  return {
    title: `${course.title} | Smartera Hub`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;
  let course;
  try { const apiCourses = await fetchPublishedCourses(); course = apiCourses.length ? await fetchPublishedCourse(slug) : getCourseBySlug(slug) ? { ...getCourseBySlug(slug)!, source: "static-fallback" as const } : undefined; } catch { return <div className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-2xl font-black">Unable to load courses right now.</h1><Link href="/academics" className="mt-6 inline-flex rounded-lg bg-[#1B519F] px-5 py-3 font-bold text-white">Retry</Link></div>; }
  if (!course) notFound();

  const instructor = getCourseInstructor(course);
  const category = getCategoryBySlug(course.category);
  const reviews = getCourseReviews(course.id);
  const related = getRelatedCourses(course);

  return (
    <div className="bg-[#F7F9FC]">
      <div className="bg-[#0B1F3A] text-white">
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-10 sm:px-5 lg:grid-cols-[1fr_360px] xl:px-6">
          <div>
            <nav className="text-sm text-white/70" aria-label="Breadcrumb">
              <Link href="/academics" className="hover:text-white">Academics</Link>
              <span className="mx-2">›</span>
              {category ? (
                <>
                  <Link href={`/academics/category/${category.slug}`} className="hover:text-white">{category.name}</Link>
                  <span className="mx-2">›</span>
                </>
              ) : null}
              <span>{course.subcategory}</span>
            </nav>
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">{course.shortDescription}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StarRating rating={course.rating} reviewCount={course.reviewCount} className="text-[#F59223]" />
              <span className="text-sm text-white/70">{course.studentCount.toLocaleString()} students</span>
            </div>
            <p className="mt-3 text-sm text-white/80">
              Created by{" "}
              {instructor ? (
                <Link href={`/academics/instructors/${instructor.id}`} className="font-semibold text-[#F59223] hover:underline">
                  {instructor.name}
                </Link>
              ) : (
                "Smartera Instructor"
              )}
            </p>
            <p className="mt-2 text-sm text-white/65">
              Last updated {course.lastUpdated} | {course.language}
              {course.certificateAvailable ? " | Certificate available" : ""}
            </p>
          </div>
          <div className="lg:row-span-2">
            <div className="lg:sticky lg:top-24">
              <CoursePurchaseCard course={course} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-10 sm:px-5 lg:grid-cols-[1fr_360px] xl:px-6">
        <div className="space-y-8">
          <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
            <h2 className="text-xl font-black text-[#0B1F3A]">What you&apos;ll learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.learningOutcomes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#1B519F]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
            <CourseCurriculum course={course} />
          </section>

          <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
            <h2 className="text-xl font-black text-[#0B1F3A]">Requirements</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {course.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
            <h2 className="text-xl font-black text-[#0B1F3A]">Description</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{course.description}</p>
          </section>

          <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
            <h2 className="text-xl font-black text-[#0B1F3A]">Who this course is for</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {course.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {instructor ? (
            <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
              <h2 className="text-xl font-black text-[#0B1F3A]">Instructor</h2>
              <div className="mt-4 flex items-start gap-4">
                <Image src={instructor.avatar} alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-full" />
                <div>
                  <Link href={`/academics/instructors/${instructor.id}`} className="text-lg font-bold text-[#1B519F] hover:underline">
                    {instructor.name}
                  </Link>
                  <p className="text-sm text-slate-500">{instructor.specialization}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{instructor.bio}</p>
                </div>
              </div>
            </section>
          ) : null}

          <section className="rounded-2xl border border-[#E5EAF1] bg-white p-6">
            <h2 className="text-xl font-black text-[#0B1F3A]">Student feedback</h2>
            <div className="mt-4">
              <StarRating rating={course.rating} reviewCount={course.reviewCount} size="md" />
            </div>
            <div className="mt-6 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500">No written reviews in the demo catalog for this course yet.</p>
              ) : (
                reviews.map((review) => (
                  <article key={review.id} className="border-t border-[#E5EAF1] pt-4 first:border-t-0 first:pt-0">
                    <div className="flex items-center gap-3">
                      <Image src={review.studentAvatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full" />
                      <div>
                        <p className="text-sm font-bold text-[#0B1F3A]">{review.studentName}</p>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{review.comment}</p>
                  </article>
                ))
              )}
            </div>
          </section>

          {related.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-black text-[#0B1F3A]">Related courses</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <CourseCard key={item.id} course={item} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <div className="hidden lg:block" aria-hidden="true" />
      </div>
    </div>
  );
}
