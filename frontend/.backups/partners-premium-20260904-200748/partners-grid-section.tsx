import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PartnersBrowser } from "@/features/partners/components/partners-browser";
import { getPublishedPartners } from "@/features/partners/data/partners.data";

export async function PartnersGridSection() {
  const partners = await getPublishedPartners();
  return (
    <section id="partners-directory" className="scroll-mt-24 bg-[#F7FAFF] py-14 sm:py-16" aria-labelledby="all-partners-title">
      <Container>
        <div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#1B519F]">Directory</p><h2 id="all-partners-title" className="mt-2 text-[clamp(1.9rem,4vw,3rem)] font-black tracking-tight text-[#1B519F]">All Our Partners</h2><p className="mt-3 text-sm leading-7 text-slate-600">Organizations and institutions working with Smartera Hub through meaningful collaboration.</p></div>
        <div className="mt-8"><Suspense fallback={<div className="h-12 w-full max-w-md animate-pulse rounded-xl bg-slate-200" />}><PartnersBrowser partners={partners} /></Suspense></div>
      </Container>
    </section>
  );
}

