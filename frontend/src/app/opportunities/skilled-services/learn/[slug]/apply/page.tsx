import { redirect } from "next/navigation";

export default async function LegacySkillLearningApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/academics/courses/${slug}`);
}
