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
  getPublishedInternshipHistory,
  internshipHistoryAsset,
  type PublicInternshipHistory,
} from "../data/internship-history.data";

export function InternshipSuccessStoriesSection() {
  const [stories, setStories] =
    useState<PublicInternshipHistory[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    void getPublishedInternshipHistory()
      .then((items) => {
        if (active) {
          setStories(items);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const items: OpportunityHistoryCard[] =
    stories.map((story) => ({
      id: story.id,
      name: story.internName,
      title: story.internshipTitle,
      story: story.comment,
      imageUrl:
        internshipHistoryAsset(
          story.photoUrl,
        ) || null,
      date: story.date ?? null,
      meta: story.company ?? null,
    }));

  return (
    <div id="internship-success-stories" className="scroll-mt-24">
      <OpportunityHistorySection
        eyebrow="Previous Experiences"
        title="Internship Success Stories"
        description="Hear directly from interns about their experience, learning, and professional growth."
        items={items}
        loading={loading}
        emptyMessage="Internship success stories will appear here soon."
      />
    </div>
  );
}
