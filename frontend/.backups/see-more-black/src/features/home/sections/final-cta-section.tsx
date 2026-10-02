import Image from "next/image";
import Link from "next/link";

import { homeFinalCta } from "@/features/home/data/home.data";

export function FinalCtaSection() {
  return (
    <section className="bg-[#F6FAFF] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(8,43,87,0.09)] lg:grid-cols-[0.43fr_0.57fr]">
          <div className="group relative min-h-[280px] lg:min-h-[340px]">
            <Image
              src={homeFinalCta.image}
              alt="Dhalinyaro wada shaqeynaya oo mustaqbalkooda dhisanaya"
              fill
              sizes="(max-width:1024px) 100vw, 43vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06] motion-reduce:transform-none"
            />
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden px-6 py-10 sm:px-10 lg:px-12">
            <div
              className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-[#F59223]/12 blur-3xl"
              aria-hidden="true"
            />

            <p className="relative text-xs font-extrabold uppercase tracking-[0.15em] text-[#1B519F]">
              {homeFinalCta.eyebrow}
            </p>

            <h2 className="relative mt-3 text-[clamp(2rem,3.4vw,3.2rem)] font-black leading-tight tracking-tight text-[#1B519F]">
              {homeFinalCta.title}
            </h2>

            <p className="relative mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              {homeFinalCta.description}
            </p>

            <div className="relative mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={homeFinalCta.primaryAction.href}
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1B519F] px-4 py-2.5 text-[13px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#174783] hover:shadow-lg motion-reduce:transform-none"
              >
                {homeFinalCta.primaryAction.label}
              </Link>

              <Link
                href={homeFinalCta.secondaryAction.href}
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#1B519F]/30 bg-white px-4 py-2.5 text-[13px] font-bold text-[#1B519F] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F59223] hover:shadow-lg motion-reduce:transform-none"
              >
                {homeFinalCta.secondaryAction.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


