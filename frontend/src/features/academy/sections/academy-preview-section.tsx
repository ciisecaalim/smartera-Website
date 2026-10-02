import { HOME_PREVIEW_LIMIT } from "@/config/constants";
import { DomainPreview } from "@/components/shared/domain-preview";
import { academyPrograms } from "@/features/academy/data/academy.data";

export function AcademyPreviewSection() {
  return <DomainPreview eyebrow="Opportunities" title="Academy" description="Waxbarasho nidaamsan oo ku dhisan practice, projects iyo horumar joogto ah." items={academyPrograms.slice(0, HOME_PREVIEW_LIMIT)} viewAllHref="/opportunities/academy" viewAllLabel="View All Programs" tone="white" />;
}
