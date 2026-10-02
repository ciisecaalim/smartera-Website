import Link from "next/link";

import { Container } from "@/components/ui/container";
import type { Job } from "@/features/jobs/types/jobs.types";
import { jobStatusConfig } from "@/features/jobs/utils/jobs.utils";
import { EmployerAvatar } from "./employer-avatar";
import { JobApplicationForm } from "./job-application-form";

const applyButton = "flex h-11 items-center justify-center rounded-xl bg-[#F59223] px-6 text-sm font-black text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#e0841c] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 motion-reduce:transform-none";

function ListSection({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">{title}</h2><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F59223]" />{item}</li>)}</ul></section>;
}

export function JobDetails({ job }: { job: Job }) {
  const status = jobStatusConfig[job.status];
  const facts = [["Company", job.companyName], ["Category", job.category], ["Location", job.location], ["Employment Type", job.employmentType], ["Work Mode", job.workMode], ["Experience", job.experienceLevel], ["Application Deadline", job.applicationDeadline]].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <>
      <section className="bg-[#F5F9FF] py-7">
        <Container>
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(6,59,134,.07)] sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <EmployerAvatar company={job.companyName} logo={job.companyLogo} logoAlt={job.companyLogoAlt} large />
              <div className="min-w-0 flex-1"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase text-emerald-700">{status.label}</span><h1 className="mt-3 text-[clamp(2rem,4vw,3.3rem)] font-black leading-tight text-[#1B519F]">{job.title}</h1><p className="mt-1 text-sm font-bold text-slate-500">{job.companyName}</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold text-slate-500"><span>{job.location}</span><span>{job.employmentType}</span><span>{job.workMode}</span><span>{job.experienceLevel}</span><span>{job.category}</span></div></div>
              {status.canApply ? <Link href="#job-application" className={applyButton}>Apply Now</Link> : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#FBFDFF] py-10 lg:py-14">
        <Container className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <main className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">About the Role</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{job.description || job.summary}</p></section>
            <ListSection title="Key Responsibilities" items={job.responsibilities} />
            <ListSection title="Requirements" items={job.requirements} />
            {job.skills.length ? <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">Skills & Expertise</h2><div className="mt-4 flex flex-wrap gap-2">{job.skills.map((skill) => <span key={skill} className="rounded-lg bg-[#EEF5FF] px-3 py-2 text-xs font-bold text-[#1B519F]">{skill}</span>)}</div></section> : null}
            {job.benefits?.length ? <ListSection title="What We Offer" items={job.benefits} /> : null}
            <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black text-[#1B519F]">About the Company</h2><p className="mt-4 text-sm leading-7 text-slate-600">{job.companyName} is the organization offering this opportunity. Public company details will appear here when provided.</p></section>
          </main>

          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(6,59,134,.08)] lg:sticky lg:top-28">
            <div className="bg-[#1B519F] p-5 text-white"><h2 className="text-lg font-black">Job at a Glance</h2></div>
            <dl className="divide-y divide-slate-100 px-5">{facts.map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-3.5 text-xs"><dt className="text-slate-500">{label}</dt><dd className="max-w-[62%] text-right font-black text-[#1B519F]">{value}</dd></div>)}</dl>
            <div className="border-t border-slate-100 p-5">{status.canApply ? <Link href="#job-application" className={`${applyButton} w-full`}>Apply Now</Link> : <p className="rounded-xl bg-slate-100 p-3 text-center text-xs font-bold text-slate-500">{status.label}</p>}</div>
          </aside>
        </Container>

        {status.canApply ? <div id="job-application" className="scroll-mt-24 pt-6"><Container><JobApplicationForm job={job} /></Container></div> : null}
      </section>
    </>
  );
}
