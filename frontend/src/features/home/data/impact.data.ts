/**
 * Homepage impact-band content.
 *
 * Numeric values below are intentionally based on the current website
 * structure rather than unverified company-performance claims.
 *
 * Once approved real company metrics are available, update ONLY the
 * target values here. The animation automatically supports larger
 * numbers such as 50, 500, 5000, etc.
 */
export const homeImpact = {
  eyebrow: "SMARTERA HUB ECOSYSTEM",

  title: "Skills today. Better opportunities tomorrow.",

  description:
    "Waxaan isku xirnaa waxbarashada, xirfadaha, career development iyo fursadaha si qofku u yeesho waddo cad oo horumarineed.",

  image: "/images/home/impact-building.jpg",

  imageAlt:
    "Modern professional building representing growth, learning and future opportunities",

  metrics: [
    {
      id: "opportunities",
      target: 5,
      suffix: "",
      label: "Opportunity Areas",
      description: "Training ilaa Internships",
      icon: "layers",
      duration: 1300,
    },

    {
      id: "career-pathways",
      target: 5,
      suffix: "",
      label: "Career Pathways",
      description: "Jihada horumarinta xirfadda",
      icon: "users",
      duration: 1500,
    },

    {
      id: "home-sections",
      target: 8,
      suffix: "",
      label: "Home Experiences",
      description: "Qaybo isku xiran oo website-ka ah",
      icon: "shield",
      duration: 1700,
    },

    {
      id: "future",
      display: "Future",
      label: "Focused",
      description: "Learn Today. Lead Tomorrow.",
      icon: "rocket",
    },
  ],
} as const;
