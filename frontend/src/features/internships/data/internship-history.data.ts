const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api";

const ORIGIN = API.replace(/\/api\/?$/, "");

type Envelope<T> = {
  success: boolean;
  data: T;
};

export type PublicInternshipHistory = {
  id: string;
  internName: string;
  internshipTitle: string;
  company?: string | null;
  comment: string;
  photoUrl: string;
  date?: string | null;
};

export function internshipHistoryAsset(
  value?: string | null,
) {
  if (!value) {
    return "";
  }

  if (value.startsWith("http")) {
    return value;
  }

  if (value.startsWith("/uploads/")) {
    return ORIGIN + value;
  }

  return value;
}

export async function getPublishedInternshipHistory(): Promise<
  PublicInternshipHistory[]
> {
  try {
    const response = await fetch(
      API + "/web/internships/history",
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return [];
    }

    const payload =
      (await response.json()) as Envelope<
        PublicInternshipHistory[]
      >;

    return payload.success
      ? payload.data
      : [];
  } catch {
    return [];
  }
}