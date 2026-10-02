import type { CourseReview, Testimonial } from "@/features/academics/types/course.types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Hodan Abdi",
    courseTitle: "The Complete Full-Stack Web Development Bootcamp",
    avatar: "/images/academics/avatars/student-1.svg",
    rating: 5,
    quote: "Clear lessons and practical projects. I finally understood how front-end pieces fit together.",
  },
  {
    id: "t2",
    name: "Ibrahim Noor",
    courseTitle: "Python for Data Science and Machine Learning",
    avatar: "/images/academics/avatars/student-2.svg",
    rating: 5,
    quote: "The examples were realistic and easy to follow. Great starting point for analytics work.",
  },
  {
    id: "t3",
    name: "Maryan Farah",
    courseTitle: "UI/UX Design with Figma",
    avatar: "/images/academics/avatars/student-3.svg",
    rating: 4,
    quote: "I built a portfolio prototype in one week. The structure made every lesson useful.",
  },
  {
    id: "t4",
    name: "Yusuf Aden",
    courseTitle: "Cyber Security Fundamentals",
    avatar: "/images/academics/avatars/student-4.svg",
    rating: 5,
    quote: "Practical security habits I could apply immediately at work and in personal projects.",
  },
];

export const courseReviews: CourseReview[] = [
  {
    id: "r1",
    studentName: "Hodan Abdi",
    studentAvatar: "/images/academics/avatars/student-1.svg",
    rating: 5,
    comment: "Excellent pacing and project guidance. Highly recommend for beginners.",
    courseId: "c-fullstack",
    createdAt: "2026-06-12",
  },
  {
    id: "r2",
    studentName: "Ibrahim Noor",
    studentAvatar: "/images/academics/avatars/student-2.svg",
    rating: 5,
    comment: "Strong foundations with useful practice exercises.",
    courseId: "c-python-ds",
    createdAt: "2026-06-20",
  },
  {
    id: "r3",
    studentName: "Maryan Farah",
    studentAvatar: "/images/academics/avatars/student-3.svg",
    rating: 4,
    comment: "Great Figma workflows and clear explanations.",
    courseId: "c-figma",
    createdAt: "2026-07-01",
  },
  {
    id: "r4",
    studentName: "Yusuf Aden",
    studentAvatar: "/images/academics/avatars/student-4.svg",
    rating: 5,
    comment: "Straightforward and relevant security fundamentals.",
    courseId: "c-cyber",
    createdAt: "2026-07-08",
  },
  {
    id: "r5",
    studentName: "Naima Warsame",
    studentAvatar: "/images/academics/avatars/student-1.svg",
    rating: 5,
    comment: "React + TypeScript finally clicked for me.",
    courseId: "c-react-ts",
    createdAt: "2026-07-14",
  },
];
