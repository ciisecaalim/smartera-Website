
import { article as Larticle, div as Ldiv, h2 as Lh2, h3 as Lh3, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
import { HomeIcon } from "@/features/home/components/home-icon";
import { homeJourney } from "@/features/home/data/home.data";

export function JourneySection() {
  return (
    <Lsection className="bg-[#F6FAFF] py-14 sm:py-16 lg:py-20">
      <Ldiv className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <Ldiv className="mx-auto max-w-3xl text-center">
          <Lp className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#1B519F]">
            {homeJourney.eyebrow}
          </Lp>

          <Lh2 className="mt-2 text-[clamp(1.8rem,3vw,2.7rem)] font-black tracking-tight text-[#1B519F]">
            {homeJourney.title}
          </Lh2>
        </Ldiv>

        <Ldiv className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <Ldiv
            className="absolute left-[9%] right-[9%] top-8 hidden border-t-2 border-dashed border-[#1B519F]/20 lg:block"
            aria-hidden="true"
          />

          {homeJourney.steps.map(
            (step) => (
              <Larticle
                key={step.number}
                className="group relative z-10 text-center"
              >
                <Lspan className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-[#DDEBFF] bg-[#1B519F] text-white shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 group-hover:bg-[#F59223] motion-reduce:transform-none">
                  <HomeIcon
                    name={step.icon}
                    className="h-7 w-7"
                  />
                </Lspan>

                <Lspan className="mx-auto -mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1B519F] text-[10px] font-black text-white">
                  {step.number}
                </Lspan>

                <Lh3 className="mt-4 text-base font-black text-[#1B519F]">
                  {step.title}
                </Lh3>

                <Lp className="mx-auto mt-2 max-w-[180px] text-xs leading-6 text-slate-600">
                  {step.description}
                </Lp>
              </Larticle>
            ),
          )}
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}


