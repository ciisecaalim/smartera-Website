"use client";

import {
  useEffect,
  useState,
} from "react";

import { Pagination } from "@/components/ui/pagination";

import {
  getPublishedInternshipHistory,
  internshipHistoryAsset,
  type PublicInternshipHistory,
} from "../data/internship-history.data";

const STORIES_PER_PAGE = 8;

const cardDecorations = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-orange-400",
];

export function InternshipSuccessStoriesSection() {
  const [
    allStories,
    setAllStories,
  ] = useState<
    PublicInternshipHistory[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    failedImages,
    setFailedImages,
  ] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    let active = true;

    void getPublishedInternshipHistory()
      .then((items) => {
        if (active) {
          setAllStories(items);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

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

  const start =
    (page - 1) *
    STORIES_PER_PAGE;

  const stories =
    allStories.slice(
      start,
      start + STORIES_PER_PAGE,
    );

  function changePage(
    nextPage: number,
  ) {
    setPage(nextPage);

    document
      .getElementById(
        "internship-success-stories",
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <section
      id="internship-success-stories"
      className="scroll-mt-24 bg-white py-14"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#F59223]">
            Previous Experiences
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#1B519F]">
            Internship Success Stories
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Hear directly from interns
            about their experience,
            learning, and professional
            growth.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 text-center text-sm font-semibold text-slate-500">
            Loading internship
            experiences...
          </div>
        ) : null}

        {!loading &&
        stories.length ? (
          <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stories.map(
              (
                story,
                index,
              ) => {
                const photo =
                  internshipHistoryAsset(
                    story.photoUrl,
                  );

                const hasPhoto =
                  Boolean(photo) &&
                  !failedImages[
                    story.id
                  ];

                const initial =
                  story.internName
                    .trim()
                    .charAt(0)
                    .toUpperCase() ||
                  "?";

                const decoration =
                  cardDecorations[
                    index %
                      cardDecorations.length
                  ];

                return (
                  <article
                    key={story.id}
                    className="group relative mx-auto w-full max-w-[290px] pt-8"
                  >
                    <div
                      aria-hidden="true"
                      className={[
                        "absolute",
                        "left-4 right-4",
                        "top-12 -bottom-3",
                        "rotate-6",
                        "rounded-[28px]",
                        decoration,
                        "opacity-90",
                        "transition-transform",
                        "duration-500",
                        "group-hover:rotate-3",
                      ].join(" ")}
                    />

                    <div className="relative min-h-[285px] rounded-[22px] bg-white px-6 pb-7 pt-16 text-center shadow-[0_12px_35px_rgba(15,23,42,.18)] transition-transform duration-500 group-hover:-translate-y-1">
                      <div className="absolute left-1/2 top-0 flex h-[82px] w-[82px] -translate-x-1/2 -translate-y-[38%] items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#EEF5FF] shadow-md">
                        {hasPhoto ? (
                          <img
                            src={photo}
                            alt={
                              story.internName
                            }
                            onError={() =>
                              setFailedImages(
                                (
                                  current,
                                ) => ({
                                  ...current,
                                  [story.id]:
                                    true,
                                }),
                              )
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-black text-[#1B519F]">
                            {initial}
                          </span>
                        )}
                      </div>

                      <h3 className="text-[18px] font-bold text-slate-900">
                        {
                          story.internName
                        }
                      </h3>

                      <p className="mt-1 text-[12px] italic text-slate-500">
                        {
                          story.internshipTitle
                        }
                      </p>

                      <p className="mx-auto mt-5 line-clamp-4 max-w-[220px] text-[11px] leading-5 text-slate-400">
                        {
                          story.comment
                        }
                      </p>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : null}

        {!loading &&
        !allStories.length ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
            <p className="font-bold text-[#1B519F]">
              No internship experiences
              yet.
            </p>
          </div>
        ) : null}

        {!loading &&
        allStories.length ? (
          <div className="mt-10 flex items-center justify-center">
            <Pagination
              currentPage={page}
              totalPages={
                totalPages
              }
              onPageChange={
                changePage
              }
              ariaLabel="Internship success stories pagination"
              alwaysShow
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}