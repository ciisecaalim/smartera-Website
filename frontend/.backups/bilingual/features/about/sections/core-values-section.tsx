import Image from "next/image";

import { coreValues } from "@/features/about/data/about.data";

export function CoreValuesSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.65fr]">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#F59223]">
              {coreValues.eyebrow}
            </span>

            <h2 className="mt-3 max-w-[17ch] text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[-0.035em] text-[#1B519F]">
              {coreValues.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {coreValues.description}
            </p>
          </div>

          <div className="group relative hidden aspect-[16/8] overflow-hidden rounded-[24px] lg:block">
            <Image
              src={coreValues.image}
              alt="Koox wada shaqeynaysa"
              fill
              sizes="35vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />

            <div className="absolute inset-0 bg-[#1B519F]/15" />
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.items.map((value, index) => {
            const orange = index === 1 || index === 4;

            return (
              <article
                key={value.number}
                className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:border-[#1B519F]/20 hover:shadow-[0_18px_45px_rgba(6,59,134,0.10)] motion-reduce:transform-none"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black text-white transition-transform duration-300 group-hover:scale-110 ${
                      orange
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  >
                    {value.number}
                  </span>

                  <span
                    className={`h-1.5 w-8 rounded-full transition-all duration-500 group-hover:w-14 ${
                      orange
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  />
                </div>

                <h3 className="mt-5 text-lg font-black text-[#1B519F]">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


