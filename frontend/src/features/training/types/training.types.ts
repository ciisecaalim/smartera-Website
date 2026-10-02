export type TrainingStatus =
  | "upcoming"
  | "live"
  | "completed"
  | "cancelled";

export type TrainingMode =
  | "onsite"
  | "online"
  | "hybrid";

export type TrainingScheduleItem = {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  sortOrder?: number;
};

export type TrainingActivity = {
  id: string;
  slug: string;
  title: string;

  shortDescription: string;
  fullDescription?: string;

  trainingType?: string;
  status: TrainingStatus;

  startDate: string;
  endDate?: string;

  startTime?: string;
  endTime?: string;

  location?: string;
  mode?: TrainingMode;

  targetGroup: string;

  expectedParticipants?: number;
  actualParticipants?: number;

  topics: string[];

  facilitatorNames?: string[];

  linkedTrainingBatch?: string;
  organizer?: string;
  partnerName?: string;

  coverImage: string;
  coverImageAlt: string;

  galleryImages: {
    id?: string;
    src: string;
    alt: string;
    sortOrder?: number;
  }[];

  highlights?: string[];
  outcomes?: string[];
  requirements?: string[];

  additionalInfo?: string;

  schedule?: TrainingScheduleItem[];

  messageFormOpen?: boolean;

  published: boolean;
  demoOnly: boolean;
};

export type TrainingFilters = {
  search: string;
  status: TrainingStatus | "all";
};
