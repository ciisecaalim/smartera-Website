"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { trainerAsset } from "../data/trainers.data";
import type { Trainer } from "../types/trainer.types";

const TRAINERS_PER_PAGE = 9;

export function TrainersBrowser({ trainers, failed = false }: { trainers: Trainer[]; failed?: boolean }) {
  const [q, setQ] = useState("");
  const [experienceRange, setExperienceRange] = useState("");
  const [page, setPage] = useState(1);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return trainers.filter((trainer) => {
      const years = Number(trainer.yearsExperience) || 0;
      const matchesExperience = !experienceRange ||
        (experienceRange === "1-3" && years >= 1 && years <= 3) ||
        (experienceRange === "3-5" && years > 3 && years <= 5) ||
        (experienceRange === "5-10" && years > 5 && years <= 10) ||
        (experienceRange === "10+" && years > 10);
      const matchesSearch = !needle || [trainer.fullName, trainer.professionalTitle, trainer.specialization, ...(trainer.skills ?? [])]
        .filter(Boolean).join(" ").toLowerCase().includes(needle);
      return matchesExperience && matchesSearch;
    });
  }, [trainers, q, experienceRange]);

  useEffect(() => setPage(1), [q, experienceRange]);
  const totalPages = Math.max(1, Math.ceil(shown.length / TRAINERS_PER_PAGE));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);
  const paginated = shown.slice((page - 1) * TRAINERS_PER_PAGE, page * TRAINERS_PER_PAGE);
  const hasFilters = Boolean(q || experienceRange);

  function clearSearch() { setQ(""); setExperienceRange(""); }

  return (
    <section id="trainers-directory" className="bg-[#f7f9fc] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#F59223]">Trainer directory</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B2A4A] sm:text-4xl">Find the right person to learn from</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">Search by name or skill, then explore each trainer&apos;s experience and areas of expertise.</p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_260px_auto]">
            <label className="relative block">
              <span className="sr-only">Search trainers</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search by name, skill, or specialty" className="h-[52px] w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-blue-100/60" />
            </label>

            <label className="relative block">
              <span className="sr-only">Years of experience</span>
              <select value={experienceRange} onChange={(event) => setExperienceRange(event.target.value)} className="h-[52px] w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#1B519F] focus:bg-white focus:ring-4 focus:ring-blue-100/60">
                <option value="">Any experience level</option><option value="1-3">1–3 years</option><option value="3-5">4–5 years</option><option value="5-10">6–10 years</option><option value="10+">More than 10 years</option>
              </select>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"><path d="m6 9 6 6 6-6" /></svg>
            </label>

            {hasFilters ? <button type="button" onClick={clearSearch} className="h-[52px] rounded-xl px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">Clear search</button> : null}
          </div>
        </div>

        <div className="mt-8 border-b border-slate-200 pb-4">
          <p className="text-lg font-black text-[#0B2A4A]">{shown.length} {shown.length === 1 ? "trainer" : "trainers"}</p>
          <p className="mt-1 text-sm text-slate-500">{hasFilters ? "Matching your search" : "Available to support your learning"}</p>
        </div>

        {failed ? <Empty title="We couldn’t load the trainers." text="Please try again in a moment." /> : paginated.length ? <>
          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{paginated.map((trainer) => <TrainerCard key={trainer.slug} trainer={trainer} />)}</div>
          {totalPages > 1 ? <nav aria-label="Trainer pages" className="mt-10 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
            <p className="text-sm text-slate-500">Page <strong className="text-slate-800">{page}</strong> of {totalPages}</p>
            <div className="flex gap-2"><PageButton disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</PageButton><PageButton disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>Next</PageButton></div>
          </nav> : null}
        </> : <Empty title="No trainers match your search" text="Try a different name, skill, or experience level." action={hasFilters ? clearSearch : undefined} />}
      </div>
    </section>
  );
}

function TrainerCard({ trainer }: { trainer: Trainer }) {
  const available = trainer.status === "AVAILABLE";
  const unavailable = trainer.status === "UNAVAILABLE";
  const skills = (trainer.skills ?? []).slice(0, 2);
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
      <div className="relative aspect-[16/8] overflow-hidden bg-slate-100">
        <Image unoptimized={trainerAsset(trainer.profileImage).startsWith("http")} src={trainerAsset(trainer.profileImage)} alt={trainer.imageAlt || trainer.fullName} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover object-center transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/35 via-transparent to-transparent" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur ${available ? "text-emerald-700" : unavailable ? "text-amber-700" : "text-[#1B519F]"}`}><span className={`h-2 w-2 rounded-full ${available ? "bg-emerald-500" : unavailable ? "bg-amber-500" : "bg-blue-500"}`} />{available ? "Available" : unavailable ? "Not available" : "Active"}</span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#F59223]">{trainer.specialization}</p>
        <h3 className="mt-1.5 text-xl font-black leading-tight tracking-tight text-slate-950">{trainer.fullName}</h3>
        <p className="mt-1 truncate text-sm font-semibold text-slate-700">{trainer.professionalTitle}</p>
        <div className="mt-3 flex items-center gap-2 text-sm font-bold text-slate-800"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-[#1B519F]"><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M3 12h18" /></svg>{trainer.yearsExperience}+ years of experience</div>
        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-600">{trainer.shortBio}</p>
        {skills.length ? <div className="mt-3 flex h-7 flex-wrap gap-2 overflow-hidden">{skills.map((skill, index) => <span key={`${trainer.slug}-skill-${index}`} className="max-w-[160px] truncate rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold text-[#1B519F]">{skill}</span>)}</div> : null}
        <Link href={`/trainers/${trainer.slug}`} className="mt-4 inline-flex text-sm font-bold text-black underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">Read More..</Link>
      </div>
    </article>
  );
}

function PageButton({ children, disabled, onClick }: { children: ReactNode; disabled: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className="min-h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-[#1B519F] hover:text-[#1B519F] disabled:cursor-not-allowed disabled:opacity-40">{children}</button>;
}

function Empty({ title, text, action }: { title: string; text: string; action?: () => void }) {
  return <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#1B519F]"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></div><h3 className="mt-4 text-lg font-black text-[#0B2A4A]">{title}</h3><p className="mt-2 text-sm text-slate-500">{text}</p>{action ? <button type="button" onClick={action} className="mt-5 rounded-xl bg-[#1B519F] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#153e77]">Show all trainers</button> : null}</div>;
}
