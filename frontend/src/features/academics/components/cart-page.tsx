"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/features/academics/components/course-card";
import { EmptyState } from "@/features/academics/components/empty-state";

import { PriceDisplay } from "@/features/academics/components/price-display";
import { StarRating } from "@/features/academics/components/star-rating";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import {
  calculateCartTotals,
  formatCartCountLabel,
  formatMoney,
  getCartCourses,
  getCartRecommendations,
} from "@/features/academics/services/cart.service";
import { getCourseDurationLabel, getCourseInstructor, getCoursesByIds } from "@/features/academics/services/course.service";
import type { Course } from "@/features/academics/types/course.types";

function CartItemRow({
  course,
  onRemove,
  onSaveForLater,
  onMoveToWishlist,
}: {
  course: Course;
  onRemove: () => void;
  onSaveForLater: () => void;
  onMoveToWishlist: () => void;
}) {
  const instructor = getCourseInstructor(course);

  return (
    <article className="grid gap-4 border-b border-[#E5EAF1] py-5 first:pt-0 last:border-b-0 sm:grid-cols-[176px_1fr_auto]">
      <Link
        href={`/academics/courses/${course.slug}`}
        className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-44 sm:aspect-auto"
      >
        <Image src={course.thumbnail} alt="" fill className="object-cover" sizes="176px" />
      </Link>

      <div className="min-w-0">
        <Link href={`/academics/courses/${course.slug}`} className="text-base font-bold text-[#0B1F3A] hover:text-[#1B519F]">
          {course.title}
        </Link>
        <p className="mt-1 text-sm text-slate-500">By {instructor?.name ?? "Smartera Instructor"}</p>
        <div className="mt-2">
          <StarRating rating={course.rating} reviewCount={course.reviewCount} />
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {getCourseDurationLabel(course)} total | {course.totalLectures} lectures | {course.level}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {course.bestseller ? (
            <span className="rounded-md bg-[#F59223] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              Bestseller
            </span>
          ) : null}
          {course.isNew ? (
            <span className="rounded-md bg-[#1B519F] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
              New
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <button type="button" onClick={onRemove} className="text-[#1B519F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">
            Remove
          </button>
          <button type="button" onClick={onSaveForLater} className="text-[#1B519F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">
            Save for Later
          </button>
          <button type="button" onClick={onMoveToWishlist} className="text-[#1B519F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">
            Move to Wishlist
          </button>
        </div>
      </div>

      <div className="sm:text-right">
        <PriceDisplay price={course.price} originalPrice={course.originalPrice} size="md" />
        {course.discountPercentage ? (
          <p className="mt-1 text-sm font-semibold text-[#1B519F]">{course.discountPercentage}% off</p>
        ) : null}
      </div>
    </article>
  );
}

export function CartPageClient() {
  const router = useRouter();
  const {
    state,
    hydrated,
    removeFromCart,
    saveForLater,
    moveToWishlist,
    moveSavedToCart,
    removeSavedForLater,
  } = useAcademicsStore();

  const courses = getCartCourses(state.cartIds);
  const savedCourses = getCoursesByIds(state.savedForLaterIds);
  const recommendations = getCartRecommendations(state.cartIds, 5);
  const totals = calculateCartTotals(courses);

  if (!hydrated) {
    return (
      <div className="space-y-4" aria-busy="true" aria-label="Loading cart">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (!courses.length) {
    return (
      <>
        <h1 className="text-3xl font-black tracking-tight text-[#0B1F3A]">Shopping Cart</h1>
        <p className="mt-2 text-base text-slate-500">0 Courses in Cart</p>
        <div className="mt-8">
          <EmptyState
            title="Your cart is empty."
            description="Explore courses and start learning today."
            actionHref="/academics"
            actionLabel="Browse Courses"
          />
        </div>
        {savedCourses.length ? (
          <SavedForLaterSection
            courses={savedCourses}
            onMoveToCart={moveSavedToCart}
            onRemove={removeSavedForLater}
          />
        ) : null}
      </>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight text-[#0B1F3A]">Shopping Cart</h1>
      <p className="mt-2 text-base text-slate-500">{formatCartCountLabel(totals.itemCount)}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="rounded-xl border border-[#E5EAF1] bg-white px-4 sm:px-5">
            {courses.map((course) => (
              <CartItemRow
                key={course.id}
                course={course}
                onRemove={() => removeFromCart(course.id)}
                onSaveForLater={() => saveForLater(course.id)}
                onMoveToWishlist={() => moveToWishlist(course.id)}
              />
            ))}
          </div>

          {savedCourses.length ? (
            <SavedForLaterSection
              courses={savedCourses}
              onMoveToCart={moveSavedToCart}
              onRemove={removeSavedForLater}
            />
          ) : null}

          {recommendations.length ? (
            <section className="mt-10">
              <h2 className="text-xl font-black text-[#0B1F3A]">You might also like</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {recommendations.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit rounded-xl border border-[#E5EAF1] bg-white p-5 lg:sticky lg:top-24">
          <p className="text-base font-semibold text-slate-500">Total:</p>
          <p className="mt-1 text-3xl font-black text-[#0B1F3A]">{formatMoney(totals.currentSubtotal)}</p>
          {totals.discountAmount > 0 ? (
            <>
              <p className="mt-2 text-sm text-slate-400 line-through">{formatMoney(totals.originalSubtotal)}</p>
              <p className="mt-1 text-sm font-semibold text-[#1B519F]">{totals.discountPercentage}% off</p>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => router.push("/academics/checkout")}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
          >
            Proceed to Checkout
            
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">You won&apos;t be charged yet.</p>
        </aside>
      </div>
    </div>
  );
}

function SavedForLaterSection({
  courses,
  onMoveToCart,
  onRemove,
}: {
  courses: Course[];
  onMoveToCart: (courseId: string) => void;
  onRemove: (courseId: string) => void;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-black text-[#0B1F3A]">Saved for later</h2>
      <div className="mt-4 space-y-4 rounded-xl border border-[#E5EAF1] bg-white p-4">
        {courses.map((course) => {
          const instructor = getCourseInstructor(course);
          return (
            <article key={course.id} className="flex flex-col gap-4 border-b border-[#E5EAF1] pb-4 last:border-b-0 last:pb-0 sm:flex-row">
              <Link
                href={`/academics/courses/${course.slug}`}
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-slate-100 sm:h-24 sm:w-40 sm:shrink-0 sm:aspect-auto"
              >
                <Image src={course.thumbnail} alt="" fill className="object-cover" sizes="160px" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/academics/courses/${course.slug}`} className="font-bold text-[#0B1F3A] hover:text-[#1B519F]">
                  {course.title}
                </Link>
                <p className="mt-1 text-sm text-slate-500">{instructor?.name}</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <PriceDisplay price={course.price} originalPrice={course.originalPrice} size="sm" />
                  <button
                    type="button"
                    onClick={() => onMoveToCart(course.id)}
                    className="text-sm font-semibold text-[#1B519F] hover:underline"
                  >
                    Move to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(course.id)}
                    className="text-sm font-semibold text-slate-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


