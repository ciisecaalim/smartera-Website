import Image from "next/image";
import { Container } from "@/components/ui/container";
import { fetchHeroMedia, heroAssetUrl } from "@/features/hero-media/hero-media.data";

/** Calm editorial hero with clear separation between imagery and page messaging. */
export async function PartnersHeroSection() {
  const media = await fetchHeroMedia("partners");
  const image = heroAssetUrl(media?.imageUrl) || "/images/partners/partners-hero.png";
  return (
    <section className="relative isolate mt-0 min-h-screen overflow-hidden bg-[#1B519F] lg:h-screen lg:min-h-[660px]">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(7,94,222,.9), transparent 30%), radial-gradient(circle at 90% 90%, rgba(246,162,26,.18), transparent 24%)" }} />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-px bg-white/10 lg:block" aria-hidden="true" />

      <Container className="grid min-h-screen items-center gap-0 py-16 lg:h-full lg:min-h-0 lg:grid-cols-[1.08fr_.92fr] lg:py-14">
        <div className="relative min-h-[360px] overflow-hidden border border-white/15 bg-[#1B519F] sm:min-h-[460px] lg:h-[68vh] lg:max-h-[650px] lg:min-h-[500px]">
          <Image unoptimized src={image} alt={media?.imageAlt || "Business professionals shaking hands in a modern office"} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/80 via-transparent to-[#1B519F]/10" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 border-l-4 border-[#F59223] bg-[#1B519F]/90 px-6 py-5 text-white backdrop-blur-sm sm:px-8">
            <p className="text-xs font-black uppercase tracking-[.2em] text-[#F59223]">Shared purpose</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-blue-50">Connecting organizations around opportunities that create lasting value.</p>
          </div>
        </div>

        <div className="relative bg-white px-7 py-10 shadow-[0_30px_80px_rgba(0,0,0,.18)] sm:px-12 sm:py-14 lg:-ml-8 lg:px-14 lg:py-16">
          <p className="flex items-center gap-3 text-xs font-black uppercase tracking-[.22em] text-[#1B519F]"><span className="h-0.5 w-9 bg-[#F59223]" aria-hidden="true" />Our Partners</p>
          <h1 className="mt-6 text-[clamp(2.5rem,4.5vw,4.4rem)] font-black leading-[1.02] tracking-[-.035em] text-[#1B519F]">Progress grows through partnership.</h1>
          <p className="mt-6 text-base leading-8 text-slate-600">Building meaningful collaborations with organizations and institutions that support shared growth, opportunities, and positive impact.</p>

          <div className="mt-9 border-t border-slate-200 pt-7">
            <a href="#partners-directory" className="group inline-flex min-h-12 items-center justify-center bg-[#1B519F] px-6 text-sm font-extrabold text-white transition-colors hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2">
              See More...<span className="ml-3 transition-transform group-hover:translate-y-1 motion-reduce:transform-none" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

