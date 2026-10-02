"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  addToCartId,
  createCourseList as createCourseListState,
  deleteCourseList as deleteCourseListState,
  emptyAcademicsStore,
  enrollCourse,
  enrollCourseIds,
  enrollFromCart,
  moveCartItemToWishlist,
  moveSavedItemToCart,
  readAcademicsStore,
  removeFromCartId,
  removeSavedForLaterId,
  saveCartItemForLater,
  seedDemoLearningState,
  startCourseCheckout,
  toggleWishlistId,
  toggleCourseInList as toggleCourseInListState,
  updateLessonProgress,
  writeAcademicsStore,
} from "@/features/academics/services/store.service";
import type { AcademicsStoreState } from "@/features/academics/types/course.types";

type CartConfirmation = {
  courseId: string;
} | null;

type AcademicsStoreApi = {
  state: AcademicsStoreState;
  hydrated: boolean;
  cartConfirmation: CartConfirmation;
  dismissCartConfirmation: () => void;
  confirmAddToCart: () => void;
  toggleWishlist: (courseId: string) => void;
  addToCart: (courseId: string) => void;
  beginCheckout: (courseId: string) => boolean;
  removeFromCart: (courseId: string) => void;
  moveToWishlist: (courseId: string) => void;
  saveForLater: (courseId: string) => void;
  moveSavedToCart: (courseId: string) => void;
  removeSavedForLater: (courseId: string) => void;
  enroll: (courseId: string) => void;
  enrollCourses: (courseIds: string[]) => void;
  seedDemoLearning: (seeds: Array<{ courseId: string; progressPercent: number }>) => void;
  checkoutCart: () => void;
  setLessonProgress: (courseId: string, lectureId: string, markComplete?: boolean) => void;
  isWishlisted: (courseId: string) => boolean;
  isInCart: (courseId: string) => boolean;
  isEnrolled: (courseId: string) => boolean;
  createCourseList: (name: string) => string;
  deleteCourseList: (listId: string) => void;
  toggleCourseInList: (listId: string, courseId: string) => void;
};

const AcademicsStoreContext = createContext<AcademicsStoreApi | null>(null);

/** Stable empty snapshot - useSyncExternalStore requires identical getServerSnapshot results. */
const SERVER_SNAPSHOT = emptyAcademicsStore();

let memoryStore = emptyAcademicsStore();
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AcademicsStoreState {
  return memoryStore;
}

function getServerSnapshot(): AcademicsStoreState {
  return SERVER_SNAPSHOT;
}

function commit(next: AcademicsStoreState): void {
  memoryStore = next;
  writeAcademicsStore(next);
  emit();
}

function subscribeNoop() {
  return () => {};
}

export function AcademicsStoreProvider({ children }: { children: ReactNode }) {
  /** false on server / first paint; true on client without effect setState. */
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [cartConfirmation, setCartConfirmation] = useState<CartConfirmation>(null);
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    memoryStore = readAcademicsStore();
    emit();
  }, []);

  const dismissCartConfirmation = useCallback(() => setCartConfirmation(null), []);

  const confirmAddToCart = useCallback(() => {
    if (cartConfirmation && !memoryStore.cartIds.includes(cartConfirmation.courseId) && !memoryStore.enrolledIds.includes(cartConfirmation.courseId)) {
      commit(addToCartId(memoryStore, cartConfirmation.courseId));
    }
    setCartConfirmation(null);
  }, [cartConfirmation]);

  const toggleWishlist = useCallback((courseId: string) => {
    commit(toggleWishlistId(memoryStore, courseId));
  }, []);

  const addToCart = useCallback((courseId: string) => {
    if (memoryStore.enrolledIds.includes(courseId) || memoryStore.cartIds.includes(courseId)) return;
    setCartConfirmation({ courseId });
  }, []);

  const beginCheckout = useCallback((courseId: string) => {
    if (memoryStore.enrolledIds.includes(courseId)) return false;
    commit(startCourseCheckout(memoryStore, courseId));
    return true;
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    commit(removeFromCartId(memoryStore, courseId));
  }, []);

  const moveToWishlist = useCallback((courseId: string) => {
    commit(moveCartItemToWishlist(memoryStore, courseId));
  }, []);

  const saveForLater = useCallback((courseId: string) => {
    commit(saveCartItemForLater(memoryStore, courseId));
  }, []);

  const moveSavedToCart = useCallback((courseId: string) => {
    commit(moveSavedItemToCart(memoryStore, courseId));
  }, []);

  const removeSavedForLater = useCallback((courseId: string) => {
    commit(removeSavedForLaterId(memoryStore, courseId));
  }, []);

  const enroll = useCallback((courseId: string) => {
    commit(enrollCourse(memoryStore, courseId));
  }, []);

  const enrollCourses = useCallback((courseIds: string[]) => {
    commit(enrollCourseIds(memoryStore, courseIds));
  }, []);

  const seedDemoLearning = useCallback((seeds: Array<{ courseId: string; progressPercent: number }>) => {
    commit(seedDemoLearningState(memoryStore, seeds));
  }, []);

  const checkoutCart = useCallback(() => {
    commit(enrollFromCart(memoryStore));
  }, []);

  const setLessonProgress = useCallback((courseId: string, lectureId: string, markComplete = false) => {
    commit(updateLessonProgress(memoryStore, courseId, lectureId, markComplete));
  }, []);

  const createCourseList = useCallback((name: string) => {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `list-${Date.now()}`;
    commit(createCourseListState(memoryStore, { id, name: name.trim(), courseIds: [] }));
    return id;
  }, []);

  const deleteCourseList = useCallback((listId: string) => {
    commit(deleteCourseListState(memoryStore, listId));
  }, []);

  const toggleCourseInList = useCallback((listId: string, courseId: string) => {
    commit(toggleCourseInListState(memoryStore, listId, courseId));
  }, []);

  const value = useMemo<AcademicsStoreApi>(
    () => ({
      state,
      hydrated,
      cartConfirmation,
      dismissCartConfirmation,
      confirmAddToCart,
      toggleWishlist,
      addToCart,
      beginCheckout,
      removeFromCart,
      moveToWishlist,
      saveForLater,
      moveSavedToCart,
      removeSavedForLater,
      enroll,
      enrollCourses,
      seedDemoLearning,
      checkoutCart,
      setLessonProgress,
      createCourseList,
      deleteCourseList,
      toggleCourseInList,
      isWishlisted: (courseId) => state.wishlistIds.includes(courseId),
      isInCart: (courseId) => state.cartIds.includes(courseId),
      isEnrolled: (courseId) => state.enrolledIds.includes(courseId),
    }),
    [
      state,
      hydrated,
      cartConfirmation,
      dismissCartConfirmation,
      confirmAddToCart,
      toggleWishlist,
      addToCart,
      beginCheckout,
      removeFromCart,
      moveToWishlist,
      saveForLater,
      moveSavedToCart,
      removeSavedForLater,
      enroll,
      enrollCourses,
      seedDemoLearning,
      checkoutCart,
      setLessonProgress,
      createCourseList,
      deleteCourseList,
      toggleCourseInList,
    ],
  );

  return <AcademicsStoreContext.Provider value={value}>{children}</AcademicsStoreContext.Provider>;
}

export function useAcademicsStore(): AcademicsStoreApi {
  const context = useContext(AcademicsStoreContext);
  if (!context) {
    throw new Error("useAcademicsStore must be used within AcademicsStoreProvider");
  }
  return context;
}
