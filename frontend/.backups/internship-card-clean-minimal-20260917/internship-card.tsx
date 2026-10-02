import Link from "next/link";

import type { Internship } from "../types/internships.types";
import { internshipAsset } from "../data/internships.data";

type InternshipCardProps = {
  internship: Internship;
};

function formatDate(value?: string | null) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M4 21V5l8-3 8 3v16" />
      <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

export function InternshipCard({
  internship,
}: InternshipCardProps) {
  const thumbnail =
    internship.organizationLogo
      ? internshipAsset(internship.organizationLogo)
      : "";

  const open =
    internship.canApply ||
    internship.status === "open";

  const organizationInitial =
    internship.organizationName
      ?.trim()
      .charAt(0)
      .toUpperCase() || "S";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#D9E5F2] bg-white shadow-[0_8px_26px_rgba(8,43,87,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BCD2EC] hover:shadow-[0_18px_40px_rgba(8,43,87,0.11)]">

      {/* Top visual section */}
      <div className="relative h-[104px] shrink-0 overflow-hidden bg-gradient-to-br from-[#F7FAFF] via-[#EDF5FF] to-[#DCEBFF]">

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-10 -top-20 h-40 w-40 rounded-full bg-[#075DCE]/[0.07]" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-32 rounded-full bg-[#F59223]/[0.07]" />

        {/* Thumbnail */}
        <div className="absolute left-4 top-3 z-10 flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-[12px] border-[3px] border-white bg-white shadow-[0_7px_18px_rgba(8,43,87,0.14)]">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={
                internship.logoAlt ||
                `${internship.organizationName}`
              }
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center bg-[#EEF5FF] text-lg font-black text-[#075DCE]">
              {organizationInitial}
            </span>
          )}
        </div>

        {/* Status */}
        <span
          className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-extrabold shadow-sm ${
            open
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              open
                ? "bg-emerald-500"
                : "bg-slate-400"
            }`}
          />

          {open
            ? "Applications Open"
            : "Applications Closed"}
        </span>

        {/* Category */}
        <div className="absolute bottom-0 left-4 z-20 translate-y-[1px]">
          <span className="inline-flex max-w-[220px] items-center gap-1.5 rounded-t-xl border border-b-0 border-[#DCE7F5] bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.045em] text-[#075DCE] shadow-[0_-3px_10px_rgba(8,43,87,0.04)]">
            <CategoryIcon />

            <span className="truncate">
              {internship.field || "Internship"}
            </span>
          </span>
        </div>

        {/* Dots */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 right-4 grid grid-cols-3 gap-[4px] opacity-20"
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="h-1 w-1 rounded-full bg-[#075DCE]"
            />
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">

        {/* Title */}
        <h3 className="line-clamp-2 min-h-[42px] text-[16px] font-black leading-[21px] tracking-[-0.015em] text-[#071B41] transition-colors group-hover:text-[#075DCE]">
          {internship.title}
        </h3>

        {/* Organization */}
        <div className="mt-2 flex min-w-0 items-center gap-2 text-[12px] font-semibold text-slate-600">
          <BuildingIcon />

          <span className="truncate">
            {internship.organizationName}
          </span>
        </div>

        {/* Meta - one row */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-semibold text-slate-500">

          <div className="flex min-w-0 items-center gap-1.5">
            <MapPinIcon />
            <span className="truncate">
              {internship.location}
            </span>
          </div>

          <span className="h-3 w-px bg-slate-200" />

          <div className="flex min-w-0 items-center gap-1.5">
            <ClockIcon />
            <span className="truncate">
              {internship.duration}
            </span>
          </div>

          <span className="h-3 w-px bg-slate-200" />

          <div className="flex min-w-0 items-center gap-1.5">
            <MonitorIcon />
            <span className="truncate">
              {internship.workMode}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 min-h-[38px] text-[12px] leading-[19px] text-slate-600">
          {internship.shortDescription}
        </p>

        {/* Footer */}
        <div className="mt-4 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-slate-500">
              <CalendarIcon />

              <span className="truncate">
                Posted {formatDate(internship.datePosted)}
              </span>
            </div>

            <Link
              href={`/opportunities/internships/${internship.slug}`}
              className="inline-flex shrink-0 items-center bg-transparent p-0 text-[12px] font-black text-black shadow-none transition-opacity hover:opacity-65 focus-visible:outline-none"
            >
              See More
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}