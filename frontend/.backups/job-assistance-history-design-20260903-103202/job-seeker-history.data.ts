export type PublicJobSeekerHistory = {
  id: string;
  title: string;
  story: string;
  imageUrl: string | null;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  data?: PublicJobSeekerHistory[];
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api";

function resolveAssetUrl(
  value?: string | null,
) {
  if (!value) {
    return null;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  if (value.startsWith("/uploads/")) {
    const origin = API_BASE.replace(
      /\/api\/?$/,
      "",
    );

    return `${origin}${value}`;
  }

  return value;
}

export async function getPublicJobSeekerHistory() {
  const response = await fetch(
    `${API_BASE}/web/job-assistance/history`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load employment success stories.",
    );
  }

  const payload =
    (await response.json()) as ApiResponse;

  const rows = Array.isArray(payload.data)
    ? payload.data
    : [];

  return rows.map((item) => ({
    id: item.id,
    title: item.title,
    story: item.story,
    imageUrl: resolveAssetUrl(
      item.imageUrl,
    ),
  }));
}