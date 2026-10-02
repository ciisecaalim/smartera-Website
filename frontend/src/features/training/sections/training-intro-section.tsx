import Image from "next/image";
import Link from "next/link";

import { getPublishedTrainings } from "@/features/training/data/training.data";
import { fetchHeroMedia, heroAssetUrl } from "@/features/hero-media/hero-media.data";

export async function TrainingIntroSection() {
  const trainings = await getPublishedTrainings();
  const media = await fetchHeroMedia("swe-program");
  const heroImage = heroAssetUrl(media?.imageUrl) || "/images/training/swe-program-hero.jpg";

  const counts = {
    live: trainings.filter((item) => item.status === "live").length,
    upcoming: trainings.filter((item) => item.status === "upcoming").length,
    completed: trainings.filter((item) => item.status === "completed").length,
  };

  return (
    <section className="flex min-h-screen items-center bg-white px-4 py-6 sm:px-6 sm:py-8 lg:h-screen lg:px-8 lg:py-10">
      <div className="training-intro-panel mx-auto flex w-full max-w-[1400px] flex-col overflow-hidden rounded-[26px] border border-blue-100 bg-gradient-to-br from-[#F7FAFF] via-white to-[#EEF5FF] shadow-[0_18px_55px_rgba(6,59,134,.08)] lg:min-h-[calc(100vh-8rem)]">
        <div className="grid lg:min-h-0 lg:flex-1 lg:grid-cols-[.92fr_1.08fr]">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#F59223]">
              SWE Program
            </p>

            <h1 className="mt-4 text-[clamp(2.35rem,4vw,3.75rem)] font-black leading-[1.01] tracking-[-.05em] text-[#1B519F]">
              <span className="block whitespace-nowrap">Smartera Workplace</span>
              <span className="block whitespace-nowrap">Essential Program</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
              Explore the Smartera Workplace Essential (SWE) Program - practical
              learning activities designed to strengthen professional skills,
              workplace readiness, and career confidence.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="#training-activities"
                className="inline-flex h-11 items-center rounded-xl bg-[#1B519F] px-6 text-sm font-black text-white shadow-[0_10px_25px_rgba(7,94,222,.22)] transition hover:-translate-y-0.5 hover:bg-[#174783] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B519F]"
              >
                Explore SWE Activities
              </Link>

            </div>
          </div>

          <div className="relative min-h-[336px] overflow-hidden bg-[#0B1F3A] sm:min-h-[376px] lg:aspect-[3/2] lg:min-h-0">
            <Image
              unoptimized
              src={heroImage}
              alt={media?.imageAlt || "Participants celebrating completion of the Smartera Workplace Essential Program"}
              fill
              priority
              sizes="(max-width:1024px) 100vw,55vw"
              className="training-hero-image object-cover object-center"
            />

            <div className="training-image-fade pointer-events-none absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent" />

            <div className="training-stat-card absolute right-3 top-4 rounded-xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur transition-colors duration-300 hover:bg-emerald-50 sm:right-6 sm:top-6">
              <div>
                <p className="text-[8px] font-black uppercase tracking-wide text-slate-400">
                  Live now
                </p>

                <p className="mt-1 text-base font-black text-emerald-600">
                  {counts.live} Activities
                </p>
              </div>
            </div>

            <div className="training-stat-card absolute left-3 top-[calc(50%-2.75rem)] rounded-xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur transition-colors duration-300 hover:bg-blue-50 sm:left-6" style={{ animationDelay: "550ms" }}>
              <div style={{ animationDelay: "550ms" }}>
                <p className="text-[8px] font-black uppercase tracking-wide text-slate-400">
                  Coming next
                </p>

                <p className="mt-1 text-base font-black text-[#1B519F]">
                  {counts.upcoming} Upcoming
                </p>
              </div>
            </div>

            <div className="training-stat-card absolute bottom-16 right-3 rounded-xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur transition-colors duration-300 hover:bg-orange-50 sm:right-6" style={{ animationDelay: "1.1s" }}>
              <div style={{ animationDelay: "1.1s" }}>
                <p className="text-[8px] font-black uppercase tracking-wide text-slate-400">
                  Public archive
                </p>

                <p className="mt-1 text-base font-black text-slate-700">
                  {counts.completed} Completed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-t border-blue-100 bg-white/90 sm:flex-row sm:items-stretch">
          <div className="border-b border-blue-100 px-7 py-5 sm:w-[46%] sm:border-b-0 sm:border-r">
            <p className="text-xl font-black text-[#1B519F]">
              One activity.
              <br />
              Many practical topics.
            </p>
          </div>

          <div className="flex-1 px-7 py-5" />
        </div>
      </div>
    </section>
  );
}
