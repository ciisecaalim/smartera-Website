export const siteConfig = {
  name: "Smartera Hub",
  tagline: "Skills • Career • Impact",
  description:
    "Practical learning, career development, and opportunities for people building future-ready skills.",
  contact: {
    email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "",
    phone: process.env.NEXT_PUBLIC_SITE_PHONE ?? "",
    location: process.env.NEXT_PUBLIC_SITE_LOCATION ?? "",
  },
} as const;
