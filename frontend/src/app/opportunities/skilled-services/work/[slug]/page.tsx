import { redirect } from "next/navigation";

export default async function LegacySkilledWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/opportunities/jobs/${slug}`);
}
