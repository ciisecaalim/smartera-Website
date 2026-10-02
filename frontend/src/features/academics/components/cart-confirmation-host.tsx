"use client";

import { AddedToCartConfirmation } from "@/features/academics/components/added-to-cart-confirmation";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";

/** Mounts the added-to-cart confirmation dialog from shared store state. */
export function CartConfirmationHost() {
  const { cartConfirmation, confirmAddToCart, dismissCartConfirmation } = useAcademicsStore();

  if (!cartConfirmation) return null;

  return <AddedToCartConfirmation courseId={cartConfirmation.courseId} onConfirm={confirmAddToCart} onClose={dismissCartConfirmation} />;
}
