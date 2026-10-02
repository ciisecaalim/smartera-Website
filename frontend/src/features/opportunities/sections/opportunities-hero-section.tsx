import Image from "next/image";
import Link from "@/i18n/link";
import { h1 as Lh1, p as Lp, span as Lspan } from "@/i18n/elements";

import { Container } from "@/components/ui/container";

function TrainingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m3 10 9-5 9 5-9 5-9-5Z" />
      <path d="M7 12.5V17c3 2 7 2 10 0v-4.5" />
    </svg>
  );
}

function JobsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function AcademicsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5A2.5 2.5 0 0 1 20 21.5v-16Z" />
    </svg>
  );
}

function InternshipsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
      <path d="M14 15c4 0 7 1.5 7 5" />
    </svg>
  );
}

const opportunities = [
  { title: "Academics", description: "Online courses and practical learning.", href: "/academics", tone: "purple", icon: AcademicsIcon },
  { title: "Training", description: "Build practical skills.", href: "/opportunities/training", tone: "blue", icon: TrainingIcon },
  { title: "Internships", description: "Gain real-world experience.", href: "/opportunities/internships", tone: "orange", icon: InternshipsIcon },
  { title: "Jobs", description: "Find your next opportunity.", href: "/opportunities/jobs", tone: "green", icon: JobsIcon },
] as const;

const toneClasses = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    text: "text-blue-700",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-600",
    text: "text-emerald-700",
  },
  purple: {
    icon: "bg-violet-50 text-violet-600",
    text: "text-violet-700",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    text: "text-orange-700",
  },
} as const;

export function OpportunitiesHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white">

      {/* subtle background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-[-8%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[#EAF4FF]/80 blur-3xl" />

        <div className="absolute bottom-[-18%] left-[32%] h-[360px] w-[360px] rounded-full bg-[#F5F9FF] blur-3xl" />
      </div>

      <Container className="grid min-h-[calc(100svh-104px)] items-center gap-10 py-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:py-6 xl:gap-16">

        {/* =================================================
            LEFT
        ================================================== */}
        <div className="max-w-[650px]">

          {/* badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FF] px-4 py-2 text-[#075DCE]">
            <span className="grid h-5 w-5 place-items-center">
              <JobsIcon />
            </span>

            <Lspan className="text-[10px] font-black uppercase tracking-[0.14em]">
              Opportunities
            </Lspan>
          </div>

          {/* heading */}
          <Lh1 className="mt-5 max-w-[650px] text-[clamp(2.5rem,4.8vw,4.8rem)] font-black leading-[1.02] tracking-[-0.045em] text-[#071B41]">Find the opportunity that fits you.</Lh1>

          {/* description */}
          <Lp className="mt-5 max-w-[610px] text-[15px] leading-7 text-slate-600 sm:text-base lg:text-[17px]">Training, Jobs, Academics, and Internships — choose the path that helps you learn or find work.</Lp>

          {/* buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <Link
              href="#opportunity-domains"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#075DCE] px-6 text-sm font-bold text-white transition-colors hover:bg-[#064FAE]"
            >
              Browse Opportunities
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[#C9D7E8] bg-white px-6 text-sm font-bold text-[#075DCE] transition-colors hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </div>


          {/* small opportunity navigation */}
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4 lg:mt-10">

            {opportunities.map((item) => {
              const Icon = item.icon;
              const tone =
                toneClasses[item.tone];

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group min-w-0"
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full ${tone.icon}`}
                  >
                    <Icon />
                  </span>

                  <Lspan
                    className={`mt-2.5 block text-[13px] font-black ${tone.text}`}
                  >
                    {item.title}
                  </Lspan>

                  <Lspan className="mt-1 block text-[10px] leading-4 text-slate-500">
                    {item.description}
                  </Lspan>
                </Link>
              );
            })}
          </div>
        </div>


        {/* =================================================
            RIGHT VISUAL
        ================================================== */}
        <div className="relative mx-auto w-full max-w-[760px] lg:justify-self-end">

          {/* decorative background */}
          <div
            aria-hidden="true"
            className="absolute left-[4%] top-[8%] h-[78%] w-[72%] rounded-[48%] bg-gradient-to-br from-[#EAF4FF] via-[#F8FBFF] to-white"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[9%] left-[3%] h-36 w-36 rounded-full bg-[#0874F9]/90"
          />

          {/* main image */}
          <div className="relative ml-auto w-[88%] overflow-hidden rounded-[42%_42%_18%_18%/30%_30%_18%_18%] shadow-[0_20px_55px_rgba(20,58,115,0.12)] sm:w-[82%] lg:w-[84%]">

            <div className="relative aspect-[4/3]">

              <Image
                src="/images/opportunities/opportunities-hero.jpg"
                alt="Dhalinyaro wax baranaya oo ka faa'iideysanaya fursadaha Smartera Hub"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 47vw"
                className="object-cover object-center"
              />
            </div>
          </div>


          {/* Floating labels - desktop/tablet */}
          <div className="absolute left-0 top-[14%] hidden rounded-[18px] border border-white bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur sm:flex sm:items-center sm:gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600">
              <TrainingIcon />
            </span>

            <span className="text-sm font-black text-[#075DCE]">
              Training
            </span>
          </div>


          <div className="absolute left-[-2%] top-[37%] hidden rounded-[18px] border border-white bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur sm:flex sm:items-center sm:gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <JobsIcon />
            </span>

            <span className="text-sm font-black text-emerald-700">
              Jobs
            </span>
          </div>


          <div className="absolute right-[1%] top-[29%] hidden rounded-[18px] border border-white bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur md:flex md:items-center md:gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-50 text-violet-600">
              <AcademicsIcon />
            </span>

            <span className="text-sm font-black text-violet-700">
              Academics
            </span>
          </div>


          <div className="absolute right-[-1%] top-[51%] hidden rounded-[18px] border border-white bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur md:flex md:items-center md:gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-50 text-orange-600">
              <InternshipsIcon />
            </span>

            <span className="text-sm font-black text-orange-700">
              Internships
            </span>
          </div>


          {/* handwritten style note */}
          <div className="absolute right-[2%] top-[4%] hidden -rotate-3 text-right lg:block">
            <p className="text-[15px] font-bold italic leading-[18px] text-[#075DCE]">
              Your Skills.
              <br />
              Your Future.
            </p>

            <div className="ml-auto mt-2 h-[3px] w-24 rotate-[-4deg] rounded-full bg-[#F59E0B]" />
          </div>
        </div>
      </Container>
    </section>
  );
}