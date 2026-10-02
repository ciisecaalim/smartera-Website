import Link from "next/link";

import type { Internship } from "../types/internships.types";
import { internshipAsset } from "../data/internships.data";

type InternshipCardProps = {
  internship: Internship;
};

function formatDate(value?: string | null) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not specified";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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

export function InternshipCard({
  internship,
}: InternshipCardProps) {
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

  const open =
    internship.status === "open" &&
    internship.canApply;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#E1E7EF] bg-white p-4 shadow-[0_5px_18px_rgba(15,23,42,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDD7E4] hover:shadow-[0_10px_24px_rgba(15,23,42,0.07)]">

      {/* Image */}
      <div className="relative">

        {image ? (
          <div className="flex justify-center">
            <div
              role="img"
              aria-label={
                logoAlt ||
                `${internship.title} image`
              }
              className="h-[96px] w-[96px] overflow-hidden rounded-full bg-slate-100 bg-cover bg-center bg-no-repeat ring-1 ring-slate-200/80 shadow-[0_4px_14px_rgba(15,23,42,0.10)]"
              style={{
                backgroundImage: `url("${image}")`,
              }}
            />
          </div>
        ) : (
          <div className="mx-auto flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#F6F7F9] ring-1 ring-slate-200/80 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
            <span className="text-[11px] font-medium text-slate-400">
              No image
            </span>
          </div>
        )}

        {/* Open / Closed */}
        <span
          className={`absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[9px] font-semibold ${
            open
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              open
                ? "bg-emerald-500"
                : "bg-slate-400"
            }`}
          />

          {open ? "Open" : "Closed"}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 line-clamp-2 min-h-[40px] text-[16px] font-bold leading-[22px] tracking-[-0.015em] text-black">
        {internship.title}
      </h3>

      {/* Short description */}
      <p className="mt-2 line-clamp-2 min-h-[36px] text-[12px] leading-5 text-slate-600">
        {internship.shortDescription}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-3">

        <div className="border-t border-[#E5E7EB] pt-3">

          <div className="flex items-center justify-between gap-4">

            <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-slate-500">
              <CalendarIcon />

              <span className="truncate">
                Posted {formatDate(internship.datePosted)}
              </span>
            </div>

            <Link
              href={`/opportunities/internships/${internship.slug}`}
              className="shrink-0 bg-transparent p-0 text-[13px] font-semibold text-black shadow-none transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Read More...
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}