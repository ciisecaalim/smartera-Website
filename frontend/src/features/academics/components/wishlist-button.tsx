"use client";

import { HeartIcon } from "@/features/academics/components/icons";
import { useAcademicsStore } from "@/features/academics/hooks/use-academics-store";
import { cn } from "@/lib/cn";

export function WishlistButton({
  courseId,
  className,
  variant = "icon",
}: {
  courseId: string;
  className?: string;
  variant?: "icon" | "button";
}) {
  const { isWishlisted, toggleWishlist } = useAcademicsStore();
  const active = isWishlisted(courseId);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(courseId);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "inline-flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]",
        variant === "icon"
          ? "h-9 w-9 rounded-full border border-slate-200 bg-white/95 text-slate-600 hover:text-[#1B519F]"
          : "min-h-10 gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold text-[#0B1F3A] hover:border-[#1B519F] hover:text-[#1B519F]",
        active && "text-[#1B519F]",
        className,
      )}
    >
      <HeartIcon filled={active} className="h-4 w-4" />
      {variant === "button" ? <span>{active ? "Wishlisted" : "Add to wishlist"}</span> : null}
    </button>
  );
}


