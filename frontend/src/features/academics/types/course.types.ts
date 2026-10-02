export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export type CourseCategorySlug =
  | "development"
  | "business"
  | "finance"
  | "it-software"
  | "office-productivity"
  | "personal-development"
  | "design"
  | "marketing"
  | "data-science"
  | "cyber-security"
  | "cloud-computing"
  | "project-management"
  | "teaching-academics";

export type CourseLecture = {
  id: string;
  title: string;
  durationMinutes: number;
  preview?: boolean;
  videoUrl?: string;
};

export type CourseSection = {
  id: string;
  title: string;
  lectures: CourseLecture[];
};

export type Instructor = {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  avatar: string;
  rating: number;
  courseCount: number;
  studentCount: number;
};

export type CourseReview = {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  courseId: string;
  createdAt: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  previewVideo?: string;
  instructorId: string;
  category: CourseCategorySlug;
  subcategory: string;
  level: CourseLevel;
  language: string;
  durationHours: number;
  totalLectures: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  bestseller?: boolean;
  isNew?: boolean;
  featured?: boolean;
  popular?: boolean;
  certificateAvailable: boolean;
  skills: string[];
  learningOutcomes: string[];
  requirements: string[];
  audience: string[];
  sections: CourseSection[];
  lastUpdated: string;
  source?: "api" | "static-fallback";
  academyCourseId?: string;
  enrollmentOpen?: boolean;
};

export type Category = {
  slug: CourseCategorySlug;
  name: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  name: string;
  courseTitle: string;
  avatar: string;
  rating: number;
  quote: string;
};

export type CartItem = {
  courseId: string;
  addedAt: string;
};

export type LearningProgress = {
  courseId: string;
  completedLectureIds: string[];
  currentLectureId?: string;
  lastAccessedAt: string;
};

export type CourseList = {
  id: string;
  name: string;
  courseIds: string[];
};

export type AcademicsStoreState = {
  wishlistIds: string[];
  cartIds: string[];
  savedForLaterIds: string[];
  enrolledIds: string[];
  progress: LearningProgress[];
  courseLists: CourseList[];
};

export type CourseSortOption =
  | "relevant"
  | "highest-rated"
  | "most-reviewed"
  | "newest"
  | "price-low"
  | "price-high";

export type CourseFilters = {
  q?: string;
  category?: CourseCategorySlug | "all";
  level?: CourseLevel | "all";
  language?: string | "all";
  minRating?: number;
  price?: "all" | "free" | "paid";
  duration?: "all" | "short" | "medium" | "long";
  topic?: string;
  sort?: CourseSortOption;
};
