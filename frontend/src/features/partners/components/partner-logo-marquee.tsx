import Image from "next/image";
import { partnerAssetUrl } from "@/features/partners/data/partners.data";
import type { Partner } from "@/features/partners/types/partners.types";

/** Matching rows keep the last-to-first spacing identical throughout the loop. */
export function PartnerLogoMarquee({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;

  // Fill more than the container width even when only one partner is published.
  const repetitions = Math.ceil(12 / partners.length);
  const loopPartners = Array.from({ length: repetitions }, () => partners).flat();

  return (
    <div className="partners-marquee overflow-hidden py-6" aria-label="Partner organizations">
      <div className="partners-marquee-track flex w-max">
        {[0, 1].map((row) => (
          <div
            key={row}
            className="partners-marquee-row"
            aria-hidden={row === 1 ? true : undefined}
          >
            {loopPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="partners-marquee-item"
                aria-hidden={index >= partners.length ? true : undefined}
              >
                <Image
                  unoptimized
                  src={partnerAssetUrl(partner.logo)}
                  alt={row === 0 && index < partners.length ? `${partner.name} logo` : ""}
                  width={240}
                  height={108}
                  sizes="(max-width: 640px) 130px, 180px"
                  className="partner-logo-only h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
