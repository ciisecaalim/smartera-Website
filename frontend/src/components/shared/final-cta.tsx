import { ButtonLink } from "@/components/ui/button-link";
import { h2 as Lh2, p as Lp } from "@/i18n/elements";
import { Container } from "@/components/ui/container";

export function FinalCta({ eyebrow, title, description, primaryHref = "/opportunities", primaryLabel = "Explore Opportunities", secondaryHref = "/contact", secondaryLabel = "Contact Us" }: { eyebrow: string; title: string; description: string; primaryHref?: string; primaryLabel?: string; secondaryHref?: string; secondaryLabel?: string }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-[#1B519F] px-6 py-10 text-white shadow-[0_25px_70px_rgba(8,43,87,.18)] sm:px-10 lg:px-14 lg:py-14">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#1B519F]/70 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-40 left-[18%] h-72 w-72 rounded-full bg-[#F59223]/12 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Lp className="text-xs font-extrabold uppercase tracking-[.14em] text-[#F59223]">{eyebrow}</Lp>
              <Lh2 className="mt-4 text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.07]">{title}</Lh2>
              <Lp className="mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">{description}</Lp>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryHref} variant="orange">{primaryLabel}</ButtonLink>
              <ButtonLink href={secondaryHref} variant="ghost-dark">{secondaryLabel}</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


