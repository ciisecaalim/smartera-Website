"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  OpportunityHistorySection,
  type OpportunityHistoryCard,
} from "@/features/shared/components/opportunity-history-section";

import {
  getPublicJobSeekerHistory,
  type PublicJobSeekerHistory,
} from "../data/job-seeker-history.data";

export function EmploymentSuccessStoriesSection() {
  const [stories, setStories] =
    useState<PublicJobSeekerHistory[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const result =
          await getPublicJobSeekerHistory();

        if (active) {
          setStories(result);
        }
      } catch {
        if (active) {
          setError(
            "Employment success stories are unavailable right now.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const items: OpportunityHistoryCard[] =
    stories.map((story) => ({
      id: story.id,
      name:
        story.fullName ||
        "Smartera Graduate",
      title: story.title,
      story: story.story,
      imageUrl: story.imageUrl,
      date: story.date,
    }));

  return (
    <div id="employment-success-stories" className="scroll-mt-24">
      <OpportunityHistorySection
        eyebrow="Previous Employment"
        title="Employment Success Stories"
        description="Real stories from people who received job assistance and moved forward into professional opportunities."
        items={items}
        loading={loading}
        errorMessage={error}
        emptyMessage="Employment success stories will appear here soon."
      />
    </div>
  );
}
