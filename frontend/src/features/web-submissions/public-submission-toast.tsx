"use client";

import { useEffect } from "react";

export function PublicSubmissionToast({ message, variant, onDismiss }: { message: string; variant: "success" | "error"; onDismiss: () => void }) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);
  if (!message) return null;
  return <div role={variant === "error" ? "alert" : "status"} className={`fixed right-5 top-24 z-[120] max-w-sm rounded-xl border px-5 py-4 text-sm font-bold text-white shadow-xl ${variant === "error" ? "border-red-200 bg-red-600" : "border-emerald-200 bg-emerald-600"}`}>{message}</div>;
}
