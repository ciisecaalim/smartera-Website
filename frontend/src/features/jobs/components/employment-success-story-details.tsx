import Image from "next/image";
import Link from "next/link";

import type {
  EmploymentSuccessStory,
} from "../data/employment-success-stories.data";

type Props = {
  story: EmploymentSuccessStory;
  previousStory?: EmploymentSuccessStory;
  nextStory?: EmploymentSuccessStory;
};

export function EmploymentSuccessStoryDetails({
  story,
  previousStory,
  nextStory,
}: Props) {
  return (
    <main className="employment-story-detail-page bg-[#F5F9FF]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/opportunities/jobs#employment-success-stories"
            className="hidden"
          >
            {null}
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[.15em] text-[#F59223]">
                Employment Story
              </p>

              <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-black text-[#1B519F]">
                {story.name}
              </h1>

              <p className="mt-3 text-lg font-black text-slate-800">
                {story.jobTitle}
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                {story.organization}
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-600">
                {story.summary}
              </p>
            </div>

            <div className="employment-story-media relative min-h-[320px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#EEF5FF]">
              {story.mediaType === "Photo" ? (
                <Image
                  src={story.mediaSrc}
                  alt={`${story.name} employment experience`}
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
                  className="absolute inset-0 h-full w-full bg-black object-cover"
                />
              )}

              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[8px] font-black uppercase text-[#1B519F]">
                {story.mediaType}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div className="space-y-5">
            <section className="employment-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black text-[#1B519F]">
                Story Overview
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {story.fullStory}
              </p>
            </section>

            <section className="employment-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Career Highlights
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {story.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-[#F8FBFF] p-4 text-xs font-bold text-slate-700"
                  >
                    <span className="mr-2 text-[#F59223]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="employment-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Skills Used
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {story.skills.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#EEF5FF] px-4 py-2 text-xs font-black text-[#1B519F]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="employment-story-detail-card rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-black text-[#1B519F]">
                Outcome
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {story.outcome}
              </p>
            </section>
          </div>

          <aside className="employment-story-detail-card h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-28">
            <p className="text-[9px] font-black uppercase tracking-[.14em] text-[#F59223]">
              Employment Information
            </p>

            <p className="mt-5 text-sm font-black text-[#1B519F]">
              {story.name}
            </p>

            <p className="mt-2 text-sm font-bold text-slate-700">
              {story.jobTitle}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {story.organization}
            </p>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-[1280px] justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {previousStory ? (
            <Link
              href={`/opportunities/jobs/stories/${previousStory.slug}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-[#1B519F]"
            >
               Previous Story
            </Link>
          ) : (
            <span className="rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-300">
               Previous Story
            </span>
          )}

          {nextStory ? (
            <Link
              href={`/opportunities/jobs/stories/${nextStory.slug}`}
              className="rounded-xl bg-[#1B519F] px-4 py-3 text-xs font-black text-white"
            >
              Next Story 
            </Link>
          ) : (
            <span className="rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-300">
              Next Story 
            </span>
          )}
        </div>
      </section>
    </main>
  );
}
