import { cleanPublicCopy } from "@/features/shared/public-copy";
import { getPublishedPosts } from "@/features/blogs/data/blogs.data";
import { getPublishedJobs } from "@/features/jobs/data/jobs.data";

const API = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api").replace(/\/$/, "");
const ASSET = API.replace(/\/api\/?$/, "");

type Card = { title: string; description: string; image: string; href: string; imageAlt?: string; eyebrow?: string };
type Envelope<T> = { success: boolean; data: T };

function asset(value?: string | null) {
  if (!value) return "";
  return value.startsWith("http") ? value : value.startsWith("/uploads/") ? ASSET + value : value;
}

async function one<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(API + path, { cache: "no-store" });
    if (!response.ok) return null;
    const payload = (await response.json()) as Envelope<T | null | T[]>;
    if (!payload?.success || !payload.data || Array.isArray(payload.data)) return null;
    return payload.data as T;
  } catch {
    return null;
  }
}

async function latestPublishedBlog() {
  const posts = await getPublishedPosts();
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0] ?? null;
}

async function latestPublishedJob() {
  const jobs = await getPublishedJobs();
  return jobs ? [...jobs].sort((a, b) => b.datePosted.localeCompare(a.datePosted))[0] ?? null : null;
}

export async function getFeaturedHomeCards(): Promise<Array<Card | null>> {
  const [training, trainer, blog, internship, job] = await Promise.all([
    one<any>("/web/swe-activities/home-featured"),
    one<any>("/web/trainers/home-featured"),
    latestPublishedBlog(),
    one<any>("/web/internships/home-featured"),
    latestPublishedJob(),
  ]);

  const cards: Array<Card | null> = [
    training?.slug && training?.title
      ? { title: training.title, description: training.shortDescription || training.fullDescription || "", image: asset(training.coverImage), href: "/opportunities/training/" + encodeURIComponent(training.slug), imageAlt: training.coverImageAlt }
      : null,
    trainer?.slug && trainer?.fullName && trainer?.profileImage
      ? { title: trainer.fullName, description: [trainer.professionalTitle || trainer.specialization, trainer.shortBio].filter(Boolean).join(" — "), image: asset(trainer.profileImage), href: "/trainers/" + encodeURIComponent(trainer.slug), imageAlt: trainer.imageAlt }
      : null,
    blog?.slug && blog?.title
      ? { title: blog.title, description: blog.excerpt, image: blog.coverImage, href: "/blogs/" + encodeURIComponent(blog.slug), imageAlt: blog.coverImageAlt }
      : null,
    internship?.slug && internship?.title
      ? { title: internship.title, description: internship.shortDescription || "", image: asset(internship.organizationLogo), href: "/opportunities/internships/" + encodeURIComponent(internship.slug), imageAlt: internship.logoAlt }
      : null,
    job?.slug && job?.title
      ? { title: job.title, description: job.summary, image: asset(job.companyLogo), href: "/opportunities/jobs/" + encodeURIComponent(job.slug), imageAlt: job.companyLogoAlt || `${job.companyName} logo` }
      : null,
  ];

  return cards.map((card) =>
    card
      ? { ...card, title: cleanPublicCopy(card.title), description: cleanPublicCopy(card.description), imageAlt: card.imageAlt ? cleanPublicCopy(card.imageAlt) : undefined }
      : null,
  );
}