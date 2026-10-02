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

export async function EmploymentPreviewSection() {
  const internships =
    await getPublishedInternships().catch(
      () => null,
    );

  /*
   * Always show the latest 4 published internships.
   * We intentionally do NOT filter by:
   * - current month
   * - current year
   * - application status
   * - canApply
   *
   * Therefore older/closed internships can still appear
   * when they are among the latest four published records.
   */
  const latestInternships = [
    ...(internships ?? []),
  ]
    .sort((a, b) => {
      const aTime =
        Date.parse(a.datePosted) || 0;

      const bTime =
        Date.parse(b.datePosted) || 0;

      return bTime - aTime;
    })
    .slice(0, 4);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#F59223]">
              INTERNSHIP OPPORTUNITIES
            </p>

            <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-tight text-[#1B519F]">
              Latest Internships
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Explore the four most recently
              published internship opportunities
              from Smartera Hub and partner
              organizations.
            </p>
          </div>

          <Link
            href="/opportunities/internships"
            className="group inline-flex shrink-0 items-center text-sm font-extrabold text-[#1B519F] transition-colors hover:text-[#F59223]"
          >
            View All Internships

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>

        {latestInternships.length ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {latestInternships.map(
              (internship) => {
                const logo =
                  internship.organizationLogo
                    ? internshipAsset(
                        internship.organizationLogo,
                      )
                    : "";

                return (
                  <article
                    key={internship.id}
                    className="group flex min-h-[360px] flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#F59223]/40 hover:shadow-xl"
                  >
                    <div className="relative bg-gradient-to-br from-[#1B519F] to-[#2B6BC4] px-5 pb-5 pt-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white text-lg font-black text-[#1B519F] shadow-sm">
                          {logo ? (
                            <img
                              src={logo}
                              alt={
                                internship.logoAlt ||
                                `${internship.organizationName} logo`
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            internship.organizationName
                              .trim()
                              .charAt(0)
                              .toUpperCase()
                          )}
                        </div>

                        <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-white backdrop-blur">
                          {internship.workMode}
                        </span>
                      </div>

                      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.12em] text-[#FFD08F]">
                        {internship.field ||
                          "Internship"}
                      </p>

                      <h3 className="mt-1 line-clamp-2 text-lg font-black leading-6 text-white">
                        {internship.title}
                      </h3>

                      <p className="mt-2 truncate text-xs font-semibold text-blue-100">
                        {
                          internship.organizationName
                        }
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[9px] font-bold text-[#1B519F]">
                          {internship.location}
                        </span>

                        <span className="rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[9px] font-bold text-[#1B519F]">
                          {internship.duration}
                        </span>
                      </div>

                      <p className="mt-4 line-clamp-3 text-xs leading-6 text-slate-600">
                        {
                          internship.shortDescription
                        }
                      </p>

                      <div className="mt-auto pt-5">
                        <div className="border-t border-slate-100 pt-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                                Published
                              </p>

                              <p className="mt-1 text-[11px] font-black text-slate-700">
                                {formatDate(
                                  internship.datePosted,
                                )}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[9px] font-black ${
                                internship.canApply
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {internship.canApply
                                ? "Applications Open"
                                : "Closed"}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/opportunities/internships/${internship.slug}`}
                          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#1B519F] px-4 py-2.5 text-xs font-black text-white transition-all hover:bg-[#174783]"
                        >
                          View Internship
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        ) : (
          <div className="mt-9 rounded-[22px] border border-dashed border-slate-300 bg-[#F8FBFF] px-6 py-12 text-center">
            <h3 className="text-lg font-black text-[#1B519F]">
              No internships published yet.
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Published internships will appear
              here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
