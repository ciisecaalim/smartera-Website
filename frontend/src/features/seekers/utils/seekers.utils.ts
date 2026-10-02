import type { Seeker, SeekerTypeFilter } from "../types/seekers.types";
export type SeekerFilters = { query: string; type: SeekerTypeFilter };
export function seekingLabel(value: Seeker["seeking"]) {
  return value === "BOTH"
    ? "Employment & Internship"
    : value === "EMPLOYMENT"
      ? "Employment"
      : "Internship";
}
export function filterSeekers(items: Seeker[], filters: SeekerFilters) {
  const q = filters.query.trim().toLowerCase();
  return items.filter(
    (s) =>
      (filters.type === "ALL" || s.seeking === filters.type) &&
      (!q ||
        [
          s.fullName,
          s.professionalTitle,
          s.specialization,
          s.location,
          ...s.skills,
          ...s.preferredAreas,
        ].some((v) => v.toLowerCase().includes(q))),
  );
}
