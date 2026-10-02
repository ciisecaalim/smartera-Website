export const contactIntro = {
  eyebrow: "CONTACT SMARTERA HUB",

  title: "Aan ka wada hadalno tallaabadaada xigta.",

  description:
    "Haddii aad qabto su’aal ku saabsan tababar, shaqo, internship, partnership ama adeegyada Smartera Hub, fariintaada noogu soo dir foomka hoose.",

  methods: [
    {
      number: "01",
      title: "Nala Soo Xiriir",
      description:
        "Foomka contact-ka noogu soo dir fariintaada si nidaamsan.",
      icon: "message",
    },
    {
      number: "02",
      title: "Waqtiga Jawaabta",
      description:
        "Fariimaha waxaa loo gudbinayaa kooxda ku habboon mawduucaaga.",
      icon: "clock",
    },
    {
      number: "03",
      title: "Taageero Toos ah",
      description:
        "Dooro subject-ka saxda ah si codsigaaga loo fahmo si fudud.",
      icon: "support",
    },
  ],
} as const;


export const contactMain = {
  eyebrow: "NALA SOO XIRIIR",

  title: "Fariintaada noo soo dir.",

  description:
    "Si kooban noogu sheeg waxa aad u baahan tahay. Foomku wuxuu kaa caawinayaa inaad fariinta u dirto qaab cad oo nidaamsan.",

  image: "/images/contact/contact-team.jpg",

  imageAlt:
    "Koox xirfadlayaal ah oo wada shaqeynaya",

  highlights: [
    "Training & Academy",
    "Employment & Internships",
    "Partnerships",
    "ICT Solutions",
  ],
} as const;


export const contactSupportAreas = {
  eyebrow: "SIDEE AYAAN KUU CAAWIN KARNAA?",

  title: "Dooro qaybta kuugu dhow baahidaada.",

  items: [
    {
      number: "01",
      title: "Training & Academy",
      description:
        "Su’aalaha koorsooyinka, tababarrada iyo barnaamijyada waxbarashada.",
      href: "/opportunities/training",
    },
    {
      number: "02",
      title: "Employment",
      description:
        "Macluumaadka fursadaha shaqo iyo career opportunities.",
      href: "/opportunities/employment",
    },
    {
      number: "03",
      title: "Internships",
      description:
        "Su’aalaha internship-ka iyo khibradaha shaqo ee practical-ka ah.",
      href: "/opportunities/internships",
    },
    {
      number: "04",
      title: "ICT Solutions",
      description:
        "La xiriir kooxda ICT-ga marka aad u baahan tahay xal dijitaal ah.",
      href: "/ict-solutions",
    },
  ],
} as const;
