const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api';
const ASSET_BASE_URL = API_URL.replace(/\/api\/?$/, '');
export type HeroMediaType = 'IMAGE_ONLY' | 'VIDEO_ONLY' | 'IMAGE_VIDEO';
export type HeroMediaItem = {
  id: string; type: 'IMAGE' | 'VIDEO'; mediaUrl: string; altText?: string | null;
  posterUrl?: string | null; sortOrder: number;
};
export type HeroMedia = {
  pageKey: string; mediaType: HeroMediaType; imageUrl?: string | null; imageAlt?: string | null;
  videoUrl?: string | null; videoPosterUrl?: string | null; autoplay?: boolean;
  intervalSeconds?: number; videoEndDelaySeconds?: number; loop?: boolean; items?: HeroMediaItem[];
};
type Envelope<T> = { success: boolean; data: T };
export function heroAssetUrl(value?: string | null) {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  return value.startsWith('/uploads/') ? ASSET_BASE_URL + value : value;
}
export async function fetchHeroMedia(pageKey: string): Promise<HeroMedia | undefined> {
  try {
    const response = await fetch(API_URL + '/web/hero-media/' + encodeURIComponent(pageKey), { cache: 'no-store' });
    if (!response.ok) return undefined;
    const payload = await response.json() as Envelope<HeroMedia>;
    return payload.success ? payload.data : undefined;
  } catch { return undefined; }
}
