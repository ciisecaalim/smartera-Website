"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "@/features/academics/components/icons";
import { CourseCarousel } from "@/features/academics/components/course-carousel";
import {
  BusinessCta,
  CertificateSection,
  FeaturedInstructors,
  InstructorCta,
  LearningBenefits,
  TestimonialsSection,
} from "@/features/academics/components/home-sections";
import { useAcademicsAuth } from "@/features/academics/hooks/use-academics-auth";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import {
  getCourseById,
  getCoursesByIds,
  getFeaturedCourses,
  getInstructors,
  getPopularCourses,
  getRecommendedCourses,
  getRelatedCourses,
} from "@/features/academics/services/course.service";
import { getProgressPercent } from "@/features/academics/services/store.service";

function ContinueLearningSection() {
  const { state } = useAcademicsStore();
  const enrolled = getCoursesByIds(state.enrolledIds).slice(0, 4);

  if (!enrolled.length) {
    return (
      <section className="rounded-xl border border-dashed border-[#E5EAF1] bg-white px-5 py-8 text-center">
        <h2 className="text-xl font-black text-[#0B1F3A]">Let&apos;s start learning</h2>
        <p className="mt-2 text-sm text-slate-500">Enroll in a course to continue learning here.</p>
        <Link href="/academics/search" className="mt-4 inline-flex text-sm font-bold text-[#1B519F] hover:underline">
          Browse courses
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A]">Let&apos;s start learning</h2>
        <Link href="/academics/my-learning" className="text-sm font-bold text-[#1B519F] hover:underline">
          My Learning
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {enrolled.map((course) => {
          const progress = state.progress.find((item) => item.courseId === course.id);
          const lectures = course.sections.flatMap((section) => section.lectures);
          const current =
            lectures.find((lecture) => lecture.id === progress?.currentLectureId) ?? lectures[0];
          const total = lectures.length;
          const percent = getProgressPercent(progress?.completedLectureIds.length ?? 0, total);
          const lectureIndex = Math.max(1, lectures.findIndex((lecture) => lecture.id === current?.id) + 1);

          return (
            <Link
              key={course.id}
              href={`/academics/learn/${course.id}`}
              className="flex overflow-hidden rounded-xl border border-[#E5EAF1] bg-white transition hover:shadow-[0_12px_28px_rgba(11,31,58,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              <div className="relative w-[42%] shrink-0 bg-slate-100 sm:w-36">
                <Image src={course.thumbnail} alt="" fill className="object-cover" sizes="160px" />
                <span className="absolute inset-0 flex items-center justify-center bg-[#0B1F3A]/25">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1B519F] shadow">
                    <PlayIcon className="h-5 w-5" />
                  </span>
                </span>
              </div>
              <div className="min-w-0 flex-1 p-3.5">
                <p className="line-clamp-2 text-sm font-bold text-[#0B1F3A]">{course.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {current?.title ?? "Continue where you left off"}
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-400">
                  Lecture {lectureIndex} | {current?.durationMinutes ?? 10}m | {percent}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/** Logged-in Academics homepage with continue learning + recommendations. */
export function PersonalizedAcademicsHome() {
  const { user } = useAcademicsAuth();
  const recommended = getRecommendedCourses();
  const popular = getPopularCourses();
  const featured = getFeaturedCourses();
  const instructors = getInstructors();

  const viewedCourse = user?.recentlyViewedCourseIds
    .map((id) => getCourseById(id))
    .find(Boolean);
  const becauseYouViewed = viewedCourse ? getRelatedCourses(viewedCourse, 8) : popular.slice(0, 8);

  const interestQuery = user?.interests.join(" ") ?? "development";
  const interestCourses = recommended.length
    ? recommended
    : featured.filter((course) =>
        interestQuery.toLowerCase().split(" ").some((token) =>
          `${course.title} ${course.skills.join(" ")}`.toLowerCase().includes(token.toLowerCase()),
        ),
      );

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-14 px-4 py-10 sm:px-5 xl:px-6">
      <section className="flex items-center gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1F3A] text-lg font-bold text-white">
          {user?.initials ?? "S"}
        </span>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-3xl">
            Welcome back, {user?.firstName ?? "Learner"}
          </h1>
          <Link href="/academics/profile" className="mt-1 inline-block text-sm font-semibold text-[#1B519F] hover:underline">
            Manage learning interests
          </Link>
        </div>
      </section>

      <ContinueLearningSection />

      <div>
        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A]">What to learn next</h2>
        <div className="mt-5">
          <CourseCarousel
            title="Recommended for you"
            courses={interestCourses.length ? interestCourses : featured}
            viewAllHref="/academics/search?sort=relevant"
          />
        </div>
      </div>

      {viewedCourse ? (
        <CourseCarousel
          title={`Because you viewed “${viewedCourse.title}”`}
          courses={becauseYouViewed}
          viewAllHref={`/academics/category/${viewedCourse.category}`}
        />
      ) : (
        <CourseCarousel title="Popular right now" courses={popular} viewAllHref="/academics/search?sort=most-reviewed" />
      )}

      <CourseCarousel title="Based on your interests" courses={featured} viewAllHref="/academics/search" />
      <FeaturedInstructors instructors={instructors} />
      <LearningBenefits />
      <TestimonialsSection />
      <CertificateSection />
      <BusinessCta />
      <InstructorCta />
    </div>
  );
}

