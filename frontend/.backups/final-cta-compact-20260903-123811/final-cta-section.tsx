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
    <section className="bg-[#F5F9FF] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_65px_rgba(8,43,87,.10)] lg:grid-cols-[0.46fr_0.54fr]">
          
          <div className="group relative min-h-[330px] overflow-hidden lg:min-h-[480px]">
            <Image
              src="/images/home/job-1.jpg"
              alt="Young professionals developing practical digital and career skills"
              fill
              sizes="(max-width:1024px) 100vw, 46vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#092A55]/80 via-[#092A55]/15 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-[11px] font-black uppercase tracking-[.18em] text-[#FFC16E]">
                SMARTERA HUB
              </p>

              <h3 className="mt-2 max-w-sm text-2xl font-black leading-tight text-white sm:text-3xl">
                Learn. Grow. Get Connected.
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                Practical skills, real experience and opportunities that move your career forward.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden px-6 py-10 sm:px-9 sm:py-12 lg:px-11">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F59223]/10 blur-3xl"
            />

            <p className="relative text-[11px] font-black uppercase tracking-[.18em] text-[#F59223]">
              TAKE YOUR NEXT STEP
            </p>

            <h2 className="relative mt-3 max-w-xl text-[clamp(2rem,3.2vw,3rem)] font-black leading-[1.08] tracking-tight text-[#1B519F]">
              Your Next Opportunity Starts Here.
            </h2>

            <p className="relative mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Learn new skills, gain real experience, find employment opportunities, or share your expertise through Smartera Hub.
            </p>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
              {actions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group/action relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#1B519F]/30 hover:shadow-[0_12px_30px_rgba(27,81,159,.12)] motion-reduce:transform-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF5FF] text-[10px] font-black text-[#1B519F] transition-colors group-hover/action:bg-[#1B519F] group-hover/action:text-white">
                      {action.number}
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-[#1B519F]">
                        {action.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-slate-500">
                        {action.description}
                      </p>
                    </div>

                    <span className="ml-auto text-lg font-bold text-[#F59223] transition-transform group-hover/action:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
