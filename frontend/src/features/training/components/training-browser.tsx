"use client";

import { useMemo, useState } from "react";
import type { TrainingActivity, TrainingStatus } from "@/features/training/types/training.types";
import { filterTrainings } from "@/features/training/utils/training.utils";
import { TrainingCard } from "./training-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/ui/pagination";
import { PAGE_SIZES } from "@/config/pagination";
import { paginateItems } from "@/lib/pagination";

const tabs: { value: TrainingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live" },
  { value: "completed", label: "Completed" },
];

export default function TrainingBrowser({ trainings }: { trainings: TrainingActivity[] }) {
  const [status, setStatus] = useState<TrainingStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const results = useMemo(() => filterTrainings(trainings, { status, search }), [trainings, status, search]);
  const paginated = useMemo(() => paginateItems(results, currentPage, PAGE_SIZES.training), [results, currentPage]);
  const clear = () => { setStatus("all"); setSearch(""); setCurrentPage(1); };
  const hasActiveFilters = status !== "all" || search.trim().length > 0;
  const changePage = (page: number) => {
    setCurrentPage(page);
    document.getElementById("training-results")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return <>
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_14px_38px_rgba(6,59,134,.10)] sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_240px] sm:items-center">
        <div className="order-2">
          <label htmlFor="training-status" className="sr-only">Filter training by status</label>
          <select
            id="training-status"
            value={status}
            onChange={(event) => { setStatus(event.target.value as TrainingStatus | "all"); setCurrentPage(1); }}
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#FBFDFF] px-4 text-sm font-bold text-[#1B519F] shadow-sm outline-none transition focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-[#1B519F]/10"
          >
            {tabs.map((tab) => <option key={tab.value} value={tab.value}>{tab.label}</option>)}
          </select>
        </div>

        <div className="relative order-1 w-full">
          <label htmlFor="training-search" className="sr-only">Search training activities</label>
          <input
            id="training-search"
            type="search"
            value={search}
            onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
            placeholder="Search training..."
            className="h-12 w-full rounded-xl border border-slate-200 bg-[#FBFDFF] px-4 pr-12 text-sm text-slate-700 shadow-inner outline-none transition focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-[#1B519F]/10"
          />
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1B519F]"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
        </div>
      </div>

    </div>

    {results.length ? (
      <div id="training-results" className="scroll-mt-24">
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {paginated.items.map((training) => <TrainingCard key={training.id} training={training} />)}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0">
          <p className="text-center text-sm font-bold text-slate-500" aria-live="polite">Current {paginated.items.length} / {paginated.pageSize}</p>
          <Pagination currentPage={paginated.page} totalPages={paginated.totalPages} onPageChange={changePage} ariaLabel="Training activities pagination" alwaysShow />
        </div>
      </div>
    ) : (
      <EmptyState
        className="mt-6"
        title={hasActiveFilters ? "No matching training activities" : "No training activities available"}
        description={hasActiveFilters ? "Try changing your search or status filter." : "Published training activities will appear here."}
        onAction={hasActiveFilters ? clear : undefined}
      />
    )}
  </>;
}
