import type { BlogCategory, BlogPost } from "@/features/blogs/types/blogs.types";

const API = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000/api").replace(/\/$/, "");
const ORIGIN = API.replace(/\/api\/?$/, "");
type E<T> = { success: boolean; data: T };
type Raw = Omit<BlogPost, "demoOnly"> & { viewCount?: number };

const map = (post: Raw): BlogPost => ({
  ...post,
  coverImage: post.coverImage.startsWith("/uploads/") ? ORIGIN + post.coverImage : post.coverImage,
  demoOnly: false,
});

export const blogCategories: BlogCategory[] = ["News", "Announcements", "Insights", "Success Stories", "Events"];

const staticBlogPosts: BlogPost[] = [
  {
    id: "static-skills-opportunities",
    slug: "build-skills-unlock-opportunities",
    title: "Build Skills. Unlock Opportunities. Shape Your Future.",
    excerpt: "Practical learning, confident career steps, and useful guidance for people building a stronger professional future.",
    content: [
      { type: "paragraph", text: "Small, practical steps can create a clearer path from learning to opportunity." },
      { type: "heading", text: "Start with skills that matter" },
      { type: "paragraph", text: "Choose focused learning, practise consistently, and keep building evidence of what you can do." },
    ],
    category: "Insights",
    coverImage: "/images/training/computer-basics.jpg",
    coverImageAlt: "Professionals learning digital skills together",
    publishedAt: "2026-06-01",
    tags: ["Skills", "Career", "Opportunities"],
    featured: true,
    published: true,
    demoOnly: true,
  },
  {
    id: "static-career-readiness",
    slug: "practical-learning-for-career-readiness",
    title: "Practical Learning for Career Readiness",
    excerpt: "How focused practice and real projects can help learners prepare for their next professional step.",
    content: [
      { type: "paragraph", text: "Career readiness grows when knowledge is connected to practical action." },
      { type: "heading", text: "Turn learning into evidence" },
      { type: "paragraph", text: "Projects, portfolios, and thoughtful reflection help you communicate your strengths with confidence." },
    ],
    category: "Insights",
    coverImage: "/images/training/workplace-essentials.jpg",
    coverImageAlt: "Learners collaborating during workplace training",
    publishedAt: "2026-05-24",
    tags: ["Career Readiness", "Learning"],
    featured: false,
    published: true,
    demoOnly: true,
  },
  {
    id: "static-digital-confidence",
    slug: "growing-digital-confidence-through-practice",
    title: "Growing Digital Confidence Through Practice",
    excerpt: "Simple, repeatable practice can make digital tools easier to use in learning and everyday work.",
    content: [
      { type: "paragraph", text: "Digital confidence is built through guided practice, useful feedback, and steady progress." },
      { type: "heading", text: "Keep practice focused" },
      { type: "paragraph", text: "Start with one task, repeat it until it feels natural, then add the next challenge." },
    ],
    category: "News",
    coverImage: "/images/training/data-analysis.jpg",
    coverImageAlt: "Professional reviewing data on a laptop",
    publishedAt: "2026-05-16",
    tags: ["Digital Skills", "Practice"],
    featured: false,
    published: true,
    demoOnly: true,
  },
];

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API + "/web/blogs", { cache: "no-store" });
    if (response.ok) {
      const payload = (await response.json()) as E<Raw[]>;
      if (payload.success && Array.isArray(payload.data)) {
        const combined = [...payload.data.map(map), ...staticBlogPosts];
        const unique = new Map(combined.map((post) => [post.slug, post]));
        return [...unique.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      }
    }
  } catch {
    // Fall back to the curated static posts below.
  }
  return [...staticBlogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getFeaturedPosts() {
  return (await getPublishedPosts()).filter((post) => post.featured);
}

export async function getBlogBySlug(slug: string) {
  const staticPost = staticBlogPosts.find((post) => post.slug === slug);
  try {
    const response = await fetch(API + "/web/blogs/" + encodeURIComponent(slug), { cache: "no-store" });
    if (response.ok) {
      const payload = (await response.json()) as E<Raw>;
      if (payload.success) return map(payload.data);
    }
  } catch {
    // Fall through to the static post when the API is unavailable.
  }
  return staticPost;
}