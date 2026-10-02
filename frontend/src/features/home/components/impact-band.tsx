"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatedCounter } from "@/features/home/components/animated-counter";
import { homeImpact } from "@/features/home/data/impact.data";

/**
 * Small inline SVG icon used by each impact metric.
 */
function MetricIcon({
  name,
}: {
  name:
    | "layers"
    | "users"
    | "shield"
    | "rocket";
}) {
  if (name === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.6-3 2.3-5 5.5-5s4.9 2 5.5 5" />
        <circle cx="17" cy="9" r="2.3" />
        <path d="M16 14.2c2.7.1 4.2 1.7 4.5 4.3" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  if (name === "rocket") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M14 5c2.3-2.3 4.7-2.2 5-2.1.1.3.2 2.7-2.1 5L11 13.8 7.2 10 14 5Z" />
        <path d="m11 13.8-1 4.2-2.2-2.2L4 17l1.2-3.8L3 11l4.2-1" />
        <circle cx="15.5" cy="6.5" r="1.2" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 17 8 4 8-4" />
    </svg>
  );
}


/**
 * Responsive impact band.
 *
 * The block animates into view once. Numeric values then count from
 * zero to their configured targets with staggered timings.
 */
export function ImpactBand() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className="bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
    >
      <div
        className={`mx-auto w-full max-w-[1240px] overflow-hidden rounded-[26px] bg-gradient-to-r from-[#1B519F] via-[#1B519F] to-[#1B519F] shadow-[0_22px_60px_rgba(7,84,199,0.22)] transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-[0.985] opacity-0"
        }`}
      >
        <div className="grid min-h-[230px] lg:grid-cols-[0.42fr_0.58fr]">
          {/* IMAGE */}
          <div className="group relative min-h-[220px] overflow-hidden lg:min-h-full">
            <Image
              src={homeImpact.image}
              alt={homeImpact.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className={`object-cover transition-transform duration-[1200ms] ease-out motion-reduce:transform-none ${
                isVisible
                  ? "scale-100"
                  : "scale-[1.08]"
              } group-hover:scale-[1.05]`}
            />

            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1B519F]/80"
              aria-hidden="true"
            />

            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1B519F]/45 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center overflow-hidden px-5 py-8 sm:px-8 lg:px-10 xl:px-12">
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
              aria-hidden="true"
            />

            <div
              className="pointer-events-none absolute -bottom-24 left-[25%] h-56 w-56 rounded-full bg-[#F59223]/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative">
              <p
                className={`text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#FFC16E] transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {homeImpact.eyebrow}
              </p>

              <h2
                className={`mt-2 text-[clamp(1.55rem,2.7vw,2.4rem)] font-black leading-tight tracking-tight text-white transition-all delay-100 duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                {homeImpact.title}
              </h2>

              <p
                className={`mt-3 max-w-2xl text-xs leading-6 text-blue-100 transition-all delay-150 duration-700 sm:text-sm ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                {homeImpact.description}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-0">
                {homeImpact.metrics.map(
                  (metric, index) => (
                    <article
                      key={metric.id}
                      className={`group relative min-w-0 px-2 transition-all duration-700 sm:px-5 ${
                        index > 0
                          ? "sm:border-l sm:border-white/20"
                          : ""
                      } ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-6 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${
                          250 + index * 120
                        }ms`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-white group-hover:text-[#1B519F] motion-reduce:transform-none">
                          <MetricIcon
                            name={metric.icon}
                          />
                        </span>

                        <div className="min-w-0">
                          <p className="whitespace-nowrap text-[clamp(1.45rem,2.4vw,2.15rem)] font-black leading-none tracking-tight text-white">
                            {"target" in metric ? (
                              <AnimatedCounter
                                target={metric.target}
                                suffix={
                                  "suffix" in metric
                                    ? metric.suffix
                                    : ""
                                }
                                duration={
                                  metric.duration
                                }
                                delay={
                                  300 +
                                  index * 130
                                }
                              />
                            ) : (
                              <span className="inline-block transition-transform duration-500 group-hover:scale-105">
                                {metric.display}
                              </span>
                            )}
                          </p>

                          <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white">
                            {metric.label}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 hidden text-xs leading-5 text-blue-100 xl:block">
                        {metric.description}
                      </p>
                    </article>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


