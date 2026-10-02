
import { article as Larticle, div as Ldiv, h2 as Lh2, h3 as Lh3, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
import Image from "next/image";

import { whoWeAre } from "@/features/about/data/about.data";

export function WhoWeAreSection() {
  return (
    <Lsection className="bg-white py-14 sm:py-16 lg:py-20">
      <Ldiv className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 sm:px-6 lg:px-8 xl:grid-cols-[0.92fr_1.08fr] xl:gap-14">
        <Ldiv className="group relative min-w-0">
          <Ldiv className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(6,59,134,0.13)]">
            <Image
              src={whoWeAre.image}
              alt="Arday iyo macallimiin ku jira jawi waxbarasho"
              fill
              sizes="(max-width:1279px) 100vw, 46vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.055] motion-reduce:transform-none"
            />

            <Ldiv className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/30 via-transparent to-transparent" />

            <Ldiv className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-[#1B519F]/85 p-4 text-white backdrop-blur">
              <Lp className="text-xs font-black uppercase tracking-[0.14em] text-[#F59223]">
                OUR APPROACH
              </Lp>

              <Lp className="mt-1 text-sm font-bold">
                Learn  Practice  Grow  Opportunity
              </Lp>
            </Ldiv>
          </Ldiv>
        </Ldiv>

        <Ldiv className="min-w-0">
          <Lspan className="text-xs font-black uppercase tracking-[0.16em] text-[#F59223]">
            {whoWeAre.eyebrow}
          </Lspan>

          <Lh2 className="mt-3 max-w-[17ch] text-[clamp(2rem,3vw,3rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#1B519F]">
            {whoWeAre.title}
          </Lh2>

          <Ldiv className="mt-5 space-y-4">
            {whoWeAre.paragraphs.map((paragraph) => (
              <Lp
                key={paragraph}
                className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8"
              >
                {paragraph}
              </Lp>
            ))}
          </Ldiv>

          <Ldiv className="mt-7 grid gap-3 sm:grid-cols-3">
            {whoWeAre.pillars.map((pillar, index) => (
              <Larticle
                key={pillar.title}
                className="group rounded-2xl border border-slate-200 bg-[#F8FBFF] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1B519F]/25 hover:bg-white hover:shadow-lg motion-reduce:transform-none"
              >
                <Lspan
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black text-white ${
                    index === 1
                      ? "bg-[#F59223]"
                      : "bg-[#1B519F]"
                  }`}
                >
                  0{index + 1}
                </Lspan>

                <Lh3 className="mt-4 text-sm font-black text-[#1B519F]">
                  {pillar.title}
                </Lh3>

                <Lp className="mt-2 text-xs leading-6 text-slate-500">
                  {pillar.description}
                </Lp>
              </Larticle>
            ))}
          </Ldiv>
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}



