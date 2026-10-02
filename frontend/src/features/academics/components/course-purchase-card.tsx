"use client";

import Link from "next/link";
import { PriceDisplay } from "@/features/academics/components/price-display";
import { CourseListControl } from "@/features/academics/components/course-list-control";
import { VideoPlayer } from "@/features/academics/components/video-player";
import { WishlistButton } from "@/features/academics/components/wishlist-button";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import type { Course } from "@/features/academics/types/course.types";
import { requestStudentCourse } from "@/features/auth/services/web-auth.service";
import { useState } from "react";

export function CoursePurchaseCard({ course }: { course: Course }) {
  const [requestState, setRequestState] = useState<"idle"|"busy"|"done"|"error">("idle");
  const { addToCart, enroll, isInCart, isEnrolled } = useAcademicsStore();
  const enrolled = isEnrolled(course.id);
  const inCart = isInCart(course.id);
  const isFree = course.price <= 0;
  if (course.source) return <aside className="overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white shadow-lg"><VideoPlayer poster={course.thumbnail} title={course.title} className="rounded-none"/><div className="space-y-4 p-5"><PriceDisplay price={course.price} size="lg"/><p className="text-sm text-slate-600">{course.source === "api" ? (course.enrollmentOpen ? "Enrollment requests are open." : "Enrollment is currently closed.") : "Enrollment will be available when this course is published."}</p>{course.source === "api" && course.enrollmentOpen ? <button disabled={requestState === "busy" || requestState === "done"} onClick={async()=>{setRequestState("busy");try{await requestStudentCourse(course.academyCourseId!);setRequestState("done");}catch{setRequestState("error");}}} className="w-full rounded-lg bg-[#1B519F] px-4 py-3 font-bold text-white disabled:bg-slate-400">{requestState === "busy" ? "Submitting..." : requestState === "done" ? "Request submitted" : "Request Course"}</button>:null}{requestState === "error"?<p role="alert" className="text-sm text-red-700">Sign in as a student and try again, or check whether you already requested this course.</p>:null}</div></aside>;

  return (
    <aside className="overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white shadow-[0_18px_40px_rgba(11,31,58,0.08)]">
      <VideoPlayer src={course.previewVideo} poster={course.thumbnail} title={`${course.title} preview`} className="rounded-none" />
      <div className="space-y-4 p-5">
        <PriceDisplay price={course.price} originalPrice={course.originalPrice} size="lg" />
        {course.discountPercentage ? (
          <p className="text-sm font-semibold text-[#1B519F]">{course.discountPercentage}% off</p>
        ) : null}

        {enrolled ? (
          <>
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              You already own this course.
            </p>
            <Link
              href={`/academics/learn/${course.id}`}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              Go to My Learning
            </Link>
          </>
        ) : isFree ? (
          <button
            type="button"
            onClick={() => enroll(course.id)}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
          >
            Enroll for Free
          </button>
        ) : (
          inCart ? (
            <Link
              href="/academics/cart"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              Added to cart
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(course.id)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#1B519F] px-4 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              Add to cart
            </button>
          )
        )}

        {!enrolled ? <WishlistButton courseId={course.id} variant="button" className="w-full" /> : null}
        {enrolled ? <CourseListControl courseId={course.id} /> : null}
        <p className="text-center text-xs text-slate-500">
          {isFree
            ? "Free enrollment grants immediate course access."
            : "Paid checkout requires a connected payment provider. You will not be charged in this Phase 1 build."}
        </p>
      </div>
    </aside>
  );
}
