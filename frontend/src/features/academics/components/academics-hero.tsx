import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SearchBar } from "@/features/academics/components/search-bar";

const popularTags = [
  "Web Development",
  "Data Science",
  "AI & ML",
  "Business",
  "Design",
  "Cyber Security",
] as const;

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="5" y="3.5" width="12.5" height="17" rx="2" stroke="white" strokeWidth="1.8" />
      <path d="M8 8.5h6.5M8 12h6.5M8 15.5h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m15.4 7.8 1.2 1.2 2.2-2.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M9.2 5.8a3 3 0 0 1 5.6 0 2.8 2.8 0 0 1 2.7 2.7c0 1.2-.6 2.2-1.5 2.7.7.5 1.2 1.4 1.2 2.4a2.8 2.8 0 0 1-2.8 2.8H9.6A2.8 2.8 0 0 1 6.8 13.6c0-1 .5-1.9 1.2-2.4A2.8 2.8 0 0 1 6.5 8.5a2.8 2.8 0 0 1 2.7-2.7Z"
        stroke="white"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="11.2" r="1.2" fill="white" />
    </svg>
  );
}

function RibbonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <circle cx="12" cy="9.5" r="4.8" stroke="white" strokeWidth="1.8" />
      <path d="m9.5 9.3 1.6 1.6 3.4-3.4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9.8 13.8-1.5 5.2 3.7-1.8 3.7 1.8-1.5-5.2" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

const floatingCards: Array<{
  title: string;
  description: string;
  accent: string;
  icon: ReactNode;
}> = [
  {
    title: "Expert Instructors",
    description: "Learn from industry experts",
    accent: "bg-[#1B519F]",
    icon: <ChecklistIcon />,
  },
  {
    title: "Flexible Learning",
    description: "Study at your own pace",
    accent: "bg-[#14B8A6]",
    icon: <BrainIcon />,
  },
  {
    title: "Certificates",
    description: "Earn recognized certificates",
    accent: "bg-[#22C55E]",
    icon: <RibbonIcon />,
  },
];

function FeatureCard({
  title,
  description,
  accent,
  icon,
  className = "",
}: {
  title: string;
  description: string;
  accent: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[72px] items-center gap-3 rounded-[14px] bg-white px-3.5 py-3 shadow-[0_10px_28px_rgba(15,23,42,0.10)] ${className}`}
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] ${accent}`} aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-bold leading-5 text-[#111827]">{title}</span>
        <span className="mt-0.5 block text-[12px] leading-4 text-[#6B7280]">{description}</span>
      </span>
    </div>
  );
}

/**
 * Academics hero with three clear zones on desktop:
 * content | spaced feature cards | student visual (cards do not sit on the image).
 */
export function AcademicsHero() {
  return (
    <section className="relative min-h-[620px] overflow-x-clip bg-[#F5F8FD] lg:h-[calc(100svh-8rem)] lg:min-h-[620px] lg:max-h-[820px]">
      <div className="mx-auto grid min-h-[620px] w-full max-w-[1536px] items-center gap-8 px-6 py-11 sm:px-8 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1.05fr)_240px_minmax(0,1.1fr)] lg:gap-x-8 lg:gap-y-0 lg:px-12 lg:py-10 xl:gap-x-10 xl:px-16">
        {/* Left: copy + search + popular */}
        <div className="relative z-10 w-full max-w-[560px]">
          <p className="academics-welcome-badge inline-flex items-center gap-2 rounded-full bg-[#E8F1FF] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-[#1B519F]">
            <span className="academics-welcome-dot h-1.5 w-1.5 rounded-full bg-[#1B519F]" aria-hidden="true" />
            Welcome to Smartera Hub
          </p>

          <h1 className="mt-4 text-[clamp(2.4rem,4.2vw,3.75rem)] font-extrabold leading-[1.05] text-[#111827]">
            <span className="block">Learn. Grow.</span>
            <span className="block text-[#1B519F]">Excel.</span>
          </h1>

          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-[#64748B] sm:text-lg">
            Access world-class academic courses designed to help you build skills, advance your career, and achieve your goals.
          </p>

          <div className="mt-7 w-full max-w-[540px]">
            <SearchBar size="hero" placeholder="What do you want to learn today?" buttonLabel="Search" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 lg:gap-2.5">
            <span className="shrink-0 text-[13px] font-semibold text-[#64748B]">Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/academics/search?q=${encodeURIComponent(tag)}`}
                className="shrink-0 rounded-full border border-[#D5DAE3] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#374151] transition hover:border-[#1B519F] hover:text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Middle: feature cards - own column with clear space from the image */}
        <ul
          className="hidden w-full flex-col justify-center gap-5 lg:flex"
          aria-label="Learning highlights"
        >
          {floatingCards.map((card) => (
            <li key={card.title}>
              <FeatureCard {...card} className="w-full" />
            </li>
          ))}
        </ul>

        {/* Right: student visual only */}
        <div className="relative w-full">
          <div className="relative mx-auto h-[300px] w-full max-w-[560px] sm:h-[380px] md:h-[420px] lg:mx-0 lg:h-[460px] lg:max-w-none xl:h-[480px]">
            <Image
              src="/images/academics/hero-student.png"
              alt="Student learning on a laptop with Smartera Hub Academics"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-contain object-right object-bottom"
            />
          </div>

          {/* Tablet/mobile: cards below image, not over it */}
          <ul
            className="mt-6 grid gap-4 sm:grid-cols-3 lg:hidden"
            aria-label="Learning highlights"
          >
            {floatingCards.map((card) => (
              <li key={card.title} className="min-w-0">
                <FeatureCard {...card} className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
