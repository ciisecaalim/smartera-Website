import type { CourseSection } from "@/features/academics/types/course.types";

const DEMO_PREVIEW =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

/** Builds a realistic multi-section curriculum for demo courses. */
export function buildCurriculum(courseKey: string, topics: string[]): CourseSection[] {
  const [intro, fundamentals, project, advanced = "Next steps"] = [
    "Introduction",
    topics[0] ?? "Core fundamentals",
    topics[1] ?? "Practical project",
    topics[2] ?? "Next steps",
  ];

  return [
    {
      id: `${courseKey}-s1`,
      title: `Section 1 - ${intro}`,
      lectures: [
        { id: `${courseKey}-l1`, title: "Welcome and course overview", durationMinutes: 6, preview: true, videoUrl: DEMO_PREVIEW },
        { id: `${courseKey}-l2`, title: "How to get the most from this course", durationMinutes: 8, preview: true, videoUrl: DEMO_PREVIEW },
        { id: `${courseKey}-l3`, title: "Tools and setup", durationMinutes: 12 },
        { id: `${courseKey}-l4`, title: "Learning roadmap", durationMinutes: 9 },
      ],
    },
    {
      id: `${courseKey}-s2`,
      title: `Section 2 - ${fundamentals}`,
      lectures: [
        { id: `${courseKey}-l5`, title: `${fundamentals}: core concepts`, durationMinutes: 18 },
        { id: `${courseKey}-l6`, title: "Guided walkthrough", durationMinutes: 22 },
        { id: `${courseKey}-l7`, title: "Practice exercise", durationMinutes: 16 },
        { id: `${courseKey}-l8`, title: "Common mistakes to avoid", durationMinutes: 14 },
        { id: `${courseKey}-l9`, title: "Checkpoint quiz review", durationMinutes: 10 },
      ],
    },
    {
      id: `${courseKey}-s3`,
      title: `Section 3 - ${project}`,
      lectures: [
        { id: `${courseKey}-l10`, title: "Project brief and requirements", durationMinutes: 11 },
        { id: `${courseKey}-l11`, title: "Building the foundation", durationMinutes: 24 },
        { id: `${courseKey}-l12`, title: "Adding practical features", durationMinutes: 27 },
        { id: `${courseKey}-l13`, title: "Testing and refinement", durationMinutes: 15 },
        { id: `${courseKey}-l14`, title: "Final project review", durationMinutes: 13 },
      ],
    },
    {
      id: `${courseKey}-s4`,
      title: `Section 4 - ${advanced}`,
      lectures: [
        { id: `${courseKey}-l15`, title: "Advanced patterns", durationMinutes: 20 },
        { id: `${courseKey}-l16`, title: "Career and portfolio tips", durationMinutes: 12 },
        { id: `${courseKey}-l17`, title: "Resources and next courses", durationMinutes: 8 },
      ],
    },
  ];
}

export const DEMO_COURSE_VIDEO = DEMO_PREVIEW;
