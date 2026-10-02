import Link from "next/link";

import { getPublishedJobs } from "@/features/jobs";

function formatDeadline(value: string) {
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

function getInitials(company: string) {
  return company
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export async function EmploymentPreviewSection() {
  const jobs = await getPublishedJobs().catch(() => null);

  const latestJobs = (jobs ?? [])
    .filter((job) => job.canApply)
    .sort((a, b) => {
      const aTime = Date.parse(a.datePosted) || 0;
      const bTime = Date.parse(b.datePosted) || 0;

      return bTime - aTime;
    })
    .slice(0, 4);

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#F59223]">
              JOB OPPORTUNITIES
            </p>

            <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-tight text-[#1B519F]">
              Latest Job Opportunities
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Explore the latest published job opportunities and take the next step in your career.
            </p>
          </div>

          <Link
            href="/opportunities/jobs"
            className="group inline-flex shrink-0 items-center text-sm font-extrabold text-[#1B519F] transition-colors hover:text-[#F59223]"
          >
            View All Jobs

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>

        {latestJobs.length ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {latestJobs.map((job) => (
              <article
                key={job.id}
                className="group flex min-h-[330px] flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#F59223]/40 hover:shadow-xl"
              >
                <div className="relative bg-gradient-to-br from-[#1B519F] to-[#2B6BC4] px-5 pb-5 pt-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-sm font-black text-white backdrop-blur">
                      {getInitials(job.companyName)}
                    </div>

                    <span className="rounded-full bg-white/15 px-3 py-1.5 text-[9px] font-black uppercase tracking-wide text-white backdrop-blur">
                      {job.employmentType}
                    </span>
                  </div>

                  <h3 className="mt-5 line-clamp-2 text-lg font-black leading-6 text-white">
                    {job.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-blue-100">
                    {job.companyName}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[9px] font-bold text-[#1B519F]">
                      {job.location}
                    </span>

                    <span className="rounded-full bg-[#EEF5FF] px-2.5 py-1 text-[9px] font-bold text-[#1B519F]">
                      {job.workMode}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-xs leading-6 text-slate-600">
                    {job.summary}
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Application Deadline
                      </p>

                      <p className="mt-1 text-xs font-black text-slate-700">
                        {formatDeadline(job.applicationDeadline)}
                      </p>
                    </div>

                    <Link
                      href={`/opportunities/jobs/${job.slug}`}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#1B519F] px-4 py-2.5 text-xs font-black text-white transition-all hover:bg-[#174783]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-[22px] border border-dashed border-slate-300 bg-[#F8FBFF] px-6 py-12 text-center">
            <h3 className="text-lg font-black text-[#1B519F]">
              New job opportunities are coming soon.
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please check back for newly published opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
