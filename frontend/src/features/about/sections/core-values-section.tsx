
import { article as Larticle, div as Ldiv, h2 as Lh2, h3 as Lh3, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
import Image from "next/image";

import { coreValues } from "@/features/about/data/about.data";

export function CoreValuesSection() {
  return (
    <Lsection className="bg-white py-14 sm:py-16 lg:py-20">
      <Ldiv className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Ldiv className="grid items-end gap-8 lg:grid-cols-[1fr_0.65fr]">
          <Ldiv>
            <Lspan className="text-xs font-black uppercase tracking-[0.16em] text-[#F59223]">
              {coreValues.eyebrow}
            </Lspan>

            <Lh2 className="mt-3 max-w-[17ch] text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[-0.035em] text-[#1B519F]">
              {coreValues.title}
            </Lh2>

            <Lp className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {coreValues.description}
            </Lp>
          </Ldiv>

          <Ldiv className="group relative hidden aspect-[16/8] overflow-hidden rounded-[24px] lg:block">
            <Image
              src={coreValues.image}
              alt="Koox wada shaqeynaysa"
              fill
              sizes="35vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />

            <Ldiv className="absolute inset-0 bg-[#1B519F]/15" />
          </Ldiv>
        </Ldiv>

        <Ldiv className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.items.map((value, index) => {
            const orange = index === 1 || index === 4;

            return (
              <Larticle
                key={value.number}
                className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:border-[#1B519F]/20 hover:shadow-[0_18px_45px_rgba(6,59,134,0.10)] motion-reduce:transform-none"
              >
                <Ldiv className="flex items-center justify-between">
                  <Lspan
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black text-white transition-transform duration-300 group-hover:scale-110 ${
                      orange
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  >
                    {value.number}
                  </Lspan>

                  <Lspan
                    className={`h-1.5 w-8 rounded-full transition-all duration-500 group-hover:w-14 ${
                      orange
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  />
                </Ldiv>

                <Lh3 className="mt-5 text-lg font-black text-[#1B519F]">
                  {value.title}
                </Lh3>

                <Lp className="mt-2 text-sm leading-7 text-slate-600">
                  {value.description}
                </Lp>
              </Larticle>
            );
          })}
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}


