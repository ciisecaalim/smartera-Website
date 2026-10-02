
import { article as Larticle, div as Ldiv, h2 as Lh2, h3 as Lh3, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
/* eslint-disable @next/next/no-img-element */

import Link from "@/i18n/link";

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
    <Lsection className="relative overflow-hidden bg-[#FBFCFE] py-12 sm:py-14 lg:py-16">

      {/* subtle background decoration */}
      <Ldiv
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <Ldiv className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border-[60px] border-[#EEF5FF]/70" />

        <Ldiv className="absolute -bottom-44 -left-44 h-[360px] w-[360px] rounded-full border-[55px] border-[#F4F8FD]" />
      </Ldiv>

      <Ldiv className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <Ldiv className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <Ldiv>
            <Ldiv className="flex items-center gap-3">
              <Lspan className="h-[2px] w-8 rounded-full bg-[#075DCE]" />

              <Lp className="text-[10px] font-black uppercase tracking-[0.2em] text-[#075DCE]">
                Opportunities
              </Lp>
            </Ldiv>

            <Lh2 className="mt-4 text-[clamp(2rem,3.4vw,3.2rem)] font-black leading-none tracking-[-0.045em] text-[#071B41]">
              Latest Internships
            </Lh2>

            <Lp className="mt-4 max-w-[720px] text-sm leading-7 text-slate-500 sm:text-[15px]">
              Explore the most recently published internship
              opportunities from Smartera Hub and partner
              organizations.
            </Lp>
          </Ldiv>

          <Link
            href="/opportunities/internships"
            className="shrink-0 border-b border-[#075DCE] pb-0.5 text-sm font-semibold text-[#075DCE] transition-colors hover:border-[#071B41] hover:text-[#071B41]"
          >
            View All Internships
          </Link>
        </Ldiv>


        {/* Cards */}
        {latestInternships.length ? (
          <Ldiv className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {latestInternships.map(
              (internship) => {
                const logoSource =
                  internship.organizationLogo?.trim() ?? "";

                const logoAlt =
                  internship.logoAlt?.trim() ?? "";

                const isPlaceholderImage =
                  /sample[\s_-]*profile|placeholder|default[\s_-]*avatar|profile[\s_-]*placeholder|no[\s_-]*image|generic[\s_-]*profile/i.test(
                    `${logoSource} ${logoAlt}`,
                  );

                const image =
                  logoSource && !isPlaceholderImage
                    ? internshipAsset(logoSource)
                    : "";

                const initial =
                  internship.organizationName
                    .trim()
                    .charAt(0)
                    .toUpperCase();

                return (
                  <Larticle
                    key={internship.id}
                    className="group flex min-h-[360px] flex-col rounded-[18px] border border-[#E1E8F0] bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9D7E8] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
                  >

                    {/* Smaller centered image - only when available */}
                    {image ? (
                      <>
                        <Ldiv className="flex justify-center pt-1">
                          <Ldiv
                            role="img"
                            aria-label={
                              internship.logoAlt ||
                              `${internship.title} image`
                            }
                            className="h-[88px] w-[82px] overflow-hidden rounded-[10px] bg-[#F3F6FA] bg-cover bg-center bg-no-repeat shadow-[0_4px_12px_rgba(15,23,42,0.06)]"
                            style={{
                              backgroundImage: `url("${image}")`,
                            }}
                          />
                        </Ldiv>

                        <Ldiv className="mt-3 border-t border-[#E5EAF0]" />
                      </>
                    ) : (
                      <>
                        <Ldiv className="flex h-[88px] items-center justify-center">
                          <Lspan className="text-[11px] font-semibold text-slate-400">
                            No image
                          </Lspan>
                        </Ldiv>

                        <Ldiv className="mt-3 border-t border-[#E5EAF0]" />
                      </>
                    )}

                    {/* Category */}
                    <Ldiv className="mt-3">
                      <Lspan className="inline-flex rounded-lg border border-[#D7E5F7] bg-[#F5F9FF] px-3 py-1.5 text-[10px] font-semibold text-[#075DCE]">
                        {internship.field ||
                          "Internship"}
                      </Lspan>
                    </Ldiv>

                    {/* Title */}
                    <Lh3 className="mt-2.5 line-clamp-2 min-h-[44px] text-[16px] font-black leading-6 tracking-[-0.02em] text-[#071B41]">
                      {internship.title}
                    </Lh3>

                    {/* Description only */}
                    <Lp className="mt-2.5 line-clamp-2 text-[12px] leading-[19px] text-slate-600">
                      {
                        internship.shortDescription
                      }
                    </Lp>

                    {/* Footer */}
                    <Ldiv className="mt-auto pt-4">

                      <Ldiv className="border-t border-[#E5EAF0] pt-4">

                        <Ldiv className="flex items-center justify-between gap-3">

                          <Ldiv className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-slate-500">
                            <CalendarIcon />

                            <Lspan className="truncate">
                              {formatDate(
                                internship.datePosted,
                              )}
                            </Lspan>
                          </Ldiv>

                          <Link
                            href={`/opportunities/internships/${internship.slug}`}
                            className="inline-flex shrink-0 items-center bg-transparent p-0 text-[12px] font-black text-black shadow-none transition-opacity hover:opacity-65 focus-visible:outline-none"
                          >
                            Read More...
                          </Link>
                        </Ldiv>
                      </Ldiv>
                    </Ldiv>
                  </Larticle>
                );
              },
            )}
          </Ldiv>
        ) : (
          <Ldiv className="mt-9 rounded-[18px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">

            <Lh3 className="text-lg font-black text-[#071B41]">
              No internships published yet.
            </Lh3>

            <Lp className="mt-2 text-sm text-slate-500">
              Published internships will appear here automatically.
            </Lp>
          </Ldiv>
        )}
      </Ldiv>
    </Lsection>
  );
}