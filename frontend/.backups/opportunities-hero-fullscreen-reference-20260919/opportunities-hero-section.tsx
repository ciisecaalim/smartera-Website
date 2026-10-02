import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ImageFrame } from "@/components/ui/image-frame";

export function OpportunitiesHeroSection() {
  return (
    <section className="hero-glow overflow-hidden bg-white py-10 sm:py-12 lg:py-14">
      <Container className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">

        {/* Left content */}
        <div className="max-w-[610px]">

          <span className="inline-flex items-center rounded-full border border-[#F4D7B0] bg-[#FFF9F1] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#D97706]">
            Opportunities
          </span>

          <h1 className="mt-5 max-w-[600px] text-[clamp(2.25rem,4vw,4rem)] font-black leading-[1.04] tracking-[-0.04em] text-[#174F9E]">
            Fursadahaaga halkan ka bilaab.
          </h1>

          <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-slate-600 sm:text-base">
            Training, Jobs, Academics iyo Internships — dooro
            waddada kugu habboon si aad wax u barato ama u hesho
            fursad shaqo.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">

            <ButtonLink href="#opportunity-domains">
              Browse Opportunities
            </ButtonLink>

            <ButtonLink
              href="/contact"
              variant="secondary"
            >
              Contact Us
            </ButtonLink>
          </div>
        </div>


        {/* Right image */}
        <div className="mx-auto w-full max-w-[650px] lg:justify-self-end">

          <ImageFrame
            src="/images/opportunities/opportunities-hero.jpg"
            alt="Dhalinyaro wada shaqeynaya"
            priority
            className="aspect-[16/10] w-full rounded-[24px]"
          />
        </div>
      </Container>
    </section>
  );
}