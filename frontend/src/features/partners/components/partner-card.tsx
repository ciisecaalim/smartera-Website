import Image from "next/image";
import Link from "next/link";

import { partnerAssetUrl } from "@/features/partners/data/partners.data";
import type { Partner } from "@/features/partners/types/partners.types";
import styles from "@/features/partners/styles/partners-premium.module.css";

type PartnerMeta = Partner & {
  category?: string | null;
  industry?: string | null;
  partnerType?: string | null;
  type?: string | null;
  location?: string | null;
  region?: string | null;
  country?: string | null;
  city?: string | null;
};

function getCategory(partner: Partner) {
  const value = partner as PartnerMeta;

  return (
    value.category ||
    value.industry ||
    value.partnerType ||
    value.type ||
    partner.keywords?.[0] ||
    "Partner"
  );
}

function getLocation(partner: Partner) {
  const value = partner as PartnerMeta;

  if (value.city && value.country) {
    return `${value.city}, ${value.country}`;
  }

  return (
    value.location ||
    value.region ||
    value.country ||
    value.city ||
    ""
  );
}

export function PartnerCard({
  partner,
  index = 0,
}: {
  partner: Partner;
  index?: number;
}) {
  const category = getCategory(partner);
  const location = getLocation(partner);

  return (
    <Link
      href={`/partners/${partner.slug}`}
      aria-label={`View ${partner.name} partner profile`}
      className={`${styles.card} group relative block min-h-[176px] overflow-hidden rounded-[18px] border border-[#DDE7F3] bg-white p-5 shadow-[0_8px_28px_rgba(15,35,70,0.045)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B519F] focus-visible:ring-offset-2`}
      style={{
        animationDelay: `${Math.min(index, 5) * 70}ms`,
      }}
    >
      <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-5 sm:grid-cols-[104px_minmax(0,1fr)]">
        <div
          className={`${styles.logoShell} flex h-[92px] w-[92px] items-center justify-center rounded-[14px] border border-slate-100 bg-[#FBFDFF] p-3 sm:h-[104px] sm:w-[104px]`}
        >
          {partner.logo ? (
            <Image
              unoptimized
              src={partnerAssetUrl(partner.logo)}
              alt={`${partner.name} logo`}
              width={104}
              height={104}
              className={`${styles.logoImage} relative z-[1] h-full w-full object-contain`}
            />
          ) : (
            <span className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF4FF] text-xl font-black text-[#1B519F]">
              {partner.name.slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[16px] font-black tracking-[-0.01em] text-[#071B41] transition-colors duration-300 group-hover:text-[#1B519F]">
            {partner.name}
          </h3>

          <div className="mt-2">
            <span className="inline-flex max-w-full truncate rounded-md bg-[#EDF4FF] px-2.5 py-1 text-[11px] font-bold text-[#1B519F]">
              {category}
            </span>
          </div>

          <p
            className={`${styles.clampDescription} mt-3 text-[13px] font-medium leading-[1.55] text-slate-600`}
          >
            {partner.shortDescription}
          </p>

          {location ? (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-[#1B519F]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <span className="truncate">{location}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-[#1B519F]/55 opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </div>
    </Link>
  );
}