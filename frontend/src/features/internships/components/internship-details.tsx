import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { internshipAsset } from "../data/internships.data";
import { InternshipApplicationForm } from "./internship-application-form";
import type { Internship } from "../types/internships.types";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));

const applyButton =
  "inline-flex h-12 items-center justify-center rounded-xl bg-[#F59223] px-7 text-sm font-black text-white shadow-[0_8px_20px_rgba(245,146,35,.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0841c] hover:shadow-[0_12px_28px_rgba(245,146,35,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 motion-reduce:transform-none";

function List({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-black text-[#1B519F]">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F59223]" />{item}</li>)}
      </ul>
    </section>
  );
}

export function InternshipDetails({ internship }: { internship: Internship }) {
  const facts = [
    ["Location", internship.location],
    ["Mode", internship.workMode],
    ["Duration", internship.duration],
    ["Positions", internship.numberOfPositions?.toString()],
    ["Start Date", internship.startDate ? formatDate(internship.startDate) : undefined],
    ["Deadline", formatDate(internship.applicationDeadline)],
    ["Working Days", internship.workingDays],
    ["Working Hours", internship.workingHours],
  ];

  return (
    <>
      <section className="bg-[#F5F9FF] py-10">
        <Container>
          <div className="flex flex-col gap-6 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(9,42,85,.07)] sm:flex-row sm:items-center sm:p-8">
            {internship.organizationLogo ? (
              <Image unoptimized src={internshipAsset(internship.organizationLogo)} alt={internship.logoAlt || `${internship.organizationName} logo`} width={88} height={88} className="h-20 w-20 rounded-2xl border border-slate-100 object-contain" />
            ) : (
              <span className="grid h-20 w-20 place-items-center rounded-2xl bg-[#1B519F] text-2xl font-black text-white">{internship.organizationName[0]}</span>
            )}
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-[#F59223]">{internship.field || "Internship opportunity"}</p>
              <h1 className="mt-2 text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight text-[#1B519F]">{internship.title}</h1>
              <p className="mt-1 font-bold text-slate-500">{internship.organizationName}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600"><span>{internship.location}</span><span>{internship.workMode}</span><span>{internship.duration}</span><span>Deadline: {formatDate(internship.applicationDeadline)}</span></div>
            </div>
            {internship.canApply ? <Link href="#internship-application" className={applyButton}>Apply Now</Link> : <span className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600">Applications Closed</span>}
          </div>
        </Container>
      </section>

      <section className="bg-[#FBFDFF] py-12">
        <Container className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <main className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">About the Internship</h2><div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{internship.fullDescription}</div></section>
            <List title="Responsibilities" items={internship.responsibilities} />
            <List title="Requirements" items={internship.requirements} />
            {internship.skills.length ? <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">Skills Required</h2><div className="mt-4 flex flex-wrap gap-2">{internship.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#EEF5FF] px-3 py-2 text-xs font-bold text-[#1B519F]">{skill}</span>)}</div></section> : null}
            <List title="What You Will Learn" items={internship.learningOutcomes} />
            {internship.additionalInformation ? <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">Additional Information</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{internship.additionalInformation}</p></section> : null}
            <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">About the Organization</h2><p className="mt-4 font-bold text-slate-700">{internship.organizationName}</p></section>
          </main>

          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-28">
            <h2 className="bg-[#1B519F] p-5 text-lg font-black text-white">Internship at a Glance</h2>
            <dl className="divide-y divide-slate-100 px-5">
              {facts.filter((fact) => fact[1]).map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-3.5 text-xs"><dt className="text-slate-500">{label}</dt><dd className="max-w-[62%] text-right font-black text-[#1B519F]">{value}</dd></div>)}
            </dl>
            {internship.canApply ? <div className="border-t border-slate-100 p-5"><Link href="#internship-application" className={`${applyButton} w-full`}>Apply Now</Link></div> : null}
          </aside>
        </Container>
        {internship.canApply ? (
          <div id="internship-application" className="scroll-mt-24 pt-6">
            <Container>
              <InternshipApplicationForm internship={internship} />
            </Container>
          </div>
        ) : null}
      </section>
    </>
  );
}
