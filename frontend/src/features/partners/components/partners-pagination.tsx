import { Pagination } from "@/components/ui/pagination";

type PaginationProps = { page: number; pageCount: number; onPageChange: (page: number) => void };

export function PartnersPagination({ page, pageCount, onPageChange }: PaginationProps) {
  return <Pagination currentPage={page} totalPages={pageCount} onPageChange={onPageChange} ariaLabel="Partners pagination" />;
}
