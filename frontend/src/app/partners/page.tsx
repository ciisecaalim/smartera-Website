import type { Metadata } from "next";

import {
  PartnersCtaSection,
  PartnersGridSection,
  PartnersHeroSection,
} from "@/features/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Explore organizations collaborating with Smartera Hub to create practical opportunities and meaningful impact.",
};

export default function PartnersPage() {
  return (
    <main className="overflow-hidden bg-white">
      <PartnersHeroSection />
      <PartnersGridSection />
      <PartnersCtaSection />
    </main>
  );
}