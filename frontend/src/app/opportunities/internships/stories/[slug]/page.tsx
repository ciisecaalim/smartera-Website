import { notFound } from "next/navigation";

import { InternshipSuccessStoryDetails } from "@/features/internships/components/internship-success-story-details";
import {
  getInternshipSuccessStoryBySlug,
  getPublishedInternshipSuccessStories,
} from "@/features/internships/data/internship-success-stories.data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedInternshipSuccessStories().map(
    (story) => ({
      slug: story.slug,
    }),
  );
}

export default async function InternshipStoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const stories = getPublishedInternshipSuccessStories();

  const story = getInternshipSuccessStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const index = stories.findIndex(
    (item) => item.slug === story.slug,
  );

  const previousStory =
    index > 0 ? stories[index - 1] : undefined;

  const nextStory =
    index >= 0 && index < stories.length - 1
      ? stories[index + 1]
      : undefined;

  return (
    <InternshipSuccessStoryDetails
      story={story}
      previousStory={previousStory}
      nextStory={nextStory}
    />
  );
}
