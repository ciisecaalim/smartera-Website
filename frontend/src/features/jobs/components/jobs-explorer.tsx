"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Pagination } from "@/components/ui/pagination";
import type {
  Job,
  JobFilters,
} from "@/features/jobs/types/jobs.types";
import { filterJobs } from "@/features/jobs/utils/jobs.utils";
import { paginateItems } from "@/lib/pagination";

import { EmploymentSuccessStoriesSection } from "../sections/employment-success-stories-section";
import { JobCard } from "./job-card";

const JOBS_PER_PAGE = 8;

const initial: JobFilters = {
  query: "",
  location: "",
  category: "all",
  experience: "all",
  employmentType: "all",
  workMode: "all",
  sort: "newest",
};

const control =
  "jobs-theme-control h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-[#1B519F] focus:ring-2 focus:ring-[#1B519F]/10";

const popularSearches = [
  "Data Analyst",
  "Accountant",
  "Marketing",
];

function scrollToResults() {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  document.getElementById("jobs-results")?.scrollIntoView({
    behavior: reducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function JobsExplorer({
  jobs,
  heroImage = "/images/employment/employment.jpg",
  heroAlt = "Professionals exploring career opportunities",
}: {
  jobs: Job[];
  heroImage?: string;
  heroAlt?: string;
}) {
  const [filters, setFilters] = useState(initial);
  const [currentPage, setCurrentPage] = useState(1);

  const results = useMemo(
    () => filterJobs(jobs, filters),
    [jobs, filters],
  );

  const paginated = useMemo(
    () =>
      paginateItems(
        results,
        currentPage,
        JOBS_PER_PAGE,
      ),
    [results, currentPage],
  );

  const update = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K],
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));

    setCurrentPage(1);
  };

  const locations = [
    ...new Set(jobs.map((job) => job.location)),
  ];

  const categories = [
    ...new Set(jobs.map((job) => job.category)),
  ];

  const experiences = [
    ...new Set(
      jobs
        .map((job) => job.experienceLevel)
        .filter(Boolean),
    ),
  ];

  const types = [
    ...new Set(
      jobs.map((job) => job.employmentType),
    ),
  ];

  const modes = [
    ...new Set(
      jobs.map((job) => job.workMode),
    ),
  ];

  const clear = () => {
    setFilters(initial);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="jobs-hero-section relative isolate flex min-h-screen items-center overflow-hidden bg-[#071D3D] px-4 py-10 text-white sm:px-6 sm:py-12 lg:h-screen lg:px-8 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_12%_18%,rgba(27,81,159,.30),transparent_35%),radial-gradient(circle_at_88%_80%,rgba(245,146,35,.12),transparent_32%)]
            "
          />

          <svg
            viewBox="0 0 1600 720"
            preserveAspectRatio="none"
            className="
              absolute inset-0
              h-full w-full
              opacity-[0.09]
            "
          >
            <path
              d="M-120 130 C 180 30, 350 250, 650 130 S 1100 20, 1720 180"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            <path
              d="M-80 265 C 260 420, 430 80, 760 250 S 1210 390, 1690 220"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />

            <path
              d="M-140 480 C 220 300, 470 610, 810 410 S 1250 270, 1740 510"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />

            <path
              d="M80 760 C 240 470, 500 390, 720 520 S 1100 760, 1450 470"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />

            <path
              d="M250 -100 C 390 150, 530 120, 650 330 S 820 650, 1030 760"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="10 14"
            />

            <path
              d="M1180 -120 C 1030 150, 1280 260, 1160 440 S 980 610, 1080 800"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="8 16"
            />
          </svg>

          <div
            className="
              absolute -left-24 top-20
              h-64 w-64
              rounded-full
              border border-white/[0.05]
            "
          />

          <div
            className="
              absolute -right-32 bottom-[-120px]
              h-[420px] w-[420px]
              rounded-full
              border border-white/[0.05]
            "
          />
        </div>

        <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1.04fr_.96fr]">
          <div>
            <div className="jobs-hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.16em] text-blue-100 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F59223]" />
              Job Assistance
            </div>

            <h1 className="mt-6 max-w-2xl text-[clamp(2.7rem,5vw,5rem)] font-black leading-[.98] tracking-[-.05em]">
              Find the right
              <span className="block text-[#F59223]">
                work opportunity.
              </span>
            </h1>

            <p className="jobs-hero-description mt-6 max-w-xl text-sm leading-7 text-blue-100/80 sm:text-base">
              Explore professional and skilled work
              opportunities available through Smartera Hub.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                scrollToResults();
              }}
              className="jobs-hero-search mt-8 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-[0_18px_45px_rgba(27,81,159,.10)] backdrop-blur sm:grid sm:grid-cols-[1fr_.78fr_auto]"
            >
              <input
                aria-label="Job title or keyword"
                className="h-12 w-full rounded-xl bg-transparent px-3 text-sm text-slate-800 outline-none"
                placeholder="Job title or keyword"
                value={filters.query}
                onChange={(event) =>
                  update("query", event.target.value)
                }
              />

              <input
                aria-label="Job location"
                className="h-12 w-full rounded-xl border-t border-slate-100 bg-transparent px-3 text-sm text-slate-800 outline-none sm:border-l sm:border-t-0"
                placeholder="City or location"
                value={filters.location}
                onChange={(event) =>
                  update("location", event.target.value)
                }
              />

              <button className="mt-2 h-12 rounded-xl bg-[#F59223] px-6 text-xs font-black text-[#071D3D] sm:mt-0">
                Find Jobs
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  type="button"
                  onClick={() =>
                    update("query", search)
                  }
                  className="jobs-hero-popular rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold text-blue-50 transition hover:border-[#F59223]/60 hover:bg-white/10"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="relative aspect-[4/3.8] overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-[0_20px_55px_rgba(27,81,159,.12)]">
              <Image
                unoptimized
                src={heroImage}
                alt={heroAlt}
                fill
                priority
                sizes="(max-width:1024px) 100vw,46vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071D3D]/85 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#F59223]">
                  Open Opportunities
                </p>

                <p className="mt-1 text-xl font-black">
                  {jobs.length} opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="jobs-results"
        className="jobs-theme-section scroll-mt-24 bg-[#F5F9FF] py-12"
      >
        <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#F59223]">
                Current Opportunities
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#1B519F]">
                Explore Job Opportunities
              </h2>

              <p
                aria-live="polite"
                className="mt-1 text-xs font-bold text-slate-500"
              >
                {results.length}{" "}
                {results.length === 1
                  ? "Job"
                  : "Jobs"}{" "}
                Found
              </p>
            </div>

            <select
              aria-label="Sort jobs"
              className="jobs-theme-control h-11 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600"
              value={filters.sort}
              onChange={(event) =>
                update(
                  "sort",
                  event.target.value as JobFilters["sort"],
                )
              }
            >
              <option value="newest">Newest</option>
              <option value="alphabetical">
                Job Title A-Z
              </option>
            </select>
          </div>

          <div className="jobs-theme-panel mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <input
                aria-label="Search jobs"
                className={control}
                placeholder="Search jobs..."
                value={filters.query}
                onChange={(event) =>
                  update("query", event.target.value)
                }
              />

              <select
                aria-label="Job location"
                className={control}
                value={filters.location}
                onChange={(event) =>
                  update("location", event.target.value)
                }
              >
                <option value="">All Locations</option>
                {locations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                aria-label="Job category"
                className={control}
                value={filters.category}
                onChange={(event) =>
                  update(
                    "category",
                    event.target
                      .value as JobFilters["category"],
                  )
                }
              >
                <option value="all">
                  All Categories
                </option>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                aria-label="Experience level"
                className={control}
                value={filters.experience}
                onChange={(event) =>
                  update(
                    "experience",
                    event.target
                      .value as JobFilters["experience"],
                  )
                }
              >
                <option value="all">
                  All Experience
                </option>
                {experiences.map((item) =>
                  item ? (
                    <option key={item}>
                      {item}
                    </option>
                  ) : null,
                )}
              </select>

              <select
                aria-label="Employment type"
                className={control}
                value={filters.employmentType}
                onChange={(event) =>
                  update(
                    "employmentType",
                    event.target
                      .value as JobFilters["employmentType"],
                  )
                }
              >
                <option value="all">
                  All Types
                </option>
                {types.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                aria-label="Work mode"
                className={control}
                value={filters.workMode}
                onChange={(event) =>
                  update(
                    "workMode",
                    event.target
                      .value as JobFilters["workMode"],
                  )
                }
              >
                <option value="all">
                  All Modes
                </option>
                {modes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={clear}
                className="text-xs font-black text-[#1B519F]"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <main className="mt-6">
            {results.length ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {paginated.items.map(
                    (job, index) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        index={
                          (paginated.page - 1) *
                            paginated.pageSize +
                          index
                        }
                      />
                    ),
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 [&>nav]:mt-0">
                  <p
                    className="pt-3 text-sm font-bold text-slate-500"
                    aria-live="polite"
                  >
                    Current {paginated.items.length} /{" "}
                    {JOBS_PER_PAGE}
                  </p>

                  <Pagination
                    currentPage={paginated.page}
                    totalPages={paginated.totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      scrollToResults();
                    }}
                    ariaLabel="Jobs pagination"
                    alwaysShow
                  />
                </div>
              </>
            ) : (
              <div className="jobs-theme-panel rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h3 className="text-lg font-black text-[#1B519F]">
                  No jobs match your search.
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

                <button
                  onClick={clear}
                  className="mt-5 rounded-xl bg-[#1B519F] px-5 py-2.5 text-xs font-black text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      <EmploymentSuccessStoriesSection />
    </>
  );
}

