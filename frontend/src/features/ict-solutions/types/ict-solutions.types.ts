export type IctIconName = "monitor" | "layout" | "briefcase" | "database" | "support" | "cloud" | "shield" | "chart" | "users" | "mobile" | "check" | "process";

export type IctService = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  icon: IctIconName;
  benefits: string[];
  targetClients: string[];
  useCases: string[];
  published: boolean;
};

export type IctProject = {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  demoOnly: boolean;
};

export type IctProcessStep = { number: string; title: string; description: string };
export type IctIndustry = { name: string; icon: IctIconName };
