"use client";

import { getPaginationItems } from "@/lib/pagination";

type PaginationProps = { currentPage: number; totalPages: number; onPageChange: (page: number) => void; ariaLabel?: string; alwaysShow?: boolean };
const controlClass = "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400";
const inactiveClass = "border-brand-border bg-white text-brand-blue hover:border-brand-blue hover:bg-brand-light";
const activeClass = "border-brand-blue bg-brand-blue text-white hover:bg-brand-blue-hover";

/** Shared accessible pagination control with compact mobile and truncated desktop layouts. */
export function Pagination({ currentPage, totalPages, onPageChange, ariaLabel = "Pagination", alwaysShow = false }: PaginationProps) {
  if (totalPages <= 1 && !alwaysShow) return null;
  const page = Math.min(Math.max(1, currentPage), totalPages);
  return <nav aria-label={ariaLabel} className="mt-8 flex items-center justify-center gap-2">
    <button type="button" className={`${controlClass} ${inactiveClass}`} disabled={page === 1} aria-disabled={page === 1} onClick={() => onPageChange(page - 1)}><span aria-hidden="true"></span><span className="ml-2 hidden sm:inline">Previous</span><span className="sr-only sm:hidden">Previous page</span></button>
    <span className="min-w-20 text-center text-sm font-bold text-brand-heading sm:hidden">Page {page} of {totalPages}</span>
    <div className="hidden items-center gap-2 sm:flex">{getPaginationItems(page, totalPages).map((item, index) => item === "ellipsis" ? <span key={`ellipsis-${index}`} aria-hidden="true" className="px-1 text-slate-400">...</span> : <button key={item} type="button" className={`${controlClass} px-0 ${item === page ? activeClass : inactiveClass}`} aria-label={`Page ${item}`} aria-current={item === page ? "page" : undefined} onClick={() => onPageChange(item)}>{item}</button>)}</div>
    <button type="button" className={`${controlClass} ${inactiveClass}`} disabled={page === totalPages} aria-disabled={page === totalPages} onClick={() => onPageChange(page + 1)}><span className="sr-only sm:hidden">Next page</span><span className="mr-2 hidden sm:inline">Next</span><span aria-hidden="true">→</span></button>
  </nav>;
}
