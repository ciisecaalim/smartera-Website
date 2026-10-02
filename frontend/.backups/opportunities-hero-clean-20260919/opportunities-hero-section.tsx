import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ImageFrame } from "@/components/ui/image-frame";

export function OpportunitiesHeroSection() {
  return (
    <section className="hero-glow flex min-h-screen items-center py-14 lg:h-screen lg:py-20">
      <Container className="grid w-full items-center gap-10 xl:grid-cols-[.88fr_1.12fr]">
        <div>
          <Badge>Opportunities</Badge>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(2.6rem,4.6vw,4.8rem)] font-black leading-[1.01] text-[#1B519F]">Fursadahaaga halkan ka bilaab.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">Training, Jobs, Academics iyo Internships - dooro inaad barato ama hesho fursad shaqo.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink href="#opportunity-domains">Browse Opportunities</ButtonLink><ButtonLink href="/contact" variant="secondary">Contact Us</ButtonLink></div>
        </div>
        <ImageFrame src="/images/opportunities/opportunities-hero.jpg" alt="Dhalinyaro wada shaqeynaya" priority className="aspect-[4/3]" badge="Learn • Work • Build • Grow" />
      </Container>
    </section>
  );
}

