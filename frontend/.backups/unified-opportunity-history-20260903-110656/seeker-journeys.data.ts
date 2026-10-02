export type PublicSeekerJourney = {
  id: string;
  title: string;
  story: string;
  imageUrl: string | null;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: PublicSeekerJourney[];
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api";

function resolveAssetUrl(value?: string | null) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  if (value.startsWith("/uploads/")) {
    return `${API_BASE.replace(/\/api\/?$/, "")}${value}`;
  }
  return value;
}

export async function getPublicSeekerJourneys(): Promise<
  PublicSeekerJourney[] | null
> {
  try {
    const response = await fetch(`${API_BASE}/web/job-seekers/journeys`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as ApiResponse;
    if (!payload.success || !Array.isArray(payload.data)) return null;

    return payload.data.map((item) => ({
      id: item.id,
      title: item.title,
      story: item.story,
      imageUrl: resolveAssetUrl(item.imageUrl),
    }));
  } catch {
    return null;
  }
}