"use client";

import { AcademicsHero } from "@/features/academics/components/academics-hero";
import { CourseCarousel } from "@/features/academics/components/course-carousel";
import { CoursesByCategory } from "@/features/academics/components/courses-by-category";
import {
  BusinessCta,
  CertificateSection,
  FeaturedInstructors,
  InstructorCta,
  LearningBenefits,
  TestimonialsSection,
} from "@/features/academics/components/home-sections";
import { PopularSkills } from "@/features/academics/components/popular-skills";
import { StatsBar } from "@/features/academics/components/stats-bar";
import { useEffect, useState } from "react";
import type { Course } from "@/features/academics/types/course.types";
import { fetchPublishedCourses } from "@/features/academics/services/public-courses.service";
import {
  getCourses,
  getInstructors,
} from "@/features/academics/services/course.service";
import { PageLoadingSkeleton } from "@/components/ui/PageLoadingSkeleton";

export function AcademicsHomeClient() {
  const [state, setState] = useState<{ status: "loading"|"ready"|"error"; courses: Course[] }>({ status: "loading", courses: [] });
  const load = async () => {
    setState((current) => ({ ...current, status: "loading" }));

    try {
      const items = await fetchPublishedCourses();

      setState({
        status: "ready",
        courses: items.length
          ? items
          : getCourses().map((course) => ({
              ...course,
              source: "static-fallback" as const,
            })),
      });
    } catch {
      setState({
        status: "error",
        courses: [],
      });
    }
  };

  useEffect(() => {
    let cancelled = false;

    fetchPublishedCourses()
      .then((items) => {
        if (cancelled) return;

        setState({
          status: "ready",
          courses: items.length
            ? items
            : getCourses().map((course) => ({
                ...course,
                source: "static-fallback" as const,
              })),
        });
      })
      .catch(() => {
        if (cancelled) return;

        setState({
          status: "error",
          courses: [],
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <PageLoadingSkeleton />;
  }

  if (state.status === "error") return <div className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="text-2xl font-black text-[#0B1F3A]">Unable to load courses right now.</h1><p className="mt-3 text-slate-600">The Academy service could not be reached. Please try again.</p><button onClick={load} className="mt-6 rounded-lg bg-[#1B519F] px-5 py-3 font-bold text-white">Retry</button></div>;

  const featured = state.courses.filter((c) => c.featured);
  const popular = state.courses.filter((c) => c.popular || c.featured);
  const recommended = state.courses;
  const newest = state.courses.filter((c) => c.isNew);
  const instructors = getInstructors();

  return (
    <>
      <AcademicsHero />
      <StatsBar />
      <div className="mx-auto w-full max-w-[1400px] space-y-16 px-4 py-14 sm:px-5 xl:px-6">
        <CourseCarousel title="Featured Courses" courses={featured} viewAllHref="/academics/search?sort=relevant" />
        <CourseCarousel title="What students are learning now" courses={popular} viewAllHref="/academics/search?sort=most-reviewed" />
        <CoursesByCategory />
        <PopularSkills />
        <CourseCarousel title="Recommended for you" courses={recommended} viewAllHref="/academics/search" />
        {newest.length > 0 ? <CourseCarousel title="New courses" courses={newest} viewAllHref="/academics/search?sort=newest" /> : null}
        <FeaturedInstructors instructors={instructors} />
        <LearningBenefits />
        <TestimonialsSection />
        <CertificateSection />
        <BusinessCta />
        <InstructorCta />
      </div>
    </>
  );
}


