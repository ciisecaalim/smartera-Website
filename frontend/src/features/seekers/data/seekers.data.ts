import type { Seeker, SeekingType } from "../types/seekers.types";
const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
const ASSET = API.replace(/\/api\/?$/, "");
type Envelope<T> = { success: boolean; data: T };
export function seekerAsset(v: string) {
  return v.startsWith("http") ? v : v.startsWith("/uploads/") ? ASSET + v : v;
}
export async function getPublishedSeekers(params?: {
  search?: string;
  seeking?: SeekingType;
  specialization?: string;
}): Promise<Seeker[] | null> {
  try {
    const q = new URLSearchParams();
    if (params?.search) q.set("search", params.search);
    if (params?.seeking) q.set("seeking", params.seeking);
    if (params?.specialization) q.set("specialization", params.specialization);
    const r = await fetch(API + "/web/job-seekers" + (q.size ? "?" + q : ""), {
      cache: "no-store",
    });
    if (!r.ok) return null;
    const p = (await r.json()) as Envelope<Seeker[]>;
    return p.success && Array.isArray(p.data) ? p.data : null;
  } catch {
    return null;
  }
}
export async function getSeekerBySlug(
  slug: string,
): Promise<Seeker | undefined> {
  try {
    const r = await fetch(
      API + "/web/job-seekers/" + encodeURIComponent(slug),
      { cache: "no-store" },
    );
    if (!r.ok) return undefined;
    const p = (await r.json()) as Envelope<Seeker>;
    return p.success ? p.data : undefined;
  } catch {
    return undefined;
  }
}
