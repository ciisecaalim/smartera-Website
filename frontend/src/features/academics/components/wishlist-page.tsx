"use client";

import { CourseCard } from "@/features/academics/components/course-card";
import { EmptyState } from "@/features/academics/components/empty-state";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { getCoursesByIds } from "@/features/academics/services/course.service";

export function WishlistPageClient() {
  const { state } = useAcademicsStore();
  const courses = getCoursesByIds(state.wishlistIds);

  if (!courses.length) {
    return (
      <EmptyState
        title="Your wishlist is empty."
        description="Save courses you want to revisit later using the heart icon on any course card."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} checkoutOnClick />
      ))}
    </div>
  );
}
