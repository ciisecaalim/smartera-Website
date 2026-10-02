"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckIcon } from "@/features/academics/components/icons";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { getCoursesByIds } from "@/features/academics/services/course.service";

/** Shown after free enrollment. Paid success requires a verified payment provider callback. */
export function OrderSuccessPageClient() {
  const params = useSearchParams();
  const type = params.get("type");
  const { state } = useAcademicsStore();
  const courses = getCoursesByIds(state.enrolledIds).slice(-6).reverse();

  if (type !== "free") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-3xl font-black text-[#0B1F3A]">Payment not confirmed</h1>
        <p className="mt-3 text-slate-500">
          Paid checkout is not connected yet. Orders are only marked complete after a verified payment provider confirmation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/academics"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1B519F] px-5 text-sm font-bold text-[#1B519F] hover:bg-[#EEF5FF]"
          >
            Browse courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
        <CheckIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-5 text-3xl font-black text-[#0B1F3A]">Enrollment successful</h1>
      <p className="mt-3 text-slate-500">Your free course access is ready. Start learning whenever you are.</p>

      {courses.length ? (
        <ul className="mt-8 space-y-3 text-left">
          {courses.slice(0, 3).map((course) => (
            <li key={course.id} className="rounded-xl border border-[#E5EAF1] px-4 py-3">
              <p className="font-bold text-[#0B1F3A]">{course.title}</p>
              <Link href={`/academics/learn/${course.id}`} className="mt-1 inline-block text-sm font-semibold text-[#1B519F] hover:underline">
                Start Learning
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/academics/my-learning"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white hover:bg-[#174783]"
        >
          View My Learning
        </Link>
        <Link
          href="/academics"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1B519F] px-5 text-sm font-bold text-[#1B519F] hover:bg-[#EEF5FF]"
        >
          Browse more courses
        </Link>
      </div>
    </div>
  );
}
