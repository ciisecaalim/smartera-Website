"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CloseIcon } from "@/features/academics/components/icons";
import { academicsPromo } from "@/features/academics/data/courses.data";

const STORAGE_KEY = "smartera-academics-promo-dismissed";
const listeners = new Set<() => void>();

/** Stays false until after hydration so SSR and the first client pass match. */
let hasHydrated = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener());
}

function getDismissedSnapshot(): string | null {
  if (!hasHydrated) return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

function dismissPromo() {
  window.localStorage.setItem(STORAGE_KEY, academicsPromo.id);
  emit();
}

/** Soft announcement strip above Academics nav (Smartera styling). */
export function PromoBanner() {
  const dismissed = useSyncExternalStore(subscribe, getDismissedSnapshot, getServerSnapshot);

  useEffect(() => {
    hasHydrated = true;
    emit();
  }, []);

  if (dismissed === academicsPromo.id) return null;

  return (
    <div className="relative border-b border-[#B6E0F5] bg-[#D9F1FB] px-4 py-2.5 text-center text-sm font-medium text-[#0B1F3A]">
      <p className="mx-auto max-w-4xl pr-8">{academicsPromo.message}</p>
      <button
        type="button"
        onClick={dismissPromo}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#0B1F3A]/70 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
        aria-label="Dismiss promotional banner"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}


