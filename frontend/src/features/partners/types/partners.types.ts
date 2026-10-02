export type PartnerGalleryItem = { id: string; image: string; alt?: string | null; sortOrder: number };
export type Partner = {
  id: string; partnerId: string; slug: string; name: string; type: string;
  logo?: string | null; logoAlt?: string | null; coverImage?: string | null; coverImageAlt?: string | null;
  shortDescription: string; aboutPartnership: string; keyActivities: readonly string[]; collaborationFocus: readonly string[];
  website?: string | null; publicPhone?: string | null; publicEmail?: string | null; publicLocation?: string | null;
  partnershipFormOpen: boolean; gallery: readonly PartnerGalleryItem[]; keywords?: readonly string[];
};
export type PaginatedPartners = { items: Partner[]; page: number; pageCount: number; total: number };