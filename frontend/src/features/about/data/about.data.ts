import type {
  AboutPillar,
  AboutValue,
  MissionVisionItem,
} from "@/features/about/types/about.types";

export const aboutHero = {
  eyebrow: "ABOUT SMARTERA HUB",

  title:
    "Waxaan dhisnaa xirfado maanta shaqeeya, berri hoggaamiya.",

  description:
    "Smartera Hub waa madal isku xirta waxbarashada practical-ka ah, horumarinta xirfadaha iyo fursadaha shaqo si dhalinyaradu ugu diyaar garoobaan mustaqbal xirfadeed oo xooggan.",

  image: "/images/about/about-hero.jpg",

  primaryAction: {
    label: "Explore Opportunities",
    href: "/opportunities",
  },

  secondaryAction: {
    label: "Contact Us",
    href: "/contact",
  },
} as const;


export const whoWeAre = {
  eyebrow: "YAAN NAHAY?",

  title:
    "Waxbarasho, xirfad iyo fursad hal meel ku kulmaya.",

  paragraphs: [
    "Smartera Hub waxay diiradda saartaa in aqoonta laga gudbo theory oo loo beddelo xirfad qofku si dhab ah ugu adeegsan karo waxbarashada iyo shaqada.",

    "Waxaan abuurnaa waddo isku xirta learning, practical experience, career readiness iyo opportunities, si qofku u fahmo halka uu joogo iyo halka uu u socdo.",
  ],

  image: "/images/about/who-we-are.jpg",

  pillars: [
    {
      title: "Practical Learning",
      description:
        "Waxbarasho ku saleysan practice, exercises iyo real-world application.",
    },
    {
      title: "Career Readiness",
      description:
        "Diyaarinta xirfadaha iyo hab-dhaqanka looga baahan yahay goobta shaqada.",
    },
    {
      title: "Opportunity Access",
      description:
        "Isku xirka tababar, internship, employment iyo career growth.",
    },
  ] satisfies AboutPillar[],
} as const;


export const missionVision = {
  eyebrow: "HIMILADEENNA IYO HIIGSIGEENNA",

  title:
    "Waxaan leenahay jihada cad ee aan u dhiseyno mustaqbalka.",

  description:
    "Waxbarashada wanaagsan waxay qiimo badan yeelataa marka ay qofka siiso xirfad, kalsooni iyo waddo uu mustaqbalkiisa ku dhiso.",

  image: "/images/about/mission-vision.jpg",

  items: [
    {
      label: "MISSION",
      title:
        "Aqoonta inaan u beddelno xirfad shaqeysa.",

      description:
        "Inaan dhalinyarada ku qalabeyno practical skills, professional development iyo fahamka looga baahan yahay suuqa shaqada.",
    },
    {
      label: "VISION",
      title:
        "Jiil xirfad leh oo diyaar u ah mustaqbalka.",

      description:
        "In Smartera Hub noqoto meel lagu kalsoonaan karo oo isku xirta waxbarashada, xirfadda iyo fursadaha horumarineed.",
    },
  ] satisfies MissionVisionItem[],
} as const;


export const coreValues = {
  eyebrow: "QIYAMKEENNA",

  title:
    "Qiyamka hagaya sida aan u shaqeyno.",

  description:
    "Qiyamkani waxay saldhig u yihiin sida aan dadka ula shaqeyno, u bixino adeegga, una dhisno barnaamijyadeenna.",

  image: "/images/about/values.jpg",

  items: [
    {
      number: "01",
      title: "Integrity",
      description:
        "Daacadnimo, hufnaan iyo kalsooni ku dhisan shaqada.",
    },
    {
      number: "02",
      title: "Professionalism",
      description:
        "Hab shaqo nidaamsan, masuuliyad leh oo tayo sare leh.",
    },
    {
      number: "03",
      title: "Innovation",
      description:
        "Fikrado cusub iyo xalal la jaanqaadaya mustaqbalka.",
    },
    {
      number: "04",
      title: "Excellence",
      description:
        "Inaan si joogto ah u raadino natiijo ka wanaagsan tii shalay.",
    },
    {
      number: "05",
      title: "Accountability",
      description:
        "Inaan qaadanno masuuliyadda shaqadeenna iyo natiijadeeda.",
    },
    {
      number: "06",
      title: "Teamwork",
      description:
        "Wada-shaqeyn iyo isku xirnaan lagu gaaro yool weyn.",
    },
  ] satisfies AboutValue[],
} as const;


export const impactFuture = {
  eyebrow: "MUSTAQBALKA",

  title:
    "Waxaan dhiseynaa waddo ka bilaabata barashada kuna dhammaata fursad.",

  description:
    "Smartera Hub waxay rabtaa in qofka wax baranaya uusan ku ekaan certificate oo keliya, balse uu yeesho practical skill, confidence, career direction iyo awood uu fursadaha u isticmaalo.",

  image: "/images/about/future.jpg",

  highlights: [
    "Practical Skills",
    "Career Development",
    "Internships",
    "Employment",
  ],

  primaryAction: {
    label: "Explore Opportunities",
    href: "/opportunities",
  },

  secondaryAction: {
    label: "Nala Soo Xiriir",
    href: "/contact",
  },
} as const;

export const aboutIntro = {
  eyebrow: "ABOUT SMARTERA HUB",

  title:
    "Waxbarasho iyo xirfad loo dhisayo fursado dhab ah.",

  description:
    "Smartera Hub waa madal horumarineed oo isku xirta practical learning, career development iyo fursadaha dhalinyarada u diyaariya suuqa shaqada iyo mustaqbalka dijitaalka ah.",

  primaryImage: "/images/about/about-hero.jpg",

  secondaryImage: "/images/about/who-we-are.jpg",

  primaryImageAlt:
    "Dhalinyaro wada baranaya oo ku shaqeynaya laptop",

  secondaryImageAlt:
    "Koox arday iyo xirfadlayaal ah oo wada shaqeynaya",

  highlights: [
    {
      number: "01",
      title: "Practical Learning",
      description: "Aqoon loo beddelo xirfad la adeegsan karo.",
    },
    {
      number: "02",
      title: "Career Development",
      description: "Diyaarinta qofka iyo jihadiisa xirfadeed.",
    },
    {
      number: "03",
      title: "Real Opportunities",
      description: "Isku xirka xirfadda iyo fursadaha horumarineed.",
    },
  ],
} as const;
