export const skilledCategories=["Barista & Coffee","Cooking & Catering","Security Services","Housekeeping","Cleaning Services","Maintenance","Electrical","Plumbing","Customer Service","Front Desk / Reception","Other Services"] as const;
export type SkilledCategory=(typeof skilledCategories)[number];
export type TrainingStatus="draft"|"registration-open"|"starting-soon"|"closed"|"ongoing"|"completed";
export type WorkStatus="draft"|"published"|"closing-soon"|"closed"|"filled"|"archived";
export type SkillTraining={id:string;slug:string;title:string;category:SkilledCategory;level:string;duration:string;mode:string;location?:string;skills:string[];shortDescription:string;overview:string;modules:string[];learningOutcomes:string[];requirements:string[];audience:string;image:string;status:TrainingStatus;featured:boolean;published:boolean;demoOnly:boolean};
export type SkilledWork={id:string;slug:string;title:string;companyName:string;category:SkilledCategory;location:string;employmentType:string;workMode:string;experience:string;skills:string[];shortDescription:string;responsibilities:string[];requirements:string[];image:string;status:WorkStatus;featured:boolean;published:boolean;verified:false;demoOnly:boolean};
export type TrainingFilters={query:string;category:SkilledCategory|"all";level:string;duration:string;mode:string;location:string};
export type WorkFilters={query:string;category:SkilledCategory|"all";employmentType:string;workMode:string;experience:string;location:string};
