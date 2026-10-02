import { redirect } from "next/navigation";

export default async function LegacySkilledWorkApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/opportunities/jobs/${slug}/apply`);
}
