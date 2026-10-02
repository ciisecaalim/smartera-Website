import type { Metadata } from "next";

import {
  ContactIntroSection,
  ContactMainSection,
  ContactSupportSection,
} from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "La xiriir Smartera Hub wixii ku saabsan training, employment, internships, partnerships iyo ICT solutions.",
};

/**
 * Contact page composition.
 *
 * Uses a compact introduction instead of repeating the homepage hero.
 */
export default function ContactPage() {
  return (
    <>
      <ContactIntroSection />
      <ContactMainSection />
      <ContactSupportSection />
    </>
  );
}
