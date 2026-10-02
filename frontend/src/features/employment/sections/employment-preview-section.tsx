import { HOME_PREVIEW_LIMIT } from "@/config/constants";
import { DomainPreview } from "@/components/shared/domain-preview";
import { employmentPathways } from "@/features/employment/data/employment.data";

export function EmploymentPreviewSection() {
  return <DomainPreview eyebrow="Opportunities" title="Employment" description="Baro career pathways-ka iyo meesha fursadaha shaqo ee la ansixiyey lagu daabici doono." items={employmentPathways.slice(0, HOME_PREVIEW_LIMIT)} viewAllHref="/opportunities/employment" viewAllLabel="View All Jobs" tone="blue" />;
}
