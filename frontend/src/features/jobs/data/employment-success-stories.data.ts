export type EmploymentSuccessStory = {
  id: string;
  slug: string;
  name: string;
  jobTitle: string;
  organization: string;
  summary: string;
  fullStory: string;
  highlights: string[];
  skills: string[];
  outcome: string;
  mediaType: "Photo" | "Video";
  mediaSrc: string;
  posterImage?: string;
  demoOnly: boolean;
  published: boolean;
};

const imageA = "/images/employment/employment.jpg";
const imageB = "/images/home/impact.jpg";
const imageC = "/images/training/data-analysis.jpg";
const imageD = "/images/training/computer-basics.jpg";

const videoA =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const videoB =
  "https://www.w3schools.com/html/mov_bbb.mp4";

export const employmentSuccessStories: EmploymentSuccessStory[] = [
  ["01","data-analyst-employment","Ahmed Mohamed","Junior Data Analyst","Organization",imageA,"Photo"],
  ["02","accounting-employment","Amina Hassan","Junior Accountant","Organization",videoA,"Video"],
  ["03","marketing-employment","Hodan Mohamed","Marketing Officer","Organization",imageB,"Photo"],
  ["04","administration-employment","Maryan Ali","Administrative Assistant","Organization",videoB,"Video"],
  ["05","frontend-employment","Yusuf Abdullahi","Frontend Developer","Organization",imageC,"Photo"],
  ["06","it-support-employment","Abdullahi Farah","IT Support Technician","Organization",videoA,"Video"],
  ["07","customer-service-employment","Safiya Mohamed","Customer Service Officer","Organization",imageD,"Photo"],
  ["08","sales-employment","Mohamed Hassan","Sales Representative","Organization",videoB,"Video"],
  ["09","graphic-design-employment","Ikram Ali","Graphic Designer","Organization",imageB,"Photo"],
  ["10","barista-employment","Nasteexo Hassan","Barista","Organization",videoA,"Video"],
  ["11","project-employment","Abdirizak Mohamed","Project Coordinator","Organization",imageA,"Photo"],
  ["12","security-employment","Abdinasir Yusuf","Security Guard","Organization",videoB,"Video"],
].map(
  ([id, slug, name, jobTitle, organization, mediaSrc, mediaType]) => ({
    id: `employment-success-${id}`,
    slug,
    name,
    jobTitle,
    organization,
    summary:
      "An employment story showing how skills, preparation, and professional support can contribute to career progress.",
    fullStory:
      "This is professional placeholder content for a future approved employment story. Replace it with verified information about the person's preparation, opportunity, experience, and employment outcome.",
    highlights: [
      "Prepared for workplace expectations",
      "Strengthened professional communication",
      "Applied practical skills",
      "Built career confidence",
    ],
    skills: [
      "Professional Communication",
      "Workplace Readiness",
      "Teamwork",
      "Practical Skills",
    ],
    outcome:
      "Employment outcome details.",
    mediaType: mediaType as "Photo" | "Video",
    mediaSrc,
    posterImage:
      mediaType === "Video"
        ? "/images/employment/employment.jpg"
        : undefined,
    demoOnly: true,
    published: true,
  }),
);

export const getPublishedEmploymentSuccessStories = () =>
  employmentSuccessStories.filter((story) => story.published);

export const getEmploymentSuccessStoryBySlug = (slug: string) =>
  getPublishedEmploymentSuccessStories().find(
    (story) => story.slug === slug,
  );
