import { cleanPublicCopy } from "@/features/shared/public-copy";
import type { Partner } from "@/features/partners/types/partners.types";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
const ASSET_BASE_URL = API_URL.replace(/\/api\/?$/, "");
type Envelope<T> = { success: boolean; message?: string; data: T };
async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  const payload = await response.json().catch(() => null) as Envelope<T> | null;
  if (!response.ok || !payload?.success) throw new Error(payload?.message || "Unable to load partners right now.");
  return payload.data;
}
export function partnerAssetUrl(value?: string | null) { if (!value) return ""; const correctedValue = value.replace("/uploads/swe-activities/", "/uploads/web-partners/"); return correctedValue.startsWith("http") ? correctedValue : `${ASSET_BASE_URL}${correctedValue}`; }
function cleanPartner(partner: Partner): Partner { return { ...partner, name: cleanPublicCopy(partner.name), shortDescription: cleanPublicCopy(partner.shortDescription), aboutPartnership: cleanPublicCopy(partner.aboutPartnership) }; }
export async function getPublishedPartners(): Promise<Partner[]> {
  try {
    return (await request<Partner[]>("/web/partners")).map(cleanPartner);
  } catch {
    return [];
  }
}
export async function getPublishedPartnerBySlug(slug: string): Promise<Partner | undefined> {
  try { return cleanPartner(await request<Partner>(`/web/partners/${encodeURIComponent(slug)}`)); }
  catch (error) { if (error instanceof Error && /not found/i.test(error.message)) return undefined; throw error; }
}
