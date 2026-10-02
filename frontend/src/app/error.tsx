"use client";

import { useEffect } from "react";

import { ExceptionState } from "@/components/shared/exception-state";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ExceptionState
      code="500"
      eyebrow="Server error"
      title="Something went wrong"
      description="We couldn't complete your request right now. Please try again."
      primaryHref=""
      action={
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-xl bg-[#1B519F] px-5 py-3 text-xs font-black text-white shadow-md transition hover:bg-[#174783]"
        >
          Try again
        </button>
      }
    />
  );
}
