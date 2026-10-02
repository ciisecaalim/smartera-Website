import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSeekerBySlug,
  SeekerProfile,
  seekerAsset,
} from "@/features/seekers";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSeekerBySlug(slug);
  if (!s) return { title: "Candidate Not Found | Smartera Hub" };
  return {
    title: `${s.fullName} | ${s.professionalTitle} | Smartera Hub`,
    description: s.shortBio,
    openGraph: {
      title: `${s.fullName} | ${s.professionalTitle}`,
      description: s.shortBio,
      images: [seekerAsset(s.profileImage)],
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const seeker = await getSeekerBySlug(slug);
  if (!seeker) notFound();
  return <SeekerProfile seeker={seeker} />;
}
