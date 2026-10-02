"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { trainerAsset } from "../data/trainers.data";
import type { Trainer } from "../types/trainer.types";

const TRAINERS_PER_PAGE = 10;

export function TrainersBrowser({
  trainers,
  failed = false,
}: {
  trainers: Trainer[];
  failed?: boolean;
}) {
  const [q, setQ] = useState("");
  const [experienceRange, setExperienceRange] = useState("");
  const [page, setPage] = useState(1);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();

    return trainers.filter((t) => {
      const years = Number(t.yearsExperience) || 0;

      const matchesExperience =
        !experienceRange ||
        (experienceRange === "1-3" && years >= 1 && years <= 3) ||
        (experienceRange === "3-5" && years > 3 && years <= 5) ||
        (experienceRange === "5-10" && years > 5 && years <= 10) ||
        (experienceRange === "10+" && years > 10);

      const matchesSearch =
        !needle ||
        [
          t.fullName,
          t.professionalTitle,
          t.specialization,
          ...(t.skills ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(needle);

      return matchesExperience && matchesSearch;
    });
  }, [trainers, q, experienceRange]);

  useEffect(() => {
    setPage(1);
  }, [q, experienceRange]);

  const totalPages = Math.max(
    1,
    Math.ceil(shown.length / TRAINERS_PER_PAGE),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * TRAINERS_PER_PAGE;
  const paginated = shown.slice(
    startIndex,
    startIndex + TRAINERS_PER_PAGE,
  );


  return (
    <section
      id="trainers-directory"
      className="px-4 pb-16 pt-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full">
              <input
                value={q}
                onChange={(event) =>
                  setQ(event.target.value)
                }
                placeholder="Search trainers by name, skills, or expertise..."
                className="trainer-input h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#1B519F]"
              />
            </div>

            <div className="w-full lg:w-auto">
              <label
                htmlFor="trainer-experience"
                className="sr-only"
              >
                Filter trainers by experience
              </label>

              <select
                id="trainer-experience"
                value={experienceRange}
                onChange={(event) =>
                  setExperienceRange(event.target.value)
                }
                className="trainer-input h-12 w-full min-w-[220px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#1B519F] shadow-sm outline-none transition focus:border-[#1B519F]"
              >
                <option value="">All Experience</option>
                <option value="1-3">1–3 Years Experience</option>
                <option value="3-5">3–5 Years Experience</option>
                <option value="5-10">5–10 Years Experience</option>
                <option value="10+">10+ Years Experience</option>
              </select>
            </div>
          </div>
        </div>

        {failed ? (
          <Empty
            title="We're unable to load trainers right now."
            text="Please try again shortly."
          />
        ) : paginated.length ? (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {paginated.map((t) => (
                <article
                  key={t.slug}
                  className="trainer-card mx-auto flex h-[350px] w-full max-w-[320px] flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex justify-center">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[18px] bg-slate-100 ring-4 ring-[#EEF5FF]">
                      <Image
                        unoptimized={trainerAsset(t.profileImage).startsWith("http")}
                        src={trainerAsset(t.profileImage)}
                        alt={t.imageAlt || t.fullName}
                        fill
                        sizes="96px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-1 flex-col text-center">
                    <h2 className="w-full truncate text-[17px] font-black leading-tight text-[#1B519F]">
                      {t.fullName}
                    </h2>

                    <p className="mt-1.5 w-full truncate text-[14px] font-semibold text-slate-700">
                      {t.professionalTitle}
                    </p>

                    <p className="mt-1.5 w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-black text-[#F59223]">
                      {t.specialization}
                    </p>

                    <div className="mt-2.5 flex h-7 w-full flex-nowrap justify-center gap-1.5 overflow-hidden">
                      {(t.skills ?? []).slice(0, 3).map((s, index) => (
                        <span
                          key={t.slug + "-skill-" + index}
                          className="max-w-[92px] shrink min-w-0 truncate rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[10px] font-bold text-[#1B519F]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 text-[13px] font-black text-[#1B519F]">
                      {t.yearsExperience}+ Years Experience
                    </p>

                    <p className="mt-2 line-clamp-1 text-[12px] leading-5 text-slate-500">
                      {t.shortBio}
                    </p>

                    <Link
                      href={"/trainers/" + t.slug}
                      className="mt-auto inline-flex min-h-9 items-center justify-center self-center rounded-lg border border-[#1B65D8] px-5 py-1.5 text-[13px] font-bold text-[#1B519F] transition hover:bg-[#1B519F] hover:text-white"
                    >
                      See More 
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 py-4">
  <span className="mr-2 text-sm font-black text-slate-600">
    Current {page} / 10
  </span>

  <button
    type="button"
    onClick={() =>
      setPage((prev) =>
        Math.max(1, prev - 1)
      )
    }
    disabled={page === 1}
    className="inline-flex h-12 min-w-[140px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-medium text-slate-500 transition hover:border-[#1B519F] hover:text-[#1B519F] disabled:cursor-not-allowed disabled:opacity-50"
  >
    Previous
  </button>

  <span className="inline-flex h-12 min-w-14 items-center justify-center rounded-xl bg-[#1B58A8] px-4 text-lg font-semibold text-white">
    {page}
  </span>

  <button
    type="button"
    onClick={() =>
      setPage((prev) =>
        Math.min(totalPages, prev + 1)
      )
    }
    disabled={page === totalPages}
    className="inline-flex h-12 min-w-[120px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-base font-medium text-slate-500 transition hover:border-[#1B519F] hover:text-[#1B519F] disabled:cursor-not-allowed disabled:opacity-50"
  >
    Next <span></span>
  </button>
</div>
</>
        ) : (
          <Empty
            title={
              q || experienceRange
                ? "No trainers found for your search."
                : "No trainers are available right now."
            }
            text={
              q
                ? "Try another name, skill, or specialization."
                : ""
            }
          />
        )}
      </div>
    </section>
  );
}

function Empty({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="trainer-card mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <h3 className="text-lg font-black text-[#1B519F]">
        {title}
      </h3>
      {text ? (
        <p className="mt-2 text-sm text-slate-500">
          {text}
        </p>
      ) : null}
    </div>
  );
}
