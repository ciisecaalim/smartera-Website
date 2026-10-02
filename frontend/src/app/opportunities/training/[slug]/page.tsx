import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getTrainingBySlug,
  TrainingDetails,
} from "@/features/training";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const training =
    await getTrainingBySlug(slug);

  if (!training) {
    return {
      title:
        "SWE Activity Not Found | Smartera Hub",
    };
  }

  return {
    title:
      `${training.title} | Smartera Hub`,

    description:
      training.shortDescription,
  };
}

export default async function TrainingDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const training =
    await getTrainingBySlug(slug);

  if (!training) {
    notFound();
  }

  return (
    <TrainingDetails
      training={training}
    />
  );
}