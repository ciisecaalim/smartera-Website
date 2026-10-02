import Link from "next/link";
import type { CatalogItem } from "@/types/common.types";

export function CatalogCard({ item, accent = "blue" }: { item: CatalogItem; accent?: "blue" | "orange" }) {
  const accentClass = accent === "orange" ? "bg-[#FFF6DF] text-[#F59223]" : "bg-[#EEF5FF] text-[#1B519F]";
  return (
    <article className="group flex h-full min-w-0 flex-col rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#F59223]/40 hover:shadow-lg motion-reduce:transform-none">
      <div className="flex items-start justify-between gap-4">
        <span className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] ${accentClass}`}>{item.eyebrow}</span>
      </div>
      <h3 className="mt-4 text-base font-black leading-snug text-[#1B519F]">{item.title}</h3>
      <p className="mt-2.5 flex-1 text-[13px] leading-6 text-slate-600">{item.shortDescription}</p>
      <p className="mt-4 border-t border-slate-100 pt-3 text-[11px] font-bold text-slate-500">{item.meta}</p>
      <Link href={item.href} className="mt-3 inline-flex items-center text-[13px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] border-0 bg-transparent text-black hover:text-black hover:underline">See More...</Link>
    </article>
  );
}



