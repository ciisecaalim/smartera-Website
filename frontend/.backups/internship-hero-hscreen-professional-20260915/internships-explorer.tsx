"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type {
  Internship,
  InternshipField,
  InternshipFilters,
} from "../types/internships.types";

import { filterInternships } from "../utils/internships.utils";
import { InternshipCard } from "./internship-card";
import { InternshipSuccessStoriesSection } from "../sections/internship-success-stories-section";
import { Pagination } from "@/components/ui/pagination";
import { paginateItems } from "@/lib/pagination";

const initialFilters: InternshipFilters = {
  query: "",
  location: "",
  field: "all",
  duration: "",
  workMode: "all",
  eligibility: "",
  sort: "newest",
};

const filterControl =
  "h-12 w-full rounded-xl border border-[#DCE6F2] bg-white px-4 text-sm font-semibold text-[#334155] outline-none transition placeholder:text-slate-400 hover:border-[#BFD2EA] focus:border-[#075DCE] focus:ring-4 focus:ring-[#075DCE]/10";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}

export function InternshipsExplorer({
  internships,
  heroImage = "/images/internships/internships.jpg",
  heroAlt = "Young professionals collaborating during an internship",
}: {
  internships: Internship[];
  heroImage?: string;
  heroAlt?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const seededFilters: InternshipFilters = {
    ...initialFilters,
    query: searchParams.get("q") ?? "",
    location: searchParams.get("location") ?? "",
    field:
      (searchParams.get("field") as InternshipField | null) ??
      "all",
    duration: searchParams.get("duration") ?? "",
    workMode:
      (searchParams.get(
        "mode",
      ) as InternshipFilters["workMode"] | null) ??
      "all",
  };

  const [filters, setFilters] =
    useState<InternshipFilters>(seededFilters);

  const [currentPage, setCurrentPage] =
    useState(1);

  const results = useMemo(
    () => filterInternships(internships, filters),
    [internships, filters],
  );

  const paginated = useMemo(
    () => paginateItems(results, currentPage, 8),
    [results, currentPage],
  );

  const locations = useMemo(
    () =>
      [...new Set(internships.map((item) => item.location))]
        .filter(Boolean)
        .sort(),
    [internships],
  );

  const durations = useMemo(
    () =>
      [...new Set(internships.map((item) => item.duration))]
        .filter(Boolean)
        .sort(),
    [internships],
  );

  const modes = useMemo(
    () =>
      [...new Set(internships.map((item) => item.workMode))]
        .filter(Boolean),
    [internships],
  );

  const fields = useMemo(
    () =>
      [...new Set(internships.map((item) => item.field))]
        .filter(Boolean)
        .sort(),
    [internships],
  );

  const openCount = useMemo(
    () =>
      internships.filter(
        (item) =>
          item.canApply ||
          item.status === "open",
      ).length,
    [internships],
  );

  const updateFilter = <
    K extends keyof InternshipFilters,
  >(
    key: K,
    value: InternshipFilters[K],
  ) => {
    const next = {
      ...filters,
      [key]: value,
    };

    setFilters(next);
    setCurrentPage(1);

    const params =
      new URLSearchParams();

    if (next.query) {
      params.set("q", next.query);
    }

    if (next.location) {
      params.set(
        "location",
        next.location,
      );
    }

    if (next.field !== "all") {
      params.set(
        "field",
        next.field,
      );
    }

    if (next.duration) {
      params.set(
        "duration",
        next.duration,
      );
    }

    if (next.workMode !== "all") {
      params.set(
        "mode",
        next.workMode,
      );
    }

    router.replace(
      `${pathname}${
        params.size
          ? `?${params.toString()}`
          : ""
      }`,
      {
        scroll: false,
      },
    );
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);

    router.replace(
      pathname,
      {
        scroll: false,
      },
    );
  };

  const scrollToInternships = () => {
    const reduced =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    document
      .getElementById("all-internships")
      ?.scrollIntoView({
        behavior:
          reduced
            ? "auto"
            : "smooth",
        block: "start",
      });
  };

  const changePage = (
    page: number,
  ) => {
    setCurrentPage(page);

    scrollToInternships();
  };

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#F4F8FD]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
        >
          <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#075DCE]/8 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#F59223]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[620px] max-w-[1280px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.92fr] lg:px-8 lg:py-20">
          {/* Hero copy */}
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#075DCE]/15 bg-white px-3.5 py-2 shadow-sm">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EAF3FF] text-[#075DCE]">
                <BriefcaseIcon />
              </span>

              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#075DCE]">
                Internship Opportunities
              </span>
            </div>

            <h1 className="mt-6 max-w-[13ch] text-[clamp(2.75rem,5vw,4.9rem)] font-black leading-[0.99] tracking-[-0.055em] text-[#071B41]">
              Build Your Future Through{" "}
              <span className="text-[#075DCE]">
                Real Experience.
              </span>
            </h1>

            <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-slate-600 sm:text-base">
              Discover practical internship opportunities,
              work with real teams, develop job-ready
              skills, and build experience that strengthens
              your career.
            </p>

            {/* Quick search */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                scrollToInternships();
              }}
              className="mt-8 max-w-[690px] rounded-2xl border border-[#DCE6F2] bg-white p-2 shadow-[0_18px_45px_rgba(8,43,87,0.10)]"
            >
              <div className="grid gap-2 md:grid-cols-[1.3fr_.8fr_auto]">
                <label className="relative block">
                  <span className="sr-only">
                    Search internships
                  </span>

                  <SearchIcon />

                  <input
                    aria-label="Search internships"
                    value={filters.query}
                    onChange={(event) =>
                      updateFilter(
                        "query",
                        event.target.value,
                      )
                    }
                    placeholder="Search internships..."
                    className="h-12 w-full rounded-xl bg-[#F8FAFC] pl-11 pr-4 text-sm font-medium text-[#071B41] outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-[#075DCE]/15 [&+svg]:absolute"
                  />
                </label>

                <label className="relative block">
                  <span className="sr-only">
                    Internship location
                  </span>

                  <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400">
                    <LocationIcon />
                  </span>

                  <select
                    aria-label="Internship location"
                    value={filters.location}
                    onChange={(event) =>
                      updateFilter(
                        "location",
                        event.target.value,
                      )
                    }
                    className="h-12 w-full appearance-none rounded-xl bg-[#F8FAFC] pl-11 pr-8 text-sm font-semibold text-[#334155] outline-none transition focus:bg-white focus:ring-2 focus:ring-[#075DCE]/15"
                  >
                    <option value="">
                      All Locations
                    </option>

                    {locations.map(
                      (location) => (
                        <option
                          key={location}
                          value={location}
                        >
                          {location}
                        </option>
                      ),
                    )}
                  </select>
                </label>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#075DCE] px-6 text-sm font-black text-white shadow-[0_10px_24px_rgba(7,93,206,0.20)] transition hover:-translate-y-0.5 hover:bg-[#064EAD] hover:shadow-[0_14px_28px_rgba(7,93,206,0.25)]"
                >
                  <SearchIcon />
                  Search
                </button>
              </div>
            </form>

            {/* Hero stats */}
            <div className="mt-7 flex flex-wrap gap-5 text-sm">
              <div>
                <strong className="block text-xl font-black text-[#071B41]">
                  {internships.length}
                </strong>
                <span className="text-xs font-semibold text-slate-500">
                  Opportunities
                </span>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <strong className="block text-xl font-black text-[#071B41]">
                  {openCount}
                </strong>
                <span className="text-xs font-semibold text-slate-500">
                  Open Now
                </span>
              </div>

              <div className="h-10 w-px bg-slate-200" />

              <div>
                <strong className="block text-xl font-black text-[#071B41]">
                  {fields.length}
                </strong>
                <span className="text-xs font-semibold text-slate-500">
                  Fields
                </span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border-[6px] border-white bg-slate-100 shadow-[0_28px_70px_rgba(8,43,87,0.18)]">
              <Image
                unoptimized
                src={heroImage}
                alt={heroAlt}
                fill
                priority
                sizes="(max-width:1024px) 95vw, 44vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071B41]/45 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/80 bg-white/95 px-5 py-4 shadow-[0_18px_45px_rgba(8,43,87,0.16)] backdrop-blur sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  ✓
                </span>

                <div>
                  <strong className="block text-sm font-black text-[#071B41]">
                    Practical Experience
                  </strong>

                  <span className="text-[11px] font-medium text-slate-500">
                    Learn. Practice. Grow.
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-8 rounded-2xl bg-[#075DCE] px-4 py-3 text-white shadow-[0_16px_35px_rgba(7,93,206,0.25)] sm:-right-6">
              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-blue-100">
                Career Ready
              </p>

              <p className="mt-1 text-sm font-black">
                Build skills that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LISTINGS
      ====================================================== */}
      <section
        id="all-internships"
        className="scroll-mt-24 bg-[#F7F9FC] py-14 lg:py-16"
      >
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-[#F59223]">
                Current Opportunities
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#071B41] sm:text-[34px]">
                Explore Internships
              </h2>

              <p
                aria-live="polite"
                className="mt-2 text-sm font-medium text-slate-500"
              >
                {results.length}{" "}
                {results.length === 1
                  ? "internship"
                  : "internships"}{" "}
                found
              </p>
            </div>

            <label className="w-full lg:w-[190px]">
              <span className="sr-only">
                Sort internships
              </span>

              <select
                aria-label="Sort internships"
                value={filters.sort}
                onChange={(event) =>
                  updateFilter(
                    "sort",
                    event.target
                      .value as InternshipFilters["sort"],
                  )
                }
                className={filterControl}
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="alphabetical">
                  Title A-Z
                </option>
              </select>
            </label>
          </div>

          {/* Professional filter bar */}
          <div className="mt-7 rounded-[20px] border border-[#DCE6F2] bg-white p-4 shadow-[0_8px_30px_rgba(8,43,87,0.055)] sm:p-5">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.35fr_repeat(4,1fr)]">
              <input
                aria-label="Search internships"
                value={filters.query}
                onChange={(event) =>
                  updateFilter(
                    "query",
                    event.target.value,
                  )
                }
                placeholder="Search internships..."
                className={filterControl}
              />

              <select
                aria-label="Internship category"
                value={filters.field}
                onChange={(event) =>
                  updateFilter(
                    "field",
                    event.target
                      .value as InternshipField | "all",
                  )
                }
                className={filterControl}
              >
                <option value="all">
                  All Categories
                </option>

                {fields.map((field) => (
                  <option
                    key={field}
                    value={field}
                  >
                    {field}
                  </option>
                ))}
              </select>

              <select
                aria-label="Internship location"
                value={filters.location}
                onChange={(event) =>
                  updateFilter(
                    "location",
                    event.target.value,
                  )
                }
                className={filterControl}
              >
                <option value="">
                  All Locations
                </option>

                {locations.map(
                  (location) => (
                    <option
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ),
                )}
              </select>

              <select
                aria-label="Internship work mode"
                value={filters.workMode}
                onChange={(event) =>
                  updateFilter(
                    "workMode",
                    event.target
                      .value as InternshipFilters["workMode"],
                  )
                }
                className={filterControl}
              >
                <option value="all">
                  All Modes
                </option>

                {modes.map((mode) => (
                  <option
                    key={mode}
                    value={mode}
                  >
                    {mode}
                  </option>
                ))}
              </select>

              <select
                aria-label="Internship duration"
                value={filters.duration}
                onChange={(event) =>
                  updateFilter(
                    "duration",
                    event.target.value,
                  )
                }
                className={filterControl}
              >
                <option value="">
                  All Durations
                </option>

                {durations.map(
                  (duration) => (
                    <option
                      key={duration}
                      value={duration}
                    >
                      {duration}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-xs font-medium text-slate-500">
                Filter opportunities by category,
                location, work mode, or duration.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg px-3 py-2 text-xs font-black text-[#075DCE] transition hover:bg-[#EEF5FF]"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Cards */}
          <main className="mt-7">
            {results.length ? (
              <>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginated.items.map(
                    (internship) => (
                      <InternshipCard
                        key={internship.id}
                        internship={internship}
                      />
                    ),
                  )}
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0">
                  <p
                    className="text-center text-sm font-semibold text-slate-500"
                    aria-live="polite"
                  >
                    Showing{" "}
                    {paginated.items.length} of{" "}
                    {results.length}
                  </p>

                  <Pagination
                    currentPage={paginated.page}
                    totalPages={paginated.totalPages}
                    onPageChange={changePage}
                    ariaLabel="Internships pagination"
                    alwaysShow
                  />
                </div>
              </>
            ) : (
              <div className="rounded-[20px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#EEF5FF] text-[#075DCE]">
                  <SearchIcon />
                </span>

                <h3 className="mt-4 text-lg font-black text-[#071B41]">
                  No internships match your search.
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search terms or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#075DCE] px-5 py-2.5 text-xs font-black text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      <InternshipSuccessStoriesSection />

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#F59223]">
              Simple Process
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#071B41]">
              How Internships Work
            </h2>

            <ol className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                "Find an Internship",
                "Apply",
                "Organization Review",
                "Start Internship",
                "Grow Your Career",
              ].map((step, index) => (
                <li
                  key={step}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 text-center"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF3FF] font-black text-[#075DCE]">
                    {index + 1}
                  </span>

                  <strong className="mt-3 block text-xs leading-5 text-[#071B41]">
                    {step}
                  </strong>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#F59223]">
              Career Value
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#071B41]">
              What You Gain
            </h2>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                "Real Experience",
                "Professional Skills",
                "Build Your Portfolio",
                "Professional Network",
                "Career Readiness",
                "Workplace Confidence",
              ].map((value) => (
                <div
                  key={value}
                  className="rounded-xl border border-[#DCE6F2] bg-white p-4 text-xs font-black text-[#075DCE]"
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1160px] flex-col items-start justify-between gap-5 rounded-[20px] bg-[#EEF5FF] p-6 sm:flex-row sm:items-center lg:px-8">
          <div>
            <h2 className="text-xl font-black text-[#071B41]">
              From Internship to Career
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Build experience today. Become job-ready tomorrow.
            </p>
          </div>

          <Link
            href="/opportunities/jobs"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#075DCE] px-6 text-xs font-black text-white transition hover:bg-[#064EAD]"
          >
            Explore Jobs
          </Link>
        </div>
      </section>
    </>
  );
}