import Image from "next/image";

import { missionVision } from "@/features/about/data/about.data";

export function MissionVisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#F2F7FF] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#F59223]">
            {missionVision.eyebrow}
          </span>

          <h2 className="mt-3 text-[clamp(2rem,3vw,3rem)] font-black leading-tight tracking-[-0.035em] text-[#1B519F]">
            {missionVision.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {missionVision.description}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="group relative min-h-[360px] overflow-hidden rounded-[28px]">
            <Image
              src={missionVision.image}
              alt="Koox xirfadlayaal ah oo qorsheynaya shaqo"
              fill
              sizes="(max-width:1024px) 100vw, 38vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transform-none"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/60 via-[#1B519F]/5 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <span className="rounded-full bg-[#F59223] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                PURPOSE
              </span>
            </div>
          </div>

          <div className="grid gap-5">
            {missionVision.items.map((item, index) => (
              <article
                key={item.label}
                className="group relative overflow-hidden rounded-[26px] border border-[#1B519F]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transform-none sm:p-7"
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1.5 ${
                    index === 0
                      ? "bg-[#1B519F]"
                      : "bg-[#F59223]"
                  }`}
                />

                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white ${
                      index === 0
                        ? "bg-[#1B519F]"
                        : "bg-[#F59223]"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                      {item.label}
                    </span>

                    <h3 className="mt-2 text-xl font-black leading-tight text-[#1B519F] sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute -bottom-16 -right-16 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                    index === 0
                      ? "bg-[#1B519F]/15"
                      : "bg-[#F59223]/15"
                  }`}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


