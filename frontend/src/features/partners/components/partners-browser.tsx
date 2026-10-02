"use client";

import {
  useMemo,
  useState,
} from "react";

import { PartnerCard } from "@/features/partners/components/partner-card";
import { PartnersPagination } from "@/features/partners/components/partners-pagination";
import type { Partner } from "@/features/partners/types/partners.types";
import {
  paginatePartners,
  searchPartners,
} from "@/features/partners/utils/partners.utils";
import styles from "@/features/partners/styles/partners-premium.module.css";

type PartnerMeta = Partner & {
  category?: string | null;
  industry?: string | null;
  partnerType?: string | null;
  type?: string | null;
  location?: string | null;
  region?: string | null;
  country?: string | null;
  city?: string | null;
};

function getCategory(partner: Partner) {
  const value = partner as PartnerMeta;

  return (
    value.category ||
    value.industry ||
    value.partnerType ||
    value.type ||
    partner.keywords?.[0] ||
    "Partner"
  );
}

function getLocation(partner: Partner) {
  const value = partner as PartnerMeta;

  if (value.city && value.country) {
    return `${value.city}, ${value.country}`;
  }

  return (
    value.location ||
    value.region ||
    value.country ||
    value.city ||
    ""
  );
}

export function PartnersBrowser({
  partners,
}: {
  partners: Partner[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [sort, setSort] = useState("az");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          partners
            .map(getCategory)
            .filter(Boolean),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [partners],
  );

  const regions = useMemo(
    () =>
      Array.from(
        new Set(
          partners
            .map(getLocation)
            .filter(Boolean),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [partners],
  );

  const filtered = useMemo(() => {
    let result = searchPartners(
      partners,
      query,
    );

    if (category !== "all") {
      result = result.filter(
        (partner) =>
          getCategory(partner) === category,
      );
    }

    if (region !== "all") {
      result = result.filter(
        (partner) =>
          getLocation(partner) === region,
      );
    }

    return [...result].sort((a, b) =>
      sort === "za"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name),
    );
  }, [
    partners,
    query,
    category,
    region,
    sort,
  ]);

  const paginated = useMemo(
    () =>
      paginatePartners(
        filtered,
        page,
        6,
      ),
    [filtered, page],
  );

  function updateSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  function updateRegion(value: string) {
    setRegion(value);
    setPage(1);
  }

  function updateSort(value: string) {
    setSort(value);
    setPage(1);
  }

  const start =
    filtered.length === 0
      ? 0
      : (paginated.page - 1) * 6 + 1;

  const end =
    Math.min(
      paginated.page * 6,
      filtered.length,
    );

  return (
    <div>
      <div
        className={`${styles.filterBar} rounded-[18px] border border-[#DDE7F3] bg-white p-3 shadow-[0_10px_35px_rgba(22,56,105,0.055)] sm:p-4`}
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.8fr)_minmax(170px,.65fr)_minmax(170px,.65fr)_minmax(170px,.65fr)]">
          <label className="relative block">
            <span className="sr-only">
              Search partners
            </span>

            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            <input
              type="search"
              value={query}
              onChange={(event) =>
                updateSearch(
                  event.target.value,
                )
              }
              placeholder="Search partners by name, industry, or keyword..."
              className="h-12 w-full rounded-xl border border-[#DDE7F3] bg-white pl-11 pr-4 text-sm font-medium text-[#071B41] outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#1B519F] focus:ring-4 focus:ring-[#1B519F]/10"
            />
          </label>

          <select
            value={category}
            onChange={(event) =>
              updateCategory(
                event.target.value,
              )
            }
            aria-label="Filter partners by category"
            className="h-12 rounded-xl border border-[#DDE7F3] bg-white px-4 text-sm font-bold text-[#14284F] outline-none transition focus:border-[#1B519F] focus:ring-4 focus:ring-[#1B519F]/10"
          >
            <option value="all">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={region}
            onChange={(event) =>
              updateRegion(
                event.target.value,
              )
            }
            aria-label="Filter partners by region"
            className="h-12 rounded-xl border border-[#DDE7F3] bg-white px-4 text-sm font-bold text-[#14284F] outline-none transition focus:border-[#1B519F] focus:ring-4 focus:ring-[#1B519F]/10"
          >
            <option value="all">
              All Regions
            </option>

            {regions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) =>
              updateSort(
                event.target.value,
              )
            }
            aria-label="Sort partners"
            className="h-12 rounded-xl border border-[#DDE7F3] bg-white px-4 text-sm font-bold text-[#14284F] outline-none transition focus:border-[#1B519F] focus:ring-4 focus:ring-[#1B519F]/10"
          >
            <option value="az">
              Sort: A - Z
            </option>

            <option value="za">
              Sort: Z - A
            </option>
          </select>
        </div>
      </div>

      {paginated.items.length ? (
        <>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginated.items.map(
              (partner, index) => (
                <PartnerCard
                  key={partner.slug}
                  partner={partner}
                  index={index}
                />
              ),
            )}
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <PartnersPagination
              page={paginated.page}
              pageCount={
                paginated.pageCount
              }
              onPageChange={(nextPage) => {
                setPage(nextPage);

                document
                  .getElementById(
                    "partners-directory",
                  )
                  ?.scrollIntoView({
                    behavior:
                      window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "auto"
                        : "smooth",
                    block: "start",
                  });
              }}
            />

            <p
              className="text-xs font-semibold text-slate-400"
              aria-live="polite"
            >
              Showing {start} to {end} of{" "}
              {filtered.length} partners
            </p>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-[18px] border border-dashed border-[#C8D8EC] bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF4FF] text-[#1B519F]">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

          <h3 className="mt-4 text-lg font-black text-[#071B41]">
            No partners found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}