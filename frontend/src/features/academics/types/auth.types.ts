export type AcademicsStudent = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
  avatarDataUrl?: string;
  studentStatus?: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
  role: "STUDENT";
  interests: string[];
  recentlyViewedCourseIds: string[];
};

export type AcademicsAuthSession = {
  user: AcademicsStudent;
  loggedInAt: string;
};

export type AcademicsNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
};
