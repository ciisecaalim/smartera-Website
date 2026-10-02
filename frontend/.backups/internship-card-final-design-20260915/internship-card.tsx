import Link from "next/link";

import type { Internship } from "../types/internships.types";
import { internshipAsset } from "../data/internships.data";

type InternshipCardProps = {
  internship: Internship;
  saved?: boolean;
  onSave?: () => void;
  index?: number;
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

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
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
      className="h-4 w-4 shrink-0"
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
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
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
  const logo = internshipAsset(internship.organizationLogo);

  const open =
    internship.canApply ||
    internship.status === "open";

  const organizationInitial =
    internship.organizationName
      ?.trim()
      .charAt(0)
      .toUpperCase() || "S";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#DCE6F2] bg-white shadow-[0_8px_28px_rgba(8,43,87,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BFD2EA] hover:shadow-[0_18px_42px_rgba(8,43,87,0.12)]">

      {/* Visual header */}
      <div className="relative h-[118px] overflow-hidden bg-gradient-to-br from-[#F1F7FF] via-[#E8F2FF] to-[#DCEAFF]">
        <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#1B519F]/10" />
        <div className="absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-[#F59223]/10" />

        <div className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/80 bg-white shadow-sm">
          {logo ? (
            <img
              src={logo}
              alt={
                internship.logoAlt ||
                `${internship.organizationName} logo`
              }
              className="h-full w-full object-contain p-1.5"
            />
          ) : (
            <span className="text-xl font-black text-[#1B519F]">
              {organizationInitial}
            </span>
          )}
        </div>

        <span
          className={`absolute right-4 top-4 inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-extrabold ring-1 ${
            open
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-slate-100 text-slate-600 ring-slate-200"
          }`}
        >
          {open ? "Applications Open" : "Applications Closed"}
        </span>

        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex rounded-md bg-white/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#075DCE] shadow-sm backdrop-blur">
            {internship.field || "Internship"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[52px] text-[18px] font-black leading-[26px] tracking-[-0.015em] text-[#071B41] transition-colors group-hover:text-[#075DCE]">
          {internship.title}
        </h3>

        <div className="mt-2 flex min-w-0 items-center gap-2 text-[13px] font-semibold text-slate-600">
          <BuildingIcon />
          <span className="truncate">
            {internship.organizationName}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2.5 text-[12px] text-slate-600 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <MapPinIcon />
            <span className="truncate font-semibold">
              {internship.location}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5">
            <ClockIcon />
            <span className="truncate font-semibold">
              {internship.duration}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5">
            <MonitorIcon />
            <span className="truncate font-semibold">
              {internship.workMode}
            </span>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 min-h-[44px] text-[13px] leading-[22px] text-slate-600">
          {internship.shortDescription}
        </p>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <CalendarIcon />
              <span className="truncate">
                Posted {formatDate(internship.datePosted)}
              </span>
            </div>

            <Link
              href={`/opportunities/internships/${internship.slug}`}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#075DCE] px-4 text-[12px] font-black text-white shadow-[0_8px_18px_rgba(7,93,206,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#064EAD] hover:shadow-[0_12px_24px_rgba(7,93,206,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075DCE] focus-visible:ring-offset-2"
            >
              See More
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}