
import { article as Larticle, div as Ldiv, h1 as Lh1, h2 as Lh2, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
﻿import Image from "next/image";

import { aboutIntro } from "@/features/about/data/about.data";
import { fetchHeroMedia, heroAssetUrl } from "@/features/hero-media/hero-media.data";

/**
 * Compact editorial introduction for the About page.
 *
 * This deliberately avoids repeating the large homepage hero while still
 * giving the About page a strong visual identity and a single semantic H1.
 */
export async function AboutIntroSection() {
  const media = await fetchHeroMedia("about");
  const managedImages = media?.items?.filter((item) => item.type === "IMAGE") ?? [];
  const fallbacks = [
    { src: aboutIntro.primaryImage, alt: aboutIntro.primaryImageAlt },
    { src: aboutIntro.secondaryImage, alt: aboutIntro.secondaryImageAlt },
    { src: "/images/about/mission-vision.jpg", alt: "Smartera Hub community learning together" },
  ];
  const images = fallbacks.map((fallback, index) => {
    const item = managedImages.find((entry) => entry.sortOrder === index + 1);
    return {
      src: heroAssetUrl(item?.mediaUrl) || (index === 0 ? heroAssetUrl(media?.imageUrl) : "") || fallback.src,
      alt: item?.altText || (index === 0 ? media?.imageAlt : "") || fallback.alt,
    };
  });
  return (
    <Lsection className="relative flex min-h-screen items-center overflow-hidden bg-[#F7FAFF] py-10 sm:py-12 lg:h-screen lg:py-10">
      {/* Soft decorative background */}
      <Ldiv
        className="pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-[#1B519F]/6 blur-3xl"
        aria-hidden="true"
      />

      <Ldiv
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#F59223]/10 blur-3xl"
        aria-hidden="true"
      />

      <Ldiv className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            MAIN INTRO
           ===================================================== */}
        <Ldiv className="grid items-center gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
          {/* LEFT */}
          <Ldiv className="min-w-0">
            <Ldiv className="about-eyebrow-badge inline-flex items-center gap-2 rounded-full border border-[#F59223]/25 bg-[#FFF8E8] px-4 py-2 shadow-sm">
              <Lspan
                className="about-eyebrow-dot h-2 w-2 rounded-full bg-[#F59223]"
                aria-hidden="true"
              />

              <Lspan className="about-eyebrow-text text-[10px] font-black uppercase tracking-[0.17em] text-[#F59223] sm:text-[11px]">
                {aboutIntro.eyebrow}
              </Lspan>
            </Ldiv>

            <Lh1 className="mt-4 max-w-[18ch] text-[clamp(2rem,3.2vw,3.25rem)] font-black leading-[1.05] tracking-[-0.035em] text-[#1B519F] sm:mt-5">
              {aboutIntro.title}
            </Lh1>

            <Lp className="mt-4 max-w-[620px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {aboutIntro.description}
            </Lp>

            {/* Brand indicator */}
            <Ldiv className="mt-6 h-1.5 w-[120px] rounded-full bg-[#1B519F]" />
          </Ldiv>

          {/* =====================================================
              IMAGE COLLAGE
             ===================================================== */}
          <Ldiv className="relative mx-auto w-full max-w-[700px] lg:max-w-none">
            <Ldiv
              className="absolute -inset-4 rounded-[34px] bg-gradient-to-br from-[#1B519F]/10 to-[#F59223]/12 blur-2xl"
              aria-hidden="true"
            />

            <Ldiv className="relative grid grid-cols-[1.18fr_0.82fr] gap-3 sm:gap-4">
              {/* Main photo */}
              <Ldiv className="group relative min-h-[300px] overflow-hidden rounded-[26px] border-4 border-white shadow-[0_20px_55px_rgba(6,59,134,0.13)] sm:min-h-[360px]">
                <Image
                  unoptimized
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 65vw, 38vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055] motion-reduce:transform-none"
                />

                <Ldiv
                  className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/25 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <Ldiv className="absolute bottom-0 right-0 h-9 w-[72%] skew-x-[-22deg] bg-[#1B519F]" />
                <Ldiv className="absolute bottom-0 right-0 h-5 w-[45%] skew-x-[-22deg] bg-[#F59223]" />
              </Ldiv>

              {/* Secondary image + brand panel */}
              <Ldiv className="grid gap-3 sm:gap-4">
                <Ldiv className="group relative min-h-[180px] overflow-hidden rounded-[22px] border-4 border-white shadow-[0_16px_40px_rgba(6,59,134,0.10)] sm:min-h-[215px]">
                  <Image
                    unoptimized
                    src={images[1].src}
                    alt={images[1].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 24vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none"
                  />
                </Ldiv>

                <Ldiv className="group relative min-h-[180px] overflow-hidden rounded-[22px] border-4 border-white shadow-[0_16px_40px_rgba(6,59,134,0.10)] sm:min-h-[215px]">
                  <Image
                    unoptimized
                    src={images[2].src}
                    alt={images[2].alt}
                    fill
                    sizes="(max-width: 1024px) 35vw, 24vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] motion-reduce:transform-none"
                  />
                </Ldiv>
              </Ldiv>
            </Ldiv>
          </Ldiv>
        </Ldiv>

        {/* =====================================================
            COMPACT HIGHLIGHTS
           ===================================================== */}
        <Ldiv className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-10">
          {aboutIntro.highlights.map((item, index) => {
            const orange = index === 1;

            return (
              <Larticle
                key={item.number}
                className="group flex items-start gap-4 rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1B519F]/20 hover:shadow-lg motion-reduce:transform-none sm:p-5"
              >
                <Lspan
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-black text-white transition-transform duration-300 group-hover:scale-110 ${
                    orange
                      ? "bg-[#F59223]"
                      : "bg-[#1B519F]"
                  }`}
                >
                  {item.number}
                </Lspan>

                <Ldiv>
                  <Lh2 className="text-sm font-black text-[#1B519F]">
                    {item.title}
                  </Lh2>

                  <Lp className="mt-1 text-xs leading-6 text-slate-500">
                    {item.description}
                  </Lp>
                </Ldiv>
              </Larticle>
            );
          })}
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}
