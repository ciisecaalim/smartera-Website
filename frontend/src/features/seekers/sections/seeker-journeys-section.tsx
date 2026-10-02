import {
  OpportunityHistorySection,
  type OpportunityHistoryCard,
} from "@/features/shared/components/opportunity-history-section";

import type {
  PublicSeekerJourney,
} from "../data/seeker-journeys.data";

export function SeekerJourneysSection({
  journeys,
}: {
  journeys: PublicSeekerJourney[] | null;
}) {
  const items: OpportunityHistoryCard[] =
    (journeys ?? []).map(
      (journey) => ({
        id: journey.id,
        name:
          journey.fullName ||
          "Job & Internship Seeker",
        title: journey.title,
        story: journey.story,
        imageUrl: journey.imageUrl,
        date: journey.date,
      }),
    );

  return (
    <OpportunityHistorySection
      eyebrow="Opportunity Journeys"
      title="Job & Internship Seeker Stories"
      description="Follow the journeys and achievements of people pursuing employment and internship opportunities."
      items={items}
      errorMessage={
        journeys === null
          ? "Seeker journeys are unavailable right now. Please try again shortly."
          : ""
      }
      emptyMessage="Job and internship seeker journeys will appear here soon."
    />
  );
}
