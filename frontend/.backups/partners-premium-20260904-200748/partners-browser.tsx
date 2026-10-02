"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PartnerCard } from "@/features/partners/components/partner-card";
import { PartnersPagination } from "@/features/partners/components/partners-pagination";
import type { Partner } from "@/features/partners/types/partners.types";
import { paginatePartners, PARTNERS_PER_PAGE, searchPartners } from "@/features/partners/utils/partners.utils";

function parsePage(value: string | null): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function PartnersBrowser({ partners }: { partners: Partner[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const urlPage = parsePage(searchParams.get("page"));
  const query = urlQuery;
  const filtered = useMemo(() => searchPartners(partners, query), [partners, query]);
  const paginated = useMemo(() => paginatePartners(filtered, urlPage), [filtered, urlPage]);

  const updateUrl = (nextQuery: string, nextPage: number) => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextPage > 1) params.set("page", String(nextPage));
    router.push(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false });
  };

  const handleSearch = (value: string) => {
    updateUrl(value, 1);
  };

  const handlePageChange = (nextPage: number) => {
    updateUrl(query, nextPage);
    document.getElementById("partners-directory")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <div>
      <div className="relative max-w-md">
        <label htmlFor="partner-search" className="sr-only">Search partners</label>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
        <input id="partner-search" type="search" value={query} onChange={(event) => handleSearch(event.target.value)} placeholder="Search partners..." className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-[#1B519F] shadow-sm outline-none transition focus:border-[#1B519F] focus:ring-4 focus:ring-[#1B519F]/10" />
      </div>

      {paginated.total ? (
        <>
          <div className="mt-5 flex flex-wrap justify-center gap-5">
            {paginated.items.map((partner) => (
              <div key={partner.id} className="w-full sm:w-[calc((100%_-_1.25rem)/2)] lg:w-[calc((100%_-_2.5rem)/3)] xl:w-[calc((100%_-_5rem)/5)]">
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0">
            <p className="text-center text-sm font-bold text-slate-500" aria-live="polite">Current {paginated.items.length} / {PARTNERS_PER_PAGE}</p>
            <PartnersPagination page={paginated.page} pageCount={paginated.pageCount} onPageChange={handlePageChange} />
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-[20px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center" aria-live="polite">
          <h3 className="text-xl font-black text-[#1B519F]">No partners found.</h3>
          <p className="mt-2 text-sm text-slate-500">Try another search.</p>
          <button type="button" onClick={() => handleSearch("")} className="mt-5 rounded-lg bg-[#1B519F] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#174783]">Clear Search</button>
        </div>
      )}
    </div>
  );
}
