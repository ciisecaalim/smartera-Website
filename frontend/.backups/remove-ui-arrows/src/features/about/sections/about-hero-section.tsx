import Image from "next/image";
import Link from "next/link";

import { aboutHero } from "@/features/about/data/about.data";
import { fetchHeroMedia, heroAssetUrl } from "@/features/hero-media/hero-media.data";

/**
 * Compact About hero.
 *
 * Desktop gives the headline enough horizontal room to remain visually
 * balanced in two lines while the image starts at the same visual level
 * as the main heading.
 */
export async function AboutHeroSection() {
  const media = await fetchHeroMedia("about");
  const managedImages = media?.items?.filter((item) => item.type === "IMAGE") ?? [];
  const fallbackImages = [
    { src: aboutHero.image, alt: "Koox dhalinyaro ah oo wada shaqeynaya" },
    { src: "/images/about/who-we-are.jpg", alt: "Smartera Hub training and presentation session" },
    { src: "/images/about/mission-vision.jpg", alt: "Smartera Hub community learning together" },
  ];
  const images = fallbackImages.map((fallback, index) => ({
    src: heroAssetUrl(managedImages.find((item) => item.sortOrder === index + 1)?.mediaUrl) || (index === 0 ? heroAssetUrl(media?.imageUrl) : "") || fallback.src,
    alt: managedImages.find((item) => item.sortOrder === index + 1)?.altText || (index === 0 ? media?.imageAlt : "") || fallback.alt,
  }));
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#F7FAFF] via-white to-[#FFF9EE]">
      {/* Background atmosphere */}
      <div
        className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-[#1B519F]/7 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#F59223]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-9 pt-4 sm:px-6 sm:pb-10 sm:pt-5 lg:px-8 lg:pb-12 lg:pt-6">
        <div className="grid w-full grid-cols-1 items-start gap-8 lg:gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-12">
          {/* =====================================================
              LEFT CONTENT
             ===================================================== */}
          <div className="min-w-0">
            <div className="about-eyebrow-badge inline-flex items-center gap-2 rounded-full border border-[#F59223]/25 bg-[#FFF8E8] px-3.5 py-1.5 shadow-sm sm:px-4 sm:py-2">
              <span
                className="about-eyebrow-dot h-2 w-2 shrink-0 rounded-full bg-[#F59223]"
                aria-hidden="true"
              />

              <span className="about-eyebrow-text text-[10px] font-black tracking-[0.15em] text-[#F59223] sm:text-[11px]">
                {aboutHero.eyebrow}
              </span>
            </div>

            <h1 className="mt-4 max-w-[22ch] pr-2 text-[clamp(2.15rem,3.2vw,3.2rem)] font-black leading-[1.04] tracking-[-0.035em] text-[#1B519F] sm:mt-5 sm:pr-4 xl:max-w-[760px] xl:pr-8">
              {aboutHero.title}
            </h1>

            <p className="mt-4 max-w-[650px] pr-2 text-sm leading-7 text-slate-600 sm:text-[15px] sm:leading-7 lg:text-base lg:leading-8">
              {aboutHero.description}
            </p>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap">
              <Link
                href={aboutHero.primaryAction.href}
                className="group inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1B519F] px-5 py-3 text-sm font-black text-white shadow-[0_10px_24px_rgba(7,94,222,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#174783] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none sm:px-6"
              >
                {aboutHero.primaryAction.label}

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href={aboutHero.secondaryAction.href}
                className="group inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1B519F]/20 bg-white px-5 py-3 text-sm font-black text-[#1B519F] transition-all duration-300 hover:-translate-y-1 hover:border-[#F59223] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none sm:px-6"
              >
                {aboutHero.secondaryAction.label}

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Supporting points */}
            <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
              {[
                ["01", "Practical Skills"],
                ["02", "Career Growth"],
                ["03", "Opportunities"],
              ].map(([number, label], index) => (
                <div
                  key={number}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1B519F]/20 hover:bg-white hover:shadow-md motion-reduce:transform-none"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white ${
                      index === 1
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  >
                    {number}
                  </span>

                  <span className="text-[11px] font-black text-[#1B519F] sm:text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
              RIGHT IMAGE
             ===================================================== */}
          <div className="relative mx-auto mt-1 w-full max-w-[720px] sm:mt-2 xl:mt-[52px] xl:max-w-none">
            <div
              className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[#1B519F]/12 via-transparent to-[#F59223]/15 blur-2xl"
              aria-hidden="true"
            />

            <div className="grid min-h-[390px] grid-cols-1 gap-4 sm:grid-cols-[1.45fr_1fr] sm:grid-rows-2">
              {images.map((item, index) => <div key={item.src + index} className={`group relative overflow-hidden rounded-[26px] border-4 border-white bg-slate-100 shadow-[0_24px_60px_rgba(6,59,134,0.15)] ${index === 0 ? "aspect-[4/3] sm:row-span-2 sm:aspect-auto" : "aspect-[16/10] sm:aspect-auto"}`}>
                <Image unoptimized src={item.src} alt={item.alt} fill priority={index === 0} sizes={index === 0 ? "(max-width:639px) 100vw, 30vw" : "(max-width:639px) 100vw, 20vw"} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/20 via-transparent to-transparent" aria-hidden="true" />
                {index === 0 ? <><div className="pointer-events-none absolute bottom-0 right-[-2%] h-10 w-[72%] skew-x-[-22deg] bg-[#1B519F]/95" aria-hidden="true" /><div className="pointer-events-none absolute bottom-0 right-[-2%] h-6 w-[48%] skew-x-[-22deg] bg-[#F59223]" aria-hidden="true" /></> : null}
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
