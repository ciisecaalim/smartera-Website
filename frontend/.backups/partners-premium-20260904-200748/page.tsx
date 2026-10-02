import type { Metadata } from "next";

import {
  PartnersCtaSection,
  PartnersGallerySection,
  PartnersGridSection,
  PartnersHeroSection,
} from "@/features/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Explore organizations and institutions collaborating with Smartera Hub.",
};

export default function PartnersPage() {
  return (
    <>
      <PartnersHeroSection />

      <PartnersGridSection />

      <PartnersGallerySection />

      <PartnersCtaSection />
    </>
  );
}
