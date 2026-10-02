import type { PaginatedPartners, Partner } from "@/features/partners/types/partners.types";
import { PAGE_SIZES } from "@/config/pagination";

export const PARTNERS_PER_PAGE = PAGE_SIZES.partners;

export function searchPartners(items: readonly Partner[], query: string): Partner[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return [...items];

  return items.filter((partner) =>
    [partner.name, partner.shortDescription, ...(partner.keywords ?? [])]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  );
}

export function paginatePartners(
  items: readonly Partner[],
  requestedPage: number,
  pageSize = PARTNERS_PER_PAGE,
): PaginatedPartners {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const start = (page - 1) * pageSize;

  return { items: items.slice(start, start + pageSize), page, pageCount, total: items.length };
}
