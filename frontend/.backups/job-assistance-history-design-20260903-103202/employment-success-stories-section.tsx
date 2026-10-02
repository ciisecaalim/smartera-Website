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

const STORIES_PER_PAGE = 8;

const decorations = [
  {
    background:
      "linear-gradient(135deg,#159ac0,#258cc7)",
    rotate: "-rotate-[10deg]",
  },
  {
    background:
      "linear-gradient(135deg,#55c65c,#6ec45e)",
    rotate: "rotate-[9deg]",
  },
  {
    background:
      "linear-gradient(135deg,#35a896,#43b5a6)",
    rotate: "rotate-[8deg]",
  },
  {
    background:
      "linear-gradient(135deg,#f49a35,#f5b444)",
    rotate: "-rotate-[9deg]",
  },
];

function EmploymentPlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-8 w-8 text-[#1B519F]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
      />

      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

      <path d="M3 12h18" />

      <path d="M10 12v2h4v-2" />
    </svg>
  );
}

function StoryImage({
  story,
}: {
  story: PublicJobSeekerHistory;
}) {
  const [
    failed,
    setFailed,
  ] = useState(false);

  if (
    !story.imageUrl ||
    failed
  ) {
    return (
      <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full border-[5px] border-white bg-[#EEF5FF] shadow-[0_7px_18px_rgba(15,23,42,.18)]">
        <EmploymentPlaceholderIcon />
      </div>
    );
  }

  return (
    <div className="h-[86px] w-[86px] overflow-hidden rounded-full border-[5px] border-white bg-slate-100 shadow-[0_7px_18px_rgba(15,23,42,.18)]">
      <img
        src={story.imageUrl}
        alt=""
        onError={() =>
          setFailed(true)
        }
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export function EmploymentSuccessStoriesSection() {
  const [
    allStories,
    setAllStories,
  ] = useState<
    PublicJobSeekerHistory[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    page,
    setPage,
  ] = useState(1);

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
  }, [
    page,
    totalPages,
  ]);

  const stories = useMemo(
    () => {
      const start =
        (page - 1) *
        STORIES_PER_PAGE;

      return allStories.slice(
        start,
        start +
          STORIES_PER_PAGE,
      );
    },
    [
      allStories,
      page,
    ],
  );

  const changePage = (
    nextPage: number,
  ) => {
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
      behavior:
        reducedMotion
          ? "auto"
          : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="employment-success-stories"
      className="scroll-mt-24 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#F59223]">
            Previous Employment
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#1B519F]">
            Employment Success Stories
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Real employment success stories
            from people who moved forward
            into professional opportunities.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({
              length: 4,
            }).map(
              (_, index) => (
                <div
                  key={index}
                  className="mx-auto h-[260px] w-full max-w-[300px] animate-pulse rounded-[24px] bg-slate-100"
                />
              ),
            )}
          </div>
        ) : null}

        {!loading &&
        error ? (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-500">
            {error}
          </div>
        ) : null}

        {!loading &&
        !error &&
        !allStories.length ? (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-5 py-5 text-center text-sm font-semibold text-slate-500">
            Employment success stories
            will appear here soon.
          </div>
        ) : null}

        {!loading &&
        !error &&
        stories.length ? (
          <div className="mt-14 grid items-stretch gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stories.map(
              (
                story,
                index,
              ) => {
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
                    className="group relative mx-auto w-full max-w-[305px] pt-[42px]"
                  >
                    {/* Colored rotated background */}
                    <div
                      aria-hidden="true"
                      style={{
                        background:
                          decoration.background,
                      }}
                      className={[
                        "absolute",
                        "left-[12px]",
                        "right-[12px]",
                        "top-[54px]",
                        "-bottom-[9px]",
                        "rounded-[24px]",
                        decoration.rotate,
                        "transition-transform",
                        "duration-500",
                        "group-hover:scale-[1.025]",
                      ].join(" ")}
                    />

                    {/* White card */}
                    <div className="relative z-10 min-h-[245px] rounded-[24px] bg-white px-6 pb-7 pt-[58px] text-center shadow-[0_12px_35px_rgba(15,23,42,.18)] transition-transform duration-500 group-hover:-translate-y-1">
                      {/* Circular image */}
                      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                        <StoryImage
                          story={story}
                        />
                      </div>

                      <h3 className="text-[17px] font-semibold leading-6 text-slate-800">
                        {story.title}
                      </h3>

                      <div className="mx-auto mt-3 h-px w-10 bg-slate-200" />

                      <p className="mt-4 line-clamp-5 text-[12px] leading-[1.8] text-slate-500">
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
          <div className="mt-12 flex justify-center">
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