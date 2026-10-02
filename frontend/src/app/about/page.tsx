import type { Metadata } from "next";

import {
  AboutInquiryForm,
  AboutIntroSection,
  CoreValuesSection,
  ImpactFutureSection,
  MissionVisionSection,
  WhoWeAreSection,
} from "@/features/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Baro Smartera Hub, himiladeeda, hiigsigeeda, qiyamkeeda iyo sida ay u kobciso practical skills iyo career opportunities.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntroSection />

      <WhoWeAreSection />

      <MissionVisionSection />

      <CoreValuesSection />

      <ImpactFutureSection />

      <AboutInquiryForm />
    </>
  );
}
