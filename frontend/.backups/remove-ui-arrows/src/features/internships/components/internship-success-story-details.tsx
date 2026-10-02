import Image from "next/image";
import Link from "next/link";

import type {
  InternshipSuccessStory,
} from "../data/internship-success-stories.data";

type Props = {
  story: InternshipSuccessStory;
  previousStory?: InternshipSuccessStory;
  nextStory?: InternshipSuccessStory;
};

export function InternshipSuccessStoryDetails({
  story,
  previousStory,
  nextStory,
}: Props) {
  return (
    <main className="internship-story-detail-page bg-[#F5F9FF]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/opportunities/internships#internship-success-stories"
            className="hidden"
          >
            {null}
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#EEF5FF] px-3 py-1 text-[9px] font-black uppercase tracking-wide text-[#1B519F]">
                  Internship Story
                </span>

                {story.demoOnly ? (
                  <span className="rounded-full bg-[#FFF3DF] px-3 py-1 text-[9px] font-black uppercase text-[#F59223]">
                    Content
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.05] tracking-[-.04em] text-[#1B519F]">
                {story.name}
              </h1>

              <p className="mt-3 text-lg font-black text-[#10213B]">
                {story.internshipTitle}
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                {story.organization}
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {story.summary}
              </p>
            </div>

            <div
              className="
                internship-story-media
                relative min-h-[320px]
                overflow-hidden
                rounded-[28px]
                border border-slate-200
                bg-[#EEF5FF]
                shadow-[0_18px_45px_rgba(27,81,159,.08)]
              "
            >
              {story.mediaType === "Photo" ? (
                <Image
                  src={story.mediaSrc}
                  alt={`${story.name} internship experience`}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw,45vw"
                  className="object-cover"
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
                    absolute inset-0
                    h-full w-full
                    bg-black
                    object-cover
                  "
                >
                  Your browser does not support video playback.
                </video>
              )}

              <span
                className="
                  absolute left-4 top-4
                  rounded-full
                  bg-white/95
                  px-3 py-1.5
                  text-[8px] font-black uppercase
                  text-[#1B519F]
                  shadow-sm
                  backdrop-blur
                "
              >
                {story.mediaType}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div
          className="
            mx-auto grid max-w-[1280px]
            gap-6 px-4 sm:px-6
            lg:grid-cols-[minmax(0,1fr)_320px]
            lg:px-8
          "
        >
          <div className="space-y-5">
            <section className="internship-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-[#F59223]">
                The Experience
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#1B519F]">
                Story Overview
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {story.fullStory}
              </p>
            </section>

            <section className="internship-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Experience Highlights
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {story.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-4 text-xs font-bold text-slate-700"
                  >
                    <span className="mr-2 text-[#F59223]">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="internship-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                What Was Learned
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {story.learning.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#EEF5FF] px-4 py-2 text-xs font-black text-[#1B519F]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="internship-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Outcome
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {story.outcome}
              </p>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="internship-story-detail-card rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-[9px] font-black uppercase tracking-[.14em] text-[#F59223]">
                Story Information
              </p>

              <dl className="mt-5 divide-y divide-slate-100">
                <div className="py-3">
                  <dt className="text-[9px] font-black uppercase text-slate-400">
                    Candidate
                  </dt>
                  <dd className="mt-1 text-sm font-black text-[#1B519F]">
                    {story.name}
                  </dd>
                </div>

                <div className="py-3">
                  <dt className="text-[9px] font-black uppercase text-slate-400">
                    Internship
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-700">
                    {story.internshipTitle}
                  </dd>
                </div>

                <div className="py-3">
                  <dt className="text-[9px] font-black uppercase text-slate-400">
                    Organization
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-700">
                    {story.organization}
                  </dd>
                </div>

                <div className="py-3">
                  <dt className="text-[9px] font-black uppercase text-slate-400">
                    Media
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-700">
                    {story.mediaType}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-8">
        <div
          className="
            mx-auto flex max-w-[1280px]
            items-center justify-between
            gap-4 px-4 sm:px-6 lg:px-8
          "
        >
          {previousStory ? (
            <Link
              href={`/opportunities/internships/stories/${previousStory.slug}`}
              className="
                rounded-xl border border-slate-200
                bg-white px-4 py-3
                text-xs font-black text-[#1B519F]
                transition
                hover:border-[#1B519F]
                hover:bg-[#EEF5FF]
              "
            >
              ← Previous Story
            </Link>
          ) : (
            <span className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-300">
              ← Previous Story
            </span>
          )}

          {nextStory ? (
            <Link
              href={`/opportunities/internships/stories/${nextStory.slug}`}
              className="
                rounded-xl bg-[#1B519F]
                px-4 py-3
                text-xs font-black text-white
                transition hover:bg-[#174783]
              "
            >
              Next Story →
            </Link>
          ) : (
            <span className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-300">
              Next Story →
            </span>
          )}
        </div>
      </section>
    </main>
  );
}

