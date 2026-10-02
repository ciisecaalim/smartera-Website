/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import { getPublishedInternships } from "@/features/internships";
import { internshipAsset } from "@/features/internships/data/internships.data";

function formatDate(value?: string | null) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not specified";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export async function EmploymentPreviewSection() {
  const internships =
    await getPublishedInternships().catch(
      () => null,
    );

  const latestInternships = [
    ...(internships ?? []),
  ]
    .filter(
      (internship) =>
        internship.canApply,
    )
    .sort((a, b) => {
      const aTime =
        Date.parse(a.datePosted) || 0;

      const bTime =
        Date.parse(b.datePosted) || 0;

      return bTime - aTime;
    })
    .slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-[#FBFCFE] py-12 sm:py-14 lg:py-16">

      {/* subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border-[60px] border-[#EEF5FF]/70" />

        <div className="absolute -bottom-44 -left-44 h-[360px] w-[360px] rounded-full border-[55px] border-[#F4F8FD]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-[#075DCE]" />

              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#075DCE]">
                Opportunities
              </p>
            </div>

            <h2 className="mt-4 text-[clamp(2rem,3.4vw,3.2rem)] font-black leading-none tracking-[-0.045em] text-[#071B41]">
              Latest Internships
            </h2>

            <p className="mt-4 max-w-[720px] text-sm leading-7 text-slate-500 sm:text-[15px]">
              Explore the most recently published internship
              opportunities from Smartera Hub and partner
              organizations.
            </p>
          </div>

          <Link
            href="/opportunities/internships"
            className="shrink-0 border-b border-[#075DCE] pb-0.5 text-sm font-semibold text-[#075DCE] transition-colors hover:border-[#071B41] hover:text-[#071B41]"
          >
            View All Internships
          </Link>
        </div>


        {/* Cards */}
        {latestInternships.length ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {latestInternships.map(
              (internship) => {
                const image =
                  internship.organizationLogo
                    ? internshipAsset(
                        internship.organizationLogo,
                      )
                    : "";

                const initial =
                  internship.organizationName
                    .trim()
                    .charAt(0)
                    .toUpperCase();

                return (
                  <article
                    key={internship.id}
                    className="group flex min-h-[420px] flex-col rounded-[18px] border border-[#E1E8F0] bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9D7E8] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
                  >

                    {/* Center narrow portrait image */}
                    <div className="flex justify-center pt-1">
                      <div className="relative flex h-[168px] w-[132px] items-center justify-center overflow-hidden rounded-[12px] bg-[#F3F6FA] shadow-[0_5px_15px_rgba(15,23,42,0.07)]">

                        {image ? (
                          <img
                            src={image}
                            alt={
                              internship.logoAlt ||
                              `${internship.title} image`
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="grid h-full w-full place-items-center bg-[#EEF5FF] text-3xl font-black text-[#075DCE]">
                            {initial}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* HR directly under image */}
                    <div className="mt-4 border-t border-[#E5EAF0]" />

                    {/* Category */}
                    <div className="mt-3">
                      <span className="inline-flex rounded-lg border border-[#D7E5F7] bg-[#F5F9FF] px-3 py-1.5 text-[10px] font-semibold text-[#075DCE]">
                        {internship.field ||
                          "Internship"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 line-clamp-2 min-h-[48px] text-[17px] font-black leading-6 tracking-[-0.02em] text-[#071B41]">
                      {internship.title}
                    </h3>

                    {/* Description only */}
                    <p className="mt-3 line-clamp-3 text-[13px] leading-[21px] text-slate-600">
                      {
                        internship.shortDescription
                      }
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-5">

                      <div className="border-t border-[#E5EAF0] pt-4">

                        <div className="flex items-center justify-between gap-3">

                          <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-slate-500">
                            <CalendarIcon />

                            <span className="truncate">
                              {formatDate(
                                internship.datePosted,
                              )}
                            </span>
                          </div>

                          <Link
                            href={`/opportunities/internships/${internship.slug}`}
                            className="shrink-0 text-[12px] font-black text-[#111827] transition-colors hover:text-[#075DCE]"
                          >
                            See More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : (
          <div className="mt-9 rounded-[18px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">

            <h3 className="text-lg font-black text-[#071B41]">
              No internships published yet.
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Published internships will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}