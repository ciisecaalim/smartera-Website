"use client";

import { useEffect } from "react";

export function PublicSubmissionToast({ message, variant, onDismiss }: { message: string; variant: "success" | "error"; onDismiss: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);
  if (!message) return null;
  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`fixed right-5 top-24 z-[120] flex w-[min(24rem,calc(100vw-2.5rem))] items-start gap-3 rounded-2xl border bg-white/95 px-4 py-3.5 text-sm shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur ${
        isError
          ? "border-rose-200 text-rose-950"
          : "border-emerald-200 text-emerald-950"
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
          isError
            ? "bg-rose-100 text-rose-700"
            : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {isError ? "!" : "✓"}
      </span>
      <p className="min-w-0 flex-1 pr-2 font-semibold leading-5">
        {message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-medium text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
