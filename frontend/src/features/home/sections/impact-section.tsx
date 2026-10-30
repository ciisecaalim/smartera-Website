
import { article as Larticle, div as Ldiv, h2 as Lh2, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
﻿import Image from "next/image";

import { AnimatedCounter } from "@/features/home/components/animated-counter";
import { HomeIcon } from "@/features/home/components/home-icon";
import { homeImpact } from "@/features/home/data/home.data";

import { getPublishedTrainers } from "@/features/trainers";
import { getPublishedInternships } from "@/features/internships";
import { getPublishedJobs } from "@/features/jobs";
import { getPublishedSeekers } from "@/features/seekers";

export async function ImpactSection() {
  const [
    trainers,
    internships,
    jobs,
    seekers,
  ] = await Promise.all([
    getPublishedTrainers().catch(() => null),
    getPublishedInternships().catch(() => null),
    getPublishedJobs().catch(() => null),
    getPublishedSeekers().catch(() => null),
  ]);

  const metrics = [
    {
      label: "Total Trainers",
      target: trainers?.length ?? 0,
      icon: "career" as const,
      duration: 1300,
    },
    {
      label: "Total Internships",
      target: internships?.length ?? 0,
      icon: "layers" as const,
      duration: 1500,
    },
    {
      label: "Total Jobs",
      target: jobs?.length ?? 0,
      icon: "shield" as const,
      duration: 1700,
    },
    {
      label: "Total Seekers",
      target: seekers?.length ?? 0,
      icon: "rocket" as const,
      duration: 1900,
    },
  ];

  return (
    <Lsection className="bg-white py-8 sm:py-10">
      <Ldiv className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Ldiv className="overflow-hidden rounded-[26px] bg-gradient-to-r from-[#1B519F] via-[#1B519F] to-[#1B519F] shadow-[0_24px_65px_rgba(7,84,199,0.22)]">
          <Ldiv className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <Ldiv className="group relative min-h-[210px] overflow-hidden">
              <Image
                src={homeImpact.image}
                alt="Modern professional building representing future growth"
                fill
                quality={90}
                sizes="(max-width:1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transform-none"
              />

              <Ldiv
                className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1B519F]/75"
                aria-hidden="true"
              />
            </Ldiv>

            <Ldiv className="relative flex flex-col justify-center overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
              <Ldiv
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"
                aria-hidden="true"
              />

              <Lp className="relative text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFD08F]">
                {homeImpact.eyebrow}
              </Lp>

              <Lh2 className="relative mt-2 text-[clamp(1.6rem,2.8vw,2.4rem)] font-black text-white">
                {homeImpact.title}
              </Lh2>

              <Ldiv className="relative mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
                {metrics.map((metric, index) => (
                  <Larticle
                    key={metric.label}
                    className={`group px-2 sm:px-4 ${
                      index > 0
                        ? "sm:border-l sm:border-white/20"
                        : ""
                    }`}
                  >
                    <Lspan className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1B519F] motion-reduce:transform-none">
                      <HomeIcon
                        name={metric.icon}
                        className="h-5 w-5"
                      />
                    </Lspan>

                    <Lp className="mt-3 text-[clamp(1.6rem,2.6vw,2.3rem)] font-black leading-none text-white">
                      <AnimatedCounter
                        target={metric.target}
                        suffix=""
                        duration={metric.duration}
                        delay={index * 120}
                      />
                    </Lp>

                    <Lp className="mt-2 text-xs font-bold leading-5 text-blue-100">
                      {metric.label}
                    </Lp>
                  </Larticle>
                ))}
              </Ldiv>
            </Ldiv>
          </Ldiv>
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}
