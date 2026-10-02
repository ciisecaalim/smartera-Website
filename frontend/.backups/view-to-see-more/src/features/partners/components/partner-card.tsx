import Image from "next/image";
import Link from "next/link";
import { partnerAssetUrl } from "@/features/partners/data/partners.data";
import type { Partner } from "@/features/partners/types/partners.types";

/** Read-only public summary for one organization. */
export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="group relative flex h-full min-h-[285px] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(8,43,87,.05)] transition-all duration-500 before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-[#1B519F] before:transition-transform before:duration-700 before:ease-out hover:-translate-y-1 hover:border-[#1B519F]/35 hover:shadow-[0_18px_40px_rgba(8,43,87,.16)] hover:before:scale-y-100 motion-reduce:transform-none motion-reduce:before:transition-none">
      <div className="partner-card-logo relative z-10 flex h-20 items-center rounded-xl border border-white/80 bg-slate-50 px-4 shadow-[0_10px_24px_rgba(15,45,85,0.12)] transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_16px_34px_rgba(15,45,85,0.22)]">
        <Image unoptimized src={partnerAssetUrl(partner.logo)} alt={`${partner.name} logo`} width={160} height={64} className="partner-card-logo-image relative z-10 h-14 w-full object-contain transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:transform-none" />
      </div>
      <h3 className="relative z-10 mt-5 text-base font-black leading-6 text-[#1B519F] transition-colors duration-500 group-hover:text-white">{partner.name}</h3>
      <p className="relative z-10 mt-2 line-clamp-3 text-sm leading-6 text-slate-600 transition-colors duration-500 group-hover:text-blue-50">{partner.shortDescription}</p>
      <div className="relative z-10 mt-auto flex items-center gap-4 pt-5">
        <Link href={`/partners/${partner.slug}`} className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1B519F] transition-colors duration-500 hover:text-[#174783] group-hover:text-white group-hover:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] focus-visible:ring-offset-2" aria-label={`View ${partner.name}`}>
          View Partner <span aria-hidden="true"></span>
        </Link>
        {partner.website ? <a href={partner.website} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs font-bold text-slate-500 transition-colors duration-300 hover:text-[#1B519F] group-hover:text-blue-100 group-hover:hover:text-white" aria-label={`Visit ${partner.name} official website (opens in a new tab)`}>Website</a> : null}
      </div>
    </article>
  );
}
