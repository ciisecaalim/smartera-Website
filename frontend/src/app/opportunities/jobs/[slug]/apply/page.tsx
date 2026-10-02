import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { EmployerAvatar } from "@/features/jobs/components/employer-avatar";
import { JobApplicationForm } from "@/features/jobs/components/job-application-form";
import { getJobBySlug } from "@/features/jobs";
import { jobStatusConfig } from "@/features/jobs/utils/jobs.utils";

export const metadata: Metadata = { title: "Job Application", description: "Smartera Hub job application interface." };

export default async function JobApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || !jobStatusConfig[job.status].canApply) notFound();
  return <section className="bg-[#F5F9FF] py-8 lg:py-12"><Container><div><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#F59223]">Job Application</p><h1 className="mt-2 text-3xl font-black text-[#1B519F] sm:text-4xl">Apply for {job.title}</h1></div><div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"><JobApplicationForm job={job}/><aside className="order-first rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm lg:order-none lg:sticky lg:top-28"><p className="text-[9px] font-black uppercase tracking-[.14em] text-[#1B519F]">Applying For</p><div className="mt-4 flex gap-3"><EmployerAvatar company={job.companyName} large/><div><h2 className="font-black text-[#1B519F]">{job.title}</h2><p className="mt-1 text-xs text-slate-500">{job.companyName}</p></div></div><dl className="mt-5 divide-y divide-slate-100 text-xs"><div className="flex justify-between py-3"><dt className="text-slate-500">Location</dt><dd className="font-bold text-[#1B519F]">{job.location}</dd></div><div className="flex justify-between py-3"><dt className="text-slate-500">Type</dt><dd className="font-bold text-[#1B519F]">{job.employmentType}</dd></div><div className="flex justify-between py-3"><dt className="text-slate-500">Mode</dt><dd className="font-bold text-[#1B519F]">{job.workMode}</dd></div></dl></aside></div></Container></section>;
}

