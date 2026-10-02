"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { CloseIcon } from "@/features/academics/components/icons";
import { getCourseForConfirmation } from "@/features/academics/services/cart.service";
import { getCourseInstructor } from "@/features/academics/services/course.service";

type AddedToCartConfirmationProps = {
  courseId: string;
  onConfirm: () => void;
  onClose: () => void;
};

/** Accessible confirmation modal shown before a course is added to the cart. */
export function AddedToCartConfirmation({ courseId, onConfirm, onClose }: AddedToCartConfirmationProps) {
  const course = getCourseForConfirmation(courseId);
  const instructor = course ? getCourseInstructor(course) : undefined;
  const titleId = useId();
  const confirmRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    confirmRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0B1F3A]/45 p-4" role="presentation">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Cancel adding course to cart" onClick={onClose} />
      <div
        ref={panelRef}
        role="alertdialog"
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-description`}
        aria-modal="true"
        className="relative w-full max-w-md rounded-lg border border-[#DCE6F3] bg-white p-5 shadow-[0_24px_60px_rgba(11,31,58,0.22)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="pr-2 text-lg font-bold leading-7 text-[#0B1F3A]">
            Do you want to add this course to your cart?
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-slate-100">
            <Image src={course.thumbnail} alt="" fill className="object-cover" sizes="96px" />
          </div>
          <div className="min-w-0 flex-1">
            <p id={`${titleId}-description`} className="text-sm font-bold leading-snug text-[#0B1F3A]">{course.title}</p>
            <p className="mt-1 text-sm text-slate-500">{instructor?.name ?? "Smartera Instructor"}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#D0D5DD] px-5 text-sm font-bold text-[#0B1F3A] transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Cancel</button>
          <button ref={confirmRef} type="button" onClick={onConfirm} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Add</button>
        </div>
      </div>
    </div>
  );
}
