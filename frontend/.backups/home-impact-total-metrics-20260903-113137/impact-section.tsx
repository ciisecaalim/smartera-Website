import Image from "next/image";

import { AnimatedCounter } from "@/features/home/components/animated-counter";
import { HomeIcon } from "@/features/home/components/home-icon";
import { homeImpact } from "@/features/home/data/home.data";

import { getPublishedInternships } from "@/features/internships";
import { getPublishedJobs } from "@/features/jobs";
import { getPublishedSeekers } from "@/features/seekers";
import { getPublicJobSeekerHistory } from "@/features/jobs/data/job-seeker-history.data";

export async function ImpactSection() {
  const [
    internships,
    jobs,
    seekers,
    placements,
  ] = await Promise.all([
    getPublishedInternships().catch(() => null),
    getPublishedJobs().catch(() => null),
    getPublishedSeekers().catch(() => null),
    getPublicJobSeekerHistory().catch(() => []),
  ]);

  const activeInternships =
    internships?.filter(
      (item) => item.status === "open",
    ).length ?? 0;

  const activeJobs =
    jobs?.filter(
      (item) => item.status === "published",
    ).length ?? 0;

  const activeSeekers =
    seekers?.length ?? 0;

  const successfulPlacements =
    placements.length;

  const metrics = [
    {
      label: "Active Internships",
      target: activeInternships,
      icon: "layers" as const,
      duration: 1300,
    },
    {
      label: "Job Opportunities",
      target: activeJobs,
      icon: "career" as const,
      duration: 1500,
    },
    {
      label: "Active Seekers",
      target: activeSeekers,
      icon: "shield" as const,
      duration: 1700,
    },
    {
      label: "Successful Placements",
      target: successfulPlacements,
      icon: "rocket" as const,
      duration: 1900,
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[26px] bg-gradient-to-r from-[#1B519F] via-[#1B519F] to-[#1B519F] shadow-[0_24px_65px_rgba(7,84,199,0.22)]">
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="group relative min-h-[210px] overflow-hidden">
              <Image
                src={homeImpact.image}
                alt="Modern professional building representing future growth"
                fill
                sizes="(max-width:1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transform-none"
              />

              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1B519F]/75"
                aria-hidden="true"
              />
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"
                aria-hidden="true"
              />

              <p className="relative text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD08F]">
                {homeImpact.eyebrow}
              </p>

              <h2 className="relative mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-black text-white">
                {homeImpact.title}
              </h2>

              <div className="relative mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
                {metrics.map(
                  (metric, index) => (
                    <article
                      key={metric.label}
                      className={`group px-2 sm:px-4 ${
                        index > 0
                          ? "sm:border-l sm:border-white/20"
                          : ""
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1B519F] motion-reduce:transform-none">
                        <HomeIcon
                          name={metric.icon}
                          className="h-5 w-5"
                        />
                      </span>

                      <p className="mt-3 text-[clamp(1.6rem,2.6vw,2.3rem)] font-black leading-none text-white">
                        <AnimatedCounter
                          target={metric.target}
                          suffix=""
                          duration={metric.duration}
                          delay={index * 120}
                        />
                      </p>

                      <p className="mt-2 text-xs font-bold leading-5 text-blue-100">
                        {metric.label}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
