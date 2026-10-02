import { HOME_PREVIEW_LIMIT } from "@/config/constants";
import { DomainPreview } from "@/components/shared/domain-preview";
import { internshipTracks } from "@/features/internships/data/internships.data";

export function InternshipsPreviewSection() {
  return <DomainPreview eyebrow="Opportunities" title="Internships" description="Khibrad practical, real-world exposure iyo mentorship loogu diyaar garoobo shaqada." items={internshipTracks.slice(0, HOME_PREVIEW_LIMIT)} viewAllHref="/opportunities/internships" viewAllLabel="View All Internships" tone="white" />;
}
