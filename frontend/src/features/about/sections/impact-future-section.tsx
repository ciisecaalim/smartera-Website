
import { div as Ldiv, h2 as Lh2, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
import Image from "next/image";
import Link from "@/i18n/link";

import { impactFuture } from "@/features/about/data/about.data";

export function ImpactFutureSection() {
  return (
    <Lsection className="bg-[#F2F7FF] py-14 sm:py-16 lg:py-20">
      <Ldiv className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <Ldiv className="relative overflow-hidden rounded-[32px] bg-[#1B519F] shadow-[0_28px_70px_rgba(6,59,134,0.20)]">
          <Ldiv
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#1B519F]/45 blur-3xl"
            aria-hidden="true"
          />

          <Ldiv
            className="pointer-events-none absolute -bottom-36 left-[30%] h-72 w-72 rounded-full bg-[#F59223]/12 blur-3xl"
            aria-hidden="true"
          />

          <Ldiv className="relative grid lg:grid-cols-[0.55fr_0.45fr]">
            <Ldiv className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
              <Lspan className="text-xs font-black uppercase tracking-[0.16em] text-[#F59223]">
                {impactFuture.eyebrow}
              </Lspan>

              <Lh2 className="mt-3 max-w-[15ch] text-[clamp(2rem,3.4vw,3.4rem)] font-black leading-[1.08] tracking-[-0.035em] text-white">
                {impactFuture.title}
              </Lh2>

              <Lp className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                {impactFuture.description}
              </Lp>

              <Ldiv className="mt-6 flex flex-wrap gap-2">
                {impactFuture.highlights.map((highlight, index) => (
                  <Lspan
                    key={highlight}
                    className={`rounded-full border px-3 py-2 text-xs font-bold ${
                      index === 1
                        ? "border-[#F59223]/35 bg-[#F59223]/15 text-[#FFD08F]"
                        : "border-white/15 bg-white/8 text-white"
                    }`}
                  >
                    {highlight}
                  </Lspan>
                ))}
              </Ldiv>

              <Ldiv className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={impactFuture.primaryAction.href}
                  className="group inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F59223] px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transform-none"
                >
                  {impactFuture.primaryAction.label}

                  <Lspan className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    
                  </Lspan>
                </Link>

                <Link
                  href={impactFuture.secondaryAction.href}
                  className="group inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 px-6 py-3.5 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#1B519F] motion-reduce:transform-none"
                >
                  {impactFuture.secondaryAction.label}

                  <Lspan className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    
                  </Lspan>
                </Link>
              </Ldiv>
            </Ldiv>

            <Ldiv className="group relative min-h-[320px] lg:min-h-[500px]">
              <Image
                src={impactFuture.image}
                alt="Dhalinyaro wada shaqeynaya oo mustaqbalkooda dhisanaya"
                fill
                sizes="(max-width:1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.055] motion-reduce:transform-none"
              />

              <Ldiv className="absolute inset-0 bg-gradient-to-r from-[#1B519F] via-[#1B519F]/30 to-transparent lg:block" />

              <Ldiv className="absolute bottom-0 right-0 h-14 w-[65%] skew-x-[-22deg] bg-[#1B519F]/95" />
              <Ldiv className="absolute bottom-0 right-0 h-8 w-[42%] skew-x-[-22deg] bg-[#F59223]" />
            </Ldiv>
          </Ldiv>
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}


