import type { PaginatedResult } from "@/types/pagination.types";

export function normalizePage(value: string | number | null | undefined): number {
  const page = typeof value === "number" ? value : Number.parseInt(value ?? "1", 10);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

/** Paginates an already published, filtered, and sorted collection. */
export function paginateItems<T>(items: readonly T[], requestedPage: number, pageSize: number): PaginatedResult<T> {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalPages = Math.max(1, Math.ceil(items.length / safePageSize));
  const page = Math.min(normalizePage(requestedPage), totalPages);
  const start = (page - 1) * safePageSize;
  return { items: items.slice(start, start + safePageSize), page, pageSize: safePageSize, totalItems: items.length, totalPages, hasPreviousPage: page > 1, hasNextPage: page < totalPages };
}

export type PaginationItem = number | "ellipsis";
export function getPaginationItems(page: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  const pages = [...new Set([1, totalPages, page - 1, page, page + 1])].filter((item) => item > 0 && item <= totalPages).sort((a, b) => a - b);
  const result: PaginationItem[] = [];
  pages.forEach((item, index) => { if (index && item - pages[index - 1] > 1) result.push("ellipsis"); result.push(item); });
  return result;
}
