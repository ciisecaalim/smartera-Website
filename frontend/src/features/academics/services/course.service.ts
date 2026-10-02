import { academicCategories } from "@/features/academics/data/categories.data";
import { courses } from "@/features/academics/data/courses.data";
import { instructors } from "@/features/academics/data/instructors.data";
import { courseReviews } from "@/features/academics/data/testimonials.data";
import type {
  Category,
  Course,
  CourseCategorySlug,
  CourseFilters,
  CourseReview,
  CourseSortOption,
  Instructor,
} from "@/features/academics/types/course.types";

/** API-ready course catalog accessors backed by Phase 1 demo data. */
export function getCourses(): Course[] {
  return courses;
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured);
}

export function getPopularCourses(): Course[] {
  return courses.filter((course) => course.popular);
}

export function getNewCourses(): Course[] {
  return courses.filter((course) => course.isNew);
}

export function getRecommendedCourses(): Course[] {
  return [...courses].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount).slice(0, 8);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getCoursesByCategory(slug: CourseCategorySlug): Course[] {
  return courses.filter((course) => course.category === slug);
}

export function getRelatedCourses(course: Course, limit = 4): Course[] {
  return courses
    .filter((item) => item.id !== course.id && (item.category === course.category || item.skills.some((skill) => course.skills.includes(skill))))
    .slice(0, limit);
}

export function getCategories(): Category[] {
  return academicCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return academicCategories.find((category) => category.slug === slug);
}

export function getCategoryCourseCount(slug: CourseCategorySlug): number {
  return courses.filter((course) => course.category === slug).length;
}

export function getInstructor(id: string): Instructor | undefined {
  return instructors.find((instructor) => instructor.id === id);
}

export function getInstructors(): Instructor[] {
  return instructors;
}

export function getCourseInstructor(course: Course): Instructor | undefined {
  return getInstructor(course.instructorId);
}

export function getCourseReviews(courseId: string): CourseReview[] {
  return courseReviews.filter((review) => review.courseId === courseId);
}

export function getCoursesByIds(ids: string[]): Course[] {
  const map = new Map(courses.map((course) => [course.id, course]));
  return ids.map((id) => map.get(id)).filter((course): course is Course => Boolean(course));
}

function matchesDuration(course: Course, duration: CourseFilters["duration"]): boolean {
  if (!duration || duration === "all") return true;
  if (duration === "short") return course.durationHours < 12;
  if (duration === "medium") return course.durationHours >= 12 && course.durationHours <= 24;
  return course.durationHours > 24;
}

function sortCourses(list: Course[], sort: CourseSortOption = "relevant"): Course[] {
  const next = [...list];
  switch (sort) {
    case "highest-rated":
      return next.sort((a, b) => b.rating - a.rating);
    case "most-reviewed":
      return next.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
      return next.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    case "price-low":
      return next.sort((a, b) => a.price - b.price);
    case "price-high":
      return next.sort((a, b) => b.price - a.price);
    default:
      return next.sort((a, b) => Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller)) || b.studentCount - a.studentCount);
  }
}

/** Search and filter courses for marketplace discovery pages. */
export function searchCourses(filters: CourseFilters = {}): Course[] {
  const query = filters.q?.trim().toLowerCase() ?? "";
  const topic = filters.topic?.trim().toLowerCase() ?? "";

  const filtered = courses.filter((course) => {
    const haystack = [
      course.title,
      course.shortDescription,
      course.subcategory,
      course.category,
      ...course.skills,
      getCourseInstructor(course)?.name ?? "",
    ]
      .join(" ")
      .toLowerCase();

    if (query && !haystack.includes(query)) return false;
    if (topic && !haystack.includes(topic)) return false;
    if (filters.category && filters.category !== "all" && course.category !== filters.category) return false;
    if (filters.level && filters.level !== "all" && course.level !== filters.level) return false;
    if (filters.language && filters.language !== "all" && course.language !== filters.language) return false;
    if (filters.minRating && course.rating < filters.minRating) return false;
    if (filters.price === "free" && course.price > 0) return false;
    if (filters.price === "paid" && course.price <= 0) return false;
    if (!matchesDuration(course, filters.duration)) return false;
    return true;
  });

  return sortCourses(filtered, filters.sort);
}

export function getSearchSuggestions(query: string, limit = 6): Course[] {
  if (!query.trim()) return getPopularCourses().slice(0, limit);
  return searchCourses({ q: query, sort: "relevant" }).slice(0, limit);
}

export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
}

export function getCourseDurationLabel(course: Course): string {
  const hours = Math.floor(course.durationHours);
  const minutes = Math.round((course.durationHours - hours) * 60);
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function getSectionDurationMinutes(section: Course["sections"][number]): number {
  return section.lectures.reduce((sum, lecture) => sum + lecture.durationMinutes, 0);
}

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}
