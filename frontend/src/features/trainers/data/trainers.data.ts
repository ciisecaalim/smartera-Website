import type { Trainer } from "../types/trainer.types";
export type HomeFeaturedTrainer = {
  slug: string;
  fullName: string;
  professionalTitle?: string | null;
  profileImage: string;
  imageAlt?: string | null;
  shortBio?: string | null;
  specialization?: string | null;
  yearsExperience?: number | null;
  trainingAreas?: string[];
  status?: string;
  messageFormOpen?: boolean;
};
const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api";
const ASSET = API.replace(/\/api\/?$/, "");
type Envelope<T> = { success: boolean; data: T };
export function trainerAsset(value: string) {
  return value.startsWith("http")
    ? value
    : value.startsWith("/uploads/")
      ? ASSET + value
      : value;
}
export async function getPublishedTrainers(): Promise<Trainer[] | null> {
  try {
    const r = await fetch(API + "/web/trainers", { cache: "no-store" });
    if (!r.ok) return null;
    const p = (await r.json()) as Envelope<Trainer[]>;
    return p.success ? p.data : null;
  } catch {
    return null;
  }
}
export async function getHomeFeaturedTrainer(): Promise<HomeFeaturedTrainer | null> {
  try {
    const response = await fetch(
      API + "/web/trainers/home-featured",
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload =
      (await response.json()) as Envelope<HomeFeaturedTrainer | null>;

    const trainer = payload.data;

    if (
      !trainer ||
      !trainer.slug ||
      !trainer.fullName ||
      !trainer.profileImage
    ) {
      return null;
    }

    return trainer;
  } catch {
    return null;
  }
}
export async function getTrainerBySlug(
  slug: string,
): Promise<Trainer | undefined> {
  try {
    const r = await fetch(API + "/web/trainers/" + encodeURIComponent(slug), {
      cache: "no-store",
    });
    if (!r.ok) return undefined;
    const p = (await r.json()) as Envelope<Trainer>;
    return p.success ? p.data : undefined;
  } catch {
    return undefined;
  }
}
export const trainers: Trainer[] = [];
