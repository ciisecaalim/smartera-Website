export const homeHero = {
  eyebrow: "PRACTICAL SKILLS. REAL OPPORTUNITIES.",

  title: "Build Skills. Unlock Opportunities. Shape Your Future.",

  description:
    "Smartera Hub waxay isku xirtaa practical learning, career development iyo fursado kaa caawinaya inaad dhisto mustaqbal xirfadeed oo xooggan.",

  image: "/images/home/men-learning-v3.png",

  primaryAction: {
    label: "Explore Opportunities",
    href: "/opportunities",
  },

  secondaryAction: {
    label: "About Smartera Hub",
    href: "/about",
  },

  benefits: [
    {
      icon: "education",
      title: "Practical Learning",
      description: "Xirfado la taaban karo",
    },
    {
      icon: "career",
      title: "Career Focus",
      description: "Mustaqbalkaaga",
    },
    {
      icon: "shield",
      title: "Trusted Growth",
      description: "Ku soco jid cad",
    },
  ],
} as const;

/** Curated visual stories used by the homepage hero slideshow. */
export const homeHeroSlides = [
  { src: "/images/home/men-learning-v3.png", alt: "Dhalinyaro wada baranaya oo laptop ku shaqeynaya", label: "Learning together" },
  { src: "/images/home/men-learning-v3.png", alt: "Tababar practical ah oo ka socda Smartera Hub", label: "Practical training" },
  { src: "/images/home/men-ict-v3.png", alt: "Xirfadlayaal ku jira jawi shaqo", label: "Career opportunities" },
  { src: "/images/home/men-learning-v3.png", alt: "Arday ku jira jawi waxbarasho", label: "Academy learning" },
  { src: "/images/home/men-learning-v3.png", alt: "Dhalinyaro internship ku jirta oo wada shaqeynaya", label: "Internship experience" },
] as const;

/** Headline outcomes displayed on the homepage hero. */
export const homeImpactStats = [
  { value: "350+", label: "Internships" },
  { value: "35+", label: "Employer Partners" },
  { value: "1000+", label: "Consulting" },
  { value: "1+", label: "Years of Impact" },
] as const;

export const homeOpportunityCategories = {
  eyebrow: "OUR OPPORTUNITIES",

  title: "Opportunities that bring you closer to your goals",

  description:
    "Choose the path that suits your professional growth.",

  items: [
    {
      icon: "education",
      title: "SWE - Smartera Workplace Essential Program",
      description:
        "Learn new skills that prepare you for the job market.",
      image: "/images/home/training.jpg",
      href: "/opportunities/training",
    },
        {
      icon: "users",
      title: "Trainers",
      description:
        "Meet Smartera Hub's professional trainers.",
      image: "/images/home/training.jpg",
      href: "/trainers",
    },
        {
      icon: "book",
      title: "Blogs",
      description:
        "Read practical insights, news, and ideas for your professional growth.",
      image: "/images/training/computer-basics.jpg",
      href: "/blogs",
    },
    {
      icon: "users",
      title: "Internships",
      description:
        "Work experience that builds your ability and confidence.",
      image: "/images/home/internships.jpg",
      href: "/opportunities/internships",
    },    {
      icon: "briefcase",
      title: "Job Opportunities",
      description:
        "Explore job opportunities for your next career step.",
      image: "/images/home/employment.jpg",
      href: "/opportunities/jobs",
    },
  ],
} as const;


export const homeJourney = {
  eyebrow: "SIDEE U SHAQAYNAA?",

  title: "A Smarter Way to Build Your Future",

  steps: [
    {
      number: 1,
      icon: "search",
      title: "Discover",
      description:
        "Raadi fursadaha iyo waxa kuu habboon.",
    },
    {
      number: 2,
      icon: "book",
      title: "Learn",
      description:
        "Baro xirfado practical ah oo casri ah.",
    },
    {
      number: 3,
      icon: "code",
      title: "Apply",
      description:
        "Ku dabaq aqoonta projects iyo casharro.",
    },
    {
      number: 4,
      icon: "briefcase",
      title: "Get Opportunity",
      description:
        "Hel internships, jobs ama projects dhab ah.",
    },
    {
      number: 5,
      icon: "growth",
      title: "Grow",
      description:
        "Kobci xirfaddaada oo gaadh yoolkaaga.",
    },
  ],
} as const;


/**
 * These numbers represent website/program structure,
 * not unverified company-performance statistics.
 */
export const homeImpact = {
  eyebrow: "SMARTERA HUB ECOSYSTEM",

  title: "Skills. Opportunities. Better Outcomes.",

  image: "/images/home/impact.jpg",

  metrics: [
    {
      target: 5,
      suffix: "",
      label: "Opportunity Areas",
      icon: "layers",
      duration: 1300,
    },
    {
      target: 5,
      suffix: "",
      label: "Journey Steps",
      icon: "career",
      duration: 1500,
    },
    {
      target: 4,
      suffix: "",
      label: "Career Categories",
      icon: "shield",
      duration: 1700,
    },
    {
      display: "Future",
      label: "Focused",
      icon: "rocket",
    },
  ],
} as const;


export const employmentPreview = {
  eyebrow: "JOB OPPORTUNITIES",

  title: "Shaqooyin Kuu Habboon",

  description:
    "Qaybtan waxay diyaar u tahay in lagu soo bandhigo shaqooyinka rasmiga ah marka la ansixiyo.",

  viewAll: {
    label: "View All Jobs",
    href: "/opportunities/jobs",
  },

  items: [
    {
      badge: "Technology",
      title: "Technology Opportunities",
      description:
        "Fursadaha IT, software, data iyo digital roles.",
      image: "/images/home/job-1.jpg",
      href: "/opportunities/jobs",
    },
    {
      badge: "Marketing",
      title: "Marketing Opportunities",
      description:
        "Sales, marketing iyo customer-focused roles.",
      image: "/images/home/job-2.jpg",
      href: "/opportunities/jobs",
    },
    {
      badge: "Remote",
      title: "Remote Opportunities",
      description:
        "Fursadaha shaqo ee online iyo remote work.",
      image: "/images/home/job-3.jpg",
      href: "/opportunities/jobs",
    },
    {
      badge: "Administration",
      title: "Administration Opportunities",
      description:
        "Office, administration iyo support opportunities.",
      image: "/images/home/job-4.jpg",
      href: "/opportunities/jobs",
    },
  ],
} as const;


export const homeFinalCta = {
  eyebrow: "TALLAABADA XIGTA",

  title: "Mustaqbalkaaga maanta bilow.",

  description:
    "Ka faa'iidayso fursadaha Smartera Hub, kobci xirfaddaada, oo qaado tallaabo kuu horseedaysa mustaqbal xooggan.",

  image: "/images/home/cta.jpg",

  primaryAction: {
    label: "Explore Opportunities",
    href: "/opportunities",
  },

  secondaryAction: {
    label: "Contact Us",
    href: "/contact",
  },
} as const;

