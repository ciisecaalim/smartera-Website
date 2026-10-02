import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ExceptionStateProps = {
  code?: string;
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};

/** Shared presentation for route errors, connectivity issues, and empty data states. */
export function ExceptionState({
  code,
  eyebrow,
  title,
  description,
  primaryHref = "/",
  primaryLabel = "Back to home",
  secondaryHref,
  secondaryLabel,
  action,
  compact = false,
  className,
}: ExceptionStateProps) {
  return (
    <section
      aria-labelledby="exception-title"
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden bg-[#F5F9FF] px-4",
        compact ? "min-h-72 rounded-2xl border border-dashed border-blue-200 py-10" : "min-h-[calc(100vh-5rem)] py-16",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#1B519F]/8 blur-2xl" />
      <div aria-hidden="true" className="absolute -right-20 bottom-6 h-56 w-56 rounded-full bg-[#F59223]/12 blur-2xl" />
      <div className={cn("relative w-full text-center", compact ? "max-w-xl" : "max-w-2xl") }>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-blue-100 bg-white text-[#1B519F] shadow-[0_18px_45px_rgba(6,59,134,.12)]">
          <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-11 w-11">
            <path d="M24 5 43 39H5L24 5Z" fill="#EEF5FF" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M24 17v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="33" r="1.8" fill="#F59223" />
          </svg>
        </div>
        {code ? <p className="mt-6 text-6xl font-black tracking-[-.06em] text-[#1B519F] sm:text-7xl">{code}</p> : null}
        <p className={cn("font-black uppercase tracking-[.16em] text-[#F59223]", code ? "mt-2 text-[10px]" : "mt-6 text-[10px]")}>{eyebrow ?? "Something needs attention"}</p>
        <h1 id="exception-title" className={cn("mt-3 font-black tracking-[-.035em] text-[#1B519F]", compact ? "text-2xl" : "text-3xl sm:text-4xl")}>{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {action}
          {primaryHref ? <Link href={primaryHref} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1B519F] px-5 py-3 text-xs font-black text-white shadow-[0_10px_24px_rgba(7,94,222,.22)] transition hover:-translate-y-0.5 hover:bg-[#174783] motion-reduce:transform-none">{primaryLabel}</Link> : null}
          {secondaryHref && secondaryLabel ? <Link href={secondaryHref} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1B519F]/25 bg-white px-5 py-3 text-xs font-black text-[#1B519F] transition hover:border-[#1B519F]">{secondaryLabel}</Link> : null}
        </div>
      </div>
    </section>
  );
}

