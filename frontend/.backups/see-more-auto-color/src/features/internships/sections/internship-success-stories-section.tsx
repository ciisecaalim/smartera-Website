"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Pagination } from "@/components/ui/pagination";

import {
  getPublishedInternshipSuccessStories,
} from "../data/internship-success-stories.data";

const STORIES_PER_PAGE = 8;

const directions = [
  "-translate-y-full",
  "translate-x-full",
  "translate-y-full",
  "-translate-x-full",
  "-translate-x-full -translate-y-full",
  "translate-x-full -translate-y-full",
  "translate-x-full translate-y-full",
  "-translate-x-full translate-y-full",
];

export function InternshipSuccessStoriesSection() {
  const allStories = getPublishedInternshipSuccessStories();
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(allStories.length / STORIES_PER_PAGE),
  );

  const start = (page - 1) * STORIES_PER_PAGE;

  const stories = allStories.slice(
    start,
    start + STORIES_PER_PAGE,
  );

  const changePage = (nextPage: number) => {
    setPage(nextPage);

    const section = document.getElementById(
      "internship-success-stories",
    );

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    section.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="internship-success-stories"
      className="
        internship-success-theme-section
        scroll-mt-24 bg-white py-12
      "
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#F59223]">
            Previous Experiences
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#1B519F]">
            Internship Success Stories
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Explore previous internship experiences and see how
            practical workplace exposure can support professional
            development and career readiness.
          </p>

          <p className="mt-2 text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Preview Content
          </p>
        </div>

        <div
          className="
            mt-7 grid
            items-stretch
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {stories.map((story, index) => {
            const globalIndex =
              (page - 1) * STORIES_PER_PAGE + index;

            const direction =
              directions[globalIndex % directions.length];

            return (
              <article
                key={story.id}
                className="
                  internship-success-card
                  group
                  flex h-full min-h-[410px] flex-col
                  overflow-hidden
                  rounded-2xl
                  border border-slate-200
                  bg-white

                  shadow-[0_6px_20px_rgba(15,23,42,.06)]

                  transition-[transform,box-shadow,border-color]
                  duration-500 ease-out

                  hover:-translate-y-1
                  hover:scale-[1.01]
                  hover:border-[#1B519F]/35
                  hover:shadow-[0_18px_40px_rgba(27,81,159,.16)]

                  motion-reduce:transform-none
                "
              >
                {/* =================================================
                    MEDIA
                    BLUE HOVER NEVER COVERS THIS AREA
                   ================================================= */}
                <div
                  className="
                    internship-success-media
                    relative h-[175px] shrink-0
                    overflow-hidden
                    border-b border-slate-100
                    bg-[#EEF5FF]
                  "
                >
                  {story.mediaType === "Photo" ? (
                    <Image
                      src={story.mediaSrc}
                      alt={`${story.name} internship story`}
                      fill
                      sizes="
                        (max-width:640px) 100vw,
                        (max-width:1024px) 50vw,
                        25vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.035]
                        motion-reduce:transform-none
                      "
                    />
                  ) : (
                    <video
                      src={story.mediaSrc}
                      poster={story.posterImage}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="
                        h-full w-full
                        bg-black
                        object-cover
                      "
                    >
                      Your browser does not support video playback.
                    </video>
                  )}

                  <div
                    className="
                      pointer-events-none
                      absolute inset-x-0 top-0
                      z-10
                      flex items-start justify-between
                      p-3
                    "
                  >
                    <span
                      className="
                        rounded-full
                        bg-white/95
                        px-3 py-1
                        text-[7px] font-black uppercase
                        tracking-wide text-[#1B519F]
                        shadow-sm backdrop-blur
                      "
                    >
                      {story.mediaType}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    LOWER CONTENT
                    BLUE HOVER FILLS THIS ENTIRE AREA
                   ================================================= */}
                <div
                  className="
                    relative
                    flex flex-1 flex-col
                    overflow-hidden
                    bg-white
                  "
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none",
                      "absolute inset-0 z-0",
                      "bg-[#1B519F]",
                      "transition-transform duration-[1000ms]",
                      "ease-[cubic-bezier(.22,1,.36,1)]",
                      "group-hover:translate-x-0",
                      "group-hover:translate-y-0",
                      "motion-reduce:transition-none",
                      direction,
                    ].join(" ")}
                  />

                  <div
                    className="
                      relative z-10
                      flex h-full flex-1 flex-col
                      p-5
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className="
                            text-[15px] font-black
                            leading-5 text-[#1B519F]
                            transition-colors duration-500
                            group-hover:!text-white
                          "
                        >
                          {story.name}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[11px] font-bold
                            text-slate-700
                            transition-colors duration-500
                            group-hover:!text-white
                          "
                        >
                          {story.internshipTitle}
                        </p>
                      </div>
                    </div>

                    <p
                      className="
                        mt-2
                        text-[10px] font-semibold
                        text-slate-500

                        transition-colors duration-500
                        group-hover:!text-white/80
                      "
                    >
                      {story.organization}
                    </p>

                    <p
                      className="
                        mt-4
                        line-clamp-3
                        text-[11px]
                        leading-5
                        text-slate-600

                        transition-colors duration-500
                        group-hover:!text-white/90
                      "
                    >
                      {story.summary}
                    </p>

                    <div
                      className="
                        mt-auto
                        border-t border-slate-100
                        pt-4

                        transition-colors duration-500
                        group-hover:border-white/25
                      "
                    >
                      <Link
                        href={`/opportunities/internships/stories/${story.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] font-black transition-all duration-500 group-hover:!text-white !border-0 !bg-transparent !text-black hover:!bg-transparent hover:!text-black hover:underline"
                      >
                        See More...

                        <span
                          aria-hidden="true"
                          className="
                            transition-transform duration-500
                            group-hover:translate-x-1.5
                          "
                        >
                          
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className="
            mt-8
            flex flex-wrap
            items-center justify-center
            gap-4
          "
        >
          <p
            aria-live="polite"
            className="
              pt-3
              text-xs font-bold
              text-slate-500
            "
          >
            Current {stories.length} / {STORIES_PER_PAGE}
          </p>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={changePage}
            ariaLabel="Internship success stories pagination"
            alwaysShow
          />
        </div>
      </div>
    </section>
  );
}
