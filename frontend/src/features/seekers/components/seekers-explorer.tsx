"use client";
import { useMemo, useState } from "react";
import { SeekerCard } from "./seeker-card";
import type { Seeker, SeekerTypeFilter } from "../types/seekers.types";
export function SeekersExplorer({ seekers }: { seekers: Seeker[] }) {
  const safeSeekers = useMemo(
    () => (Array.isArray(seekers) ? seekers : []),
    [seekers],
  );
  const [search, setSearch] = useState("");
  const [type, setType] = useState<SeekerTypeFilter>("ALL");
  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return safeSeekers.filter(
      (s) =>
        (type === "ALL" || s.seeking === type) &&
        (!q ||
          [
            s.fullName,
            s.professionalTitle,
            s.specialization,
            ...s.skills,
            ...s.preferredAreas,
          ].some((v) => v.toLowerCase().includes(q))),
    );
  }, [safeSeekers, search, type]);
  return (
    <section id="available-seekers" className="bg-white py-10">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_260px]">
          <label>
            <span className="sr-only">Search candidates</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search candidates by name, skills, or specialization..."
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400"
            />
          </label>
          <label>
            <span className="sr-only">Opportunity type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as SeekerTypeFilter)}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900"
            >
              <option value="ALL">All opportunity types</option>
              <option value="EMPLOYMENT">Employment</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="BOTH">Employment & Internship</option>
            </select>
          </label>
        </div>
        <div className="mt-8 flex justify-between">
          <h2 className="text-2xl font-black text-[#1B519F]">
            Available Candidates
          </h2>
          <p className="text-sm font-bold text-slate-500">
            {results.length} profiles
          </p>
        </div>
        {results.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {results.map((s) => (
              <SeekerCard key={s.id} seeker={s} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            {safeSeekers.length
              ? "No candidates match your search."
              : "No candidate profiles are available right now."}
          </div>
        )}
      </div>
    </section>
  );
}
