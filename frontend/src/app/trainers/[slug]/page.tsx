import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrainerBySlug, TrainerProfile } from "@/features/trainers";
import { trainerAsset } from "@/features/trainers/data/trainers.data";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTrainerBySlug(slug);
  if (!t) return { title: "Trainer Not Found | Smartera Hub" };
  return {
    title: t.fullName + " | " + t.professionalTitle + " | Smartera Hub",
    description: t.shortBio,
    openGraph: { images: [trainerAsset(t.profileImage)] },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);
  if (!trainer) notFound();
  return <TrainerProfile trainer={trainer} />;
}
