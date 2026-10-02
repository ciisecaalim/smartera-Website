"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Pagination } from "@/components/ui/pagination";

import {
  getPublicJobSeekerHistory,
  type PublicJobSeekerHistory,
} from "../data/job-seeker-history.data";

const STORIES_PER_PAGE = 6;

const decorations = [
  {
    primary: "#159AC0",
    secondary: "#67C35E",
    rotateOne: "-rotate-[7deg]",
    rotateTwo: "rotate-[7deg]",
  },
  {
    primary: "#F0A33A",
    secondary: "#62C266",
    rotateOne: "rotate-[7deg]",
    rotateTwo: "-rotate-[7deg]",
  },
  {
    primary: "#39A9A0",
    secondary: "#2C8FC6",
    rotateOne: "-rotate-[8deg]",
    rotateTwo: "rotate-[6deg]",
  },
];

function EmploymentPlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-9 w-9 text-[#1B519F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function StoryImage({
  story,
}: {
  story: PublicJobSeekerHistory;
}) {
  const [failed, setFailed] =
    useState(false);

  if (!story.imageUrl || failed) {
    return (
      <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full border-[6px] border-white bg-[#EEF5FF] shadow-[0_10px_28px_rgba(15,23,42,.20)]">
        <EmploymentPlaceholderIcon />
      </div>
    );
  }

  return (
    <div className="h-[104px] w-[104px] overflow-hidden rounded-full border-[6px] border-white bg-slate-100 shadow-[0_10px_28px_rgba(15,23,42,.20)]">
      <img
        src={story.imageUrl}
        alt={story.fullName || story.title}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function formatDate(
  value?: string | null,
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
}

export function EmploymentSuccessStoriesSection() {
  const [
    allStories,
    setAllStories,
  ] = useState<
    PublicJobSeekerHistory[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [page, setPage] =
    useState(1);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const result =
          await getPublicJobSeekerHistory();

        if (!active) {
          return;
        }

        setAllStories(result);
      } catch {
        if (!active) {
          return;
        }

        setError(
          "Employment success stories are unavailable right now.",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const totalPages = Math.max(
    1,
    Math.ceil(
      allStories.length /
        STORIES_PER_PAGE,
    ),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const stories = useMemo(
    () => {
      const start =
        (page - 1) *
        STORIES_PER_PAGE;

      return allStories.slice(
        start,
        start + STORIES_PER_PAGE,
      );
    },
    [allStories, page],
  );

  function changePage(
    nextPage: number,
  ) {
    setPage(nextPage);

    const section =
      document.getElementById(
        "employment-success-stories",
      );

    if (!section) {
      return;
    }

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    section.scrollIntoView({
      behavior: reducedMotion
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <section
      id="employment-success-stories"
      className="scroll-mt-24 overflow-hidden bg-[#F9FBFE] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#F59223]">
            Previous Employment
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#1B519F] sm:text-4xl lg:text-[42px]">
            Employment Success Stories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Real stories from people who
            received job assistance and moved
            forward into professional
            opportunities.
          </p>
        </div>

        {loading ? (
          <div className="mt-20 grid gap-x-12 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="mx-auto h-[330px] w-full max-w-[350px] animate-pulse rounded-[30px] bg-slate-200"
              />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center text-sm font-semibold text-slate-500">
            {error}
          </div>
        ) : null}

        {!loading &&
        !error &&
        !allStories.length ? (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-6 text-center text-sm font-semibold text-slate-500">
            Employment success stories
            will appear here soon.
          </div>
        ) : null}

        {!loading &&
        !error &&
        stories.length ? (
          <div className="mt-24 grid items-stretch gap-x-12 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map(
              (story, index) => {
                const globalIndex =
                  (page - 1) *
                    STORIES_PER_PAGE +
                  index;

                const decoration =
                  decorations[
                    globalIndex %
                      decorations.length
                  ];

                return (
                  <article
                    key={story.id}
                    className="group relative mx-auto w-full max-w-[350px] pt-[58px]"
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        background:
                          decoration.secondary,
                      }}
                      className={[
                        "absolute",
                        "left-[20px]",
                        "right-[20px]",
                        "top-[72px]",
                        "bottom-[-12px]",
                        "rounded-[30px]",
                        decoration.rotateTwo,
                        "opacity-95",
                        "transition-transform",
                        "duration-500",
                        "group-hover:rotate-[10deg]",
                      ].join(" ")}
                    />

                    <div
                      aria-hidden="true"
                      style={{
                        background:
                          decoration.primary,
                      }}
                      className={[
                        "absolute",
                        "left-[18px]",
                        "right-[18px]",
                        "top-[72px]",
                        "bottom-[-12px]",
                        "rounded-[30px]",
                        decoration.rotateOne,
                        "transition-transform",
                        "duration-500",
                        "group-hover:-rotate-[10deg]",
                      ].join(" ")}
                    />

                    <div className="relative z-10 min-h-[300px] rounded-[30px] bg-white px-7 pb-8 pt-[72px] text-center shadow-[0_18px_50px_rgba(15,23,42,.15)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_65px_rgba(15,23,42,.20)]">
                      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                        <StoryImage
                          story={story}
                        />
                      </div>

                      <h3 className="text-xl font-bold leading-7 text-slate-800">
                        {story.fullName ||
                          "Smartera Graduate"}
                      </h3>

                      <p className="mt-2 text-sm font-medium italic text-slate-500">
                        {story.title}
                      </p>

                      {story.date ? (
                        <p className="mt-3 text-[10px] font-black uppercase tracking-[.15em] text-[#1B519F]/70">
                          {formatDate(
                            story.date,
                          )}
                        </p>
                      ) : null}

                      <div className="mx-auto mt-4 h-px w-12 bg-slate-200" />

                      <p className="mt-5 line-clamp-6 text-[13px] leading-[1.9] text-slate-500">
                        {story.story}
                      </p>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : null}

        {!loading &&
        !error &&
        allStories.length >
          STORIES_PER_PAGE ? (
          <div className="mt-16 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={
                changePage
              }
              ariaLabel="Employment success stories pagination"
              alwaysShow
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
