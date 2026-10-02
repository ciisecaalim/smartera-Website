import { getCourseById } from "@/features/academics/services/course.service";
import type { AcademicsStoreState, CourseList, LearningProgress } from "@/features/academics/types/course.types";

export const ACADEMICS_STORE_KEY = "smartera-academics-store-v1";

export const emptyAcademicsStore = (): AcademicsStoreState => ({
  wishlistIds: [],
  cartIds: [],
  savedForLaterIds: [],
  enrolledIds: [],
  progress: [],
  courseLists: [],
});

export function readAcademicsStore(): AcademicsStoreState {
  if (typeof window === "undefined") return emptyAcademicsStore();
  try {
    const raw = window.localStorage.getItem(ACADEMICS_STORE_KEY);
    if (!raw) return emptyAcademicsStore();
    const parsed = JSON.parse(raw) as Partial<AcademicsStoreState>;
    const enrolledIds = parsed.enrolledIds ?? [];
    return {
      wishlistIds: (parsed.wishlistIds ?? []).filter((id) => !enrolledIds.includes(id)),
      cartIds: parsed.cartIds ?? [],
      savedForLaterIds: parsed.savedForLaterIds ?? [],
      enrolledIds,
      progress: parsed.progress ?? [],
      courseLists: parsed.courseLists ?? [],
    };
  } catch {
    return emptyAcademicsStore();
  }
}

export function writeAcademicsStore(state: AcademicsStoreState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACADEMICS_STORE_KEY, JSON.stringify(state));
}

function unique(ids: string[]): string[] {
  return Array.from(new Set(ids));
}

export function createCourseList(state: AcademicsStoreState, list: CourseList): AcademicsStoreState {
  return { ...state, courseLists: [...state.courseLists, list] };
}

export function deleteCourseList(state: AcademicsStoreState, listId: string): AcademicsStoreState {
  return { ...state, courseLists: state.courseLists.filter((list) => list.id !== listId) };
}

export function toggleCourseInList(state: AcademicsStoreState, listId: string, courseId: string): AcademicsStoreState {
  return {
    ...state,
    courseLists: state.courseLists.map((list) => {
      if (list.id !== listId) return list;
      const exists = list.courseIds.includes(courseId);
      return { ...list, courseIds: exists ? list.courseIds.filter((id) => id !== courseId) : unique([...list.courseIds, courseId]) };
    }),
  };
}

export function toggleWishlistId(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  const exists = state.wishlistIds.includes(courseId);
  return {
    ...state,
    wishlistIds: exists ? state.wishlistIds.filter((id) => id !== courseId) : unique([...state.wishlistIds, courseId]),
  };
}

export function addToCartId(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  if (state.enrolledIds.includes(courseId)) return state;
  return {
    ...state,
    cartIds: unique([...state.cartIds, courseId]),
    savedForLaterIds: state.savedForLaterIds.filter((id) => id !== courseId),
  };
}

/** Starts a one-course checkout without treating a wishlist save as enrollment. */
export function startCourseCheckout(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  if (state.enrolledIds.includes(courseId)) return state;
  return {
    ...state,
    cartIds: unique([...state.cartIds, courseId]),
    savedForLaterIds: state.savedForLaterIds.filter((id) => id !== courseId),
  };
}

export function removeFromCartId(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  return { ...state, cartIds: state.cartIds.filter((id) => id !== courseId) };
}

export function moveCartItemToWishlist(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  return {
    ...state,
    cartIds: state.cartIds.filter((id) => id !== courseId),
    wishlistIds: unique([...state.wishlistIds, courseId]),
  };
}

export function saveCartItemForLater(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  return {
    ...state,
    cartIds: state.cartIds.filter((id) => id !== courseId),
    savedForLaterIds: unique([...state.savedForLaterIds, courseId]),
  };
}

export function moveSavedItemToCart(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  return {
    ...state,
    savedForLaterIds: state.savedForLaterIds.filter((id) => id !== courseId),
    cartIds: unique([...state.cartIds, courseId]),
  };
}

export function removeSavedForLaterId(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  return { ...state, savedForLaterIds: state.savedForLaterIds.filter((id) => id !== courseId) };
}

export function enrollFromCart(state: AcademicsStoreState): AcademicsStoreState {
  return {
    ...state,
    enrolledIds: unique([...state.enrolledIds, ...state.cartIds]),
    wishlistIds: state.wishlistIds.filter((id) => !state.cartIds.includes(id)),
    cartIds: [],
  };
}

export function enrollCourseIds(state: AcademicsStoreState, courseIds: string[]): AcademicsStoreState {
  return {
    ...state,
    enrolledIds: unique([...state.enrolledIds, ...courseIds]),
    wishlistIds: state.wishlistIds.filter((id) => !courseIds.includes(id)),
    cartIds: state.cartIds.filter((id) => !courseIds.includes(id)),
    savedForLaterIds: state.savedForLaterIds.filter((id) => !courseIds.includes(id)),
  };
}

export function enrollCourse(state: AcademicsStoreState, courseId: string): AcademicsStoreState {
  return enrollCourseIds(state, [courseId]);
}

export function updateLessonProgress(
  state: AcademicsStoreState,
  courseId: string,
  lectureId: string,
  markComplete = false,
): AcademicsStoreState {
  const existing = state.progress.find((item) => item.courseId === courseId);
  const completed = new Set(existing?.completedLectureIds ?? []);
  if (markComplete) completed.add(lectureId);

  const nextProgress: LearningProgress = {
    courseId,
    completedLectureIds: Array.from(completed),
    currentLectureId: lectureId,
    lastAccessedAt: new Date().toISOString(),
  };

  return {
    ...state,
    enrolledIds: unique([...state.enrolledIds, courseId]),
    progress: [...state.progress.filter((item) => item.courseId !== courseId), nextProgress],
  };
}

export function getProgressPercent(completedCount: number, totalCount: number): number {
  if (totalCount <= 0) return 0;
  return Math.min(100, Math.round((completedCount / totalCount) * 100));
}

/** Seeds demo enrollments/progress for frontend Academics UX testing. */
export function seedDemoLearningState(
  state: AcademicsStoreState,
  seeds: Array<{ courseId: string; progressPercent: number }>,
): AcademicsStoreState {
  let next = state;
  const now = new Date().toISOString();

  for (const seed of seeds) {
    const course = getCourseById(seed.courseId);
    if (!course) continue;
    const lectureIds = course.sections.flatMap((section) => section.lectures.map((lecture) => lecture.id));
    const completeCount = Math.max(
      0,
      Math.min(lectureIds.length, Math.round((lectureIds.length * seed.progressPercent) / 100)),
    );
    const completedLectureIds = lectureIds.slice(0, completeCount);
    const currentLectureId = lectureIds[Math.min(completeCount, lectureIds.length - 1)];

    next = {
      ...next,
      enrolledIds: unique([...next.enrolledIds, seed.courseId]),
      wishlistIds: next.wishlistIds.filter((id) => id !== seed.courseId),
      cartIds: next.cartIds.filter((id) => id !== seed.courseId),
      progress: [
        ...next.progress.filter((item) => item.courseId !== seed.courseId),
        {
          courseId: seed.courseId,
          completedLectureIds,
          currentLectureId,
          lastAccessedAt: now,
        },
      ],
    };
  }

  return next;
}
