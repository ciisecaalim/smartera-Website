"use client";

import { useState } from "react";

const technologies = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "REST API", "TypeScript"],
  Database: ["PostgreSQL", "MongoDB", "Prisma"],
  "UI / UX": ["Figma", "Wireframing", "Prototyping", "Responsive Design"],
} as const;

type TechnologyCategory = keyof typeof technologies;

export function TechnologyTabs() {
  const [active, setActive] = useState<TechnologyCategory>("Frontend");

  return (
    <div className="mt-8">
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Technology categories">
        {(Object.keys(technologies) as TechnologyCategory[]).map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={`ict-technology-tab min-w-28 rounded-lg px-5 py-2 text-xs font-black transition duration-300 ${active === category ? "bg-[#1B519F] text-white shadow-md" : "bg-[#F2F6FC] text-[#1B519F] hover:-translate-y-0.5 hover:bg-[#1B519F]/10"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div key={active} role="tabpanel" className="ict-technology-panel mt-5 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap rounded-2xl border border-[#1B519F]/15 bg-white p-4">
        {technologies[active].map((technology, index) => (
          <div
            key={technology}
            className="ict-technology-card flex min-h-28 w-full flex-col items-center justify-center rounded-xl bg-[#F7FAFE] p-3 text-center sm:w-40 lg:w-auto lg:min-w-0 lg:flex-1"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <span className="ict-technology-icon flicker-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1B519F] text-white" aria-hidden="true">
              <TechnologyIcon name={technology} />
            </span>
            <span className="mt-3 text-xs font-black text-[#10213B]">{technology}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnologyIcon({ name }: { name: string }) {
  const common = "h-8 w-8";
  if (name === "React") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="16" cy="16" r="2.5" fill="currentColor"/><ellipse cx="16" cy="16" rx="13" ry="5"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)"/></svg>;
  if (name === "Next.js") return <svg viewBox="0 0 32 32" className={common}><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M9 22V10l14 15M22 10v9" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  if (name === "TypeScript") return <BadgeIcon label="TS" />;
  if (name === "JavaScript") return <BadgeIcon label="JS" />;
  if (name === "HTML5") return <ShieldIcon label="5" />;
  if (name === "CSS3") return <ShieldIcon label="3" />;
  if (name === "Tailwind CSS") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"><path d="M4 13c4-6 8-6 12 0s8 6 12 0M4 20c4-6 8-6 12 0s8 6 12 0"/></svg>;
  if (name === "Node.js") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m16 2 12 7v14l-12 7-12-7V9Z"/><path d="M11 21V11l10 10V11"/></svg>;
  if (name === "Express.js") return <BadgeIcon label="EX" />;
  if (name === "REST API") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="7" cy="16" r="3"/><circle cx="25" cy="7" r="3"/><circle cx="25" cy="25" r="3"/><path d="m10 15 12-6M10 17l12 6"/></svg>;
  if (name === "PostgreSQL") return <DatabaseIcon />;
  if (name === "MongoDB") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 3c7 6 8 14 0 24C8 17 9 9 16 3Z"/><path d="M16 8v21"/></svg>;
  if (name === "Prisma") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="m16 3 11 22-15 4L5 20Z"/><path d="m16 3-4 26"/></svg>;
  if (name === "Figma") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="3" width="8" height="9" rx="4"/><rect x="16" y="3" width="8" height="9" rx="4"/><rect x="8" y="12" width="8" height="9" rx="4"/><circle cx="20" cy="16.5" r="4.5"/><path d="M16 21v3a4 4 0 0 1-8 0v-3Z"/></svg>;
  if (name === "Wireframing") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="26" height="22" rx="3"/><path d="M3 11h26M11 11v16M15 16h9M15 21h7"/></svg>;
  if (name === "Prototyping") return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="3" width="16" height="21" rx="2"/><rect x="11" y="8" width="16" height="21" rx="2"/><path d="m16 16 6 3-6 3Z"/></svg>;
  return <svg viewBox="0 0 32 32" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="6" width="26" height="18" rx="2"/><path d="M11 28h10M16 24v4M8 12l-3 3 3 3M24 12l3 3-3 3"/></svg>;
}

function BadgeIcon({ label }: { label: string }) {
  return <svg viewBox="0 0 32 32" className="h-8 w-8"><rect x="3" y="4" width="26" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8"/><text x="16" y="21" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="900">{label}</text></svg>;
}

function ShieldIcon({ label }: { label: string }) {
  return <svg viewBox="0 0 32 32" className="h-8 w-8"><path d="M5 3h22l-2 22-9 4-9-4Z" fill="none" stroke="currentColor" strokeWidth="1.8"/><text x="16" y="21" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="900">{label}</text></svg>;
}

function DatabaseIcon() {
  return <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v9c0 2.2 5 4 11 4s11-1.8 11-4V7M5 16v9c0 2.2 5 4 11 4s11-1.8 11-4v-9"/></svg>;
}





