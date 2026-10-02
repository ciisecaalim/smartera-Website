import { Container } from "@/components/ui/container";
import { PartnerLogoMarquee } from "@/features/partners/components/partner-logo-marquee";
import { getPublishedPartners } from "@/features/partners/data/partners.data";

export async function HomePartnersSection() {
  const partners = await getPublishedPartners();
  return (
    <section className="bg-brand-subtle pb-10 pt-12 sm:pb-12 sm:pt-14" aria-labelledby="home-partners-title">
      <Container>
        <div className="overflow-hidden">
          <div className="px-5 pb-2 text-center sm:pb-3">
            <h2 id="home-partners-title" className="text-2xl font-black tracking-tight text-brand-heading sm:text-3xl">Our Partners</h2>
            <span className="mx-auto mt-2 block h-0.5 w-12 bg-brand-orange" aria-hidden="true" />
          </div>
          {partners.length ? <PartnerLogoMarquee partners={partners} /> : null}
        </div>
      </Container>
    </section>
  );
}
