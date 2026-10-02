import Image from "next/image";
import Link from "next/link";

const actions = [
  {
    title: "Learn a Skill",
    description: "Build practical, career-ready skills.",
    href: "/academics",
    number: "01",
  },
  {
    title: "Find an Internship",
    description: "Gain real-world work experience.",
    href: "/opportunities/internships",
    number: "02",
  },
  {
    title: "Find a Job",
    description: "Explore available career opportunities.",
    href: "/opportunities/jobs",
    number: "03",
  },
  {
    title: "Become a Trainer",
    description: "Share your expertise with our community.",
    href: "/trainers/apply",
    number: "04",
  },
];

export function FinalCtaSection() {
  return (
    <section className="bg-[#F5F9FF] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(8,43,87,.09)] lg:grid-cols-[0.44fr_0.56fr]">

          {/* IMAGE */}
          <div className="group relative min-h-[280px] overflow-hidden lg:min-h-[380px]">
            <Image
              src="/images/home/job-2.jpg"
              alt="Young professionals collaborating in a modern workplace"
              fill
              sizes="(max-width:1024px) 100vw, 44vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#092A55]/75 via-[#092A55]/10 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#FFC16E]">
                SMARTERA HUB
              </p>

              <h3 className="mt-2 max-w-sm text-2xl font-black leading-tight text-white">
                Learn. Grow. Get Connected.
              </h3>

              <p className="mt-2 max-w-sm text-xs leading-5 text-white/80">
                Skills, experience and opportunities that move your career forward.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center overflow-hidden px-6 py-8 sm:px-8 lg:px-10">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#F59223]/10 blur-3xl"
            />

            <p className="relative text-[10px] font-black uppercase tracking-[.18em] text-[#F59223]">
              TAKE YOUR NEXT STEP
            </p>

            <h2 className="relative mt-2 max-w-xl text-[clamp(1.8rem,3vw,2.65rem)] font-black leading-[1.08] tracking-tight text-[#1B519F]">
              Your Next Opportunity Starts Here.
            </h2>

            <p className="relative mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Learn new skills, gain experience, find opportunities,
              or share your expertise through Smartera Hub.
            </p>

            {/* DIFFERENT ACTION STYLE — NO CARD BOXES */}
            <div className="relative mt-6 grid gap-x-8 sm:grid-cols-2">
              {actions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group/action flex min-h-[92px] items-center gap-4 border-b border-slate-200 py-4 transition-colors hover:border-[#F59223]"
                >
                  <span className="text-[11px] font-black tracking-wider text-[#F59223]">
                    {action.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-black text-[#1B519F] transition-colors group-hover/action:text-[#174783]">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-black leading-none text-[#F59223] transition-transform duration-300 group-hover/action:translate-x-2"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
