import type { AcademicsNotification, AcademicsStudent } from "@/features/academics/types/auth.types";

/** Demo student used for frontend-only Academics authentication. */
export const DEMO_STUDENT: AcademicsStudent = {
  id: "student-001",
  firstName: "Jibaax",
  lastName: "Ahmed",
  email: "student@smartera.test",
  initials: "JA",
  role: "STUDENT",
  interests: ["Web Development", "Java", "Data Science"],
  recentlyViewedCourseIds: ["c-react-ts", "c-java", "c-python-ds"],
};

export const DEMO_LOGIN = {
  email: "student@smartera.test",
  password: "12345678",
} as const;

/** Course IDs seeded into My Learning after demo login (frontend UX only). */
export const DEMO_ENROLLMENT_SEEDS: Array<{ courseId: string; progressPercent: number }> = [
  { courseId: "c-java", progressPercent: 18 },
  { courseId: "c-db-design", progressPercent: 14 },
  { courseId: "c-fullstack", progressPercent: 92 },
];

export const DEMO_NOTIFICATIONS: AcademicsNotification[] = [
  {
    id: "n1",
    title: "New course recommendation",
    body: "Based on your interests, explore recommended development courses.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "n2",
    title: "Saved course reminder",
    body: "A course on your wishlist has updated content this week.",
    createdAt: new Date().toISOString(),
    read: false,
  },
];

export const DEMO_STREAK = {
  currentStreakWeeks: 0,
  weeklyMinutes: 12,
  weeklyTargetMinutes: 30,
  weeklyVisits: 1,
  weeklyVisitTarget: 1,
} as const;
