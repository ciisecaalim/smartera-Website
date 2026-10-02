export type BlogCategory="News"|"Announcements"|"Insights"|"Success Stories"|"Events";
export type BlogContentBlock={type:"paragraph"|"heading"|"list"|"callout";text?:string;items?:string[]};
export type BlogPost={id:string;slug:string;title:string;excerpt:string;content:BlogContentBlock[];category:BlogCategory;coverImage:string;coverImageAlt:string;galleryImages?:{src:string;alt:string}[];publishedAt:string;updatedAt?:string;tags:string[];featured:boolean;published:boolean;seoTitle?:string;seoDescription?:string;relatedTrainingSlug?:string;demoOnly:boolean};
export type BlogFilter={query:string;category:BlogCategory|"all"};
