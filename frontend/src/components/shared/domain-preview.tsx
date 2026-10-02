import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CatalogCard } from "@/components/shared/catalog-card";
import type { CatalogItem } from "@/types/common.types";

export function DomainPreview({ eyebrow, title, description, items, viewAllHref, viewAllLabel, tone = "white" }: { eyebrow: string; title: string; description: string; items: readonly CatalogItem[]; viewAllHref: string; viewAllLabel: string; tone?: "white" | "blue" }) {
  return (
    <section className={tone === "blue" ? "bg-[#F6FAFF] py-16 lg:py-20" : "bg-white py-16 lg:py-20"}>
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <Link href={viewAllHref} className="inline-flex shrink-0 items-center text-[13px] font-bold text-[#1B519F] transition-colors hover:text-[#F59223] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]">{viewAllLabel}</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => <CatalogCard key={item.id} item={item} />)}
        </div>
      </Container>
    </section>
  );
}



