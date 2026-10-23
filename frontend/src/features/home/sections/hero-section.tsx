
import { article as Larticle, div as Ldiv, h1 as Lh1, p as Lp, section as Lsection, span as Lspan, strong as Lstrong } from "@/i18n/elements";
import Link from "@/i18n/link";

import { HomeIcon } from "@/features/home/components/home-icon";
import { HomeHeroMedia } from "@/features/hero-media/home-hero-media";
import { fetchHeroMedia } from "@/features/hero-media/hero-media.data";
import {
  homeHero,
  homeImpactStats,
} from "@/features/home/data/home.data";

/**
 * Responsive viewport-height homepage hero.
 * Mobile can grow beyond one viewport when content needs additional room.
 */
export async function HeroSection() {
  const heroMedia = await fetchHeroMedia("home");
  return (
    <Lsection className="home-page-hero relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-white via-[#F8FBFF] to-[#FFFAF1] lg:h-screen">
      {/* Existing animated background blobs */}
      <Ldiv
        className="smartera-hero-blob smartera-hero-blob-one"
        aria-hidden="true"
      />

      <Ldiv
        className="smartera-hero-blob smartera-hero-blob-two"
        aria-hidden="true"
      />

      <Ldiv
        className="smartera-hero-blob smartera-hero-blob-three"
        aria-hidden="true"
      />

      {/* Decorative dots - desktop only */}
      <Ldiv
        className="pointer-events-none absolute right-[4%] top-[8%] hidden grid-cols-5 gap-2 opacity-35 2xl:grid"
        aria-hidden="true"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <Lspan
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-[#F59223]"
          />
        ))}
      </Ldiv>

      <Ldiv className="relative mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-4 py-7 sm:px-6 sm:py-8 lg:h-full lg:min-h-0 lg:items-start lg:px-8 lg:pb-6 lg:pt-8 xl:pt-9">
        <Ldiv className="grid w-full grid-cols-1 items-center gap-8 lg:gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:gap-12">
          {/* =====================================================
              LEFT CONTENT
             ===================================================== */}
          <Ldiv className="min-w-0">
            <Ldiv className="smartera-hero-reveal smartera-delay-1">
              <Lspan className="home-hero-eyebrow relative inline-flex h-10 w-full max-w-[480px] items-center justify-center overflow-hidden rounded-full border border-brand-orange/35 bg-orange-50/95 px-4 shadow-sm sm:max-w-[460px]">
                <Lspan className="smartera-eyebrow-shimmer whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.13em] sm:text-[11px]">
                  {homeHero.eyebrow}
                </Lspan>
              </Lspan>
            </Ldiv>

            <Lh1 className="smartera-hero-reveal smartera-delay-2 mt-4 max-w-[15ch] text-[clamp(2.35rem,3.8vw,3.85rem)] font-black leading-[1.02] tracking-[-0.035em] text-[#1B519F] sm:mt-5">
              {homeHero.title}
            </Lh1>

            <Lp className="smartera-hero-reveal smartera-delay-3 mt-4 max-w-[570px] text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7 lg:text-base lg:leading-8">
              {homeHero.description}
            </Lp>

            {/* CTA */}
            <Ldiv className="smartera-hero-reveal smartera-delay-4 mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
              <Link
                href={homeHero.primaryAction.href}
                className="group inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1B519F] px-5 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(22,85,163,0.20)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#1B519F] hover:shadow-[0_16px_32px_rgba(22,85,163,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2 motion-reduce:transform-none sm:px-6"
              >
                {homeHero.primaryAction.label}

                <Lspan className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  
                </Lspan>
              </Link>

              <Link
                href={homeHero.secondaryAction.href}
                className="group inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1B519F]/25 bg-white/90 px-5 py-3 text-sm font-extrabold text-[#1B519F] shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#F59223] hover:text-[#F59223] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none sm:px-6"
              >
                {homeHero.secondaryAction.label}

                <Lspan className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  
                </Lspan>
              </Link>
            </Ldiv>

            {/* Compact benefit row */}
            <Ldiv className="smartera-hero-reveal smartera-delay-5 mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-3">
              {homeHero.benefits.map((benefit) => (
                <Larticle
                  key={benefit.title}
                  className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-3 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#F59223]/40 hover:bg-white hover:shadow-md motion-reduce:transform-none"
                >
                  <Lspan className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF5FF] text-[#1B519F] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FFF6DF] group-hover:text-[#F59223]">
                    <HomeIcon
                      name={benefit.icon}
                      className="h-4.5 w-4.5"
                    />
                  </Lspan>

                  <Lspan className="min-w-0">
                    <Lstrong className="block text-[11px] font-black leading-4 text-[#1B519F] sm:text-xs">
                      {benefit.title}
                    </Lstrong>

                    <Lspan className="mt-0.5 block text-[10px] leading-4 text-slate-500">
                      {benefit.description}
                    </Lspan>
                  </Lspan>
                </Larticle>
              ))}
            </Ldiv>
          </Ldiv>

          {/* =====================================================
              RIGHT IMAGE
             ===================================================== */}
          <Ldiv className="smartera-hero-reveal smartera-delay-3 relative mx-auto w-full max-w-[680px] xl:max-w-none">
            <Ldiv
              className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[#1B519F]/12 via-transparent to-[#F59223]/16 blur-2xl"
              aria-hidden="true"
            />

            {/* Decorative orbit - large screens only */}
            <Ldiv
              className="smartera-orbit pointer-events-none absolute -right-4 -top-4 hidden h-24 w-24 rounded-full border-2 border-dashed border-[#F59223]/30 2xl:block"
              aria-hidden="true"
            />

            <Ldiv className="group relative aspect-[16/10] overflow-hidden rounded-[26px] border-4 border-white bg-slate-100 shadow-[0_24px_65px_rgba(8,43,87,0.15)] sm:rounded-[28px] xl:h-[440px] xl:aspect-auto 2xl:h-[460px]">
              <HomeHeroMedia media={heroMedia} fallbackImage={homeHero.image} fallbackAlt="Smartera Hub learners working together" />

              <Ldiv
                className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(6,31,66,0.62)_0%,rgba(6,59,134,0.28)_48%,rgba(6,31,66,0.08)_100%)]"
                aria-hidden="true"
              />

              {/* Brand ribbon */}
              <Ldiv
                className="pointer-events-none absolute bottom-0 right-[-2%] h-14 w-[76%] skew-x-[-22deg] bg-[#1B519F]/95 sm:w-[80%] xl:w-[82%]"
                aria-hidden="true"
              />

              <Ldiv
                className="pointer-events-none absolute bottom-0 right-[-2%] h-9 w-[66%] skew-x-[-22deg] bg-[#F59223] sm:w-[70%] xl:w-[74%]"
                aria-hidden="true"
              />

            </Ldiv>

            {/* Floating card */}
            <Ldiv className="smartera-floating-card absolute -bottom-10 right-3 z-20 hidden w-[330px] rounded-[22px] border border-white/15 bg-[#1B519F] px-6 py-5 text-white shadow-[0_20px_50px_rgba(27,81,159,0.28)] sm:block lg:right-5">
              <Lp className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#F59223]">
                Our Impact
              </Lp>

              <Ldiv className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
                {homeImpactStats.map((stat) => (
                  <Ldiv key={stat.label}>
                    <Lp className="font-serif text-2xl font-bold leading-none sm:text-[28px]">
                      {stat.value}
                    </Lp>
                    <Lp className="mt-1.5 text-[10px] leading-tight text-white/75 sm:text-[11px]">
                      {stat.label}
                    </Lp>
                  </Ldiv>
                ))}
              </Ldiv>
            </Ldiv>

            {/* Secondary floating card */}
            <Ldiv className="smartera-floating-card-secondary absolute -left-3 top-[22%] hidden rounded-xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_14px_35px_rgba(8,43,87,0.12)] backdrop-blur 2xl:block">
              <Lp className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#F59223]">
                Smartera Hub
              </Lp>

              <Lp className="mt-1 text-xs font-black text-[#1B519F]">
                Learn. Build. Grow.
              </Lp>
            </Ldiv>
          </Ldiv>
        </Ldiv>
      </Ldiv>

      <Ldiv
        className="home-hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/60 to-transparent"
        aria-hidden="true"
      />
    </Lsection>
  );
}
