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
  heroImage = "/images/home/men-learning-v3.png",
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
      <section className="relative isolate overflow-hidden bg-[#F2F8FF]">

        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#075DCE]/[0.045] blur-3xl" />

          <div className="absolute -right-28 -top-24 h-[420px] w-[420px] rounded-full bg-[#68A8FF]/[0.08]" />

          <div className="absolute bottom-0 left-[43%] h-52 w-52 rounded-full bg-[#075DCE]/[0.055]" />

          <div className="absolute right-10 top-24 grid grid-cols-4 gap-[7px] opacity-25">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-[#075DCE]"
              />
            ))}
          </div>
        </div>

        <div className="mx-auto grid min-h-[430px] max-w-[1320px] items-center gap-10 px-4 py-10 sm:px-6 lg:min-h-[455px] lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8 lg:py-8">

          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <div className="relative z-10 max-w-[620px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F0FF] px-4 py-2 text-[#075DCE]">
              <BriefcaseIcon />

              <span className="text-[10px] font-black uppercase tracking-[0.11em] sm:text-[11px]">
                Internship Opportunities
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 max-w-[14ch] text-[clamp(2.45rem,4vw,4rem)] font-black leading-[1.02] tracking-[-0.045em] text-[#102A67]">
              Build Your Future Through{" "}
              <span className="text-[#0874F9]">
                Real Experience.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[570px] text-[14px] leading-7 text-[#526B91] sm:text-[15px]">
              Gain practical skills, work with real teams,
              and grow your career with our internship programs.
              We connect talented youth with leading organizations
              across Somalia.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap items-center gap-y-5">

              <div className="flex items-center gap-3 pr-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-[#0874F9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                  </svg>
                </span>

                <div>
                  <strong className="block text-[18px] font-black leading-none text-[#102A67]">
                    {internships.length}
                  </strong>

                  <span className="mt-1 block text-[10px] font-semibold text-slate-500">
                    Opportunities
                  </span>
                </div>
              </div>

              <span className="hidden h-10 w-px bg-[#D4E1F0] sm:block" />

              <div className="flex items-center gap-3 px-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-[#0874F9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>

                <div>
                  <strong className="block text-[18px] font-black leading-none text-[#102A67]">
                    {openCount}
                  </strong>

                  <span className="mt-1 block text-[10px] font-semibold text-slate-500">
                    Open Now
                  </span>
                </div>
              </div>

              <span className="hidden h-10 w-px bg-[#D4E1F0] sm:block" />

              <div className="flex items-center gap-3 pl-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-[#0874F9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="6" height="6" rx="1" />
                    <rect x="15" y="3" width="6" height="6" rx="1" />
                    <rect x="3" y="15" width="6" height="6" rx="1" />
                    <rect x="15" y="15" width="6" height="6" rx="1" />
                  </svg>
                </span>

                <div>
                  <strong className="block text-[18px] font-black leading-none text-[#102A67]">
                    {fields.length}
                  </strong>

                  <span className="mt-1 block text-[10px] font-semibold text-slate-500">
                    Career Fields
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* =================================================
              RIGHT VISUAL
          ================================================== */}
          <div className="relative mx-auto w-full max-w-[680px] lg:mx-0 lg:ml-auto">

            {/* Blue accent shape */}
            <div
              aria-hidden="true"
              className="absolute left-[4%] top-1/2 h-[230px] w-[230px] -translate-y-1/2 rounded-full bg-[#0874F9]"
            />

            {/* Main image */}
            <div className="relative ml-auto w-full max-w-[550px] pr-0 lg:mr-[115px] lg:w-[74%]">

              <div className="relative aspect-[16/11] overflow-hidden rounded-[42px] bg-[#D8E9FF] shadow-[0_18px_50px_rgba(29,80,145,0.12)]">
                <Image
                  unoptimized
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(max-width:1024px) 94vw, 42vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#102A67]/15 via-transparent to-transparent" />
              </div>
            </div>


            {/* Handwritten style text */}
            <div className="absolute right-2 top-3 hidden -rotate-3 text-center text-[#075DCE] lg:block">
              <p className="text-[15px] font-bold italic leading-[17px]">
                Skills
                <br />
                Create
                <br />
                Opportunities
              </p>

              <svg
                viewBox="0 0 100 40"
                fill="none"
                className="ml-3 mt-1 h-7 w-24"
                aria-hidden="true"
              >
                <path
                  d="M3 32C32 8 59 10 92 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="m84 11 10 7-10 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>


            {/* Benefit cards */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:absolute lg:right-0 lg:top-[108px] lg:mt-0 lg:w-[215px] lg:grid-cols-1">

              {/* Gain experience */}
              <div className="flex items-center gap-3 rounded-[20px] border border-white bg-white/95 px-4 py-3 shadow-[0_12px_32px_rgba(8,43,87,0.10)] backdrop-blur">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#0874F9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M5 20V10h4v10M10 20V4h4v16M15 20v-7h4v7" />
                  </svg>
                </span>

                <div>
                  <strong className="block text-[11px] font-black text-[#102A67]">
                    Gain Experience
                  </strong>

                  <span className="mt-0.5 block text-[9px] text-slate-500">
                    Build your skills
                  </span>
                </div>
              </div>

              {/* Network */}
              <div className="flex items-center gap-3 rounded-[20px] border border-white bg-white/95 px-4 py-3 shadow-[0_12px_32px_rgba(8,43,87,0.10)] backdrop-blur">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#0874F9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="8" r="3" />
                    <circle cx="17" cy="9" r="2.5" />
                    <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M14 15c4 0 7 1.5 7 5" />
                  </svg>
                </span>

                <div>
                  <strong className="block text-[11px] font-black text-[#102A67]">
                    Expand Your Network
                  </strong>

                  <span className="mt-0.5 block text-[9px] text-slate-500">
                    Meet new people
                  </span>
                </div>
              </div>

              {/* Career */}
              <div className="flex items-center gap-3 rounded-[20px] border border-white bg-white/95 px-4 py-3 shadow-[0_12px_32px_rgba(8,43,87,0.10)] backdrop-blur">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EAF3FF] text-[#0874F9]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M14 4c4-1 6-1 7-1 0 1 0 4-1 7l-7 7-6-6 7-7Z" />
                    <path d="m9 15-4 4M5 15l-2 6 6-2" />
                    <circle cx="16" cy="8" r="1.5" />
                  </svg>
                </span>

                <div>
                  <strong className="block text-[11px] font-black text-[#102A67]">
                    Grow Your Career
                  </strong>

                  <span className="mt-0.5 block text-[9px] text-slate-500">
                    Create new opportunities
                  </span>
                </div>
              </div>
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
