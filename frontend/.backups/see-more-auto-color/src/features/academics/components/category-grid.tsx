import Link from "next/link";
import type { ReactNode } from "react";
import { academicCategories } from "@/features/academics/data/categories.data";
import { getCategoryCourseCount } from "@/features/academics/services/course.service";
import type { CourseCategorySlug } from "@/features/academics/types/course.types";

type CategoryVisual = {
  panel: string;
  accent: string;
  icon: ReactNode;
  decor: ReactNode;
};

function IconShell({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

const categoryVisuals: Record<CourseCategorySlug, CategoryVisual> = {
  development: {
    panel: "bg-[#EEF0FF]",
    accent: "bg-[#4F6EF7]",
    icon: (
      <IconShell>
        <path d="M8.5 8.5 5 12l3.5 3.5M15.5 8.5 19 12l-3.5 3.5M13 7l-2 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#4F6EF7]/25" aria-hidden="true">
        <rect x="28" y="14" width="72" height="48" rx="8" fill="currentColor" />
        <rect x="36" y="24" width="28" height="4" rx="2" fill="white" fillOpacity="0.7" />
        <rect x="36" y="34" width="44" height="4" rx="2" fill="white" fillOpacity="0.55" />
        <rect x="36" y="44" width="36" height="4" rx="2" fill="white" fillOpacity="0.45" />
      </svg>
    ),
  },
  business: {
    panel: "bg-[#EAF8EF]",
    accent: "bg-[#22A06B]",
    icon: (
      <IconShell>
        <path d="M8 10V8.5A2.5 2.5 0 0 1 10.5 6h3A2.5 2.5 0 0 1 16 8.5V10M5.5 10h13v8.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 5.5 18.5V10Z" stroke="white" strokeWidth="1.8" />
        <path d="M10 13.5h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#22A06B]/25" aria-hidden="true">
        <rect x="30" y="40" width="12" height="22" rx="3" fill="currentColor" />
        <rect x="48" y="28" width="12" height="34" rx="3" fill="currentColor" />
        <rect x="66" y="20" width="12" height="42" rx="3" fill="currentColor" />
        <rect x="84" y="32" width="12" height="30" rx="3" fill="currentColor" />
      </svg>
    ),
  },
  finance: {
    panel: "bg-[#FFF4E8]",
    accent: "bg-[#F59223]",
    icon: (
      <IconShell>
        <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="1.8" />
        <path d="M12 7.5v9M9.5 9.5c.7-1 1.6-1.4 2.5-1.4 1.5 0 2.6.8 2.6 2s-1.1 2-2.6 2c-1.4 0-2.5.8-2.5 2s1.2 2 2.7 2c1 0 1.9-.4 2.5-1.3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#F59223]/28" aria-hidden="true">
        <circle cx="68" cy="40" r="22" fill="currentColor" />
        <path d="M68 18a22 22 0 0 1 19 31L68 40V18Z" fill="white" fillOpacity="0.45" />
      </svg>
    ),
  },
  "it-software": {
    panel: "bg-[#EAF3FF]",
    accent: "bg-[#1B519F]",
    icon: (
      <IconShell>
        <rect x="4.5" y="5.5" width="15" height="11" rx="2" stroke="white" strokeWidth="1.8" />
        <path d="M9 19.5h6M12 16.5v3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#1B519F]/22" aria-hidden="true">
        <rect x="26" y="18" width="70" height="42" rx="8" fill="currentColor" />
        <rect x="34" y="26" width="54" height="22" rx="4" fill="white" fillOpacity="0.45" />
        <rect x="48" y="56" width="26" height="4" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  "office-productivity": {
    panel: "bg-[#FFEDEA]",
    accent: "bg-[#EF5B4C]",
    icon: (
      <IconShell>
        <path d="M7 5.5h7.5L17 8.5V18a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 18V7A1.5 1.5 0 0 1 7 5.5Z" stroke="white" strokeWidth="1.8" />
        <path d="M8.5 11h7M8.5 14.5h5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#EF5B4C]/22" aria-hidden="true">
        <rect x="30" y="16" width="58" height="48" rx="8" fill="currentColor" />
        <rect x="38" y="26" width="20" height="14" rx="3" fill="white" fillOpacity="0.5" />
        <rect x="62" y="26" width="18" height="28" rx="3" fill="white" fillOpacity="0.35" />
        <rect x="38" y="46" width="20" height="8" rx="3" fill="white" fillOpacity="0.35" />
      </svg>
    ),
  },
  "personal-development": {
    panel: "bg-[#FCEEF8]",
    accent: "bg-[#DB2777]",
    icon: (
      <IconShell>
        <circle cx="12" cy="8.5" r="3" stroke="white" strokeWidth="1.8" />
        <path d="M6.5 18.5c1.1-3 3.2-4.5 5.5-4.5s4.4 1.5 5.5 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#DB2777]/22" aria-hidden="true">
        <circle cx="72" cy="30" r="12" fill="currentColor" />
        <path d="M48 62c4-12 12-18 24-18s20 6 24 18" fill="currentColor" />
      </svg>
    ),
  },
  design: {
    panel: "bg-[#F3EEFF]",
    accent: "bg-[#7C3AED]",
    icon: (
      <IconShell>
        <path d="M14.5 5.5 18.5 9.5 9 19H5v-4L14.5 5.5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12.5 7.5 16.5 11.5" stroke="white" strokeWidth="1.8" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#7C3AED]/22" aria-hidden="true">
        <path d="M30 52c18-28 34-28 52 0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="78" cy="28" r="10" fill="currentColor" />
      </svg>
    ),
  },
  marketing: {
    panel: "bg-[#E8FAF8]",
    accent: "bg-[#0D9488]",
    icon: (
      <IconShell>
        <path d="M4.5 10.5v3c0 1 .8 1.8 1.8 1.8H8l5.2 3.4V6.3L8 9.7H6.3c-1 0-1.8.8-1.8 1.8Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M16 9.5a3.5 3.5 0 0 1 0 5M18.2 7.5a6.5 6.5 0 0 1 0 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#0D9488]/22" aria-hidden="true">
        <path d="M34 48 58 34l28 8 10-18" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="96" cy="22" r="8" fill="currentColor" />
      </svg>
    ),
  },
  "data-science": {
    panel: "bg-[#F1ECFF]",
    accent: "bg-[#6D28D9]",
    icon: (
      <IconShell>
        <ellipse cx="12" cy="7" rx="6.5" ry="2.5" stroke="white" strokeWidth="1.8" />
        <path d="M5.5 7v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5V7M5.5 12v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" stroke="white" strokeWidth="1.8" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#6D28D9]/22" aria-hidden="true">
        <path d="M28 52 48 36l18 10 28-26" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="54" width="10" height="10" rx="2" fill="currentColor" />
        <rect x="46" y="46" width="10" height="18" rx="2" fill="currentColor" />
        <rect x="62" y="40" width="10" height="24" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  "cyber-security": {
    panel: "bg-[#EAF2FF]",
    accent: "bg-[#1B519F]",
    icon: (
      <IconShell>
        <path d="M12 4.5 18.5 7v5.5c0 4.2-2.8 7.3-6.5 8.5-3.7-1.2-6.5-4.3-6.5-8.5V7L12 4.5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="m9.8 12 1.6 1.6 3.4-3.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#1B519F]/22" aria-hidden="true">
        <rect x="40" y="22" width="42" height="34" rx="8" fill="currentColor" />
        <path d="M52 22v-4a10 10 0 0 1 20 0v4" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="61" cy="40" r="4" fill="white" fillOpacity="0.65" />
      </svg>
    ),
  },
  "cloud-computing": {
    panel: "bg-[#EAF6FF]",
    accent: "bg-[#0284C7]",
    icon: (
      <IconShell>
        <path d="M8 16.5h9.5A3.5 3.5 0 0 0 18 9.6a4.5 4.5 0 0 0-8.5-1.7A3.8 3.8 0 0 0 5.5 13a3.5 3.5 0 0 0 2.5 3.5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#0284C7]/22" aria-hidden="true">
        <path d="M36 48h40a14 14 0 0 0 2-28 18 18 0 0 0-34-5A14 14 0 0 0 22 40a14 14 0 0 0 14 8Z" fill="currentColor" />
      </svg>
    ),
  },
  "project-management": {
    panel: "bg-[#EAF8F1]",
    accent: "bg-[#16A34A]",
    icon: (
      <IconShell>
        <rect x="6" y="4.5" width="12" height="15" rx="2" stroke="white" strokeWidth="1.8" />
        <path d="M9 9.5h6M9 13h6M9 16.5h3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#16A34A]/22" aria-hidden="true">
        <rect x="34" y="16" width="52" height="48" rx="8" fill="currentColor" />
        <path d="m46 34 8 8 16-16" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "teaching-academics": {
    panel: "bg-[#FFF3E6]",
    accent: "bg-[#EA580C]",
    icon: (
      <IconShell>
        <path d="M3.5 9.5 12 5.5l8.5 4-8.5 4-8.5-4Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M7 11.5v5c2.2 1.5 4.4 2.2 5 2.2s2.8-.7 5-2.2v-5M19.5 10.5V16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </IconShell>
    ),
    decor: (
      <svg viewBox="0 0 120 80" className="h-full w-full text-[#EA580C]/22" aria-hidden="true">
        <path d="M34 28h24v34H34zM62 28h24v34H62z" fill="currentColor" />
        <path d="M34 28c10 6 14 6 24 0M62 28c10 6 14 6 24 0" fill="white" fillOpacity="0.35" />
      </svg>
    ),
  },
};

function formatCourseCount(count: number): string {
  return count === 1 ? "1 course" : `${count} courses`;
}

/** Premium Top Categories grid for the Academics marketplace. */
export function CategoryGrid() {
  return (
    <section className="space-y-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#E8F1FF] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1B519F]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1B519F]" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Explore by Category
          </p>
          <h2 className="mt-3 text-[clamp(1.875rem,3vw,2.75rem)] font-extrabold tracking-tight text-[#0B1F3A]">
            Top Categories
          </h2>
          <p className="mt-2 text-base leading-relaxed text-[#64748B] sm:text-lg">
            Explore practical learning paths across in-demand skills.
          </p>
        </div>

        <Link
          href="/academics/search"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-xl px-4 text-sm font-bold shadow-[0_6px_16px_rgba(15,23,42,0.04)] transition hover:shadow-[0_10px_24px_rgba(37,99,235,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] lg:self-auto !border-0 !bg-transparent !text-black hover:!bg-transparent hover:!text-black hover:underline"
        >
          See More...
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {academicCategories.map((category) => {
          const visual = categoryVisuals[category.slug];
          const count = getCategoryCourseCount(category.slug);

          return (
            <Link
              key={category.slug}
              href={`/academics/category/${category.slug}`}
              aria-label={`${category.name}, ${formatCourseCount(count)}`}
              className="group flex h-[172px] flex-col overflow-hidden rounded-2xl border border-[#E5EAF1] bg-white shadow-[0_8px_22px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#1B519F]/45 hover:shadow-[0_16px_34px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B519F] motion-reduce:transform-none"
            >
              <div className={`relative flex h-[52%] items-center overflow-hidden px-4 ${visual.panel}`}>
                <span
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] shadow-sm transition duration-200 group-hover:scale-[1.04] motion-reduce:transform-none ${visual.accent}`}
                >
                  {visual.icon}
                </span>
                <div className="pointer-events-none absolute inset-y-2 right-0 w-[58%] opacity-90 transition duration-200 group-hover:scale-[1.03] motion-reduce:transform-none">
                  {visual.decor}
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between gap-3 bg-white px-4">
                <span className="min-w-0">
                  <span className="block truncate text-[17px] font-bold text-[#0B1F3A]">{category.name}</span>
                  <span className="mt-0.5 block text-[13px] text-[#64748B]">{formatCourseCount(count)}</span>
                </span>
                <span
                  className="text-lg text-[#0B1F3A] transition duration-200 group-hover:translate-x-0.5 group-hover:text-[#1B519F] motion-reduce:transform-none"
                  aria-hidden="true"
                >
                  
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

