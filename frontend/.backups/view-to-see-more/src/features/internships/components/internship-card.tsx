import Image from "next/image";
import Link from "next/link";

import { internshipAsset } from "../data/internships.data";
import type { Internship } from "../types/internships.types";

type InternshipCardProps = {
  internship: Internship;
  saved: boolean;
  onSave: () => void;
  featured?: boolean;
  index?: number;
};

function Icon({ name }: { name: "location" | "mode" | "duration" | "calendar" }) {
  const paths = {
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mode: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M8 19v2m8-2v2M8 9h8" /></>,
    duration: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none">{paths[name]}</svg>;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const visibleSkills = internship.skills.slice(0, 3);
  const hiddenSkills = Math.max(internship.skills.length - visibleSkills.length, 0);
  const deadline = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(internship.applicationDeadline));

  return (
    <article className="group relative isolate flex h-full min-h-[390px] flex-col overflow-hidden rounded-[22px] border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(15,23,42,.055)] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-[#1B519F]/30 hover:shadow-[0_24px_55px_rgba(9,42,85,.14)] focus-within:-translate-y-2 focus-within:border-[#1B519F]/30 focus-within:shadow-[0_24px_55px_rgba(9,42,85,.14)] motion-reduce:transform-none motion-reduce:transition-none">
      <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#1B519F]/[.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" /><div className="relative h-1 w-full overflow-hidden bg-slate-100"><span className="absolute inset-0 origin-left scale-x-[.28] bg-gradient-to-r from-[#1B519F] via-[#2774C9] to-[#F59223] transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none" /></div>
      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        <header className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-sm transition-[transform,border-color,box-shadow] duration-500 group-hover:-rotate-1 group-hover:scale-105 group-hover:border-[#1B519F]/25 group-hover:shadow-md motion-reduce:transform-none">
            {internship.organizationLogo ? (
              <Image unoptimized src={internshipAsset(internship.organizationLogo)} alt={internship.logoAlt || `${internship.organizationName} logo`} width={48} height={48} className="h-full w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transform-none" />
            ) : (
              <span className="grid h-full w-full place-items-center rounded-xl bg-[#1B519F] text-lg font-black text-white">{internship.organizationName[0]}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-[.13em] text-[#F59223]">{internship.field || "Internship"}</p>
            <h3 className="mt-1 line-clamp-2 text-lg font-black leading-6 tracking-[-.01em] text-[#092A55] transition-colors duration-300 group-hover:text-[#1B519F]">{internship.title}</h3>
            <p className="mt-1 truncate text-xs font-semibold text-slate-500">{internship.organizationName}</p>
          </div>
        </header>

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-100 py-4 text-xs">
          <div className="flex min-w-0 items-center gap-2 text-slate-500 transition-colors duration-300 group-hover:text-[#1B519F]"><Icon name="location" /><dd className="truncate font-semibold">{internship.location}</dd></div>
          <div className="flex min-w-0 items-center gap-2 text-slate-500 transition-colors duration-300 group-hover:text-[#1B519F]"><Icon name="mode" /><dd className="truncate font-semibold">{internship.workMode}</dd></div>
          <div className="flex min-w-0 items-center gap-2 text-slate-500 transition-colors duration-300 group-hover:text-[#1B519F]"><Icon name="duration" /><dd className="truncate font-semibold">{internship.duration}</dd></div>
          <div className="flex min-w-0 items-center gap-2 text-slate-500 transition-colors duration-300 group-hover:text-[#1B519F]"><Icon name="calendar" /><dd className="truncate font-semibold">{deadline}</dd></div>
        </dl>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600 transition-colors duration-300 group-hover:text-slate-700">{internship.shortDescription}</p>
        {visibleSkills.length ? <div className="mt-4 flex flex-wrap gap-1.5">{visibleSkills.map((skill) => <span key={skill} title={skill} className="max-w-[180px] truncate rounded-lg border border-[#1B519F]/10 bg-[#F4F8FD] px-2.5 py-1.5 text-[10px] font-bold text-[#1B519F] transition-[transform,background-color,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:border-[#1B519F]/20 group-hover:bg-[#EEF5FF] motion-reduce:transform-none">{skill}</span>)}{hiddenSkills ? <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-500">+{hiddenSkills} more</span> : null}</div> : null}

        <footer className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${internship.canApply ? "text-emerald-600" : "text-slate-400"}`}><span className={`h-2 w-2 rounded-full ${internship.canApply ? "bg-emerald-500" : "bg-slate-300"}`} />{internship.canApply ? "Applications open" : "Closed"}</span>
          <Link href={`/opportunities/internships/${internship.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-[#1B519F] px-4 py-2.5 text-xs font-black text-white shadow-sm transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#143f7d] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B519F] motion-reduce:transform-none">View details <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"></span></Link>
        </footer>
      </div>
    </article>
  );
}
