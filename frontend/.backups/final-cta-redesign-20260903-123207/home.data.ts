export const homeHero = {
  eyebrow: "PRACTICAL SKILLS. REAL OPPORTUNITIES.",

  title: "Baro maanta. Hoggaami berri.",

  description:
    "Smartera Hub waxay isku xirtaa practical learning, career development iyo fursado kaa caawinaya inaad dhisto mustaqbal xirfadeed oo xooggan.",

  image: "/images/home/hero.jpg",

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
  { src: "/images/home/hero.jpg", alt: "Dhalinyaro wada baranaya oo laptop ku shaqeynaya", label: "Learning together" },
  { src: "/images/home/training.jpg", alt: "Tababar practical ah oo ka socda Smartera Hub", label: "Practical training" },
  { src: "/images/home/employment.jpg", alt: "Xirfadlayaal ku jira jawi shaqo", label: "Career opportunities" },
  { src: "/images/home/academy.jpg", alt: "Arday ku jira jawi waxbarasho", label: "Academy learning" },
  { src: "/images/home/internships.jpg", alt: "Dhalinyaro internship ku jirta oo wada shaqeynaya", label: "Internship experience" },
  { src: "/images/home/ict-team.jpg", alt: "Koox ICT ah oo wada shaqeynaysa", label: "ICT team" },
] as const;

/** Headline outcomes displayed on the homepage hero. */
export const homeImpactStats = [
  { value: "5,000+", label: "Professionals Trained" },
  { value: "300+", label: "Employer Partners" },
  { value: "92%", label: "Placement Rate" },
  { value: "12+", label: "Years of Impact" },
] as const;

export const homeOpportunityCategories = {
  eyebrow: "OUR OPPORTUNITIES",

  title: "Fursado kuu dhoweynaya yoolkaaga",

  description:
    "Dooro waddada ku habboon horumarkaaga xirfadeed.",

  items: [
    {
      icon: "education",
      title: "SWE - Smartera Workplace Essential Program",
      description:
        "Baro xirfado cusub oo suuqa shaqada kuu diyaariya.",
      image: "/images/home/training.jpg",
      href: "/opportunities/training",
    },
        {
      icon: "users",
      title: "Trainer",
      description:
        "La kulan trainers-ka xirfadlayaasha ah ee Smartera Hub.",
      image: "/images/home/training.jpg",
      href: "/trainers",
    },
    {
      icon: "book",
      title: "Academics",
      description:
        "Koorsooyin online ah, xirfado iyo learning marketplace.",
      image: "/images/home/academy.jpg",
      href: "/academics",
    },
    {
      icon: "users",
      title: "Internships",
      description:
        "Khibrad shaqo oo dhisaysa kartidaada iyo kalsoonidaada.",
      image: "/images/home/internships.jpg",
      href: "/opportunities/internships",
    },
    {
      icon: "code",
      title: "ICT Solutions",
      description:
        "Hel xalal dijitaal ah oo casriyeeya shaqada iyo ganacsigaaga.",
      image: "/images/home/ict-team.jpg",
      href: "/ict-solutions",
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

