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

        <div className="grid overflow-hidden rounded-[24px] bg-white shadow-[0_16px_45px_rgba(8,43,87,.08)] lg:grid-cols-[0.44fr_0.56fr]">

          {/* IMAGE */}
          <div className="group relative min-h-[270px] overflow-hidden lg:min-h-[360px]">
            <Image
              src="/images/home/job-3.jpg"
              alt="Young professionals collaborating in a modern workplace"
              fill
              sizes="(max-width:1024px) 100vw, 44vw"
              className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
            />

            {/* Light bottom protection only — keeps image clear */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#092A55]/70 via-[#092A55]/20 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#FFC16E]">
                SMARTERA HUB
              </p>

              <h3 className="mt-2 max-w-md text-2xl font-black leading-tight text-white">
                Learn. Grow. Get Connected.
              </h3>

              <p className="mt-2 max-w-md text-xs leading-5 text-white/85">
                Skills, experience and opportunities that move your career forward.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center bg-white px-6 py-8 sm:px-8 lg:px-10">

            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#F59223]">
              TAKE YOUR NEXT STEP
            </p>

            <h2 className="mt-2 max-w-xl text-[clamp(1.8rem,3vw,2.65rem)] font-black leading-[1.08] tracking-tight text-[#1B519F]">
              Your Next Opportunity Starts Here.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Learn new skills, gain experience, find opportunities,
              or share your expertise through Smartera Hub.
            </p>

            {/* BORDERLESS ANIMATED ACTIONS */}
            <div className="mt-6 grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {actions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group/action relative flex min-h-[82px] items-center gap-4 overflow-hidden px-1 py-3 transition-all duration-300 hover:translate-x-2 motion-reduce:transform-none"
                >
                  {/* animated background */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left scale-x-0 rounded-xl bg-[#F5F9FF] opacity-0 transition-all duration-500 ease-out group-hover/action:scale-x-100 group-hover/action:opacity-100"
                  />

                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[11px] font-black text-[#1B519F] transition-all duration-500 group-hover/action:rotate-[360deg] group-hover/action:bg-[#1B519F] group-hover/action:text-white motion-reduce:transform-none">
                    {action.number}
                  </span>

                  <div className="relative min-w-0 flex-1">
                    <h3 className="text-[15px] font-black text-[#1B519F] transition-all duration-300 group-hover/action:translate-x-1 group-hover/action:text-[#F59223] motion-reduce:transform-none">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  {/* animated dot instead of arrow */}
                  <span
                    aria-hidden="true"
                    className="relative h-2 w-2 shrink-0 rounded-full bg-[#F59223] opacity-0 transition-all duration-300 group-hover/action:scale-[1.6] group-hover/action:opacity-100"
                  />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
