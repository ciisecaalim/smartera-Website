import { formatPrice, getCourseById, getCoursesByIds, getRelatedCourses } from "@/features/academics/services/course.service";
import type { Course } from "@/features/academics/types/course.types";

export type CartTotals = {
  itemCount: number;
  originalSubtotal: number;
  currentSubtotal: number;
  discountAmount: number;
  discountPercentage: number;
};

/** Display-only totals. Backend must recalculate before any real charge. */
export function calculateCartTotals(courses: Course[]): CartTotals {
  const originalSubtotal = courses.reduce((sum, course) => sum + (course.originalPrice ?? course.price), 0);
  const currentSubtotal = courses.reduce((sum, course) => sum + course.price, 0);
  const discountAmount = Math.max(0, originalSubtotal - currentSubtotal);
  const discountPercentage =
    originalSubtotal > 0 ? Math.round((discountAmount / originalSubtotal) * 100) : 0;

  return {
    itemCount: courses.length,
    originalSubtotal,
    currentSubtotal,
    discountAmount,
    discountPercentage,
  };
}

export function formatCartCountLabel(count: number): string {
  return count === 1 ? "1 Course in Cart" : `${count} Courses in Cart`;
}

export function getCartCourses(cartIds: string[]): Course[] {
  return getCoursesByIds(cartIds);
}

export function getCartRecommendations(cartIds: string[], limit = 5): Course[] {
  const cartCourses = getCoursesByIds(cartIds);
  const seen = new Set(cartIds);
  const recommendations: Course[] = [];

  for (const course of cartCourses) {
    for (const related of getRelatedCourses(course, 6)) {
      if (seen.has(related.id)) continue;
      seen.add(related.id);
      recommendations.push(related);
      if (recommendations.length >= limit) return recommendations;
    }
  }

  return recommendations;
}

export type PaymentInitResult =
  | { status: "not_configured"; message: string }
  | { status: "free_enroll"; courseIds: string[] }
  | { status: "already_owned"; courseIds: string[] };

/**
 * Phase 1 payment initialization stub.
 * No provider is connected - paid checkout must not pretend payment succeeded.
 */
export function initializeCheckoutPayment(input: {
  cartIds: string[];
  enrolledIds: string[];
}): PaymentInitResult {
  const courses = getCoursesByIds(input.cartIds);
  if (!courses.length) {
    return { status: "not_configured", message: "Your cart is empty." };
  }

  const owned = courses.filter((course) => input.enrolledIds.includes(course.id)).map((course) => course.id);
  if (owned.length === courses.length) {
    return { status: "already_owned", courseIds: owned };
  }

  const payable = courses.filter((course) => !input.enrolledIds.includes(course.id));
  const allFree = payable.every((course) => course.price <= 0);
  if (allFree) {
    return { status: "free_enroll", courseIds: payable.map((course) => course.id) };
  }

  return {
    status: "not_configured",
    message:
      "Payment processing is not connected yet. Checkout UI is ready for a future approved payment provider. No charge was made.",
  };
}

export function formatMoney(value: number): string {
  return formatPrice(value);
}

export function getCourseForConfirmation(courseId: string): Course | undefined {
  return getCourseById(courseId);
}
