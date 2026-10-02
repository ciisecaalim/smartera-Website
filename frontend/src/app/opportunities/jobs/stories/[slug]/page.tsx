import { notFound } from "next/navigation";

import { EmploymentSuccessStoryDetails } from "@/features/jobs/components/employment-success-story-details";
import {
  getEmploymentSuccessStoryBySlug,
  getPublishedEmploymentSuccessStories,
} from "@/features/jobs/data/employment-success-stories.data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedEmploymentSuccessStories().map(
    (story) => ({
      slug: story.slug,
    }),
  );
}

export default async function EmploymentStoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const stories =
    getPublishedEmploymentSuccessStories();

  const story =
    getEmploymentSuccessStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const index = stories.findIndex(
    (item) => item.slug === story.slug,
  );

  return (
    <EmploymentSuccessStoryDetails
      story={story}
      previousStory={
        index > 0
          ? stories[index - 1]
          : undefined
      }
      nextStory={
        index < stories.length - 1
          ? stories[index + 1]
          : undefined
      }
    />
  );
}
