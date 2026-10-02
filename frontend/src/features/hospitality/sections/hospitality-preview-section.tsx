import { HOME_PREVIEW_LIMIT } from "@/config/constants";
import { DomainPreview } from "@/components/shared/domain-preview";
import { hospitalityPrograms } from "@/features/hospitality/data/hospitality.data";

export function HospitalityPreviewSection() {
  return <DomainPreview eyebrow="Opportunities" title="Hospitality" description="Xirfado adeeg, hospitality iyo customer experience oo suuqa shaqada muhiim u ah." items={hospitalityPrograms.slice(0, HOME_PREVIEW_LIMIT)} viewAllHref="/opportunities/hospitality" viewAllLabel="View All Opportunities" tone="blue" />;
}
