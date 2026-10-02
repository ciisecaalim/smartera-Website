import type {
  TrainingActivity,
  TrainingStatus,
} from "@/features/training/types/training.types";

const API_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5000/api"
).replace(/\/$/, "");

const ASSET_BASE_URL = API_URL.replace(
  /\/api\/?$/,
  "",
);

const FALLBACK_TRAINING_COVER_IMAGE = "/images/training/swe-program-hero.jpg";
const AI_CAREER_BOOTCAMP_SLUG = "ai-career-readiness-bootcamp-2026";

const LOW_QUALITY_TRAINING_COVER_IMAGES = new Set([
  "/uploads/swe-activities/16bda32a-93f0-4dc4-8c61-cc477ccd38b1.jpg",
  "/uploads/swe-activities/3a32854e-b600-4ff8-af01-16a40f9a6e43.jpg",
  "/uploads/swe-activities/7d26c71a-f45a-4caf-89a4-d0c69664db79.jpg",
]);

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T;
};

type ApiTrainingActivity = {
  id: string;
  slug: string;
  title: string;

  shortDescription?: string | null;
  fullDescription?: string | null;

  trainingType?: string | null;

  status:
    | "upcoming"
    | "live"
    | "completed"
    | "cancelled";

  startDate?: string | null;
  endDate?: string | null;

  startTime?: string | null;
  endTime?: string | null;

  location?: string | null;

  mode?: "onsite" | "online" | "hybrid";

  targetGroup?: string | null;

  expectedParticipants?: number | null;
  actualParticipants?: number | null;

  facilitatorNames?: string[];

  linkedTrainingBatch?:
    | string
    | {
        id?: string;
        name?: string | null;
        title?: string | null;
      }
    | null;

  organizer?: string | null;
  partnerName?: string | null;

  topics?: string[];
  highlights?: string[];
  outcomes?: string[];
  requirements?: string[];

  additionalInfo?: string | null;

  coverImage?: string | null;
  coverImageAlt?: string | null;

  messageFormOpen?: boolean;

  galleryImages?: Array<{
    id?: string;
    src: string;
    alt?: string | null;
    sortOrder?: number;
  }>;

  schedule?: Array<{
    id?: string;
    title: string;
    description?: string | null;
    date?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    sortOrder?: number;
  }>;
};

function assetUrl(
  value?: string | null,
) {
  if (!value) {
    return "/images/training/training.jpg";
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `${ASSET_BASE_URL}${
    value.startsWith("/") ? "" : "/"
  }${value}`;
}

function trainingCoverImageUrl(
  value?: string | null,
) {
  const pathname = getAssetPathname(value);

  if (
    !value ||
    LOW_QUALITY_TRAINING_COVER_IMAGES.has(pathname)
  ) {
    return FALLBACK_TRAINING_COVER_IMAGE;
  }

  return assetUrl(value);
}

function getAssetPathname(
  value?: string | null,
) {
  if (!value) {
    return "";
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    try {
      return new URL(value).pathname;
    } catch {
      return value;
    }
  }

  return value.startsWith("/")
    ? value
    : `/${value}`;
}

function trainingBatchName(
  value: ApiTrainingActivity["linkedTrainingBatch"],
) {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return value;
  }

  return (
    value.name ??
    value.title ??
    undefined
  );
}

function cleanDate(
  value?: string | null,
) {
  if (!value) return undefined;
  return value.slice(0, 10);
}

function adaptTraining(
  item: ApiTrainingActivity,
): TrainingActivity {
  const activity: TrainingActivity = {
    id: item.id,
    slug: item.slug,
    title: item.title,

    shortDescription:
      item.shortDescription ?? "",

    fullDescription:
      item.fullDescription ?? undefined,

    trainingType:
      item.trainingType ?? undefined,

    status: item.status,

    startDate:
      cleanDate(item.startDate) ?? "",

    endDate:
      cleanDate(item.endDate),

    startTime:
      item.startTime ?? undefined,

    endTime:
      item.endTime ?? undefined,

    location:
      item.location ?? undefined,

    mode: item.mode,

    targetGroup:
      item.targetGroup ?? "",

    expectedParticipants:
      item.expectedParticipants ??
      undefined,

    actualParticipants:
      item.actualParticipants ??
      undefined,

    facilitatorNames:
      item.facilitatorNames ?? [],

    linkedTrainingBatch:
      trainingBatchName(
        item.linkedTrainingBatch,
      ),

    organizer:
      item.organizer ?? undefined,

    partnerName:
      item.partnerName ?? undefined,

    topics:
      item.topics ?? [],

    highlights:
      item.highlights ?? [],

    outcomes:
      item.outcomes ?? [],

    requirements:
      item.requirements ?? [],

    additionalInfo:
      item.additionalInfo ??
      undefined,

    coverImage:
      trainingCoverImageUrl(item.coverImage),

    coverImageAlt:
      item.coverImageAlt ||
      `${item.title} activity cover image`,

    galleryImages:
      (item.galleryImages ?? []).map(
        (image) => ({
          id: image.id,
          src: assetUrl(image.src),
          alt:
            image.alt ||
            `${item.title} activity image`,
          sortOrder:
            image.sortOrder,
        }),
      ),

    schedule:
      (item.schedule ?? []).map(
        (entry) => ({
          id: entry.id,
          title: entry.title,

          description:
            entry.description ??
            undefined,

          date:
            cleanDate(entry.date),

          startTime:
            entry.startTime ?? undefined,

          endTime:
            entry.endTime ?? undefined,

          sortOrder:
            entry.sortOrder,
        }),
      ),

    messageFormOpen:
      item.messageFormOpen ??
      true,

    published: true,
    demoOnly: false,
  };

  if (
    item.slug === AI_CAREER_BOOTCAMP_SLUG
  ) {
    return {
      ...activity,
      facilitatorNames: [
        "Ahmed Ali",
        "Amina Hassan",
      ],
      organizer: "Smartera Hub",
      partnerName: "Arkaan AI Center",
    };
  }

  return activity;
}

async function fetchApi<T>(
  path: string,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  const payload =
    (await response
      .json()
      .catch(() => null)) as
      | ApiEnvelope<T>
      | null;

  if (
    !response.ok ||
    !payload?.success
  ) {
    throw new Error(
      payload?.message ||
        "Unable to load SWE activities right now.",
    );
  }

  return payload.data;
}

export async function getPublishedTrainings() {
  const items =
    await fetchApi<
      ApiTrainingActivity[]
    >("/web/swe-activities");

  return items
    .map(adaptTraining)
    .toSorted((a, b) =>
      b.startDate.localeCompare(
        a.startDate,
      ),
    );
}

export async function getTrainingBySlug(
  slug: string,
) {
  const response = await fetch(
    `${API_URL}/web/swe-activities/${encodeURIComponent(
      slug,
    )}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (response.status === 404) {
    return undefined;
  }

  const payload =
    (await response
      .json()
      .catch(() => null)) as
      | ApiEnvelope<ApiTrainingActivity>
      | null;

  if (
    !response.ok ||
    !payload?.success
  ) {
    throw new Error(
      payload?.message ||
        "Unable to load this SWE activity.",
    );
  }

  return adaptTraining(
    payload.data,
  );
}

export async function getTrainingsByStatus(
  status: TrainingStatus,
) {
  const items =
    await getPublishedTrainings();

  return items.filter(
    (item) =>
      item.status === status,
  );
}
