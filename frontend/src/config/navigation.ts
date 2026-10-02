export type NavItem = { label: string; href: string };

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const opportunityNavigation = [
  { label: "Internships", href: "/opportunities/internships", description: "Real-world exposure, projects, and mentorship" },
  { label: "Job Assistance", href: "/opportunities/jobs", description: "Professional and skilled work opportunities" },
  { label: "Job & Internship Seekers", href: "/opportunities/seekers", description: "Browse people seeking jobs and internships" },
] as const;
