import { Suspense } from "react";

import { PartnersBrowser } from "@/features/partners/components/partners-browser";
import { getPublishedPartners } from "@/features/partners/data/partners.data";

export async function PartnersGridSection() {
  const partners =
    await getPublishedPartners();

  return (
    <section
      id="partners-directory"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#F7FAFF_0%,#FFFFFF_46%,#F7FAFF_100%)] pb-10 pt-5 sm:pb-12 sm:pt-6"
      aria-label="Partners directory"
    >
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="h-[320px] animate-pulse rounded-[18px] bg-slate-100" />
          }
        >
          <PartnersBrowser
            partners={partners}
          />
        </Suspense>
      </div>
    </section>
  );
}