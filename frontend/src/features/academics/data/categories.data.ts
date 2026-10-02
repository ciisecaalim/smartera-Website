import type { Category } from "@/features/academics/types/course.types";

export const academicCategories: Category[] = [
  { slug: "development", name: "Development", description: "Web, mobile, and software engineering skills.", icon: "code" },
  { slug: "business", name: "Business", description: "Strategy, operations, and professional growth.", icon: "briefcase" },
  { slug: "finance", name: "Finance", description: "Accounting, analysis, and financial literacy.", icon: "chart" },
  { slug: "it-software", name: "IT & Software", description: "Systems, tools, and technical foundations.", icon: "server" },
  { slug: "office-productivity", name: "Office Productivity", description: "Excel, Power BI, and workplace tools.", icon: "grid" },
  { slug: "personal-development", name: "Personal Development", description: "Communication, leadership, and habits.", icon: "user" },
  { slug: "design", name: "Design", description: "UI/UX, visual design, and creative tools.", icon: "pen" },
  { slug: "marketing", name: "Marketing", description: "Digital marketing, branding, and growth.", icon: "megaphone" },
  { slug: "data-science", name: "Data Science", description: "Analytics, Python, and machine learning.", icon: "database" },
  { slug: "cyber-security", name: "Cyber Security", description: "Security fundamentals and defensive skills.", icon: "shield" },
  { slug: "cloud-computing", name: "Cloud Computing", description: "AWS and modern cloud platforms.", icon: "cloud" },
  { slug: "project-management", name: "Project Management", description: "Planning, delivery, and team coordination.", icon: "checklist" },
  { slug: "teaching-academics", name: "Teaching & Academics", description: "Instructional skills and academic support.", icon: "book" },
];

export const exploreCategories = academicCategories;

export const popularSkills = [
  "JavaScript",
  "Python",
  "React",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "AWS",
  "Cyber Security",
  "Power BI",
  "Excel",
  "UI/UX",
  "Project Management",
  "Digital Marketing",
] as const;

export const tabCategories = [
  "development",
  "business",
  "it-software",
  "design",
  "marketing",
  "data-science",
] as const;
